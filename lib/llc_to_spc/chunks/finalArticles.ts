// Final articles and signature chunks - Chapters V-VIII
// Articles 19-28 plus signature blocks

import { ContentChunk } from '../pageBuilder'
import { LLCToSPCContext } from '../types'

// ========================================
// Article 19 (General Assembly Minutes) - Still in Chapter IV
// ========================================

export const article19Chunk: ContentChunk = {
  id: 'article-19',
  type: 'article',
  estimatedHeight: 45,
  content: () => `
      <!-- Article 19: General Assembly Minutes -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (19): General Assembly Minutes</h3>
          <p>General Assembly deliberations and resolutions shall be registered in minutes then be entered in special numbered register signed by chairman, the reporter, the two reviewers and the accounts controller.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (19): محاضر الجمعية العمومية</h3>
          <p>تدون مداولات الجمعية العمومية وقراراتها في محاضر تقيد في سجل خاص مرقمة صفحاته ويوقع عليها رئيس الجمعية ومقرر الاجتماع ومراجعي الأصوات ومراقب الحسابات.</p>
        </div>
      </div>`
}

// ========================================
// CHAPTER V: Financial Year
// ========================================

export const chapter5HeaderChunk: ContentChunk = {
  id: 'chapter-5',
  type: 'chapter',
  estimatedHeight: 25,
  keepWithNext: true,
  content: () => `
      <!-- Chapter V: Financial Year -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER V</h3>
          <h3 class="center">Financial Year</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الخامس</h3>
          <h3 class="center">السنة المالية للشركة</h3>
        </div>
      </div>`
}

export const article20Chunk: ContentChunk = {
  id: 'article-20',
  type: 'article',
  estimatedHeight: 55,
  content: () => `
      <!-- Article 20: Financial Year -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (20): Financial Year</h3>
          <p>The financial year shall commence at the beginning of January and end at the end of December of each year, provided that the first year shall include the period from the date of final incorporation of the Company till the coming December. The first general assembly shall be convened immediately after this year.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (20): السنة المالية</h3>
          <p>تبدأ السنة المالية للشركة في أول يناير (كانون الثاني) من كل سنة وتنتهي في آخر ديسمبر (كانون الأول) من كل سنة. على أن السنة الأولى تشمل المدة التي تنقضي من تاريخ تأسيس الشركة النهائي حتى ديسمبر (كانون الأول) التالي وتنعقد أول جمعية عمومية عقب هذا السنة.</p>
        </div>
      </div>`
}

export const article21Chunk: ContentChunk = {
  id: 'article-21',
  type: 'article',
  estimatedHeight: 55,
  content: () => `
      <!-- Article 21: Net Profit -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (21): Net Profit</h3>
          <p>a) Annual net profit shall be considered after deducting all general expenses and other costs. 10% (ten Percentage) shall be deducted to form legal reserve as stipulated in law. Such deduction shall be stopped if the legal reserve reached 50% of the capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (21): الأرباح الصافية</h3>
          <p>أ) تؤلف الأرباح الصافية السنوية بعد خصم جميع المصاريف العمومية والتكاليف الأخرى ويقتطع منها مبلغ يوازي 10% (عشرة بالمائة) لتكوين الاحتياطي القانوني المنصوص في القانون ويوقف هذا الاقتطاع عند بلوغ مجموع الاحتياطي قدرا يوازي نصف رأس المال.</p>
        </div>
      </div>`
}

// ========================================
// CHAPTER VI: Dissolution and Liquidation
// ========================================

export const chapter6HeaderChunk: ContentChunk = {
  id: 'chapter-6',
  type: 'chapter',
  estimatedHeight: 25,
  keepWithNext: true,
  content: () => `
      <!-- Chapter VI: Dissolution and Liquidation -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER VI</h3>
          <h3 class="center">Dissolution and Liquidation</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب السادس</h3>
          <h3 class="center">حل الشركة وتصفيتها</h3>
        </div>
      </div>`
}

export const article22Chunk: ContentChunk = {
  id: 'article-22',
  type: 'article',
  estimatedHeight: 65,
  content: () => `
      <!-- Article 22: Dissolution and Liquidation -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (22): Dissolution and Liquidation</h3>
          <p>At the end of the duration of the company or in the event of its premature dissolution, the general assembly, upon request of the General Assembly, shall determine the means of liquidation, appoint one or more liquidators and fix their authority and authority of the manager shall cease upon appointment of the liquidator, while the authority of General Assembly shall remain throughout the liquidation period till the liquidators are discharged.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (22): حل الشركة وتصفيتها</h3>
          <p>عند انتهاء مدة الشركة أوفي حالة حلها قبل الأجل المحدد، تبين الجمعية العمومية بناء على طلب الجمعية العمومية طريقة التصفية وتعين مصفي أوعدة مصفين وتحدد سلطاتهم وتنتهي سلطة المدير بتعيين المصفين، أما سلطة الجمعية العمومية فتبقى قائمة طوال مدة التصفية إلى أن يتم إخلاء عهدة المصفين.</p>
        </div>
      </div>`
}

