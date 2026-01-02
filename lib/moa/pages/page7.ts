import { MOAContext } from '../types'

export function page7(ctx: MOAContext): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER VI</h3>
          <h3 class="center">Dissolution and Liquidation</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب السادس</h3>
          <h3 class="center">حل الشركة وتصفيتها</h3>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (24)</h3>
          <p>At the end of the duration of the company or in the event of its premature dissolution, the general assembly, upon request of the General Assembly, shall determine the means of liquidation, appoint one or more liquidators and fix their authority and authority of the manager shall cease upon appointment of the liquidator, while the authority of General Assembly shall remain throughout the liquidation period till the liquidators are discharged.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (24)</h3>
          <p>عند انتهاء مدة الشركة أوفي حالة حلها قبل الأجل المحدد, تبين الجمعية العمومية بناء على طلب الجمعية العمومية طريقة التصفية وتعين مصفي أوعدة مصفين وتحدد سلطاتهم وتنتهي سلطة المدير بتعيين المصفين, أما سلطة الجمعية العمومية فتبقى قائمة طوال مدة التصفية إلى أن يتم إخلاء عهدة المصفين.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (25)</h3>
          <p>The Managing Director shall make company dissolution public by register the same in the commercial register, and publish the same in two Arabic dailies. The provisions of the said law shall apply to company liquidation.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (25)</h3>
          <p>على المديرة المفوضة إشهار حل الشراكة بقيده في السجل التجاري ونشره في صحيفتين يوميتين تصدران باللغة العربية وتطبق على حل الشركة وتصفيتها أحكام القانون المذكور.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER VII</h3>
          <h3 class="center">Disputes</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب السابع</h3>
          <h3 class="center">المنازعات</h3>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (26)</h3>
          <p>Any dispute arising during company duration or during liquidation thereof, between partners or between themselves and the Managing Director or between themselves and liquidators concerning any matters related to the Company or business thereof shall be subject to the jurisdiction of court where main centre is located (${company.emirate} courts).</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (26)</h3>
          <p>كل نزاع يثار أثناء مدة الشركة أوأثناء تصفيتها بين الشركاء أوبينهم وبين المديرة التنفيذية أوبينهم وبين المصفين حول أمور تتعلق بالشركة أوبأعمالها، يكون النظر فيه من اختصاص محاكم المركز الرئيس (محاكم ${company.emirateAr}).</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER VIII</h3>
          <h3 class="center">Closing Provisions</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب الثامن</h3>
          <h3 class="center">الأحكام الختامية</h3>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (27)</h3>
          <p>This Company shall be subject to the provision of the Commercial Companies Law. No.2 of 2015 and the Company law in the mentioned Emirate.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (27)</h3>
          <p>تخضع هذه الشركة لأحكام قانون الشركات التجارية الصادر بالقانون الاتحادي رقم 2 لسنة 2015 وقانون الشركات في الإمارة المذكورة.</p>
        </div>
      </div>
      <div class="page-num">7</div>
    </div>`
}
