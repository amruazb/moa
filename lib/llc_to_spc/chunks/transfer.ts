// Preamble and transfer articles chunks
// Articles 1-5: Transfer agreement articles

import { ContentChunk } from '../pageBuilder'
import { LLCToSPCContext } from '../types'

/** Preamble section */
export const preambleChunk: ContentChunk = {
  id: 'preamble',
  type: 'article',
  estimatedHeight: 45,
  content: (ctx: LLCToSPCContext) => {
    const { firstParty, secondParty, license, originalMOA } = ctx
    return `
      <!-- Preamble -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Preamble</h3>
          <p>Whereas the First Party and Second Party own the Business License No: <strong class="edited">${license.licenseNumber}</strong>, issued by the <span class="edited">${license.issuingAuthority}</span> named: <strong class="edited">${license.oldCompanyName}</strong> under the LLC MOA attested by Notary Public under No. <strong class="edited">${originalMOA.moaNumber}</strong> dated <strong class="edited">${originalMOA.moaDate}</strong>.</p>
          <p>And the First Party owns <strong class="edited">${firstParty.sharesPercent}%</strong> shares and the Second Party owns <strong class="edited">${secondParty.sharesPercent}%</strong> shares from the total shares in the company's capital.</p>
          <p>Now the First Party and Second Party have agreed to assign and transfer all their shares (<strong class="edited">100%</strong>) to the Third Party, who shall become the sole owner of the company, converting it to a Sole Proprietorship LLC (LLC-SPC).</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">تمهيد</h3>
          <p>بما أن الطرف الأول والطرف الثاني يملكان الرخصة التجارية رقم: <strong class="edited">${license.licenseNumber}</strong>، الصادرة من <span class="edited">${license.issuingAuthorityAr}</span>، باسم: <strong class="edited">${license.oldCompanyNameAr}</strong> بموجب عقد التأسيس لشركة ذات مسؤولية محدودة المصدق من قبل الكاتب العدل برقم: <strong class="edited">${originalMOA.moaNumber}</strong> بتاريخ <strong class="edited">${originalMOA.moaDate}</strong>.</p>
          <p>والطرف الأول يملك <strong class="edited">${firstParty.sharesPercent}%</strong> من الحصص والطرف الثاني يملك <strong class="edited">${secondParty.sharesPercent}%</strong> من الحصص من إجمالي حصص رأس مال الشركة.</p>
          <p>والآن قد اتفق الطرف الأول والطرف الثاني على التنازل ونقل جميع حصصهما (<strong class="edited">100%</strong>) إلى الطرف الثالث، الذي سيصبح المالك الوحيد للشركة، محولاً إياها إلى شركة الشخص الواحد ذات مسؤولية محدودة (ذ.م.م - ش.ش.و).</p>
        </div>
      </div>`
  }
}

/** Article 1: Assignment of Shares */
export const article1Chunk: ContentChunk = {
  id: 'article-1',
  type: 'article',
  estimatedHeight: 40,
  content: (ctx: LLCToSPCContext) => {
    const { firstParty, secondParty } = ctx
    return `
      <!-- Article 1: Assignment of Shares -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (1): Assignment of Shares</h3>
          <p>The First Party hereby assigns and transfers <strong class="edited">${firstParty.sharesPercent}%</strong> of the total shares in the company's capital to the Third Party.</p>
          <p>The Second Party hereby assigns and transfers <strong class="edited">${secondParty.sharesPercent}%</strong> of the total shares in the company's capital to the Third Party.</p>
          <p>The Third Party accepts this assignment and transfer, becoming the sole owner of <strong class="edited">100%</strong> of the company's capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (1): التنازل عن الحصص</h3>
          <p>يتنازل الطرف الأول بموجب هذا العقد عن <strong class="edited">${firstParty.sharesPercent}%</strong> من إجمالي حصص رأس مال الشركة للطرف الثالث.</p>
          <p>يتنازل الطرف الثاني بموجب هذا العقد عن <strong class="edited">${secondParty.sharesPercent}%</strong> من إجمالي حصص رأس مال الشركة للطرف الثالث.</p>
          <p>يقبل الطرف الثالث هذا التنازل والنقل، ليصبح المالك الوحيد لـ <strong class="edited">100%</strong> من رأس مال الشركة.</p>
        </div>
      </div>`
  }
}

