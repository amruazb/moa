import { LLCMOAContext, pageFooter } from '../types'

export function page6(_ctx: LLCMOAContext, pageNum: number = 6): string {
  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (6)</h3>
          <h3 class="underline center">PAYMENT OF CAPITAL</h3>
          <p>The partners have paid in full the value of their shares as stated in Article (5) above. The capital of the Company may be increased or decreased by a unanimous resolution of the partners in accordance with the provisions of the law.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (6)</h3>
          <h3 class="underline center">سداد رأس المال</h3>
          <p>قام الشركاء بسداد قيمة حصصهم بالكامل كما هو مبين في المادة (5) أعلاه. ويجوز زيادة رأس مال الشركة أو تخفيضه بقرار إجماعي من الشركاء وفقاً لأحكام القانون.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (7)</h3>
          <h3 class="underline center">LIABILITY OF PARTNERS</h3>
          <p>The liability of the partners towards the Company's creditors and third parties shall be limited to their respective shares in the capital as specified in this Memorandum.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (7)</h3>
          <h3 class="underline center">مسؤولية الشركاء</h3>
          <p>تكون مسؤولية الشركاء تجاه دائني الشركة والغير محدودة بقدر حصصهم في رأس المال المحدد في هذا العقد.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (8)</h3>
          <h3 class="underline center">TRANSFER OF SHARES</h3>
          <p>Shares are transferable among partners or between partners and third parties, provided that such transfer or disposal shall be registered in the special register prepared for such purpose.</p>
          <p>Any partner who intends to sell their share to a third party shall notify the Company management via registered letter. The management shall, in turn, notify the other partners within seven (7) days.</p>
          <p>The other partners shall have a pre-emptive right to purchase the shares being sold within two (2) months from the date of notification on the same terms and conditions. If this right is not exercised within the specified period, it shall lapse. If more than one partner exercises the right of purchase, the shares shall be distributed among them in proportion to their existing shares in the capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (8)</h3>
          <h3 class="underline center">انتقال الحصص</h3>
          <p>الحصص قابلة للانتقال بين الشركاء أو بينهم وبين الغير، على أن يتم قيد هذا الانتقال أو التصرف في السجل الخاص المعد لذلك الغرض.</p>
          <p>ويجب على كل من يعتزم بيع حصته للغير أن يقوم بإخطار إدارة الشركة بذلك بخطاب مسجل. وتقوم الإدارة بدورها بإخطار الشركاء الآخرين بذلك خلال سبعة (7) أيام.</p>
          <p>ويكون للشركاء الآخرين حق أولوية في شراء الحصص المعروضة للبيع خلال شهرين (2) من تاريخ الإخطار وبنفس الشروط والأحكام. وإذا لم يمارسوا هذا الحق خلال المدة المحددة، سقط هذا الحق. وإذا مارس حق الشراء أكثر من شريك، توزع الحصص بينهم بنسبة حصص كل منهم في رأس المال.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
