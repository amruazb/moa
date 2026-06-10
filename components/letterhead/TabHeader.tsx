import type { LetterheadData } from './types'

interface Props {
  data: LetterheadData
  onChange: (patch: Partial<LetterheadData>) => void
}

const inputClass =
  'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200'

export function TabHeader({ data, onChange }: Props) {
  return (
    <>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Company header</p>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Company name</label>
        <input
          className={inputClass}
          value={data.companyName}
          onChange={e => onChange({ companyName: e.target.value })}
          placeholder="Your Company Name"
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Tagline / subtitle</label>
        <input
          className={inputClass}
          value={data.tagline}
          onChange={e => onChange({ tagline: e.target.value })}
          placeholder="e.g. Professional Services · Est. 2010"
        />
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">
        The header appears at the top of every page with your logo and company identity.
      </p>
    </>
  )
}
