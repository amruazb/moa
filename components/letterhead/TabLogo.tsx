import { useRef } from 'react'
import type { LetterheadData } from './types'

interface Props {
  data: LetterheadData
  onChange: (patch: Partial<LetterheadData>) => void
}

export function TabLogo({ data, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onChange({ logoUrl: ev.target?.result as string })
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-sky-400 hover:text-sky-600 transition-colors font-medium"
      >
        {data.logoUrl ? 'Change Logo' : '+ Upload Logo'}
      </button>

      {data.logoUrl ? (
        <>
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
            <img src={data.logoUrl} alt="Logo preview" className="w-24 h-16 object-contain rounded border border-gray-200 bg-white" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium mb-1">Logo uploaded</p>
              <button type="button" onClick={() => onChange({ logoUrl: null })} className="text-xs text-red-500 hover:text-red-700">
                Remove
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500">
              Logo width: <strong>{data.logoWidthMm}mm</strong>
            </label>
            <input
              type="range"
              min={12}
              max={60}
              step={1}
              value={data.logoWidthMm}
              onChange={e => onChange({ logoWidthMm: +e.target.value })}
              className="w-full mt-1 accent-sky-600"
            />
          </div>
        </>
      ) : (
        <p className="text-xs text-gray-400 text-center">Upload PNG, JPG, or SVG for your letterhead</p>
      )}
    </>
  )
}
