interface Props {
  pdfLoading: boolean
  onPrint: () => void
  onPdf: () => void
}

export function TabPrint({ pdfLoading, onPrint, onPdf }: Props) {
  return (
    <>
      <p className="text-xs text-gray-500 leading-relaxed">
        Export a clean A4 letterhead template. Use it as stationery in Word, or print blank sheets for handwritten letters.
      </p>

      <div className="bg-sky-50 rounded-lg p-3 text-xs text-sky-800 border border-sky-100">
        <strong>A4</strong> · 210 × 297 mm · Header &amp; footer fixed · Body area left blank for content
      </div>

      <button
        type="button"
        onClick={onPrint}
        className="w-full py-3 bg-sky-600 text-white rounded-lg font-semibold text-sm hover:bg-sky-700 transition-colors shadow-sm"
      >
        Print letterhead
      </button>

      <button
        type="button"
        onClick={onPdf}
        disabled={pdfLoading}
        className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold text-sm hover:bg-gray-900 transition-colors shadow-sm disabled:opacity-60"
      >
        {pdfLoading ? 'Generating PDF…' : 'Download PDF'}
      </button>
    </>
  )
}
