# Template Integration Guide

This guide explains how to integrate the TemplateManager component into other document types.

## Quick Integration Steps

### 1. Import TemplateManager

Add to your workspace component:

```typescript
import { TemplateManager } from './templates/TemplateManager'
```

### 2. Add State and Handler

Add these to your component:

```typescript
const setData = useYourStore((state) => state.setYourDataMethod)
const currentData = useYourStore((state) => state.yourData)

const handleLoadTemplate = (data: any) => {
    setData(data)
}
```

### 3. Add TemplateManager Component

Add before your form/editor:

```tsx
{/* Template Manager */}
<div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
    <TemplateManager
        documentType="your-document-type"
        currentData={currentData}
        onLoadTemplate={handleLoadTemplate}
    />
</div>
```

## Document Types

Use these document types:
- `"poa"` - Power of Attorney
- `"llc-moa"` - LLC MOA
- `"llc-amendment-moa"` - LLC Amendment MOA
- `"llc-new-moa"` - LLC New MOA
- `"llc-to-spc"` - LLC to SPC Conversion

## Example: LLC Amendment MOA

```typescript
'use client'

import { TemplateManager } from './templates/TemplateManager'
import { useLLCAmendmentMoaStore } from '@/store/llcAmendmentMoaStore'

export function LLCAmendmentMoaWorkspace() {
    const setLLCAmendmentMoaData = useLLCAmendmentMoaStore((state) => state.setLLCAmendmentMoaData)
    const llcAmendmentMoaData = useLLCAmendmentMoaStore((state) => state.llcAmendmentMoaData)

    const handleLoadTemplate = (data: any) => {
        setLLCAmendmentMoaData(data)
    }

    return (
        <div>
            {/* Template Manager */}
            <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <TemplateManager
                    documentType="llc-amendment-moa"
                    currentData={llcAmendmentMoaData}
                    onLoadTemplate={handleLoadTemplate}
                />
            </div>
            
            {/* Rest of your component */}
        </div>
    )
}
```

## Store Methods Needed

Your store should have:
- A method to set the entire data object (e.g., `setPOAData`, `setLLCAmendmentMoaData`)
- A property to get the current data (e.g., `poaData`, `llcAmendmentMoaData`)

If your store doesn't have a `setData` method, add one:

```typescript
setLLCAmendmentMoaData: (data: Partial<LLCAmendmentMoaData>) => {
    const newState = { ...get().llcAmendmentMoaData, ...data }
    set({ llcAmendmentMoaData: newState })
}
```

## Testing

1. Fill in some data in your form
2. Click "Save Template"
3. Enter a name and save
4. Click "Load Template"
5. Select your saved template
6. Verify the data loads correctly

## Troubleshooting

### Template not loading data
- Check that your `handleLoadTemplate` function calls the correct store method
- Verify the store method accepts the full data object
- Check browser console for errors

### Template save fails
- Verify Supabase is configured (see SUPABASE_SETUP.md)
- Check that environment variables are set
- Verify bucket name is `document-templates`
