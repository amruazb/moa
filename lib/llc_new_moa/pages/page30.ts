import { signatureCards, ordinalParty } from '../../utils/signatureCard'
import { LLCNewMOAContext, pageFooter } from '../types'

export function page30(ctx: LLCNewMOAContext, pageNum: number = 30): string {
  const titleEn = (s: string) => (s === 'mr' ? 'Mr.' : s === 'mrs' ? 'Mrs.' : 'Ms.')
  const titleAr = (s: string) => (s === 'mr' ? 'السيد/' : s === 'mrs' ? 'السيدة/' : 'الآنسة/')
  // All partner signature cards stay together on this page (2 per row, centered)
  const signatureBlocks = signatureCards(ctx.partners.map((p, index) => {
    const o = ordinalParty(index)
    return {
      roleEn: o.en, roleAr: o.ar, nameEn: p.name, nameAr: p.nameAr,
      extraLines: [{ en: `${titleEn(p.representative.salutation)} ${p.representative.name}`, ar: `${titleAr(p.representative.salutation)} ${p.representative.nameAr}` }],
    }
  }), 2)
  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 23 continued -->
      <div class="article-pair">
        <div class="block">
          <p><strong>23-5</strong> No Partner shall be liable to another Partner for lost profits or revenues or incidental or special losses or damages in connection with the formation and operation of the Company or by reason of bringing the Company to an end in accordance with this Memorandum, nor shall any Partner be liable for financial obligations or losses of the Company except to the extent provided for in this Memorandum.</p>
          <p><strong>23-6</strong> The Partners shall, in relation to all matters concerning this Memorandum and the Company, act towards each other with the utmost good faith.</p>
          <p><strong>23-7</strong> This Memorandum and any amendments thereto shall be written in the Arabic and English languages in bilingual and notarized by the competent authority, otherwise this Memorandum or amendments shall be void.</p>
          <p><strong>23-8</strong> This Memorandum is executed in both the Arabic and English languages, and in the case of any conflict the English text shall be interpreted in light of the Arabic text and the Arabic text shall prevail.</p>
        </div>
        <div class="block rtl">
          <p><strong>5-23</strong> لا يكون أي شريك مسؤولاً تجاه الشريك الآخر عن خسارة في الأرباح أو الإيرادات أو عن الخسائر أو الأضرار العرضية أو الخاصة فيما يتعلق بتأسيس وتشغيل الشركة أو بسبب انتهاء الشركة وفقاً لهذا العقد، ولا يكون أي شريك مسؤولاً عن الالتزامات المالية وخسائر الشركة إلا في الحدود المنصوص عليها في هذا العقد.</p>
          <p><strong>6-23</strong> يتعين على الشريكين العمل معاً بأقصى درجات حسن النية فيما يتعلق بكافة الأمور المتعلقة بهذا العقد والشركة.</p>
          <p><strong>7-23</strong> يجب أن يكون هذا العقد وكل تعديل يطرأ عليه محرراً باللغة العربية والانجليزية في مستند واحد ومصدق أصولاً من قبل السلطة المختصة وإلا كان العقد أو التعديلات الطارئة عليه لاغية.</p>
          <p><strong>8-23</strong> تم توقيع هذا العقد باللغتين العربية والانجليزية وفي حال وجود تضارب بين النصين، يفسر النص الانجليزي في ضوء النص العربي ويسود النص العربي.</p>
        </div>
      </div>

      <!-- Witness Statement -->
      <div class="article-pair">
        <div class="block">
          <p class="bold">IN WITNESS WHEREOF, the Partners have signed and executed this Memorandum on the day, month and year specified in the seal of the notary public.</p>
        </div>
        <div class="block rtl">
          <p class="bold">إثباتاً لما تقدم، وقع الشريكان وأبرما هذا العقد في اليوم والشهر والسنة المحددة في ختم كاتب العدل.</p>
        </div>
      </div>

      <!-- Signatures Title -->
      <div style="text-align: center; margin-top: 30px; margin-bottom: 20px;">
        <h3 class="bold" style="text-decoration: underline; font-size: 16px;">Signatures / التوقيعات</h3>
      </div>

      <!-- One centered signature card per partner -->
      <div style="margin-top: 20px;">
        ${signatureBlocks}
      </div>

      </div>
      ${pageFooter(pageNum, true)}
    </div>`
}

