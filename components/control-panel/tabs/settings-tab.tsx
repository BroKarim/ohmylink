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
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Settings className="h-4 w-4" />
          Settings
        </CardTitle>
        <CardDescription>Manage your profile settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Username Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
          </div>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} placeholder="your-username" className="max-w-md" />
          <p className="text-xs text-muted-foreground">
            Your profile will be available at: <span className="font-mono">dzenn.link/{username}</span>
          </p>
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
      </CardContent>
    </Card>
  );
}