export const article23Chunk: ContentChunk = {
  id: 'article-23',
  type: 'article',
  estimatedHeight: 50,
  content: () => `
      <!-- Article 23: Publication of Dissolution -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (23): Publication of Dissolution</h3>
          <p>The Managing Director shall make company dissolution public by register the same in the commercial register, and publish the same in two Arabic dailies. The provisions of the said law shall apply to company liquidation.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (23): إشهار حل الشركة</h3>
          <p>على المدير المفوض إشهار حل الشراكة بقيده في السجل التجاري ونشره في صحيفتين يوميتين تصدران باللغة العربية وتطبق على حل الشركة وتصفيتها أحكام القانون المذكور.</p>
        </div>
      </div>`
}

// ========================================
// CHAPTER VII: Disputes
// ========================================

export const chapter7HeaderChunk: ContentChunk = {
  id: 'chapter-7',
  type: 'chapter',
  estimatedHeight: 25,
  keepWithNext: true,
  content: () => `
      <!-- Chapter VII: Disputes -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER VII</h3>
          <h3 class="center">Disputes</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب السابع</h3>
          <h3 class="center">المنازعات</h3>
        </div>
      </div>`
}

export const article24Chunk: ContentChunk = {
  id: 'article-24',
  type: 'article',
  estimatedHeight: 55,
  content: () => `
      <!-- Article 24: Disputes -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (24): Disputes</h3>
          <p>Any dispute arising during company duration or during liquidation thereof, between the sole owner and the Managing Director or between them and liquidators concerning any matters related to the Company or business thereof shall be subject to the jurisdiction of court where main centre is located (Abu Dhabi courts).</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (24): المنازعات</h3>
          <p>كل نزاع يثار أثناء مدة الشركة أوأثناء تصفيتها بين المالك الوحيد والمدير التنفيذي أوبينهم وبين المصفين حول أمور تتعلق بالشركة أوبأعمالها، يكون النظر فيه من اختصاص محاكم المركز الرئيس (محاكم أبوظبي).</p>
        </div>
      </div>`
}

// ========================================
// CHAPTER VIII: Concluding Provisions
// ========================================

export const chapter8HeaderChunk: ContentChunk = {
  id: 'chapter-8',
  type: 'chapter',
  estimatedHeight: 25,
  keepWithNext: true,
  content: () => `
      <!-- Chapter VIII: Concluding Provisions -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER VIII</h3>
          <h3 class="center">Concluding Provisions</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الثامن</h3>
          <h3 class="center">أحكام ختامية</h3>
        </div>
      </div>`
}

export const article25Chunk: ContentChunk = {
  id: 'article-25',
  type: 'article',
  estimatedHeight: 50,
  content: () => `
      <!-- Article 25: Applicable Law -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (25): Applicable Law</h3>
          <p>The provisions of Federal Law No. (32) Of 2021 concerning Commercial Companies and its amendments and executive regulations shall apply to whatever not covered by a specific provision in this Memorandum.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (25): القانون الواجب التطبيق</h3>
          <p>تسري أحكام القانون الاتحادي رقم (32) لسنة 2021 في شأن الشركات التجارية وتعديلاته ولوائحه التنفيذية في شأن يرد بشأنها نص خاص في هذا العقد.</p>
        </div>
      </div>`
}

export const article26Chunk: ContentChunk = {
  id: 'article-26',
  type: 'article',
  estimatedHeight: 70,
  content: (ctx: LLCToSPCContext) => {
    const { thirdParty } = ctx
    return `
      <!-- Article 26: Registration and Publication -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (26): Registration and Publication</h3>
          <p>This contract shall be registered in the commercial register and published in accordance with the law. <strong>${thirdParty.pronouns.title} ${thirdParty.name}</strong> is solely authorized to carry out all necessary procedures in this regard. All costs, expenses, and other amounts incurred for establishing the company shall be deducted from the general expense account. As the sole owner, <strong>${thirdParty.pronouns.title} ${thirdParty.name}</strong> retains full rights and authority over the company at all times, including in the event of any absence or failure to renew the trade license.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (26): القيد والنشر</h3>
          <p>يقيد هذا العقد في السجل التجاري وينشر طبقاً للقانون، وقد فوض <strong>${thirdParty.pronouns.titleAr}/ ${thirdParty.nameAr}</strong> في اتخاذ كافة الإجراءات اللازمة في هذا الشأن. وتخصم جميع المصروفات والنفقات والتكاليف التي تم إنفاقها في سبيل تأسيس الشركة من حساب المصروفات العامة. وبصفته المالك الوحيد، يحتفظ <strong>${thirdParty.pronouns.titleAr}/ ${thirdParty.nameAr}</strong> بكامل الحقوق والسلطات على الشركة في جميع الأوقات، بما في ذلك في حال الغياب أو عدم تجديد الرخصة التجارية.</p>
        </div>
      </div>`
  }
}

