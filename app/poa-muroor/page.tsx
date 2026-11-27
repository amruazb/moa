import { MuroorPoaWorkspace } from '@/components/MuroorPoaWorkspace'
import Link from 'next/link'

export default function MuroorPoaPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto py-6 px-4 space-y-4">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to Home</Link>
        <h1 className="text-xl font-bold text-gray-900">Muroor Power of Attorney</h1>
        <p className="text-sm text-gray-500">Abu Dhabi traffic and licensing only. Print or save the preview as PDF.</p>
        <MuroorPoaWorkspace />
      </div>
    </main>
  )
}
