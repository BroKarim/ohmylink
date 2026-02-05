"use client";

import { useState, useTransition } from "react";
import { Settings, User, Globe, Trash2, LogOut, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { updateProfileUsername, togglePublishStatus, deleteProfileOrAccount } from "@/server/user/settings/actions";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface SettingsTabProps {
  profile: ProfileEditorData;
}

export function SettingsTab({ profile }: SettingsTabProps) {
  const router = useRouter();
  const [username, setUsername] = useState(profile.username);
  const [isPublished, setIsPublished] = useState(profile.isPublished);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const hasChanges = username !== profile.username || isPublished !== profile.isPublished;

  const handleSaveSettings = async () => {
    startTransition(async () => {
      const toastId = toast.loading("Saving settings...");

      try {
        // Update username if changed
        if (username !== profile.username) {
          const result = await updateProfileUsername(username);
          if (!result.success) {
            toast.error(result.error || "Failed to update username", { id: toastId });
            return;
          }
        }

        // Update publish status if changed
        if (isPublished !== profile.isPublished) {
          const result = await togglePublishStatus(isPublished);
          if (!result.success) {
            toast.error(result.error || "Failed to update publish status", { id: toastId });
            return;
          }
        }

        toast.success("Settings saved successfully", { id: toastId });

        // Redirect to new username if changed
        if (username !== profile.username) {
          // Clear localStorage when username changes (new profile context)
          if (typeof window !== "undefined") {
            localStorage.removeItem("dzenn-editor-draft");
          }
          router.push(`/editor/${username}`);
        } else {
          router.refresh();
        }
      } catch (error) {
        toast.error("Failed to save settings", { id: toastId });
      }
    });
  };

  const handleDeleteProfile = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Deleting profile...");

    try {
      const result = await deleteProfileOrAccount();

      if (!result.success) {
        toast.error(result.error || "Failed to delete profile", { id: toastId });
        setIsDeleting(false);
        return;
      }

      toast.success("Profile deleted successfully", { id: toastId });

      // Clear localStorage to prevent stale data
      if (typeof window !== "undefined") {
        localStorage.removeItem("dzenn-editor-draft");
      }

      // Redirect based on result
      if (result.redirect) {
        router.push(result.redirect);
      }
    } catch (error) {
      toast.error("Failed to delete profile", { id: toastId });
      setIsDeleting(false);
    }
  };

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // Clear localStorage on logout
            if (typeof window !== "undefined") {
              localStorage.removeItem("dzenn-editor-draft");
            }
            toast.success("Logged out successfully", { id: toastId });
            router.push("/");
          },
          onError: () => {
            toast.error("Failed to logout", { id: toastId });
          },
        },
      });
    } catch (error) {
      toast.error("Failed to logout", { id: toastId });
    }
  };

  return (
    <div className="px-3 pb-4">
      <p className="text-sm text-muted-foreground">Manage your profile settings</p>
      <div className="space-y-6">
        {/* Username Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
          </div>
          <div className="relative flex items-center w-full max-w-md">
            <div className="relative flex-1 flex items-center overflow-hidden">
              <div className="absolute left-4 text-sm text-muted-foreground font-medium pointer-events-none">dzenn.link/</div>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                placeholder="your-username"
                className="w-full text-sm pl-[88px] pr-4 py-2 h-10 transition-all bg-muted/30 hover:bg-muted/50 border border-border rounded-full text-foreground font-medium focus:outline-none focus:ring-1 focus:ring-primary/20"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Choose a unique username for your profile URL</p>
        </div>

        <Separator />

        {/* Publish Status Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="publish-status" className="text-sm font-medium">
                  Publish Profile
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">Make your profile visible to the public</p>
            </div>
            <Switch id="publish-status" checked={isPublished} onCheckedChange={setIsPublished} />
          </div>
        </div>

        <Separator />

        {/* Save Button */}
        <Button onClick={handleSaveSettings} disabled={!hasChanges || isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>

        <Separator />

        {/* Danger Zone */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-destructive">Danger Zone</h3>

          {/* Delete Profile */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full text-destructive border-destructive/50 hover:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Profile
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. This will permanently delete your profile and all associated data. If this is your only profile, your entire account will be deleted.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProfile} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Profile"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Logout */}
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
