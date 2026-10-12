import { CvWorkspace } from '@/components/CvWorkspace'

export default function CvPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CV Builder</h1>
            <p className="text-gray-600 mt-1">
              Create a professional curriculum vitae with live preview and PDF download.
            </p>
          </div>
        </header>

        <CvWorkspace />
      </div>
    </main>
  )
}
