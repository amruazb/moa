import { LLCNewMOAContext, pageFooter } from '../types'

export function page26(ctx: LLCNewMOAContext, pageNum: number = 26): string {
  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 16 continued -->
      <div class="article-pair">
        <div class="block">
          <p>16-5 The net profits (or losses) of the Company for each financial year shall be determined by the Company's audited financial statements that are prepared in accordance with internationally accepted accounting standards.</p>
        </div>
        <div class="block rtl">
          <p>5-16 تحدد صافي أرباح (أو خسائر) الشركة لكل سنة مالية بموجب البيانات المالية المدققة للشركة والتي يتم إعدادها وفقاً للمعايير المحاسبية المتعارف عليها عالمياً.</p>
        </div>
      </div>

      <!-- Article 17: Variation of this Memorandum -->
      <div class="article-pair">
        <div class="block">
          <p class="bold">ARTICLE 17</p>
          <p class="bold">VARIATION OF THIS MEMORANDUM</p>
        </div>
        <div class="block rtl">
          <p class="bold">المادة 17</p>
          <p class="bold">تعديل أحكام العقد الماثل</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p>It shall only be permissible to amend this Memorandum by way of a Special Resolution.</p>
        </div>
        <div class="block rtl">
          <p>لا يجوز تعديل هذا العقد إلا بموجب قرار خاص.</p>
        </div>
      </div>

      <!-- Article 18: Dissolution of the Company -->
      <div class="article-pair">
        <div class="block">
          <p class="bold">ARTICLE 18</p>
          <p class="bold">DISSOLUTION OF THE COMPANY</p>
        </div>
        <div class="block rtl">
          <p class="bold">المادة 18</p>
          <p class="bold">حل الشركة</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p>18-1 The Company shall be dissolved for any of the following reasons:</p>
          <p>(a) the expiry of the period specified in this Memorandum unless this period is renewed;</p>
          <p>(b) the depletion of the objective for which the Company was established;</p>
          <p>(c) amalgamation of the Company with another company;</p>
          <p>(d) pursuant to a Special Resolution of the General Assembly;</p>
          <p>(e) if the losses of the Company (whether accumulated or in respect of any financial year) reached or exceeded 50% (fifty percent) of the Company's paid up capital, provided the issuance of a Special Resolution authorizing the dissolution;</p>
          <p>(f) the depletion of all or most of the assets of the Company making beneficial investment of the remainder of the assets, if any, impracticable; or</p>
          <p>(g) upon the rendering of a decision from a competent court in the Emirate of Abu Dhabi to dissolve the Company.</p>
        </div>
        <div class="block rtl">
          <p>1-18 تحل الشركة لأي من الأسباب التالية:</p>
          <p>(أ) انتهاء المدة المحددة للشركة في هذا العقد ما لم يتم تجديد هذه المدة؛</p>
          <p>(ب) انتهاء الغرض الذي أسست الشركة من أجله؛</p>
          <p>(ت) اندماج الشركة مع أية شركة أخرى؛</p>
          <p>(ث) بموجب قرار خاص من الجمعية العمومية؛</p>
          <p>(ج) إذا وصلت خسائر الشركة المتراكمة أو خسائر أي سنة مالية أو زادت عن 50% (خمسين بالمئة) من رأس مال الشركة المدفوع بشرط صدور قرار خاص يأذن بحلها؛</p>
          <p>(ح) هلاك جميع أو معظم أصول/موجودات الشركة حيث يتعذر استثمار الباقي، إن وجد، استثماراً مجدياً وعملياً؛ أو</p>
          <p>(خ) بناءً على صدور قرار من محكمة مختصة في إمارة أبوظبي يقضي بحل الشركة.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
