"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface UnsavedChangesDialogProps {
  open: boolean;
  onRestore: () => void;
  onDiscard: () => void;
}

export function UnsavedChangesDialog({ open, onRestore, onDiscard }: UnsavedChangesDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes Detected</AlertDialogTitle>
          <AlertDialogDescription>You have unsaved changes from your previous session. Would you like to restore them or start fresh?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDiscard}>Discard Changes</AlertDialogCancel>
          <AlertDialogAction onClick={onRestore}>Restore Changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
