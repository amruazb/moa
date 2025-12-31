import Link from 'next/link'

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto py-16 px-6 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-gray-500">Rebuilt scaffold</p>
        <h1 className="text-3xl font-bold text-gray-900">MOA OCR / Preview / Export</h1>
        <p className="text-gray-600">Upload MOA images, extract data, edit, preview live, and export PDF/DOCX.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/tool" className="block rounded-lg border border-gray-200 p-4 hover:border-primary-500 hover:shadow-sm">
          <h2 className="text-lg font-semibold">Open Tool</h2>
          <p className="text-sm text-gray-600">Go to the MOA workspace (upload, extract, preview, export).</p>
        </Link>
        <Link href="/samples" className="block rounded-lg border border-gray-200 p-4 hover:border-primary-500 hover:shadow-sm">
          <h2 className="text-lg font-semibold">Sample MOA Images</h2>
          <p className="text-sm text-gray-600">Browse the provided SPC sample pages (LLC comes later if needed).</p>
        </Link>
      </div>
    </main>
  )
}
