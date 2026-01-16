import { Suspense } from 'react'
import { LLCToSPCWorkspace } from '@/components/LLCToSPCWorkspace'
import Link from 'next/link'

export default function LLCToSPC3Page() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-[1800px] mx-auto py-6 px-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
                                ← Back to Home
                            </Link>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">LLC to SPC Conversion (3 Sellers → 1 Buyer)</h1>
                        <p className="text-sm text-gray-500">Transfer shares from 3 LLC partners to a single owner • Edit fields on the left, see live preview on the right</p>
                    </div>
                </div>
                <Suspense fallback={<div>Loading…</div>}>
                    <LLCToSPCWorkspace />
                </Suspense>
            </div>
        </main>
    )
}

