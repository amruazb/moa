import { MOAContext, pageFooter } from '../types'

export function page8(ctx: MOAContext, pageNum: number = 8): string {
  const { pronouns, company } = ctx

  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (11) - Continued</h3>
          <p>10- To authorize and sanction all vouchers/books/ledgers of accounts and payments particular with all expenses.</p>
          <p>11- To sub-delegate all or part of such powers to any other person after the approval of General Assembly.</p>
          <p>12- The appointment of the Managing Director cannot be revoked nor the powers stated herein curtailed except by a resolution of the General Meeting representing at least 51% of the share capital of the Company.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (11) - تابع</h3>
          <p>10- اعتماد وتصديق كافة الفواتير والسندات والدفاتر الحسابية والدفعات الخاصة بكافة المصروفات.</p>
          <p>11- تفويض كل أو أي من هذه السلطات إلى أي شخص آخر بعد موافقة الجمعية العمومية.</p>
          <p>12- لا يجوز إلغاء تعيين المدير أو الحد من سلطاته الواردة في هذا العقد إلا بقرار صادر في الجمعية من قبل ما لا يقل عن 51% من رأسمال الشركة.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (12)</h3>
          <p>The Company communications referred to in this Memorandum whether between the Parties or between the Parties and the Company shall take the form of registered letters.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (12)</h3>
          <p>تكون تبليغات الشركة المشار إليها في هذا العقد سواء كانت بين الشركاء أو بينهم وبين الشركة على هيئة خطابات مسجلة موصى عليها.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER IV</h3>
          <h3 class="center">General Assembly</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب الرابع</h3>
          <h3 class="center">الجمعية العمومية</h3>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (13)</h3>
          <p>The General Assembly represents all partners and it may be convened only in <span class="edited">${company.emirate}</span> City, Emirate of <span class="edited">${company.emirate}</span>.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (13)</h3>
          <p>تمثل الجمعية العمومية كافة الشركاء ولا يجوز انعقادها إلا في مدينة <span class="edited">${company.emirateAr}</span> بإمارة <span class="edited">${company.emirateAr}</span>.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (14)</h3>
          <p>Any partner shall have the right to attend the General Assembly regardless of the number of shares owned by ${pronouns.object}, whether personally or by proxy to represent ${pronouns.object} in the General Assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (14)</h3>
          <p>لكل شريك حق حضور الجمعية العمومية مهما كان عدد الحصص التي يمتلكها سواء كان ذلك بطريقة شخصية أو بطريقة إنابة شريك آخر لتمثيله في الجمعية.</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
