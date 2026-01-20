import { LLCNewMOAContext, pageFooter } from '../types'

export function page10(ctx: LLCNewMOAContext, pageNum: number = 10): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 8: Transfer and Pledge of Shares -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 8</h3>
          <h4 class="bold">TRANSFER AND PLEDGE OF SHARES</h4>
          <p><strong>8-1</strong> Shares may be transferred only by a written instrument authenticated by the notary public and registered in the Commercial Register in accordance with the Commercial Companies Law, provided that the Second Partner undertakes that it shall not sell, transfer or assign, or enter into any agreement or arrangement which may cause the sale, transfer or assignment of, any of its Shares in the share capital of the Company without the prior written approval of the First Partner. The Second Partner acknowledges and agrees that the undertaking in this Article 8-1 is reasonable and necessary and shall continue for so long as the Second Partner holds any Share in the share capital of the Company.</p>
          <p><strong>8-2</strong> Either Partner may transfer its Shares to a person who is not a Partner with or without consideration according to the terms of this article. Such Partner wishing to make a transfer shall notify the Managing Director of the terms and consideration.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 8</h3>
          <h4 class="bold">نقل ورهن الحصص</h4>
          <p><strong>8-1</strong> لا يجوز نقل الحصص إلا بموجب صك خطي موثق من كاتب العدل ومسجل في السجل التجاري وفقاً لقانون الشركات التجارية، بشرط أن يتعهد الشريك الثاني بأنه لن يبيع أو ينقل أو يتنازل، أو يدخل في أي اتفاق أو ترتيب قد يتسبب في بيع أو نقل أو التنازل عن أي من حصصه في رأس مال الشركة دون الموافقة الخطية المسبقة من الشريك الأول. ويقر الشريك الثاني ويوافق على أن التعهد الوارد في هذه المادة 8-1 معقول وضروري ويستمر طالما أن الشريك الثاني يحتفظ بأي حصة في رأس مال الشركة.</p>
          <p><strong>8-2</strong> يجوز لأي من الشريكين نقل حصصه إلى شخص ليس شريكاً مع أو بدون مقابل وفقاً لشروط هذه المادة. يقوم الشريك الراغب في إجراء النقل بإخطار المدير الإداري بالشروط والمقابل.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
