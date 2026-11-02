import { InternalAgreementWorkspace } from '@/components/InternalAgreementWorkspace'

export default function InternalAgreementPage({
  searchParams,
}: {
  searchParams?: { sample?: string | string[] }
}) {
  const raw = searchParams?.sample
  const initialSampleId = Array.isArray(raw) ? raw[0] : raw

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-[1400px] mx-auto">
        <InternalAgreementWorkspace initialSampleId={initialSampleId} />
      </div>
    </main>
  )
}
