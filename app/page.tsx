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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
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

          <Link
            href="/llc"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-purple-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                <svg className="w-6 h-6 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
              LLC MOA
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Multi-partner memorandum for 2 or more partners. Full support for complex partnership structures and agreements.
            </p>
            <div className="mt-4 flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/poa"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-amber-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                <svg className="w-6 h-6 text-amber-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
              POA
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Special Power of Attorney for company owners to authorize attorneys for business operations.
            </p>
            <div className="mt-4 flex items-center text-amber-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/poa-vehicle"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-orange-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                <svg className="w-6 h-6 text-orange-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-semibold text-orange-700 bg-orange-50 rounded-full border border-orange-200">
                Vehicle
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
              POA Vehicle
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Power of Attorney for selling mortgaged vehicles. Authorize banks to sell/retrieve vehicles with full details.
            </p>
            <div className="mt-4 flex items-center text-orange-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/llc-to-spc"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-teal-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                <svg className="w-6 h-6 text-teal-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-semibold text-teal-700 bg-teal-50 rounded-full border border-teal-200">
                2→1
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
              LLC to SPC (2 Sellers)
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Transfer shares from 2 LLC partners to 1 new owner, converting to Sole Proprietorship LLC.
            </p>
            <div className="mt-4 flex items-center text-teal-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/llc-to-spc-3"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                <svg className="w-6 h-6 text-emerald-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                3→1
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
              LLC to SPC (3 Sellers)
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Transfer shares from 3 LLC partners to 1 new owner, converting to Sole Proprietorship LLC.
            </p>
            <div className="mt-4 flex items-center text-emerald-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/llc-new-moa"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-green-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                <svg className="w-6 h-6 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
              LLC Company Partners
            </h2>
            <p className="text-gray-600 leading-relaxed">
              New LLC MOA for companies as partners with authorized representatives signing on behalf.
            </p>
            <div className="mt-4 flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/llc-amendment-moa"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                <svg className="w-6 h-6 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200">
                Amendment
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
              LLC Amendment MOA
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Addendum to Partnership Agreement - Assignment of shares of company name with proper legal documentation.
            </p>
            <div className="mt-4 flex items-center text-indigo-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/auth-letter"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200">
                Letter
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Authorization Letter
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Bilingual authorization letter for company vehicles. Authorize employees to use company-registered vehicles.
            </p>
            <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/focus-erp-permission"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-red-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                <svg className="w-6 h-6 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 rounded-full border border-red-200">
                IT Form
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
              Focus ERP Permission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Internal IT form to request and document permission changes in Focus ERP with multi-level approval.
            </p>
            <div className="mt-4 flex items-center text-red-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/label-maker"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-violet-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-500 transition-colors">
                <svg className="w-6 h-6 text-violet-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-semibold text-violet-700 bg-violet-50 rounded-full border border-violet-200">
                Labels
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors">
              Label & Sticker Maker
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Design custom labels with your logo, add fields, choose card size, and print A4 sheets with multiple labels.
            </p>
            <div className="mt-4 flex items-center text-violet-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/termination-letter"
            className="group relative rounded-xl border-2 border-gray-200 bg-white p-8 hover:border-rose-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-rose-100 flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                <svg className="w-6 h-6 text-rose-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <span className="px-2 py-1 text-xs font-semibold text-rose-700 bg-rose-50 rounded-full border border-rose-200">
                HR Letter
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
              Termination Letter
            </h2>
            <p className="text-gray-600 leading-relaxed">
              UAE Labour Law-compliant termination letter with one-month notice period and employee clearance instructions.
            </p>
            <div className="mt-4 flex items-center text-rose-600 font-medium group-hover:translate-x-2 transition-transform">
              Open Workspace
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
