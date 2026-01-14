// Header chunks - Document title and party information
// These chunks contain the bilingual header and party introductions

import { ContentChunk } from '../pageBuilder'
import { LLCToSPCContext } from '../types'

/** Document title header */
export const headerChunk: ContentChunk = {
  id: 'header',
  type: 'header',
  estimatedHeight: 45,
  keepWithNext: true,
  content: (ctx: LLCToSPCContext) => {
    const { license } = ctx
    return `
      <!-- Document Header -->
      <div class="bilingual-header">
        <div class="header-left">
          <h1>Contract of</h1>
          <h2>Assignment & Transfer of</h2>
          <h2>Limited Liability Company to</h2>
          <h2>Sole Proprietorship LLC</h2>
          <h3 class="edited">${license.companyName}</h3>
        </div>
        <div class="header-right">
          <h1>عقد تنازل وتحويل</h1>
          <h2>شركة ذات مسئولية محدودة الى</h2>
          <h2>شركة الشخص الواحد</h2>
          <h2>ذ.م.م</h2>
          <h3 class="edited">${license.companyNameAr}</h3>
        </div>
      </div>`
  }
}

/** Agreement date introduction */
export const agreementDateChunk: ContentChunk = {
  id: 'agreement-date',
  type: 'article',
  estimatedHeight: 18,
  content: (ctx: LLCToSPCContext) => {
    const { agreementDate } = ctx
    return `
      <!-- Agreement Date -->
      <div class="article-pair">
        <div class="block">
          <p>It is on this day <strong class="edited">${agreementDate}</strong>, this agreement has been made between the undersigned:</p>
        </div>
        <div class="block rtl">
          <p>إنه في هذا اليوم <strong class="edited">${agreementDate}</strong> الموافق تم الاتفاق و الرضى بين الموقعين أدناه:</p>
        </div>
      </div>`
  }
}

/** First Party section */
export const firstPartyChunk: ContentChunk = {
  id: 'first-party',
  type: 'article',
  estimatedHeight: 28,
  content: (ctx: LLCToSPCContext) => {
    const { firstParty } = ctx
    return `
      <!-- First Party -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">First Party</h3>
          <p><strong class="edited">${firstParty.pronouns.title} ${firstParty.name}</strong>, <span class="edited">${firstParty.nationality}</span> national, holder of ${firstParty.documentType === 'eid' ? 'Emirates ID' : 'Passport'} No. <strong class="edited">${firstParty.eidOrPassport}</strong>, his date of birth: <span class="edited">${firstParty.dob}</span>, his address: <span class="edited">${firstParty.address}</span>.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الطرف الأول</h3>
          <p><strong class="edited">${firstParty.pronouns.titleAr}/ ${firstParty.nameAr}</strong>، <span class="edited">${firstParty.nationalityAr}</span> الجنسية، يحمل ${firstParty.documentType === 'eid' ? 'بطاقة هوية' : 'جواز سفر'} رقم: <strong class="edited">${firstParty.eidOrPassport}</strong>، تاريخ ميلاده: <span class="edited">${firstParty.dob}</span>، عنوانه: <span class="edited">${firstParty.addressAr}</span>.</p>
        </div>
      </div>`
  }
}

/** Second Party section */
export const secondPartyChunk: ContentChunk = {
  id: 'second-party',
  type: 'article',
  estimatedHeight: 28,
  content: (ctx: LLCToSPCContext) => {
    const { secondParty } = ctx
    return `
      <!-- Second Party -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Second Party</h3>
          <p><strong class="edited">${secondParty.pronouns.title} ${secondParty.name}</strong>, <span class="edited">${secondParty.nationality}</span> national, holder of ${secondParty.documentType === 'eid' ? 'Emirates ID' : 'Passport'} No. <strong class="edited">${secondParty.eidOrPassport}</strong>, his date of birth: <span class="edited">${secondParty.dob}</span>, his address: <span class="edited">${secondParty.address}</span>.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الطرف الثاني</h3>
          <p><strong class="edited">${secondParty.pronouns.titleAr}/ ${secondParty.nameAr}</strong>، <span class="edited">${secondParty.nationalityAr}</span> الجنسية، يحمل ${secondParty.documentType === 'eid' ? 'بطاقة هوية' : 'جواز سفر'} رقم: <strong class="edited">${secondParty.eidOrPassport}</strong>، تاريخ ميلاده: <span class="edited">${secondParty.dob}</span>، عنوانه: <span class="edited">${secondParty.addressAr}</span>.</p>
        </div>
      </div>`
  }
}

/** Third Party (New Owner) section */
export const thirdPartyChunk: ContentChunk = {
  id: 'third-party',
  type: 'article',
  estimatedHeight: 28,
  content: (ctx: LLCToSPCContext) => {
    const { thirdParty } = ctx
    return `
      <!-- Third Party (New Owner) -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Third Party (New Owner)</h3>
          <p><strong class="edited">${thirdParty.pronouns.title} ${thirdParty.name}</strong>, <span class="edited">${thirdParty.nationality}</span> national, holder of ${thirdParty.documentType === 'eid' ? 'Emirates ID' : 'Passport'} No. <strong class="edited">${thirdParty.eidOrPassport}</strong>, his date of birth: <span class="edited">${thirdParty.dob}</span>, his address: <span class="edited">${thirdParty.address}</span>.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الطرف الثالث (المالك الجديد)</h3>
          <p><strong class="edited">${thirdParty.pronouns.titleAr}/ ${thirdParty.nameAr}</strong>، <span class="edited">${thirdParty.nationalityAr}</span> الجنسية، يحمل ${thirdParty.documentType === 'eid' ? 'بطاقة هوية' : 'جواز سفر'} رقم: <strong class="edited">${thirdParty.eidOrPassport}</strong>، تاريخ ميلاده: <span class="edited">${thirdParty.dob}</span>، عنوانه: <span class="edited">${thirdParty.addressAr}</span>.</p>
        </div>
      </div>`
  }
}

// Export all header chunks in order
export const headerChunks: ContentChunk[] = [
  headerChunk,
  agreementDateChunk,
  firstPartyChunk,
  secondPartyChunk,
  thirdPartyChunk
]
