import type { Field } from './types'

interface Props {
  fields: Field[]
  dir: 'ltr' | 'rtl'
  setDir: (d: 'ltr' | 'rtl') => void
  addField: () => void
  removeField: (id: string) => void
  updateField: (id: string, ch: Partial<Field>) => void
  moveField: (id: string, delta: -1 | 1) => void
  expandedColorId: string | null
  setExpandedColorId: (id: string | null) => void
  fieldFontSizeMm: number
  setFieldFontSizeMm: (v: number) => void
  labelColWidthMm: number
  setLabelColWidthMm: (v: number) => void
}

export function TabFields({
  fields, dir, setDir, addField, removeField, updateField, moveField,
  expandedColorId, setExpandedColorId, fieldFontSizeMm, setFieldFontSizeMm,
  labelColWidthMm, setLabelColWidthMm,
}: Props) {
  return (
    <>
      {/* Direction toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-medium">Direction</span>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden ml-auto">
          <button onClick={() => setDir('ltr')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${dir === 'ltr' ? 'bg-indigo-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
            LTR
          </button>
          <button onClick={() => setDir('rtl')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors border-l border-gray-200 ${dir === 'rtl' ? 'bg-indigo-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
            RTL عربي
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        {fields.map((f, i) => {
          const colorsOpen = expandedColorId === f.id
          return (
            <div key={f.id} className="rounded-lg border border-gray-100 overflow-hidden">
              {/* Label + controls row */}
              <div className="flex items-center gap-1.5 bg-gray-50 p-2">
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => moveField(f.id, -1)} disabled={i === 0}
                    className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none px-0.5">▲</button>
                  <button onClick={() => moveField(f.id, 1)} disabled={i === fields.length - 1}
                    className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none px-0.5">▼</button>
                </div>
                <input value={f.label} onChange={e => updateField(f.id, { label: e.target.value })}
                  className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 min-w-0 focus:outline-none focus:border-indigo-400"
                  placeholder="Field label" />
                <button onClick={() => updateField(f.id, { bold: !f.bold })}
                  className={`text-xs font-bold px-2 py-1 rounded border transition-colors ${f.bold ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-200 text-gray-400 hover:border-gray-400'}`}>B</button>
                <button onClick={() => updateField(f.id, { showDirham: !f.showDirham })}
                  title="Toggle AED dirham symbol"
                  className={`flex items-center justify-center px-1.5 py-1 rounded border transition-colors ${f.showDirham ? 'bg-green-600 border-green-600' : 'border-gray-200 hover:border-gray-400'}`}>
                  <img src="/aed-symbol-only.png" alt="AED" className={`w-3.5 h-3.5 ${f.showDirham ? 'brightness-0 invert' : 'opacity-50'}`} />
                </button>
                <button onClick={() => setExpandedColorId(colorsOpen ? null : f.id)}
                  title="Field colours"
                  className={`text-sm px-1.5 py-1 rounded border transition-colors ${colorsOpen ? 'bg-indigo-500 text-white border-indigo-500' : (f.labelBg || f.valueBg ? 'border-indigo-300 text-indigo-500' : 'border-gray-200 text-gray-400 hover:border-gray-400')}`}>■</button>
                <button onClick={() => removeField(f.id)}
                  className="text-red-300 hover:text-red-500 text-sm px-1">✕</button>
              </div>

              {/* Value input */}
              <div className="flex items-center gap-1.5 px-2 pb-2 bg-gray-50 border-t border-gray-100">
                <span className="text-xs text-gray-400 shrink-0 w-10">Value</span>
                <input value={f.value} onChange={e => updateField(f.id, { value: e.target.value })}
                  dir={dir}
                  className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 min-w-0 focus:outline-none focus:border-indigo-400 bg-white"
                  placeholder={dir === 'rtl' ? 'اكتب هنا...' : 'Type value...'} />
              </div>

              {/* Colour pickers */}
              {colorsOpen && (
                <div className="bg-white border-t border-gray-100 px-3 py-2.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20 shrink-0">Label BG</span>
                    <input type="color" value={f.labelBg || '#e5e7eb'}
                      onChange={e => updateField(f.id, { labelBg: e.target.value })}
                      className="w-7 h-7 rounded cursor-pointer border border-gray-200 p-0.5" />
                    <span className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ backgroundColor: f.labelBg || 'transparent', border: '1px solid #e5e7eb' }}>
                      {f.label}:
                    </span>
                    {f.labelBg && (
                      <button onClick={() => updateField(f.id, { labelBg: '' })}
                        className="text-xs text-gray-400 hover:text-red-500 ml-auto">Clear</button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20 shrink-0">Value BG</span>
                    <input type="color" value={f.valueBg || '#e5e7eb'}
                      onChange={e => updateField(f.id, { valueBg: e.target.value })}
                      className="w-7 h-7 rounded cursor-pointer border border-gray-200 p-0.5" />
                    <div className="flex-1 h-5 rounded border border-gray-300"
                      style={{ backgroundColor: f.valueBg || 'transparent' }} />
                    {f.valueBg && (
                      <button onClick={() => updateField(f.id, { valueBg: '' })}
                        className="text-xs text-gray-400 hover:text-red-500 ml-auto">Clear</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button onClick={addField}
        className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
        + Add Field
      </button>

      <div className="pt-2 border-t border-gray-100 space-y-3">
        <div>
          <label className="text-xs text-gray-500">Font Size: <strong>{fieldFontSizeMm}mm</strong></label>
          <input type="range" min={2} max={8} step={0.5} value={fieldFontSizeMm}
            onChange={e => setFieldFontSizeMm(+e.target.value)} className="w-full mt-1 accent-indigo-600" />
        </div>
        <div>
          <label className="text-xs text-gray-500">Label Column Width: <strong>{labelColWidthMm}mm</strong></label>
          <input type="range" min={10} max={70} step={1} value={labelColWidthMm}
            onChange={e => setLabelColWidthMm(+e.target.value)} className="w-full mt-1 accent-indigo-600" />
        </div>
      </div>
    </>
  )
}
