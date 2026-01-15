import { LLCNewMoaWorkspace } from '@/components/LLCNewMoaWorkspace'

export default function LLCNewMoaPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-6">
            <div className="max-w-[1800px] mx-auto">
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">New LLC MOA - Company Partners</h1>
                            <p className="text-sm text-gray-500">Create Memorandum of Association for LLC with company partners</p>
                        </div>
                    </div>
                </header>

                <LLCNewMoaWorkspace />
            </div>
        </main>
    )
}
