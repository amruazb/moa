import type { LetterheadData } from './types'
import { THEMES } from './types'

interface Props {
  data: LetterheadData
  onChange: (patch: Partial<LetterheadData>) => void
}

export function TabTheme({ data, onChange }: Props) {
  const active = THEMES.find(t => t.id === data.themeId) ?? THEMES[0]

  return (
    <>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Colour themes</p>
      <div className="grid grid-cols-2 gap-2">
        {THEMES.map(theme => (
          <button
            key={theme.id}
            type="button"
            onClick={() => onChange({ themeId: theme.id })}
            className={`text-left p-3 rounded-lg border transition-all ${
              data.themeId === theme.id
                ? 'border-sky-500 ring-2 ring-sky-200 bg-sky-50'
                : 'border-gray-200 hover:border-sky-300'
            }`}
          >
            <div className="flex gap-1.5 mb-2">
              {[theme.primary, theme.accent, theme.background, theme.divider].map(c => (
                <span key={c} className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-800 block">{theme.name}</span>
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-2">
        <p className="text-xs font-semibold text-gray-600">Header layout</p>
        <div className="grid grid-cols-3 gap-1.5">
          {([
            { val: 'logo-left', label: 'Logo left' },
            { val: 'logo-center', label: 'Centered' },
            { val: 'logo-right', label: 'Logo right' },
          ] as const).map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => onChange({ headerLayout: opt.val })}
              className={`text-xs py-2 rounded-lg border transition-colors ${
                data.headerLayout === opt.val
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'border-gray-200 text-gray-600 hover:border-sky-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Header divider line</span>
        <Toggle checked={data.showHeaderDivider} onChange={v => onChange({ showHeaderDivider: v })} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Footer divider line</span>
        <Toggle checked={data.showFooterDivider} onChange={v => onChange({ showFooterDivider: v })} />
      </div>

      <div className="pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-1">Active theme</p>
        <p className="text-sm font-medium" style={{ color: active.primary }}>{active.name}</p>
      </div>
    </>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        checked ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-500'
      }`}
    >
      {checked ? 'ON' : 'OFF'}
    </button>
  )
}