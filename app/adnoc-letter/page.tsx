import { AdnocLetterWorkspace } from '@/components/AdnocLetterWorkspace'

export default function AdnocLetterPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ADNOC Declaration Letter</h1>
            <p className="text-gray-600 mt-1">
              Generate declaration and undertaking letters for not working in ADNOC.
            </p>
          </div>
        </header>

        <AdnocLetterWorkspace />
      </div>
    </main>
  )
}