export const article27Chunk: ContentChunk = {
  id: 'article-27',
  type: 'article',
  estimatedHeight: 45,
  content: () => `
      <!-- Article 27: Copies of Contract -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (27): Copies of Contract</h3>
          <p>This agreement is made in four copies, with each party retaining one copy, and the remaining copy to be submitted to the relevant authority for necessary action.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (27): نسخ العقد</h3>
          <p>حرر هذا العقد من أربع نسخ، يحتفظ كل طرف بنسخة، وتودع النسخة المتبقية لدى جهات الاختصاص للعمل بها.</p>
        </div>
      </div>`
}

export const article28Chunk: ContentChunk = {
  id: 'article-28',
  type: 'article',
  estimatedHeight: 50,
  content: () => `
      <!-- Article 28: Effective Date -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (28): Effective Date</h3>
          <p>This agreement shall become effective upon signature by all parties and attestation by the Notary Public. The conversion of the company from LLC to LLC-SPC shall take effect upon registration with the competent authorities.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (28): تاريخ السريان</h3>
          <p>يصبح هذا الاتفاق نافذاً عند التوقيع من قبل جميع الأطراف والتصديق من قبل الكاتب العدل. ويسري تحويل الشركة من شركة ذات مسؤولية محدودة إلى شركة الشخص الواحد ذ.م.م عند التسجيل لدى الجهات المختصة.</p>
        </div>
      </div>`
}

// ========================================
// Signature Blocks
// ========================================

export const signatureBlocksChunk: ContentChunk = {
  id: 'signatures',
  type: 'signature',
  estimatedHeight: 150,
  content: (ctx: LLCToSPCContext) => {
    const { firstParty, secondParty, thirdParty } = ctx
    return `
      <!-- Signature Blocks -->
      <div style="margin-top: 30px;">
        <!-- Single centered heading with underline -->
        <h3 class="underline center" style="text-align: center; width: 100%; margin-bottom: 25px;">Signatures / التوقيعات</h3>

        <div class="article-pair" style="margin-top: 25px;">
          <div class="block" style="text-align: center; padding: 15px;">
            <p style="margin-bottom: 10px; font-weight: bold;">First Party / الطرف الأول</p>
            <p class="edited" style="margin: 5px 0; font-size: 11pt;">${firstParty.pronouns.title} ${firstParty.name}</p>
            <p class="edited" style="direction: rtl; margin: 5px 0; font-size: 11pt;">${firstParty.pronouns.titleAr}/ ${firstParty.nameAr}</p>
            <div style="border-bottom: 1px solid #000; width: 220px; margin: 60px auto 8px;"></div>
            <p style="font-size: 9pt; margin: 0;">Signature / التوقيع</p>
          </div>
          <div class="block" style="text-align: center; padding: 15px;">
            <p style="margin-bottom: 10px; font-weight: bold;">Second Party / الطرف الثاني</p>
            <p class="edited" style="margin: 5px 0; font-size: 11pt;">${secondParty.pronouns.title} ${secondParty.name}</p>
            <p class="edited" style="direction: rtl; margin: 5px 0; font-size: 11pt;">${secondParty.pronouns.titleAr}/ ${secondParty.nameAr}</p>
            <div style="border-bottom: 1px solid #000; width: 220px; margin: 60px auto 8px;"></div>
            <p style="font-size: 9pt; margin: 0;">Signature / التوقيع</p>
          </div>
        </div>

        <div style="margin-top: 25px; text-align: center;">
          <div style="display: inline-block; text-align: center; padding: 15px; min-width: 300px;">
            <p style="margin-bottom: 10px; font-weight: bold;">Third Party (New Owner) / الطرف الثالث (المالك الجديد)</p>
            <p class="edited" style="margin: 5px 0; font-size: 11pt;">${thirdParty.pronouns.title} ${thirdParty.name}</p>
            <p class="edited" style="direction: rtl; margin: 5px 0; font-size: 11pt;">${thirdParty.pronouns.titleAr}/ ${thirdParty.nameAr}</p>
            <div style="border-bottom: 1px solid #000; width: 220px; margin: 60px auto 8px;"></div>
            <p style="font-size: 9pt; margin: 0;">Signature / التوقيع</p>
          </div>
        </div>
      </div>`
  }
}

// Export all final chunks in order
export const finalChunks: ContentChunk[] = [
  // Continue Chapter IV
  article19Chunk,
  // Chapter V
  chapter5HeaderChunk,
  article20Chunk,
  article21Chunk,
  // Chapter VI
  chapter6HeaderChunk,
  article22Chunk,
  article23Chunk,
  // Chapter VII
  chapter7HeaderChunk,
  article24Chunk,
  // Chapter VIII
  chapter8HeaderChunk,
  article25Chunk,
  article26Chunk,
  article27Chunk,
  article28Chunk,
  // Signatures
  signatureBlocksChunk
]
