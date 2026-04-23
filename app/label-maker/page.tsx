import { LabelMakerWorkspace } from '@/components/LabelMakerWorkspace'

export default function LabelMakerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Label & Sticker Maker</h1>
            <p className="text-xs text-gray-500">Design custom labels — upload logo, add fields, print A4 sheets</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <LabelMakerWorkspace />
      </div>
    </main>
  )
}
