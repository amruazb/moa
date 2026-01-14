import { LLCMOAContext, pageFooter } from '../types'

export function page10(_ctx: LLCMOAContext, pageNum: number = 10): string {
  return `
    <div class="page">
      <div class="page-content">

      <div class="section-bar"><span>CHAPTER IV</span><span class="rtl">الباب الرابع</span></div>
      <div class="section-bar"><span>General Assembly</span><span class="rtl">الجمعية العمومية</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (13): General Assembly</h3>
          <p>The general assembly represents all partners and it may be convened only in Abu Dhabi City, Emirate of Abu Dhabi.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (13): الجمعية العمومية</h3>
          <p>تمثل الجمعية العمومية كافة الشركاء ولا يجوز انعقادها إلا في مدينة أبوظبي بإمارة أبوظبي.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (14): Attendance of General Assembly</h3>
          <p>Any partner shall have the right to attend the general assembly regardless of the number of shares owned by him, whether personally or by proxy to represent him in the general assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (14): حضور الجمعية العمومية</h3>
          <p>لكل شريك حق حضور الجمعية العمومية مهما كان عدد الحصص التي يملكها سواء كان ذلك بطريقة شخصية أوبطريقة إنابة شريك آخر لتمثيله في الجمعية.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (15): Presiding General Assembly</h3>
          <p>The general assembly shall be presided by the Local partner or his deputy. The chairman shall appoint one reporter and two reviewers for votes counting, upon approval of the general assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (15): رئاسة الجمعية العمومية</h3>
          <p>يرأس الجمعية العمومية الشريك المواطن أو من ينوب عنه ويعين الرئيس مقررا للاجتماع ومراجعين اثنين لفرز الأصوات على أن تقرر الجمعية العمومية تعيينهم.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (16): Invitation for General Assembly</h3>
          <p>Invitation for the General Assembly shall be served vide registered letters to each partner within at least 14 days prior to the scheduled time. Invitation letter shall include the agenda, place and time of the meeting.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (16): الدعوة للجمعية العمومية</h3>
          <p>توجه الدعوة لحضور الجمعيات العمومية بموجب خطابات موصى عليها ترسل لكل شريك قبل موعد انعقادها بأربع عشر يوم على الأقل ويجب أن يشتمل خطاب الدعوة على بيان جداول الأعمال ومكان الاجتماع وزمانه.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (17): General Assembly Deliberations</h3>
          <p>The general assembly may not deliberate any matter except those specified in the agenda; resolutions adopted by the general assembly shall be binding on all partners.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (17): مداولات الجمعية العمومية</h3>
          <p>لا يجوز للجمعية العمومية العادية أن تتداول في غير المسائل الواردة بجدول الأعمال المبين في خطاب الدعوة وتكون القرارت التي تصدرها الجمعية ملزمة لجميع الشركاء.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
