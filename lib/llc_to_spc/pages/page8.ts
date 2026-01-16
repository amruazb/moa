import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page8(ctx: LLCToSPCContext, pageNum: number = 8): string {
  const { newOwner } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 11: Company Communications -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (11): Company Communications</h3>
          <p>The Company communications referred to in this Memorandum whether between the Parties or between the Parties and the Company shall take the form of registered letters.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (11): تبليغات الشركة</h3>
          <p>تكون تبليغات الشركة المشار إليها في هذا العقد سواء كانت بين الشركاء أو بينهم وبين الشركة على هيئة خطابات مسجلة موصى عليها.</p>
        </div>
      </div>

      <!-- Chapter IV: General Assembly -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER IV</h3>
          <h3 class="center">General Assembly</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الرابع</h3>
          <h3 class="center">الجمعية العمومية</h3>
        </div>
      </div>

      <!-- Article 12: General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (12): General Assembly</h3>
          <p>The General Assembly represents the sole owner and it may be convened only in Abu Dhabi City, Emirate of Abu Dhabi.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (12): الجمعية العمومية</h3>
          <p>تمثل الجمعية العمومية المالك الوحيد ولا يجوز انعقادها إلا في مدينة أبوظبي بإمارة أبوظبي.</p>
        </div>
      </div>

      <!-- Article 13: Attendance of General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (13): Attendance of General Assembly</h3>
          <p>The sole owner shall have the right to attend the General Assembly, whether personally or by proxy to represent ${newOwner.pronouns.object} in the General Assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (13): حضور الجمعية العمومية</h3>
          <p>للمالك الوحيد حق حضور الجمعية العمومية سواء كان ذلك بطريقة شخصية أو بطريقة إنابة شخص آخر لتمثيله في الجمعية.</p>
        </div>
      </div>

      <!-- Article 14: Presiding General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (14): Presiding General Assembly</h3>
          <p>The General Assembly shall be presided by the sole owner or ${newOwner.pronouns.possessive} deputy. The chairman shall appoint one reporter and two reviewers for votes counting, upon approval of the General Assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (14): رئاسة الجمعية العمومية</h3>
          <p>يرأس الجمعية العمومية المالك الوحيد أو من ينوب عنه ويعين الرئيس مقرراً للاجتماع ومراجعين اثنين لفرز الأصوات على أن تقرر الجمعية العمومية تعيينهم.</p>
        </div>
      </div>

      <!-- Article 15: Invitation for General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (15): Invitation for General Assembly</h3>
          <p>Invitation for the General Assembly shall be served via registered letters within at least 14 days prior to the scheduled time. Invitation letter shall include the agenda, place and time of the meeting.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (15): الدعوة للجمعية العمومية</h3>
          <p>توجه الدعوة لحضور الجمعيات العمومية بموجب خطابات موصى عليها ترسل قبل موعد انعقادها بأربعة عشر يوم على الأقل. ويجب أن يتضمن خطاب الدعوة بيان جدول الأعمال ومكان الاجتماع وزمانه.</p>
        </div>
      </div>

      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
