const PRESETS = [
  { name: 'Business Card',  w: 85,  h: 54 },
  { name: 'Small Label',    w: 100, h: 50 },
  { name: 'Medium Label',   w: 130, h: 80 },
  { name: 'Square Sticker', w: 70,  h: 70 },
  { name: 'Name Badge',     w: 90,  h: 55 },
]

interface Props {
  cardW: number
  cardH: number
  setCardW: (v: number) => void
  setCardH: (v: number) => void
}

export function TabCard({ cardW, cardH, setCardW, setCardH }: Props) {
  return (
    <>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Presets</p>
      <div className="grid grid-cols-2 gap-1.5">
        {PRESETS.map(p => (
          <button key={p.name} onClick={() => { setCardW(p.w); setCardH(p.h) }}
            className={`text-left text-xs py-2 px-2.5 rounded-lg border transition-colors ${cardW === p.w && cardH === p.h ? 'bg-indigo-500 text-white border-indigo-500' : 'border-gray-200 hover:border-indigo-300 text-gray-700'}`}>
            <span className="font-medium block">{p.name}</span>
            <span className="opacity-70">{p.w}×{p.h} mm</span>
          </button>
        ))}
      </div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Custom Size</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500">Width (mm)</label>
          <input type="number" value={cardW} min={20} max={297}
            onChange={e => setCardW(Math.max(20, +e.target.value))}
            className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400" />
        </div>
        <div>
          <label className="text-xs text-gray-500">Height (mm)</label>
          <input type="number" value={cardH} min={10} max={210}
            onChange={e => setCardH(Math.max(10, +e.target.value))}
            className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400" />
        </div>
      </div>
    </>
  )
}