/** Article 2: Consideration */
export const article2Chunk: ContentChunk = {
  id: 'article-2',
  type: 'article',
  estimatedHeight: 25,
  content: () => `
      <!-- Article 2: Consideration -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (2): Consideration</h3>
          <p>The assignment and transfer of shares is made for the agreed consideration between the parties, which the First Party and Second Party acknowledge receipt of in full prior to the execution of this agreement.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (2): المقابل</h3>
          <p>يتم التنازل ونقل الحصص مقابل المبلغ المتفق عليه بين الأطراف، والذي يقر الطرف الأول والطرف الثاني باستلامه كاملاً قبل توقيع هذا الاتفاق.</p>
        </div>
      </div>`
}

/** Article 3: Conversion to Sole Proprietorship */
export const article3Chunk: ContentChunk = {
  id: 'article-3',
  type: 'article',
  estimatedHeight: 28,
  content: (ctx: LLCToSPCContext) => {
    const { thirdParty, license } = ctx
    return `
      <!-- Article 3: Conversion to Sole Proprietorship -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (3): Conversion to Sole Proprietorship LLC</h3>
          <p>Upon execution of this agreement, the company <strong class="edited">${license.companyName}</strong> shall be converted from a Limited Liability Company to a Sole Proprietorship LLC (LLC-SPC), with <strong class="edited">${thirdParty.pronouns.title} ${thirdParty.name}</strong> as the sole owner.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (3): التحويل إلى شركة الشخص الواحد</h3>
          <p>عند تنفيذ هذا الاتفاق، يتم تحويل الشركة <strong class="edited">${license.companyNameAr}</strong> من شركة ذات مسؤولية محدودة إلى شركة الشخص الواحد ذات مسؤولية محدودة (ذ.م.م - ش.ش.و)، مع <strong class="edited">${thirdParty.pronouns.titleAr}/ ${thirdParty.nameAr}</strong> كمالك وحيد.</p>
        </div>
      </div>`
  }
}

/** Article 4: Release of Responsibilities */
export const article4Chunk: ContentChunk = {
  id: 'article-4',
  type: 'article',
  estimatedHeight: 35,
  content: () => `
      <!-- Article 4: Responsibilities -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (4): Release of Responsibilities</h3>
          <p>Upon execution of this agreement and registration with the competent authorities:</p>
          <p>1. The First Party and Second Party shall be released from all responsibilities, liabilities, and obligations related to the company.</p>
          <p>2. The Third Party shall assume all responsibilities, liabilities, and obligations of the company as of the date of registration.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (4): إخلاء المسؤوليات</h3>
          <p>عند تنفيذ هذا الاتفاق والتسجيل لدى الجهات المختصة:</p>
          <p>1. يتم إخلاء مسؤولية الطرف الأول والطرف الثاني من جميع المسؤوليات والالتزامات المتعلقة بالشركة.</p>
          <p>2. يتحمل الطرف الثالث جميع مسؤوليات والتزامات الشركة اعتباراً من تاريخ التسجيل.</p>
        </div>
      </div>`
}

/** Article 5: Company Management (intro only) */
export const article5Chunk: ContentChunk = {
  id: 'article-5',
  type: 'article',
  estimatedHeight: 26,
  content: (ctx: LLCToSPCContext) => {
    const { manager } = ctx
    return `
      <!-- Article 5: Management -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (5): Company Management</h3>
          <p><strong class="edited">${manager.pronouns.title} ${manager.name}</strong> shall be the Managing Director of the company with full powers and authorities to manage, represent, and operate the company in accordance with the applicable laws and regulations.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (5): إدارة الشركة</h3>
          <p>يكون <strong class="edited">${manager.pronouns.titleAr}/ ${manager.nameAr}</strong> المدير العام للشركة مع كامل الصلاحيات والسلطات لإدارة الشركة وتمثيلها وتشغيلها وفقاً للقوانين واللوائح المعمول بها.</p>
        </div>
      </div>`
  }
}

// Export all transfer chunks in order
export const transferChunks: ContentChunk[] = [
  preambleChunk,
  article1Chunk,
  article2Chunk,
  article3Chunk,
  article4Chunk,
  article5Chunk
]
