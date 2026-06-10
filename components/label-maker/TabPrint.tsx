// ── Sheet presets — edit this list to add/remove Avery-style presets ──────────
const SHEET_PRESETS = [
  { name: '99.1×57mm — 2×5 (10)',    w: 99.1, h: 57,   cols: 2, rows: 5,  rowGap: 0, colGap: 0, margin: 5.9, mTop: 6,  mBot: 6  },
  { name: '70×42.3mm — 3×7 (21)',    w: 70,   h: 42.3, cols: 3, rows: 7,  rowGap: 0, colGap: 0, margin: 6,   mTop: 6,  mBot: 6  },
  { name: '63.5×38.1mm — 3×8 (24)', w: 63.5, h: 38.1, cols: 3, rows: 8,  rowGap: 0, colGap: 0, margin: 5,   mTop: 5,  mBot: 5  },
  { name: '48.5×25.4mm — 4×10 (40)',w: 48.5, h: 25.4, cols: 4, rows: 10, rowGap: 0, colGap: 0, margin: 5,   mTop: 5,  mBot: 5  },
]

interface Props {
  cardW: number
  cardH: number
  setCardW: (v: number) => void
  setCardH: (v: number) => void
  printCols: number
  setPrintCols: (v: number) => void
  printRows: number
  setPrintRows: (v: number) => void
  gapMm: number
  setGapMm: (v: number) => void
  colGapMm: number
  setColGapMm: (v: number) => void
  marginMm: number
  setMarginMm: (v: number) => void
  marginTopMm: number
  setMarginTopMm: (v: number) => void
  marginBotMm: number
  setMarginBotMm: (v: number) => void
  totalCards: number
  pdfLoading: boolean
  handlePrint: () => void
  handleExcelExport: () => void
  handleWordExport: () => void
  handlePdfExport: () => void
}

export function TabPrint({
  cardW, cardH, setCardW, setCardH,
  printCols, setPrintCols, printRows, setPrintRows,
  gapMm, setGapMm, colGapMm, setColGapMm,
  marginMm, setMarginMm, marginTopMm, setMarginTopMm, marginBotMm, setMarginBotMm,
  totalCards, pdfLoading, handlePrint, handleExcelExport, handleWordExport, handlePdfExport,
}: Props) {
  return (
    <>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sheet Presets</p>
      <div className="space-y-1.5">
        {SHEET_PRESETS.map(p => (
          <button key={p.name} onClick={() => {
            setCardW(p.w); setCardH(p.h)
            setPrintCols(p.cols); setPrintRows(p.rows)
            setGapMm(p.rowGap); setColGapMm(p.colGap)
            setMarginMm(p.margin); setMarginTopMm(p.mTop); setMarginBotMm(p.mBot)
          }}
            className={`w-full text-left text-xs py-2 px-3 rounded-lg border transition-colors ${
              cardW === p.w && cardH === p.h && printCols === p.cols && printRows === p.rows
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'border-gray-200 hover:border-indigo-300 text-gray-700'}`}>
            {p.name}
          </button>
        ))}
      </div>

      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">A4 Grid Layout</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Columns',           val: printCols,   set: setPrintCols,   max: 10,  step: 1   },
          { label: 'Rows',              val: printRows,   set: setPrintRows,   max: 30,  step: 1   },
          { label: 'Row Gap (mm)',       val: gapMm,       set: setGapMm,       max: 20,  step: 0.1 },
          { label: 'Col Gap (mm)',       val: colGapMm,    set: setColGapMm,    max: 20,  step: 0.1 },
          { label: 'Top Margin (mm)',    val: marginTopMm, set: setMarginTopMm, max: 30,  step: 0.1 },
          { label: 'Bottom Margin (mm)', val: marginBotMm, set: setMarginBotMm, max: 30,  step: 0.1 },
          { label: 'Side Margin (mm)',   val: marginMm,    set: setMarginMm,    max: 30,  step: 0.1 },
        ].map(({ label, val, set, max, step }) => (
          <div key={label}>
            <label className="text-xs text-gray-500">{label}</label>
            <input type="number" value={val} min={0} max={max} step={step}
              onChange={e => set(Math.max(0, +e.target.value))}
              className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400" />
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-lg p-3 text-xs text-indigo-700">
        <strong>{totalCards}</strong> labels per A4 sheet &nbsp;·&nbsp; {printCols}×{printRows} grid
      </div>

      <button onClick={handlePrint}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm">
        Print A4 Sheet
      </button>

      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Download</p>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={handleExcelExport}
          className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-sm">
          <span>⬇</span> Excel
        </button>
        <button onClick={handleWordExport}
          className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm">
          <span>⬇</span> Word
        </button>
      </div>
      <button onClick={handlePdfExport} disabled={pdfLoading}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors shadow-sm disabled:opacity-60">
        {pdfLoading ? 'Generating PDF…' : '⬇ Download PDF (Accurate)'}
      </button>
    </>
  )
}
