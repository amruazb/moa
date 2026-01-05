import { LLCMOAContext, pageFooter } from '../types'

export function page12(_ctx: LLCMOAContext, pageNum: number = 12): string {
  return `
    <div class="page">
      <div class="page-content">

      <div class="section-bar"><span>CHAPTER V</span><span class="rtl">الباب الخامس</span></div>
      <div class="section-bar"><span>Financial Year</span><span class="rtl">السنة المالية</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (21)</h3>
          <p>The financial year of the Company shall commence on 1st January and shall end on 31st December of each year, except for the first financial year which shall commence from the date of registration of the Company in the Commercial Register and shall end on 31st December of the year following the year of registration.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (21)</h3>
          <p>تبدأ السنة المالية للشركة من أول يناير وتنتهي في 31 ديسمبر من كل سنة، عدا السنة المالية الأولى فتبدأ من تاريخ قيد الشركة في السجل التجاري وتنتهي في 31 ديسمبر من السنة التالية لسنة التسجيل.</p>
        </div>
      </div>

      <div class="section-bar"><span>CHAPTER VI</span><span class="rtl">الباب السادس</span></div>
      <div class="section-bar"><span>Transferring Company Shares</span><span class="rtl">التصرف في الحصص</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (22)</h3>
          <p>Any partner may transfer all or part of his shares to another partner or to a third party, provided that such transfer is approved by the majority of partners representing at least three-quarters of the capital.</p>
          <p>The transferee shall replace the transferor in all his rights and obligations as of the date of registration of the transfer with the Licensing Authority.</p>
          <p>This deduction shall be stopped if the legal reserve reached 50% of the capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (22)</h3>
          <p>لكل شريك أن يتصرف في كل حصته أو بعضها إلى شريك آخر أو إلى الغير بشرط موافقة أغلبية الشركاء الذين يمثلون ثلاثة أرباع رأس المال على الأقل.</p>
          <p>ويحل المتصرف إليه محل المتصرف في جميع حقوقه والتزاماته اعتبارا من تاريخ قيد التصرف لدى الجهة المرخصة.</p>
          <p>ويوقف هذا الاقتطاع عند بلوغ مجموع الاحتياطي قدرا يوازي نصف رأسمال.</p>
        </div>
      </div>

      <div class="section-bar"><span>Dissolution and Liquidation</span><span class="rtl">حل الشركة وتصفيتها</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (23)</h3>
          <p>At the end of the duration of the company or in the event of its premature dissolution, the general assembly, upon request of the General Assembly, shall determine the means of liquidation, appoint one or more liquidators and fix their authority and</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (23)</h3>
          <p>عند انتهاء مدة الشركة أوفي حالة حلها قبل الأجل المحدد، تبين الجمعية العمومية بناء على طلب الجمعية العمومية طريقة التصفية وتعين مصفي أوعدة مصفين وتحدد سلطاتهم و</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
