import { InternalAgreementData } from './types'
import { sampleInternalAgreementData } from './sampleData'
import { YardLeaseData } from './yardLease/types'
import { sampleYardLeaseNas } from './yardLease/sampleData'

export type InternalAgreementSample =
  | { id: string; label: string; kind: 'shareholding'; data: InternalAgreementData }
  | { id: string; label: string; kind: 'yard-lease'; data: YardLeaseData }

export const INTERNAL_AGREEMENT_SAMPLES: InternalAgreementSample[] = [
  {
    id: 'shareholding-mabel',
    label: 'Internal Shareholding — Mabel General Trading',
    kind: 'shareholding',
    data: sampleInternalAgreementData,
  },
  {
    id: 'yard-lease-nas',
    label: 'Yard Lease - NAS Oil Field',
    kind: 'yard-lease',
    data: sampleYardLeaseNas,
  },
]
