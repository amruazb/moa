import { DamanLetterWorkspace } from '@/components/DamanLetterWorkspace'

export default function DamanLetterPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daman Declaration Letter</h1>
            <p className="text-gray-600 mt-1">
              Generate bilingual health insurance member declaration letters for Daman PJSC.
            </p>
          </div>
        </header>

        <DamanLetterWorkspace />
      </div>
    </main>
  )
}
