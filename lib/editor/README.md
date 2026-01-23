# Editor Module

Modul editor yang terorganisir dengan baik untuk mengelola state dan types aplikasi editor.

## Struktur Folder

```
lib/editor/
├── index.ts           # Barrel export untuk semua types dan utilities
├── types.ts           # Definisi types terpusat
└── initial-state.ts   # Initial state configuration

hooks/
└── use-editor-state.ts # Custom hook untuk state management
```

## Penggunaan

### Import Types

```tsx
// Import dari centralized location
import { EditorState, LinkItem, ProfileData } from "@/lib/editor"
```

### Menggunakan Custom Hook

```tsx
import { useEditorState } from "@/hooks/use-editor-state"

function MyComponent() {
  const { state, updateState } = useEditorState()
  
  // Update state
  updateState({ 
    backgroundColor: "#000000" 
  })
  
  return <div>...</div>
}
```

## Available Types

### `EditorState`
Main state interface untuk seluruh editor.

### `LinkItem`
Interface untuk link items dalam editor.

### `SocialLink`
Interface untuk social media links.

### `ProfileData`
Interface untuk profile information.

### `BackgroundGradient`
Interface untuk gradient configuration.

### `BackgroundEffects`
Interface untuk background effects (blur, noise, brightness, etc).

### Type Aliases
- `BackgroundType`: `"wallpaper" | "color" | "gradient" | "image"`
- `ProfileLayout`: `"center" | "left-stack" | "left-row"`
- `CardTexture`: `"base" | "glassy"`

## Benefits

✅ **Single Source of Truth** - Semua types didefinisikan di satu tempat  
✅ **Type Safety** - TypeScript akan mendeteksi error lebih cepat  
✅ **Easy Maintenance** - Update types di satu file, semua komponen terupdate  
✅ **Better Organization** - Separation of concerns yang jelas  
✅ **Reusability** - Custom hook bisa digunakan di komponen manapun  
✅ **Performance** - useCallback untuk optimasi re-render
