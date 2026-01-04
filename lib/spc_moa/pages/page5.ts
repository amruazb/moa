import { MOAContext, pageFooter } from '../types'

export function page5(_ctx: MOAContext, pageNum: number = 5): string {
  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (8)</h3>
          <p>Shares are transferable among partners or between them and third party provided that such transfer or disposal shall be entered in the register prepared for such purpose.</p>
          <p>Anyone, who intends to sell out their share to third party, shall notify the company management via duly registered letter and the management shall, in its turn, notify the partners within the subsequent seven days.</p>
          <p>Within Two months from first notification date, the partners may recover their shares upon same conditions, otherwise such right shall lapse. If the right of purchase is exercised by more than one partner, the shares being sold shall be distributed among them proportionately to their shares in the capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (8)</h3>
          <p>الحصص قابلة للانتقال بين الشركاء أو بينهم وبين الغير. ويجب أن يثبت هذا الانتقال أو التصرف في الحصص في السجل المعد لذلك الغرض.</p>
          <p>ويجب على كل من يعتزم بيع حصته للغير أن يقوم بإخطار إدارة الشركة بذلك بخطاب موصى عليه وتقوم الإدارة بدورها بإخطار الشركاء بذلك خلال السبعة أيام التالية.</p>
          <p>وللشركاء خلال شهرين من الإخطار الأول استرداد الحصة بالشروط نفسها وإلا سقط هذا الحق وإذا استعمل حق الشراء من قبل أكثر من شريك واحد يتم توزيع الحصص المباعة بينهم بشكل يتناسب مع حصة كل منهم في رأس المال.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (9)</h3>
          <p>A special register for partners shall be maintained by the company's head office containing the following:-</p>
          <ol class="list">
            <li>Names of the Partners, their nationalities and domiciles</li>
            <li>Number of shares held by each Partner and the amount paid.</li>
            <li>Cases of assignment of shares and transfer of ownership thereof, indicating the date and signature of the assigner and assignee, in case of disposal of the shares between the existing Partners and signature of the Managing Director and the person to whom the shares devolved, in case of transfer by inheritance.</li>
          </ol>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (9)</h3>
          <p>يحتفظ بمكتب الشركة الرئيس بسجل خاص للشركاء يتضمن ما يلي:-</p>
          <ol class="list">
            <li>أسماء الشركاء وجنسياتهم ومحال إقامتهم</li>
            <li>عدد الحصص التي يملكها كل شريك ومقدار ما دفعه</li>
            <li>حالات التنازل عن الحصص وانتقال ملكيتها مع بيان تاريخ وتوقيع المتنازل والمتنازل إليه في حالة التصرف بين الأحياء وتوقيع المدير المفوض ومن آلت إليه الحصص في حالة الانتقال بطريق الميراث.</li>
          </ol>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
