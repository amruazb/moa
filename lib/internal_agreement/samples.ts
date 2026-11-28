import { InternalAgreementData } from './types'
import { sampleInternalAgreementData } from './sampleData'
import { YardLeaseData } from './yardLease/types'
import { sampleYardLeaseNas } from './yardLease/sampleData'
import { WaterSupplyData } from './waterSupply/types'
import { sampleWaterSupplyNas } from './waterSupply/sampleData'

export type InternalAgreementSample =
  | { id: string; label: string; kind: 'shareholding'; data: InternalAgreementData }
  | { id: string; label: string; kind: 'yard-lease'; data: YardLeaseData }
  | { id: string; label: string; kind: 'water-supply'; data: WaterSupplyData }

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
  {
    id: 'water-supply-nas',
    label: 'Water Supply - NAS Oil Field',
    kind: 'water-supply',
    data: sampleWaterSupplyNas,
  },
]
