import { LLCMOAContext, pageFooter } from '../types'

export function page13(ctx: LLCMOAContext, pageNum: number = 13): string {
  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <p>authority of the manager shall cease upon appointment of the liquidator, while the authority of General Assembly shall remain throughout the liquidation period till the liquidators are discharged.</p>
        </div>
        <div class="block rtl">
          <p>تنتهي سلطة المدير بتعيين المصفين، أما سلطة الجمعية العمومية فتبقى قائمة طوال مدة التصفية إلى أن يتم إخلاء عهد المصفين.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (24)</h3>
          <p>The Managing Director shall make company dissolution public by register the same in the commercial register, and publish the same in two Arabic dailies. The provisions of the said law shall apply to company liquidation.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (24)</h3>
          <p>على المدير المفوض إشهار حل الشراكة بقيده في السجل التجاري ونشره في صحيفتين يوميتين تصدران باللغة العربية وتطبق على حل الشركة وتصفيتها أحكام القانون المذكور.</p>
        </div>
      </div>

      <div class="section-bar"><span>CHAPTER VII</span><span class="rtl">الباب السابع</span></div>
      <div class="section-bar"><span>Disputes</span><span class="rtl">المنازعات</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (25)</h3>
          <p>Any dispute arising during company duration or during liquidation thereof, between partners or between themselves and the Managing Director or between themselves and liquidators concerning any matters related to the Company or business thereof shall be subject to the jurisdiction of court where main centre is located (<span class="edited">${ctx.company.emirate}</span> courts).</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (25)</h3>
          <p>كل نزاع يثار أثناء مدة الشركة أو أثناء تصفيتها بين الشركاء أوبينهم وبين المدير التنفيذي أوبينهم وبين المصفين حول أمور تتعلق بالشركة أو بأعمالها، يكون النظر فيه من اختصاص محاكم المركز الرئيس (محاكم <span class="edited">${ctx.company.emirateAr}</span>).</p>
        </div>
      </div>

      <div class="section-bar"><span>CHAPTER VIII</span><span class="rtl">الباب الثامن</span></div>
      <div class="section-bar"><span>Concluding Provisions</span><span class="rtl">أحكام ختامية</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (26)</h3>
          <p>The provisions of Federal Law No. (32) Of 2021 concerning Commercial Companies and its amendments and executive regulations shall apply to whatever not covered by a specific provision in this Memorandum.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (26)</h3>
          <p>تسري أحكام القانون الاتحادي رقم (32) لسنة 2021 في شأن الشركات التجارية وتعديلاته ولوائحه التنفيذية في مالم يرد بشأنها نص خاص في هذا العقد.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
