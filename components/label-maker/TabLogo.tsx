import { useRef } from 'react'
import type { Field } from './types'

const SNAP_GRID = [
  ['↖', '↑', '↗'],
  ['←', '·', '→'],
  ['↙', '↓', '↘'],
] as const

interface Props {
  logoUrl: string | null
  setLogoUrl: (url: string | null) => void
  logoWidthMm: number
  setLogoWidthMm: (v: number) => void
  logoHeightMm: number
  logoXMm: number
  setLogoXMm: (v: number) => void
  logoYMm: number
  setLogoYMm: (v: number) => void
  fieldsNextToLogo: number
  setFieldsNextToLogo: (v: number) => void
  fields: Field[]
  cardW: number
  contentH: number
  snapLogo: (row: number, col: number) => void
}

export function TabLogo({
  logoUrl, setLogoUrl, logoWidthMm, setLogoWidthMm, logoHeightMm,
  logoXMm, setLogoXMm, logoYMm, setLogoYMm,
  fieldsNextToLogo, setFieldsNextToLogo, fields, cardW, contentH, snapLogo,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setLogoUrl(ev.target?.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      <button onClick={() => fileRef.current?.click()}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors font-medium">
        {logoUrl ? 'Change Logo' : '+ Upload Logo Image'}
      </button>

      {logoUrl ? (
        <>
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
            <img src={logoUrl} alt="logo" className="w-20 h-14 object-contain rounded border border-gray-200 bg-white" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium mb-1">Logo uploaded</p>
              <button onClick={() => setLogoUrl(null)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500">Logo Width: <strong>{logoWidthMm}mm</strong></label>
            <input type="range" min={5} max={80} step={1} value={logoWidthMm}
              onChange={e => setLogoWidthMm(+e.target.value)}
              className="w-full mt-1 accent-indigo-600" />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Snap to position <span className="text-gray-400">(or drag in preview)</span></p>
            <div className="grid grid-cols-3 gap-1 w-28 mx-auto">
              {SNAP_GRID.map((row, ri) =>
                row.map((icon, ci) => (
                  <button key={`${ri}-${ci}`} onClick={() => snapLogo(ri, ci)}
                    className="h-8 w-8 rounded border border-gray-200 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 text-gray-500 text-sm transition-colors flex items-center justify-center">
                    {icon}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">X: <strong>{logoXMm.toFixed(1)}mm</strong></label>
              <input type="range" min={0} max={Math.max(0, cardW - logoWidthMm)} step={0.5} value={logoXMm}
                onChange={e => setLogoXMm(+e.target.value)} className="w-full mt-1 accent-indigo-600" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Y: <strong>{logoYMm.toFixed(1)}mm</strong></label>
              <input type="range" min={0} max={Math.max(0, contentH - (logoHeightMm || 5))} step={0.5} value={logoYMm}
                onChange={e => setLogoYMm(+e.target.value)} className="w-full mt-1 accent-indigo-600" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <label className="text-xs text-gray-500 block mb-1">
              Fields beside logo: <strong>{fieldsNextToLogo === 0 ? 'none' : fieldsNextToLogo}</strong>
            </label>
            <input type="range" min={0} max={fields.length} step={1} value={fieldsNextToLogo}
              onChange={e => setFieldsNextToLogo(+e.target.value)} className="w-full accent-indigo-600" />
            <p className="text-xs text-gray-400 mt-1">
              {fieldsNextToLogo === 0
                ? 'All fields below logo'
                : `"${fields.slice(0, fieldsNextToLogo).map(f => f.label).join('", "')}" beside logo`}
            </p>
          </div>
        </>
      ) : (
        <p className="text-xs text-gray-400 text-center">Upload a PNG, JPG, or SVG logo to place it on the label</p>
      )}
    </>
  )
}
