import { LLCAmendmentMoaWorkspace } from '@/components/LLCAmendmentMoaWorkspace'

export default function LLCAmendmentMoaPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-6">
            <div className="max-w-[1800px] mx-auto">
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">LLC Amendment MOA</h1>
                            <p className="text-sm text-gray-600">Addendum to Partnership Agreement - Assignment of Shares</p>
                        </div>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-semibold text-indigo-900 mb-1">About LLC Amendment MOA</h3>
                                <p className="text-sm text-indigo-700 leading-relaxed">
                                    Create addendums to existing LLC partnership agreements for share assignments and transfers. 
                                    This tool helps document changes in shareholding structure with proper legal formatting 
                                    for UAE commercial companies.
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <LLCAmendmentMoaWorkspace />
            </div>
        </main>
    )
}
