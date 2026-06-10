import type { LetterheadData } from './types'

interface Props {
  data: LetterheadData
  onChange: (patch: Partial<LetterheadData>) => void
}

const inputClass =
  'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200'

const labelClass = 'text-xs text-gray-500 block mb-1'

export function TabFooter({ data, onChange }: Props) {
  return (
    <>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact footer</p>

      <div>
        <label className={labelClass}>Address</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={2}
          value={data.address}
          onChange={e => onChange({ address: e.target.value })}
          placeholder="Street, building, city, country"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className={labelClass}>Phone</label>
          <input
            className={inputClass}
            value={data.phone}
            onChange={e => onChange({ phone: e.target.value })}
            placeholder="+971 4 000 0000"
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            value={data.email}
            onChange={e => onChange({ email: e.target.value })}
            placeholder="info@company.com"
          />
        </div>
        <div>
          <label className={labelClass}>Website <span className="text-gray-400">(optional)</span></label>
          <input
            className={inputClass}
            value={data.website}
            onChange={e => onChange({ website: e.target.value })}
            placeholder="www.company.com"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Footer note <span className="text-gray-400">(optional)</span></label>
        <input
          className={inputClass}
          value={data.footerNote}
          onChange={e => onChange({ footerNote: e.target.value })}
          placeholder="e.g. Registered in UAE · TRN 100000000000003"
        />
      </div>

      <p className="text-xs text-gray-400 leading-relaxed">
        Footer details appear neatly at the bottom of the letterhead, aligned with your header layout.
      </p>
    </>
  )
}
