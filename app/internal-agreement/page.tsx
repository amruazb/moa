import { InternalAgreementWorkspace } from '@/components/InternalAgreementWorkspace'

export default function InternalAgreementPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Internal Shareholding Agreement</h1>
            <p className="text-gray-600 mt-1">
              Private bilingual record of agreed shares among the parties, for internal keeping.
            </p>
          </div>
        </header>

        <InternalAgreementWorkspace />
      </div>
    </main>
  )
}
