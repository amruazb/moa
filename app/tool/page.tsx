import { Suspense } from 'react'
import { Workspace } from '@/components/Workspace'

export default function ToolPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-10 px-4 space-y-6">
        <div>
          <p className="text-sm text-gray-500">SPC MOA template editing</p>
          <h1 className="text-2xl font-bold text-gray-900">MOA Workspace</h1>
          <p className="text-gray-600">Load the SPC_MOA pages as your template, edit fields, and export. (We are not creating new content—just editing the SPC template.)</p>
        </div>
        <Suspense fallback={<div>Loading…</div>}>
          <Workspace />
        </Suspense>
      </div>
    </main>
  )
}
