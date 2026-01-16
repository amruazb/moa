import { LLCNewMOAContext, pageFooter, formatDateDMY, getPronouns } from '../types'

export function page11(ctx: LLCNewMOAContext, pageNum: number = 11): string {
  const { manager, partners } = ctx
  const formattedDob = formatDateDMY(manager.dob)

  return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 9 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 9</h3>
          <h4 class="bold underline">INCREASE & REDUCTION IN SHARE CAPITAL</h4>
          <p>9-1 The Company may increase or reduce its capital pursuant to a Special Resolution of the General Assembly.</p>
          <p>9-2 Subject to the approval of the relevant competent authorities, a reduction in the capital of the Company shall be effected in the manner deemed suitable and useful to the Company and in accordance with the provisions of this Memorandum and the Commercial Companies Law.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 9</h3>
          <h4 class="bold underline">إجراءات زيادة وتخفيض حصص رأس المال</h4>
          <p>9-1 يجوز للشركة زيادة أو تخفيض رأس مالها بموجب قرار خاص من الجمعية العمومية.</p>
          <p>9-2 رهناً بموافقة السلطات المختصة ذات الصلة، يتم تخفيض رأس مال الشركة بالطريقة التي تُعتبر مناسبة ومفيدة للشركة ووفقاً لأحكام هذا العقد وقانون الشركات التجارية.</p>
        </div>
      </div>
      
      <!-- Article 10 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 10</h3>
          <h4 class="bold underline">TRANSFER AND PLEDGE OF SHARES</h4>
          <p>10-1 Shares may be transferred only by a written instrument authenticated by the notary public and registered in the Commercial Register in accordance with the Commercial Companies Law, provided that the Second Partner undertakes that it shall not sell, transfer or assign, or enter into any agreement or arrangement which may cause the sale, transfer or assignment of, any of its Shares in the share capital of the Company without the prior written approval of the First Partner. The Second Partner acknowledges and agrees that the undertaking in this Article 10-1 is reasonable and necessary and shall continue for so long as the Second Partner holds any Share in the share capital of the Company.</p>
          <p>10-2 Either Partner may transfer its Shares to a person who is not a Partner with or without consideration according to the terms of this article. Such Partner wishing to make such a transfer shall notify the Managing Director of the terms and consideration of the transfer. The Managing Director shall then immediately notify the other Partner of such details and on behalf of the transferor offer those Shares to each other Partner. If the other Partner to whom the Shares are offered wishes to acquire the same it may do so at the offered price, or if it is not willing to accept the offered price, at the price determined pursuant to Article 80 of the Commercial Companies Law. If within 30 (thirty) days after the Managing Director has offered the Shares to the continuing Partner the Shares have not been taken up, then the transferor may transfer those not taken up to any Person at not less than the price and payment terms originally notified by it or at the price so fixed pursuant to the mechanisms prescribed in Article 80 of the Commercial Companies Law.</p>
          <p>10-3 The Second Partner shall not pledge part or all of its Shares in the Company to any Person without the prior written approval of the First Partner.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 10</h3>
          <h4 class="bold underline">التنازل عن الحصص ورهنها</h4>
          <p>10-1 لا يجوز التنازل عن الحصص إلا بموجب مستند مكتوب موثق من كاتب العدل ومسجل في السجل التجاري وفقاً لقانون الشركات التجارية، شريطة أن يتعهد الشريك الثاني بعدم بيع أو نقل أو التنازل عن أي من حصصه في رأس مال الشركة أو الدخول في أي اتفاق أو ترتيب قد يؤدي إلى بيع أو نقل أو التنازل عن أي من حصصه دون موافقة خطية مسبقة من الشريك الأول. ويقر الشريك الثاني ويوافق على أن التعهد في هذه المادة 10-1 معقول وضروري وسيستمر طالما يحتفظ الشريك الثاني بأي حصة في رأس مال الشركة.</p>
          <p>10-2 يجوز لأي من الشريكين نقل حصصه إلى شخص ليس شريكاً مع أو بدون مقابل وفقاً لشروط هذه المادة. ويتعين على الشريك الراغب في إجراء مثل هذا النقل إخطار المدير العام بالشروط والمقابل للتنازل. ويجب على المدير العام إخطار الشريك الآخر فوراً بهذه التفاصيل ونيابة عن المتنازل يعرض تلك الحصص على كل شريك آخر. وإذا رغب الشريك الآخر الذي تُعرض عليه الحصص في الحصول عليها فيجوز له ذلك بالسعر المعروض، أو إذا لم يكن راغباً في قبول السعر المعروض، بالسعر المحدد وفقاً للمادة 80 من قانون الشركات التجارية. وإذا لم يتم الحصول على الحصص خلال 30 (ثلاثين) يوماً بعد عرض المدير العام للحصص على الشريك المستمر، فيجوز للمتنازل نقل تلك الحصص التي لم يتم الحصول عليها إلى أي شخص بسعر لا يقل عن السعر وشروط الدفع المبلغ عنها أصلاً أو بالسعر المحدد وفقاً للآليات المنصوص عليها في المادة 80 من قانون الشركات التجارية.</p>
          <p>10-3 لا يجوز للشريك الثاني أن يرهن كامة أو جزء من حصصه في الشركة إلى أي شخص دون موافقة خطية مسبقة من الشريك الأول.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
