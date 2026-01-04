import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto py-20 px-6">
        <header className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-blue-700">UAE MOA Creator</span>
          </div>
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            Smart Memorandum of<br />Association Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Streamline your UAE business formation with intelligent OCR extraction, real-time editing, 
            and professional document generation for Limited Liability Companies.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Link 
            href="/tool" 
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              LLC SPC
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Single-partner company memorandum. Upload, extract data, edit fields, preview live, and export to PDF/DOCX.
            </p>
            <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <div className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 opacity-60 cursor-not-allowed">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              LLC MOA
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Multi-partner memorandum for 2 or more partners. Full support for complex partnership structures and agreements.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
