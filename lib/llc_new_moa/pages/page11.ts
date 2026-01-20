import { LLCNewMOAContext, pageFooter } from '../types'

export function page11(ctx: LLCNewMOAContext, pageNum: number = 11): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 8 continued -->
      <div class="article-pair">
        <div class="block">
          <p>of the transfer. The Managing Director shall then immediately notify the other Partner of such details and on behalf of the transferor offer those Shares to such other Partner. If the other Partner to whom the Shares are offered wishes to acquire the same it may do so at the offered price or, if it is not willing to accept the offered price, at the price determined pursuant to the mechanism prescribed by Article 80 of the Commercial Companies Law. If within 30 (Thirty) days after the Managing Director has offered the Shares to the continuing Partner the Shares have not been taken up, then the transferor may transfer those not taken up to any Person at not less than the price and payment terms originally notified by it or at the price so fixed pursuant to the mechanism prescribed in Article 80 of the Commercial Companies Law.</p>
          <p><strong>8-3</strong> The Second Partner shall not pledge part or all of its Shares in the Company to any Person without the prior written approval of the First Partner.</p>
        </div>
        <div class="block rtl">
          <p>من النقل. يقوم المدير الإداري بعد ذلك فوراً بإخطار الشريك الآخر بهذه التفاصيل ونيابة عن المحول يعرض تلك الحصص على هذا الشريك الآخر. إذا رغب الشريك الآخر الذي عرضت عليه الحصص في الحصول عليها فيجوز له ذلك بالسعر المعروض أو، إذا لم يكن راغباً في قبول السعر المعروض، بالسعر المحدد وفقاً للآلية المنصوص عليها في المادة 80 من قانون الشركات التجارية. إذا لم يتم الاستحواذ على الحصص خلال 30 (ثلاثين) يوماً بعد أن عرض المدير الإداري الحصص على الشريك المستمر، فيجوز للمحول نقل تلك التي لم يتم الاستحواذ عليها إلى أي شخص بما لا يقل عن السعر وشروط الدفع التي أخطر بها في الأصل أو بالسعر المحدد وفقاً للآلية المنصوص عليها في المادة 80 من قانون الشركات التجارية.</p>
          <p><strong>8-3</strong> لا يجوز للشريك الثاني رهن جزء أو كل حصصه في الشركة لأي شخص دون الموافقة الخطية المسبقة من الشريك الأول.</p>
        </div>
      </div>

      <!-- Article 9: Duration of the Company -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 9</h3>
          <h4 class="bold">DURATION OF THE COMPANY</h4>
          <p>The duration of the Company shall be for a period of 99 (Ninety nine) Gregorian years, which commenced on the date the Company was registered with the Commercial Register and shall be automatically renewed unless it is otherwise resolved by a Special Resolution of the General Assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 9</h3>
          <h4 class="bold">مدة الشركة</h4>
          <p>تكون مدة الشركة 99 (تسعة وتسعون) سنة ميلادية، بدأت من تاريخ تسجيل الشركة في السجل التجاري وتتجدد تلقائياً ما لم يتم البت في خلاف ذلك بموجب قرار خاص من الجمعية العمومية.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
