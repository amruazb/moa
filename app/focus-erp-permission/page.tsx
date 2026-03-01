import { FocusERPPermissionWorkspace } from '@/components/FocusERPPermissionWorkspace'

export default function FocusERPPermissionPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-8 px-6">
            <div className="max-w-[1400px] mx-auto">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">IT Internal</span>
                            <h1 className="text-3xl font-bold text-gray-900">ERP Permission Request</h1>
                        </div>
                        <p className="text-gray-600">Official form for requesting and authorizing Focus ERP system permissions.</p>
                    </div>
                </header>

                <FocusERPPermissionWorkspace />
            </div>
        </main>
    )
}
