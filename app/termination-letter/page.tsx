import { TerminationLetterWorkspace } from '@/components/TerminationLetterWorkspace'

export const metadata = {
    title: 'Termination Letter',
    description: 'Generate a professional UAE-compliant termination letter',
}

export default function TerminationLetterPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto py-10 px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Termination Letter</h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Fill in the form to generate a UAE Labour Law-compliant termination letter with notice period.
                    </p>
                </div>
                <TerminationLetterWorkspace />
            </div>
        </main>
    )
}
