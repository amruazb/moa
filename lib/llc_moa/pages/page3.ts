import { LLCMOAContext, pageFooter } from '../types'

export function page3(ctx: LLCMOAContext, pageNum: number = 3): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <p><strong><u>5-Competent Authority:</u></strong> The local authority for corporate affairs in the Emirates Concerned.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>5 – السلطة المختصة:</u></strong> السلطة المحلية المختصة بشؤون الشركات في الإمارة المعنية.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p><strong><u>6- Partner (s):</u></strong> The parties to this memorandum and any natural or legal person that becomes a shareholder in the capital of the company of this memorandum.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>6-الشركاء:</u></strong> أطراف هذا العقد، وأي شخص طبيعي أو اعتباري يصبح مالكا لأية حصة من راس مال الشركة وفقا لأحكام وشروط هذا العقد.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p><strong><u>7-Commercial Register:</u></strong> A record that is handled by the Competent Authority to register the names of national and foreign merchants, individuals or companies alike, whether their main trade center is in the UAE or they have a branch or agency in it.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>7- السجل التجاري:</u></strong> دفتر تتولى شؤونه السلطة المختصة لقيد امام التجار من المواطنين والاجانب أفراد كانوا ام شركات سواء كان مركز تجارتهم الرئيسى بالدولة او كان لهم فرع او وكالة.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline">PREFACE:</h3>
          <p>The preamble and definitions mentioned above shall constitute an integral part of memorandum and shall be read and interpreted therewith.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline">التمهيد:</h3>
          <p>تعتبر المقدمة والتعريفات المذكورة اعلاه جزء لايتجزأ من هذا العقد ويقرأ ويفسر معه.</p>
        </div>
      </div>

      <div class="section-bar"><span>CHAPTER ONE</span><span class="rtl">الباب الأول</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (1): Name of the Company</h3>
          <p>The name of company will be: <strong class="underline edited">${company.name}</strong> a limited liability company. This name may be amended or changed if necessary.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (1): اسم الشركة</h3>
          <p>يكون اسم الشركة: <strong class="underline edited">${company.nameAr}</strong> شركة ذات مسؤولية محدودة، ويجوز تعديل هذا الاسم أو تغييره إذا ما اقتضت الضرورة ذلك.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
