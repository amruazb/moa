import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page11(ctx: LLCToSPCContext, pageNum: number = 11): string {
  return `
    <div class="page">
      <div class="page-content">

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
      </div>

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
      </div>

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
      </div>

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
      </div>

      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
