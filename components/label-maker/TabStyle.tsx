import type { Dispatch, SetStateAction } from 'react'
import type { FieldStyle, TextBand } from './types'

interface Props {
  fieldStyle: FieldStyle
  setFieldStyle: (s: FieldStyle) => void
  borderColor: string
  setBorderColor: (c: string) => void
  bgColor: string
  setBgColor: (c: string) => void
  paddingMm: number
  setPaddingMm: (v: number) => void
  header: TextBand
  setHeader: Dispatch<SetStateAction<TextBand>>
  footer: TextBand
  setFooter: Dispatch<SetStateAction<TextBand>>
}

export function TabStyle({
  fieldStyle, setFieldStyle, borderColor, setBorderColor, bgColor, setBgColor,
  paddingMm, setPaddingMm, header, setHeader, footer, setFooter,
}: Props) {
  return (
    <>
      {/* Field value style */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Field Value Style</p>
        <div className="grid grid-cols-3 gap-1.5">
          {([
            { val: 'line',        label: 'Line',    icon: '▁' },
            { val: 'box',         label: 'Box',     icon: '▭' },
            { val: 'rounded-box', label: 'Rounded', icon: '▢' },
          ] as { val: FieldStyle; label: string; icon: string }[]).map(opt => (
            <button key={opt.val} onClick={() => setFieldStyle(opt.val)}
              className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg border text-xs transition-colors ${fieldStyle === opt.val ? 'bg-indigo-500 text-white border-indigo-500' : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}>
              <span className="text-base leading-none">{opt.icon}</span>{opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Border Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)}
              className="w-10 h-8 rounded cursor-pointer border border-gray-200" />
            <span className="text-xs text-gray-500">{borderColor}</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Background</label>
          <div className="flex items-center gap-2">
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
              className="w-10 h-8 rounded cursor-pointer border border-gray-200" />
            <span className="text-xs text-gray-500">{bgColor}</span>
          </div>
        </div>
      </div>

      {/* Padding */}
      <div>
        <label className="text-xs text-gray-500">Inner Padding: <strong>{paddingMm}mm</strong></label>
        <input type="range" min={1} max={12} step={0.5} value={paddingMm}
          onChange={e => setPaddingMm(+e.target.value)} className="w-full mt-1 accent-indigo-600" />
      </div>

      {/* ── Header ── */}
      <div className="border-t border-gray-100 pt-3 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-600">Header</p>
          <button onClick={() => setHeader(h => ({ ...h, enabled: !h.enabled }))}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${header.enabled ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
            {header.enabled ? 'ON' : 'OFF'}
          </button>
        </div>
        {header.enabled && (
          <>
            <input value={header.text} onChange={e => setHeader(h => ({ ...h, text: e.target.value }))}
              placeholder="Header text"
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400" />
            <div className="grid grid-cols-3 gap-1.5">
              {(['left', 'center', 'right'] as const).map(a => (
                <button key={a} onClick={() => setHeader(h => ({ ...h, align: a }))}
                  className={`text-xs py-1.5 rounded-lg border capitalize transition-colors ${header.align === a ? 'bg-indigo-500 text-white border-indigo-500' : 'border-gray-200 text-gray-600'}`}>{a}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-400">Text color</label>
                <input type="color" value={header.textColor} onChange={e => setHeader(h => ({ ...h, textColor: e.target.value }))}
                  className="w-full h-7 mt-0.5 rounded cursor-pointer border border-gray-200" />
              </div>
              <div>
                <label className="text-xs text-gray-400">Background</label>
                <input type="color" value={header.bgColor} onChange={e => setHeader(h => ({ ...h, bgColor: e.target.value }))}
                  className="w-full h-7 mt-0.5 rounded cursor-pointer border border-gray-200" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400">Font size: <strong>{header.fontSizeMm}mm</strong></label>
              <input type="range" min={2} max={8} step={0.5} value={header.fontSizeMm}
                onChange={e => setHeader(h => ({ ...h, fontSizeMm: +e.target.value }))} className="w-full mt-0.5 accent-indigo-600" />
            </div>
            <div>
              <label className="text-xs text-gray-400">Padding: <strong>{header.paddingMm}mm</strong></label>
              <input type="range" min={0.5} max={6} step={0.5} value={header.paddingMm}
                onChange={e => setHeader(h => ({ ...h, paddingMm: +e.target.value }))} className="w-full mt-0.5 accent-indigo-600" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="hdr-bold" checked={header.bold} onChange={e => setHeader(h => ({ ...h, bold: e.target.checked }))} className="accent-indigo-600" />
              <label htmlFor="hdr-bold" className="text-xs text-gray-500">Bold</label>
              <input type="checkbox" id="hdr-border" checked={header.border} onChange={e => setHeader(h => ({ ...h, border: e.target.checked }))} className="accent-indigo-600 ml-3" />
              <label htmlFor="hdr-border" className="text-xs text-gray-500">Divider line</label>
            </div>
          </>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-gray-100 pt-3 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-600">Footer</p>
          <button onClick={() => setFooter(f => ({ ...f, enabled: !f.enabled }))}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${footer.enabled ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
            {footer.enabled ? 'ON' : 'OFF'}
          </button>
        </div>
        {footer.enabled && (
          <>
            <input value={footer.text} onChange={e => setFooter(f => ({ ...f, text: e.target.value }))}
              placeholder="Footer text"
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400" />
            <div className="grid grid-cols-3 gap-1.5">
              {(['left', 'center', 'right'] as const).map(a => (
                <button key={a} onClick={() => setFooter(f => ({ ...f, align: a }))}
                  className={`text-xs py-1.5 rounded-lg border capitalize transition-colors ${footer.align === a ? 'bg-indigo-500 text-white border-indigo-500' : 'border-gray-200 text-gray-600'}`}>{a}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-400">Text color</label>
                <input type="color" value={footer.textColor} onChange={e => setFooter(f => ({ ...f, textColor: e.target.value }))}
                  className="w-full h-7 mt-0.5 rounded cursor-pointer border border-gray-200" />
              </div>
              <div>
                <label className="text-xs text-gray-400">Background</label>
                <input type="color" value={footer.bgColor} onChange={e => setFooter(f => ({ ...f, bgColor: e.target.value }))}
                  className="w-full h-7 mt-0.5 rounded cursor-pointer border border-gray-200" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400">Font size: <strong>{footer.fontSizeMm}mm</strong></label>
              <input type="range" min={2} max={8} step={0.5} value={footer.fontSizeMm}
                onChange={e => setFooter(f => ({ ...f, fontSizeMm: +e.target.value }))} className="w-full mt-0.5 accent-indigo-600" />
            </div>
            <div>
              <label className="text-xs text-gray-400">Padding: <strong>{footer.paddingMm}mm</strong></label>
              <input type="range" min={0.5} max={6} step={0.5} value={footer.paddingMm}
                onChange={e => setFooter(f => ({ ...f, paddingMm: +e.target.value }))} className="w-full mt-0.5 accent-indigo-600" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="ftr-bold" checked={footer.bold} onChange={e => setFooter(f => ({ ...f, bold: e.target.checked }))} className="accent-indigo-600" />
              <label htmlFor="ftr-bold" className="text-xs text-gray-500">Bold</label>
              <input type="checkbox" id="ftr-border" checked={footer.border} onChange={e => setFooter(f => ({ ...f, border: e.target.checked }))} className="accent-indigo-600 ml-3" />
              <label htmlFor="ftr-border" className="text-xs text-gray-500">Divider line</label>
            </div>
          </>
        )}
      </div>
    </>
  )
}
