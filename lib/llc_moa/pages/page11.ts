import { LLCMOAContext, pageFooter } from '../types'

export function page11(ctx: LLCMOAContext, pageNum: number = 11): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (22)</h3>
          <h3 class="underline center">DISSOLUTION OF THE COMPANY</h3>
          <p>The Company shall be dissolved in the following cases:</p>
          <ol class="list">
            <li>Expiry of the Company's term, unless extended</li>
            <li>Completion of the purpose for which it was incorporated</li>
            <li>Loss of all or most of the Company's capital</li>
            <li>Merger with another company</li>
            <li>Unanimous resolution of the partners</li>
            <li>Any other reason prescribed by law</li>
          </ol>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (22)</h3>
          <h3 class="underline center">انحلال الشركة</h3>
          <p>تنحل الشركة في الحالات التالية:</p>
          <ol class="list">
            <li>انتهاء مدة الشركة ما لم يتم تمديدها</li>
            <li>انتهاء الغرض الذي أسست من أجله</li>
            <li>خسارة كل أو معظم رأس مال الشركة</li>
            <li>الاندماج مع شركة أخرى</li>
            <li>قرار إجماعي من الشركاء</li>
            <li>أي سبب آخر ينص عليه القانون</li>
          </ol>
        </div>
      </div>

      <div class="section-bar"><span>CHAPTER SEVEN: DISPUTES</span><span class="rtl">الباب السابع: المنازعات</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (23)</h3>
          <h3 class="underline center">LIQUIDATION</h3>
          <p>In case of dissolution, the Company shall enter into liquidation. The partners shall appoint one or more liquidators and determine their powers and remuneration. The liquidators shall settle the Company's debts and distribute the remaining assets among the partners in proportion to their shares.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (23)</h3>
          <h3 class="underline center">التصفية</h3>
          <p>في حالة الانحلال، تدخل الشركة في التصفية. ويعين الشركاء مصفياً أو أكثر ويحددون صلاحياتهم ومكافآتهم. ويقوم المصفون بتسوية ديون الشركة وتوزيع الأصول المتبقية على الشركاء بنسبة حصصهم.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (24)</h3>
          <h3 class="underline center">DISPUTE RESOLUTION</h3>
          <p>Any dispute arising during the Company's duration or during its liquidation, between partners or between partners and the Managing Director or between partners and liquidators, concerning any matters related to the Company or its business, shall be subject to the jurisdiction of the courts of the Emirate where the head office is located (<span class="edited">${company.emirate}</span> Courts).</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (24)</h3>
          <h3 class="underline center">تسوية المنازعات</h3>
          <p>كل نزاع يثار أثناء مدة الشركة أو أثناء تصفيتها بين الشركاء أو بينهم وبين المدير أو بينهم وبين المصفين حول أمور تتعلق بالشركة أو بأعمالها، يكون النظر فيه من اختصاص محاكم الإمارة التي يقع فيها المقر الرئيسي (محاكم <span class="edited">${company.emirateAr}</span>).</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
