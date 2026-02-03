import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface EditorState {
  // Original data from DB
  originalProfile: ProfileEditorData | null;

  // Current edited data (draft)
  draftProfile: ProfileEditorData | null;

  // Dirty state tracking
  isDirty: boolean;

  // Actions
  initializeEditor: (profile: ProfileEditorData) => void;
  updateDraft: (profile: ProfileEditorData) => void;
  markAsSaved: () => void;
  discardChanges: () => void;
  clearDraft: () => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      originalProfile: null,
      draftProfile: null,
      isDirty: false,

      initializeEditor: (profile) => {
        const { draftProfile } = get();

        // Check if there's a draft that's newer than DB data
        if (draftProfile && JSON.stringify(draftProfile) !== JSON.stringify(profile)) {
          // There's unsaved changes from previous session
          set({
            originalProfile: profile,
            isDirty: true,
          });
        } else {
          // No draft or draft is same as DB
          set({
            originalProfile: profile,
            draftProfile: profile,
            isDirty: false,
          });
        }
      },

      updateDraft: (profile) => {
        const { originalProfile } = get();
        const isDirty = JSON.stringify(profile) !== JSON.stringify(originalProfile);

        set({
          draftProfile: profile,
          isDirty,
        });
      },

      markAsSaved: () => {
        const { draftProfile } = get();
        set({
          originalProfile: draftProfile,
          isDirty: false,
        });
      },

      discardChanges: () => {
        const { originalProfile } = get();
        set({
          draftProfile: originalProfile,
          isDirty: false,
        });
      },

      clearDraft: () => {
        set({
          originalProfile: null,
          draftProfile: null,
          isDirty: false,
        });
      },
    }),
    {
      name: "ohmylink-editor-draft",
      partialize: (state) => ({
        draftProfile: state.draftProfile,
      }),
    },
  ),
);
