// CATATAN: File-file berikut perlu diupdate untuk menggunakan ProfileEditorData dari payloads.ts

## SUDAH SELESAI:

✅ app/editor/[username]/page.tsx - menggunakan profileEditorPayload
✅ app/editor/\_components.tsx/editor-client.tsx - menggunakan ProfileEditorData
✅ app/editor/\_components.tsx/editor-preview.tsx - menggunakan ProfileEditorData
✅ app/editor/\_components.tsx/control-panel.tsx - menggunakan ProfileEditorData
✅ components/preview/preview-background.tsx - menggunakan ProfileEditorData
✅ components/preview/preview-profile.tsx - menggunakan ProfileEditorData
✅ components/preview/preview-socials.tsx - menggunakan ProfileEditorData
✅ components/preview/preview-links.tsx - menggunakan ProfileEditorData
✅ components/control-panel/tabs/theme-tab.tsx - menggunakan ProfileEditorData
✅ components/control-panel/tabs/profile-tab.tsx - menggunakan ProfileEditorData

## PERLU UPDATE (masih pakai EditorState):

### 1. components/control-panel/profile-editor.tsx

- Ganti EditorState dengan ProfileEditorData
- Ganti onUpdate callback signature
- Ganti state.profile.avatar dengan profile.avatarUrl
- Ganti state.profile.name dengan profile.displayName
- Ganti state.profile.description dengan profile.bio

### 2. components/control-panel/background-options.tsx

- Ganti EditorState dengan ProfileEditorData
- Ganti state.backgroundType dengan profile.bgType
- Ganti state.backgroundColor dengan profile.bgColor
- Ganti state.backgroundGradient.from/to dengan profile.bgGradientFrom/To
- Ganti state.backgroundWallpaper dengan profile.bgWallpaper
- Ganti state.backgroundImage dengan profile.bgImage

### 3. components/control-panel/background-effect.tsx

- Ganti EditorState["bgEffects"] dengan ProfileEditorData
- Handle bgEffects sebagai JSON field (bukan nested object)
- Perlu type assertion atau parsing untuk bgEffects

### 4. components/control-panel/texture-selector.tsx

- Ganti state dengan profile
- Ganti state.cardTexture dengan profile.cardTexture

### 5. components/control-panel/profile-layout-selector.tsx

- Ganti EditorState dengan ProfileEditorData
- Ganti state.profileLayout dengan profile.layout

### 6. components/control-panel/social-editor.tsx

- Ganti EditorState dengan ProfileEditorData
- Ganti state.socials dengan profile.socials
- Update onUpdate untuk handle full profile object

## ISSUE YANG PERLU DIHANDLE:

### bgEffects adalah JSON field

Di Prisma schema, bgEffects adalah Json type, jadi di TypeScript akan menjadi:

```typescript
bgEffects: Prisma.JsonValue | null;
```

Perlu buat type guard atau type assertion:

```typescript
type BgEffects = {
  blur: number;
  noise: number;
  brightness: number;
  saturation: number;
  contrast: number;
};

const bgEffects = (profile.bgEffects as BgEffects) || defaultBgEffects;
```

### layout field name mismatch

- Di EditorState: profileLayout (string "center" | "left-stack" | "left-row")
- Di Prisma: layout (enum ProfileLayout dengan values "center", "left_stack", "left_row")

Perlu mapping atau update enum values.

### onUpdate callback pattern

Sebelumnya: `onUpdate(updates: Partial<EditorState>)`
Sekarang: `onUpdate(profile: ProfileEditorData)`

Komponen child perlu update full profile object, bukan partial updates.
Contoh:

```typescript
// Sebelumnya
onUpdate({ backgroundColor: "#000" });

// Sekarang
onUpdate({ ...profile, bgColor: "#000" });
```
