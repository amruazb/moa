import type { LetterheadData } from './types'
import { formatLetterDate, letterContentStyles } from './types'

interface Props {
  data: LetterheadData
  onChange: (patch: Partial<LetterheadData>) => void
}

const inputClass =
  'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200'

export function TabLetter({ data, onChange }: Props) {
  const styles = letterContentStyles(data)

  return (
    <>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Letter body</p>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-gray-500">Date</label>
          <button
            type="button"
            onClick={() => onChange({ letterDate: formatLetterDate() })}
            className="text-xs text-sky-600 hover:text-sky-800 font-medium"
          >
            Today
          </button>
        </div>
        <input
          dir={data.contentDir}
          className={`${inputClass} ${data.contentDir === 'rtl' ? 'text-right' : ''}`}
          value={data.letterDate}
          onChange={e => onChange({ letterDate: e.target.value })}
          placeholder="e.g. 15 May 2026"
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-2">Text direction</label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => onChange({ contentDir: 'ltr' })}
            className={`text-xs py-2 rounded-lg border transition-colors ${
              (data.contentDir ?? 'ltr') === 'ltr'
                ? 'bg-sky-600 text-white border-sky-600'
                : 'border-gray-200 text-gray-600 hover:border-sky-300'
            }`}
          >
            English (LTR)
          </button>
          <button
            type="button"
            onClick={() => onChange({ contentDir: 'rtl' })}
            className={`text-xs py-2 rounded-lg border transition-colors ${
              data.contentDir === 'rtl'
                ? 'bg-sky-600 text-white border-sky-600'
                : 'border-gray-200 text-gray-600 hover:border-sky-300'
            }`}
          >
            Arabic (RTL)
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-3">
        <p className="text-xs font-semibold text-gray-600">Typography</p>
        <div>
          <label className="text-xs text-gray-500">
            Content font size: <strong>{styles.contentFontSizeMm}mm</strong>
          </label>
          <input
            type="range"
            min={2.5}
            max={7}
            step={0.25}
            value={styles.contentFontSizeMm}
            onChange={e => onChange({ contentFontSizeMm: +e.target.value })}
            className="w-full mt-1 accent-sky-600"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">
            Line spacing: <strong>{styles.contentLineHeight.toFixed(2)}×</strong>
          </label>
          <input
            type="range"
            min={1.2}
            max={2.5}
            step={0.05}
            value={styles.contentLineHeight}
            onChange={e => onChange({ contentLineHeight: +e.target.value })}
            className="w-full mt-1 accent-sky-600"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">
            Date font size: <strong>{styles.dateFontSizeMm}mm</strong>
          </label>
          <input
            type="range"
            min={2}
            max={6}
            step={0.25}
            value={styles.dateFontSizeMm}
            onChange={e => onChange({ dateFontSizeMm: +e.target.value })}
            className="w-full mt-1 accent-sky-600"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Letter content</label>
        <textarea
          dir={data.contentDir}
          className={`${inputClass} resize-y min-h-[200px] leading-relaxed ${
            data.contentDir === 'rtl' ? 'text-right' : 'text-left'
          }`}
          rows={12}
          value={data.content}
          onChange={e => onChange({ content: e.target.value })}
          placeholder={
            data.contentDir === 'rtl'
              ? 'السيد المحترم،\n\nنص الرسالة هنا.\n\nوتفضلوا بقبول فائق الاحترام،'
              : 'Dear Sir/Madam,\n\nYour letter text goes here.\n\nYours faithfully,'
          }
        />
      </div>

      <p className="text-xs text-gray-400 leading-relaxed">
        {data.contentDir === 'rtl'
          ? 'Arabic: content flows right-to-left; date aligns to the left.'
          : 'English: content flows left-to-right; date aligns to the right.'}
        {' '}Line breaks are preserved in print and PDF.
      </p>
    </>
  )
}
