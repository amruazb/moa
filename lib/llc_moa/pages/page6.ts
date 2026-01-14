import { LLCMOAContext, pageFooter } from '../types'

export function page6(_ctx: LLCMOAContext, pageNum: number = 6): string {
  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (7): Increase of Capital</h3>
          <p>The capital may be increased in one or more payments either by issuing new shares or by converting the free capital reserve to shares upon resolution of the assembly and in accordance with the provisions stipulated in law and its executive regulations.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (7): زيادة رأس المال</h3>
          <p>يجوز زيادة رأس المال على دفعة واحدة أو أكثر بسواء بإصدار حصص جديدة أو بتحويل رأس المال الاحتياطي الحر إلى حصص ويتم ذلك بقرار من قبل الجمعية العمومية وطبقاً للأحكام المنصوص عليها في القانون ولوائحها التنفيذية.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (8): Transfer of Shares</h3>
          <p>Shares are transferable among partners or between them and third party provided that such transfer or disposal shall be entered in the register prepared for such purpose.</p>
          <p>Anyone, who intends to sell out his share to third party, shall notify the company management vide duly registered letter and the management shall, in its turn, notify the partners within the sequent Seven days.</p>
          <p>Within Two month from first notification date, the partners may recover their shares upon same conditions, otherwise such right shall lapse. If the right of purchase is exercised by more than one partner, the shares being sold shall be distributed among them proportionately to their shares in the capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (8): انتقال الحصص</h3>
          <p>الحصص قابلة للانتقال بين الشركاء أوبينهم وبين الغير. ويجب أن يثبت هذا الانتقال أو التصرف في الحصص في السجل المعد لذلك الغرض.</p>
          <p>ويجب على كل من يعتزم بيع حصته للغير أن يقوم بإخطار إدارة الشركة بذلك بخطاب مسجل عليه وتقوم الإدارة بدورها بإخطار الشركاء بذلك خلال السبعة أيام التالية.</p>
          <p>وللشركاء خلال شهرين من الإخطار الأول استرداد الحصة بالشروط نفسها وإلا سقط هذا الحق وإذا استعمل حق الشراء من قبل أكثر من شريك واحد يتم توزيع الحصص المباعة بينهم بشكل يتناسب مع حصة كل منهم في رأس المال.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (9): Partners Register</h3>
          <p>A special register for partners shall be maintained by the company's head office containing the following:-</p>
          <p>1. Names of the Partners, their nationalities and domiciles</p>
          <p>2. Number of shares held by each Partner and the amount he paid.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (9): سجل الشركاء</h3>
          <p>يحتفظ بمكتب الشركة الرئيس بسجل خاص للشركاء يتضمن ما يلي:-</p>
          <p>1- أسماء الشركاء وجنسياتهم ومحال إقامتهم</p>
          <p>2- عدد الحصص التي يملكها كل شريك ومقدار ما دفعه</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
