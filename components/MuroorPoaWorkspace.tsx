'use client'

import { useMemo, useRef, useState } from 'react'
import { generateMuroorPoaHTML, MUROOR_POA_SAMPLES } from '@/lib/poa_muroor'

export function MuroorPoaWorkspace() {
  const [sampleId, setSampleId] = useState(MUROOR_POA_SAMPLES[0]?.id ?? '')
  const sample = MUROOR_POA_SAMPLES.find((item) => item.id === sampleId) ?? MUROOR_POA_SAMPLES[0]
  const html = useMemo(() => generateMuroorPoaHTML(sample.data), [sample])
  const frame = useRef<HTMLIFrameElement>(null)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600" htmlFor="muroor-sample">Sample</label>
        <select
          id="muroor-sample"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          value={sampleId}
          onChange={(event) => setSampleId(event.target.value)}
        >
          {MUROOR_POA_SAMPLES.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg"
          onClick={() => frame.current?.contentWindow?.print()}
        >
          Print / Save PDF
        </button>
      </div>
      <iframe ref={frame} title="Muroor POA preview" srcDoc={html} className="w-full bg-white border border-gray-200 rounded-xl" style={{ height: '1100px' }} />
    </div>
  )
}
