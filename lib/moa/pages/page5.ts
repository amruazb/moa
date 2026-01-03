import { MOAContext, pageFooter } from '../types'

export function page5(_ctx: MOAContext, pageNum: number = 5): string {
  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (8) - Continued</h3>
          <p>b) In the event of assignment to a third party, the new member becomes liable for the same obligations as the original transferring partner.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (8) - تابع</h3>
          <p>ب) في حالة التنازل للغير، يصبح العضو الجديد ملتزماً بنفس التزامات الشريك المتنازل الأصلي.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (9)</h3>
          <p>a) Each partner is liable for the company obligation to the extent of value of shares in the capital.</p>
          <p>b) The company shall be managed and its signature shall be by the Managing Director appointed herein.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (9)</h3>
          <p>أ) يكون كل شريك مسؤولاً عن التزامات الشركة بقدر حصته في رأس المال.</p>
          <p>ب) يتولى إدارة الشركة والتوقيع عنها المديرة المفوض المعين في هذا العقد.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER III</h3>
          <h3 class="center">Management of the Company</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب الثالث</h3>
          <h3 class="center">إدارة الشركة</h3>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (10)</h3>
          <p>a) The sole owner may solely appoint one or more managers from among the partners or from third parties and fix their remuneration. The manager shall have full power and authority to manage the Company and act on its behalf in all matters related to the Company's objectives and activities, except matters which are legally required to be resolved by the General Assembly.</p>
          <p>b) The manager may delegate some of their powers to another person and may appoint agents and attorneys for specific matters.</p>
          <p>c) The manager shall exercise their powers in accordance with the provisions of this Memorandum and within the limits of the Company's objectives. They shall not undertake any activity that may cause harm to the Company or conflict with its interests.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (10)</h3>
          <p>أ) يجوز للمالك الوحيد تعيين مدير أو أكثر من بين الشركاء أو من الغير ويحدد أجره. يكون للمدير كافة الصلاحيات والسلطات لإدارة الشركة والتصرف نيابة عنها في جميع الأمور المتعلقة بأغراض الشركة وأنشطتها، باستثناء الأمور التي يتطلب القانون أن يتم البت فيها بقرار من الجمعية العمومية.</p>
          <p>ب) يجوز للمدير تفويض بعض صلاحياته لشخص آخر كما يجوز له تعيين وكلاء ومحامين لأمور محددة.</p>
          <p>ج) يمارس المدير صلاحياته وفقاً لأحكام هذا العقد وفي حدود أغراض الشركة. ولا يجوز له القيام بأي نشاط قد يلحق الضرر بالشركة أو يتعارض مع مصالحها.</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
