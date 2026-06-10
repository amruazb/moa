import dynamic from 'next/dynamic'

const LetterheadWorkspace = dynamic(
  () => import('@/components/LetterheadWorkspace').then(m => ({ default: m.LetterheadWorkspace })),
  { ssr: false },
)

export default function LetterheadPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Letterhead Maker</h1>
            <p className="text-xs text-gray-500">Design A4 letterheads — logo, theme colours, header &amp; contact footer</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <LetterheadWorkspace />
      </div>
    </main>
  )
}
