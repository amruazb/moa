import { MOAContext, pageFooter } from '../types'

export function page12(ctx: MOAContext, pageNum: number = 12): string {
  const { company, primary, pronouns } = ctx

  return `
    <div class="page">
      <div class="page-content">
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
          <h3 class="underline center">Article (25)</h3>
          <p>Any dispute arising during company duration or during liquidation thereof, between partners or between themselves and the Managing Director or between themselves and liquidators concerning any matters related to the Company or business thereof shall be subject to the jurisdiction of court where main centre is located (${company.emirate} courts).</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (25)</h3>
          <p>كل نزاع يثار أثناء مدة الشركة أوأثناء تصفيتها بين الشركاء أوبينهم وبين المديرة التنفيذية أوبينهم وبين المصفين حول أمور تتعلق بالشركة أوبأعمالها، يكون النظر فيه من اختصاص محاكم المركز الرئيس (محاكم ${company.emirateAr}).</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER VIII</h3>
          <h3 class="center">Concluding Provisions</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب الثامن</h3>
          <h3 class="center">أحكام ختامية</h3>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (26)</h3>
          <p>The provisions of Federal Law No. (32) Of 2021 concerning Commercial Companies and its amendments and executive regulations shall apply to whatever not covered by a specific provision in this Memorandum.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (26)</h3>
          <p>تسري أحكام القانون الاتحادي رقم (32) لسنة 2021 في شأن الشركات التجارية وتعديلاته ولوائحه التنفيذية في شأن يرد بشأنها نص خاص في هذا العقد.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (27)</h3>
          <p>This contract shall be registered in the commercial register and published in accordance with the law. <strong>${pronouns.title} ${primary.name}</strong> is solely authorized to carry out all necessary procedures in this regard. All costs, expenses, and other amounts incurred for establishing the company shall be deducted from the general expense account. As the sole owner, <strong>${pronouns.title} ${primary.name}</strong> retains full rights and authority over the company at all times, including in the event of any absence or failure to renew the trade license.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (27)</h3>
          <p>يقيد هذا العقد في السجل التجاري وينشر طبقاً للقانون، وقد فوض <strong>${pronouns.titleAr}/ ${primary.nameAr}</strong> في اتخاذ كافة الإجراءات اللازمة في هذا الشأن. وتخصم جميع المصروفات والنفقات والتكاليف التي تم إنفاقها في سبيل تأسيس الشركة من حساب المصروفات العامة. وبصفت${pronouns.subjectAr === 'هي' ? 'ها' : 'ه'} المالك الوحيد، يحتفظ <strong>${pronouns.titleAr}/ ${primary.nameAr}</strong> بكامل الحقوق والسلطات على الشركة في جميع الأوقات، بما في ذلك في حال الغياب أو عدم تجديد الرخصة التجارية.</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
