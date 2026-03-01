import { AuthLetterWorkspace } from '@/components/AuthLetterWorkspace'

export default function AuthLetterPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-8 px-6">
            <div className="max-w-[1400px] mx-auto">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Authorization Letter</h1>
                        <p className="text-gray-600 mt-1">Generate bilingual authorization letters for company employees.</p>
                    </div>
                </header>

                <AuthLetterWorkspace />
            </div>
        </main>
    )
}
