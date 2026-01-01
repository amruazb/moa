import { Suspense } from 'react'
import { Workspace } from '@/components/Workspace'

export default function ToolPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[1800px] mx-auto py-6 px-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">MOA Workspace</h1>
            <p className="text-sm text-gray-500">Edit fields on the left, see live preview on the right</p>
          </div>
        </div>
        <Suspense fallback={<div>Loading…</div>}>
          <Workspace />
        </Suspense>
      </div>
    </main>
  )
}
