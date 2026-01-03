import { MOAContext, pageFooter } from '../types'

export function page10(ctx: MOAContext, pageNum: number = 10): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">
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

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (28)</h3>
          <p>This Company shall have a copy of the Memorandum of Association and The Article of Association of the Limited Liability Company, a register of the names of the shareholders and a register of the managers. The company shall have all books defined in the Commercial Code and registration in the Commercial Register, and the Commercial Companies Law.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (28)</h3>
          <p>يجب أن يحتفظ لدى الشركة بنسخة من عقد تأسيس الشركة ذات المسؤولية المحدودة ونظامها الأساسي, وسجل بأسماء الشركاء وسجل بأسماء المديرين. ويكون لدى الشركة جميع الدفاتر المقررة في قانون المعاملات التجارية والقيد في السجل التجاري, وفي قانون الشركات التجارية.</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
