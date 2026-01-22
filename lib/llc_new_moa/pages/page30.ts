import { LLCNewMOAContext, pageFooter } from '../types'

export function page30(ctx: LLCNewMOAContext, pageNum: number = 30): string {
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

      <!-- Signature Boxes Side by Side -->
      <div style="display: flex; gap: 20px; margin-top: 20px;">
        <!-- First Party Signature Box -->
        <div style="flex: 1; border: 1px solid #000; padding: 20px; text-align: center;">
          <p class="bold" style="margin-bottom: 10px;">First Party / الطرف الأول</p>
          <p class="bold" style="margin-bottom: 5px;">${ctx.partners[0].name}</p>
          <p class="bold" style="margin-bottom: 15px;">${ctx.partners[0].nameAr}</p>
          <p style="margin-bottom: 5px;">${ctx.partners[0].representative.salutation === 'mr' ? 'Mr.' : ctx.partners[0].representative.salutation === 'mrs' ? 'Mrs.' : 'Ms.'} ${ctx.partners[0].representative.name}</p>
          <p style="margin-bottom: 80px;">${ctx.partners[0].representative.salutation === 'mr' ? 'السيد/' : ctx.partners[0].representative.salutation === 'mrs' ? 'السيدة/' : 'الآنسة/'} ${ctx.partners[0].representative.nameAr}</p>
          <div style="border-top: 1px solid #000; padding-top: 5px; margin: 0 30px;">
            <p style="font-size: 12px;">Signature / التوقيع</p>
          </div>
        </div>

        <!-- Second Party Signature Box -->
        <div style="flex: 1; border: 1px solid #000; padding: 20px; text-align: center;">
          <p class="bold" style="margin-bottom: 10px;">Second Party / الطرف الثاني</p>
          <p class="bold" style="margin-bottom: 5px;">${ctx.partners[1].name}</p>
          <p class="bold" style="margin-bottom: 15px;">${ctx.partners[1].nameAr}</p>
          <p style="margin-bottom: 5px;">${ctx.partners[1].representative.salutation === 'mr' ? 'Mr.' : ctx.partners[1].representative.salutation === 'mrs' ? 'Mrs.' : 'Ms.'} ${ctx.partners[1].representative.name}</p>
          <p style="margin-bottom: 80px;">${ctx.partners[1].representative.salutation === 'mr' ? 'السيد/' : ctx.partners[1].representative.salutation === 'mrs' ? 'السيدة/' : 'الآنسة/'} ${ctx.partners[1].representative.nameAr}</p>
          <div style="border-top: 1px solid #000; padding-top: 5px; margin: 0 30px;">
            <p style="font-size: 12px;">Signature / التوقيع</p>
          </div>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum, true)}
    </div>`
}

