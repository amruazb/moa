import { LLCMOAContext, pageFooter } from '../types'

export function page8(_ctx: LLCMOAContext, pageNum: number = 8): string {
    return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (12)</h3>
          <h3 class="underline center">REMUNERATION OF DIRECTOR</h3>
          <p>The Managing Director shall be entitled to remuneration as determined by the partners. The Managing Director shall not be personally liable for the Company's debts and obligations unless proved to have committed fraud or gross negligence.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (12)</h3>
          <h3 class="underline center">مكافأة المدير</h3>
          <p>يستحق المدير مكافأة يحددها الشركاء. ولا يكون المدير مسؤولاً شخصياً عن ديون والتزامات الشركة ما لم يثبت ارتكابه لغش أو إهمال جسيم.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (13)</h3>
          <h3 class="underline center">AUTHORIZED SIGNATURE</h3>
          <p>The Company shall have an authorized signature which shall be the Company's name followed by the signature of the Managing Director or any person duly authorized by him. No person other than the Managing Director or his authorized delegate shall sign on behalf of the Company.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (13)</h3>
          <h3 class="underline center">التوقيع المعتمد</h3>
          <p>يكون للشركة توقيع معتمد وهو اسم الشركة متبوعاً بتوقيع المدير أو أي شخص مفوض منه حسب الأصول. ولا يحق لأي شخص آخر غير المدير أو من يفوضه التوقيع نيابة عن الشركة.</p>
        </div>
      </div>

      <div class="section-bar"><span>CHAPTER FOUR: ACCOUNTS & PROFITS</span><span class="rtl">الباب الرابع: الحسابات والأرباح</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (14)</h3>
          <h3 class="underline center">BOOKS OF ACCOUNTS</h3>
          <p>The Company shall maintain proper books of accounts at its head office showing its financial position. The financial year of the Company shall commence on the 1st of January and end on the 31st of December of each year.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (14)</h3>
          <h3 class="underline center">دفاتر الحسابات</h3>
          <p>تحتفظ الشركة بدفاتر حسابات منتظمة في مقرها الرئيسي تبين مركزها المالي. وتبدأ السنة المالية للشركة في الأول من يناير وتنتهي في الحادي والثلاثين من ديسمبر من كل عام.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (15)</h3>
          <h3 class="underline center">DISTRIBUTION OF PROFITS</h3>
          <p>Net profits of the Company after deducting all expenses, costs, and provisions shall be distributed among the partners in proportion to their shares in the capital. The partners may, by unanimous resolution, decide to retain all or part of the profits as reserves.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (15)</h3>
          <h3 class="underline center">توزيع الأرباح</h3>
          <p>توزع أرباح الشركة الصافية بعد خصم جميع المصروفات والتكاليف والمخصصات على الشركاء بنسبة حصصهم في رأس المال. ويجوز للشركاء بقرار إجماعي أن يقرروا الاحتفاظ بكل أو جزء من الأرباح كاحتياطيات.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
