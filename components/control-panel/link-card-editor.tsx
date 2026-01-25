"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Loader2 } from "lucide-react";
import type { ProfileEditorData } from "@/server/user/profile/payloads";
import { createLink, deleteLink } from "@/server/user/links/actions";
import { toast } from "sonner";

interface LinkCardEditorProps {
  profile: ProfileEditorData;
  onUpdate: (profile: ProfileEditorData) => void;
}

export function LinkCardEditor({ profile, onUpdate }: LinkCardEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newLink, setNewLink] = useState<any>({
    title: "",
    url: "",
    description: "",
    videoUrl: "",
    isStripeEnabled: false,
  });

  const handleAdd = async () => {
    if (!newLink.title || !newLink.url) {
      toast.error("Title and URL are required");
      return;
    }

    setIsSaving(true);
    try {
      const result = await createLink({
        title: newLink.title,
        url: newLink.url,
        description: newLink.description || null,
        videoUrl: newLink.videoUrl || null,
        isStripeEnabled: newLink.isStripeEnabled,
        position: profile.links.length,
        isActive: true,
        icon: null,
        imageUrl: null,
      });

      if (result.success && result.data) {
        onUpdate({ ...profile, links: [...profile.links, result.data] });
        toast.success("Link added!");
        setIsOpen(false);
        setNewLink({ title: "", url: "", description: "", videoUrl: "", isStripeEnabled: false });
      } else {
        toast.error(result.error || "Failed to add link");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding link");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteLink(id);

      if (result.success) {
        onUpdate({ ...profile, links: profile.links.filter((l) => l.id !== id) });
        toast.success("Link deleted!");
      } else {
        toast.error(result.error || "Failed to delete link");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting link");
    }
  };

  return (
    <div className="space-y-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger render={<Button className="w-full gap-2 py-6 border-2 border-dashed" variant="outline" />}>
          <Plus className="h-4 w-4" /> Add New Link
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Title (Required)</Label>
              <Input value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} placeholder="e.g. My Portfolio" />
            </div>
            <div className="space-y-2">
              <Label>URL (Required)</Label>
              <Input value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Textarea value={newLink.description} onChange={(e) => setNewLink({ ...newLink, description: e.target.value })} placeholder="Short bio about this link" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label>Enable Stripe Connect</Label>
              <Switch checked={newLink.isStripeEnabled} onCheckedChange={(val) => setNewLink({ ...newLink, isStripeEnabled: val })} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAdd} disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Add to List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* List of Links */}
      <div className="space-y-2">
        {profile.links?.map((link: any) => (
          <div key={link.id} className="flex items-center justify-between p-3 border rounded-xl bg-card">
            <span className="font-medium text-sm">{link.title}</span>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(link.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
