import { MOAContext, pageFooter } from '../types'

export function page10(_ctx: MOAContext, pageNum: number = 10): string {
  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (18) - Continued</h3>
          <p>shall be valid only if they were issued by majority of votes representing not less than the capital. In the event of lack of quorum, the general assembly shall be convened within the following 14 days and the next meeting shall be valid regardless of the number of shares represented therein.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (18) - تابع</h3>
          <p>صحيحة إلا إذا صدرت بأغلبية الأصوات التي تمثل رأس المال على الأقل. وفي حالة عدم توفر النصاب لصحة الاجتماع الأول، تعين عقد الجمعية العمومية ثانية خلال 14 يوما التالية ويعتبر اجتماعها الثاني صحيحا مهما كان عدد الحصص الممثلة فيه.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (19)</h3>
          <p>The extra ordinary general assembly shall have the right to amend the memorandum of association, As for resolutions discharging the director, 51% of the votes shall be sufficient.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (19)</h3>
          <p>للجمعية العمومية الغير عادية أن تعدل عقد تأسيس الشركة على أنه في حالة التصويت على القرارات الخاصة بإبراء ذمة المديرة، يكتفى بأكثرية أصوات تمثل 51% من رأس المال.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (20)</h3>
          <p>General Assembly deliberations and resolutions shall be registered in minutes then be entered in special numbered register signed by chairman, the reporter, the two reviewers and the accounts controller.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (20)</h3>
          <p>تدون مداولات الجمعية العمومية وقراراتها في محاضر تقيد في سجل خاص مرقمة صفحاته ويوقع عليها رئيس الجمعية ومقرر الاجتماع ومراجعي الأصوات ومراقب الحسابات.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER V</h3>
          <h3 class="center">Financial Year</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب الخامس</h3>
          <h3 class="center">السنة المالية للشركة</h3>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (21)</h3>
          <p>The financial year shall commence at the beginning of January and end at the end of December of each year, provided that the first year shall include the period from the date of final incorporation of the Company till the coming December. The first general assembly shall be convened immediately after this year.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (21)</h3>
          <p>تبدأ السنة المالية للشركة في أول يناير (كانون الثاني) من كل سنة وتنتهي في آخر ديسمبر (كانون الأول) من كل سنة. على أن السنة الأولى تشمل المدة التي تنقضي من تاريخ تأسيس الشركة النهائي حتى ديسمبر (كانون الأول) التالي وتنعقد أول جمعية عمومية عقب هذا السنة.</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
