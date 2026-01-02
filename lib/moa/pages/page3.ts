import { MOAContext, pageFooter } from '../types'
import { numberToWordsEn, numberToWordsAr } from '@/lib/utils/numberToWords'

export function page3(ctx: MOAContext): string {
  const { company, primary, capital, shareCount, shareValue } = ctx
  const capitalWordsEn = numberToWordsEn(capital)
  const capitalWordsAr = numberToWordsAr(capital)

  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <p>Such period may be increased or decreased by resolution of assembly of the partners.</p>
        </div>
        <div class="block rtl">
          <p>بقرار يصدر من الجمعية العمومية للشركاء.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (5)</h3>
          <p>The head office of the Company shall be in ${company.emirate}. The General Assembly of the partners may transfer the head office of the company to another location in the same Emirate or decide to establish branches in the United Arab Emirates. If the head office is transferred to another Emirate, this should be in accordance with a resolution of the General Assembly of the Partners.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (5)</h3>
          <p>يكون مركز الشركة الرئيسي في ${company.emirateAr} ويجوز بقرار من الجمعية العمومية نقل المركز الرئيسي إلى أيه جهة أخرى في نفس الإمارة كما يجوز له أن يقرر إنشاء فروع للشركة في دولة الإمارات العربية المتحدة وإذا نقل المركز الرئيس إلى إمارة أخرى فيلزم أن يكون بناء على قرار من الجمعية العمومية للشركاء.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER II</h3>
          <h3 class="center">Capital and Shares</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب الثاني</h3>
          <h3 class="center">رأس مال الشركة وحصص الشركاء</h3>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (6)</h3>
          <p>The capital of the Company is fixed at AED ${capital.toLocaleString()} (${capitalWordsEn} Dirhams) divided into (${shareCount}) shares of a nominal value of AED ${shareValue.toLocaleString()} each. Capital is fully subscribed and paid, and has been distributed among partners as follows:</p>
          <table>
            <tr><th>Partner</th><th>Shares</th><th>Value (AED)</th><th>%</th></tr>
            <tr><td>${primary.name}</td><td>${shareCount}</td><td>${capital.toLocaleString()}</td><td>100%</td></tr>
            <tr><td><strong>Total</strong></td><td><strong>${shareCount}</strong></td><td><strong>${capital.toLocaleString()}</strong></td><td><strong>100%</strong></td></tr>
          </table>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (6)</h3>
          <p>رأس مال الشركة ${capital.toLocaleString()} درهم إماراتي (${capitalWordsAr} درهم) موزع على (${shareCount}) حصة قيمة كل حصة ${shareValue.toLocaleString()} درهم إماراتي وجميعها حصص نقدية تم سدادها بالكامل وقد توزعت على الشريك كما يلي:</p>
          <table>
            <tr><th>الشريك</th><th>الحصص</th><th>القيمة (درهم)</th><th>%</th></tr>
            <tr><td>${primary.nameAr || 'غير متوفر'}</td><td>${shareCount}</td><td>${capital.toLocaleString()}</td><td>100%</td></tr>
            <tr><td><strong>المجموع</strong></td><td><strong>${shareCount}</strong></td><td><strong>${capital.toLocaleString()}</strong></td><td><strong>100%</strong></td></tr>
          </table>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (7)</h3>
          <p>a) The capital shall be increased by resolution of the General Assembly of the Partners in accordance with the provisions of the Commercial Companies Law.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (7)</h3>
          <p>أ) يجوز زيادة رأس المال بقرار من الجمعية العمومية للشركاء وفقاً لأحكام قانون الشركات التجارية.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (8)</h3>
          <p>a) A partner may transfer any of his/her shares in the company to another partner or to a third party provided that such transfer is made to appropriate deed of assignment and registered in the Commercial Register.</p>
          <p>b) In the event of assignment to a third party, the new member becomes liable for the same obligations as the original transferring partner.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (8)</h3>
          <p>أ) يجوز للشريك التنازل عن حصصه في الشركة لشريك آخر أو للغير بشرط أن يتم التنازل بموجب عقد تنازل مناسب ويقيد في السجل التجاري.</p>
          <p>ب) في حالة التنازل للغير، يصبح العضو الجديد ملتزماً بنفس التزامات الشريك المتنازل الأصلي.</p>
        </div>
      </div>
      </div>
      ${pageFooter(3)}
    </div>`
}
