import Image from 'next/image'
import fs from 'fs'
import path from 'path'

function listSampleFiles() {
  const base = path.join(process.cwd(), 'lib', 'sample_Moa')
  const collections = fs.readdirSync(base)
  const entries = collections.flatMap(folder => {
    const full = path.join(base, folder)
    const files = fs.readdirSync(full).filter(f => f.toLowerCase().endsWith('.jpg'))
    return files.map(f => ({ folder, file: f, rel: path.join('lib', 'sample_Moa', folder, f) }))
  })
  return entries
}

export default function SamplesPage() {
  const files = listSampleFiles()
  return (
    <main className="max-w-6xl mx-auto py-10 px-4 space-y-6">
      <header>
        <p className="text-sm text-gray-500">Reference</p>
        <h1 className="text-2xl font-bold text-gray-900">Sample MOA Images</h1>
        <p className="text-gray-600">Use these pages for OCR training and validation.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {files.map(({ folder, file, rel }) => (
          <div key={rel} className="rounded-lg border border-gray-200 p-3 bg-white shadow-sm">
            <p className="text-sm font-semibold text-gray-800 mb-2">{folder}</p>
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md border">
              <Image src={`/${rel.replace(/\\/g, '/')}`} alt={file} fill className="object-cover" />
            </div>
            <p className="mt-2 text-xs text-gray-500 break-all">{file}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
