import { LLCNewMOAContext, pageFooter } from '../types'

export function page22(ctx: LLCNewMOAContext, pageNum: number = 22): string {
  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 12: Auditor -->
      <div class="article-pair">
        <div class="block">
          <p class="bold">ARTICLE 12</p>
          <p class="bold">AUDITOR</p>
        </div>
        <div class="block rtl">
          <p class="bold">المادة 12</p>
          <p class="bold">مدقق الحسابات</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p>12-1 The Company shall have one or more Auditors registered in the Emirate of Abu Dhabi to be recommended by the Managing Director and appointed by the General Assembly. The Auditor shall be subject to the provisions of the Commercial Companies Law and the UAE applicable laws and regulations.</p>
          <p>12-2 The General Assembly shall determine the Auditor's remuneration.</p>
          <p>12-3 The Auditor shall audit the accounts of the Company, provide the Managing Director with all necessary information for the preparation of the balance sheet and the profit and loss account, ensure compliance with applicable laws and this Memorandum, and shall submit a report to the annual General Assembly.</p>
        </div>
        <div class="block rtl">
          <p>1-12 يكون للشركة مدقق حسابات واحد أو أكثر من بين مدققي الحسابات المسجلين والمرخص لهم بالعمل في إمارة أبوظبي على أن يخضع مدقق الحسابات لأحكام قانون الشركات التجارية وسائر القوانين والانظمة المعمول بها في الدولة. يتم ترشيحه من قبل المدير وتعيينه من قبل الجمعية العمومية</p>
          <p>2-12 تقرر الجمعية العمومية أتعاب مدقق الحسابات.</p>
          <p>3-12 يقوم مدقق الحسابات بتدقيق حسابات الشركة ويتم تزويد المدير بكافة المعلومات المطلوبة لإعداد الميزانية العمومية وحساب الأرباح والخسائر والتأكد من الالتزام بالقوانين المعمول بها وأحكام هذا العقد وتقديم تقرير إلى الجمعية العمومية في اجتماعها السنوي.</p>
        </div>
      </div>

      <!-- Article 13: Financial Management -->
      <div class="article-pair">
        <div class="block">
          <p class="bold">ARTICLE 13</p>
          <p class="bold">FINANCIAL MANAGEMENT</p>
        </div>
        <div class="block rtl">
          <p class="bold">المادة 13</p>
          <p class="bold">الإدارة المالية</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p>13-1 The Managing Director shall prepare the Company's balance sheet and profit and loss account in addition to an annual report of the Company's activities, its financial position and the proposal for the distribution of profits. All the foregoing should be completed within 3 (three) months from the end of each financial year of the Company.</p>
          <p>13-2 The balance sheet and the profit and loss account shall be submitted to the annual General Assembly for approval.</p>
        </div>
        <div class="block rtl">
          <p>1-13 يقوم المدير بإعداد الميزانية العمومية للشركة وحساب الأرباح والخسائر علاوة على إعداد تقرير سنوي عن أنشطة الشركة ووضعها المالي واقتراح الطريقة المثلى لتوزيع الأرباح على أن يتم استيفاء كافة ما سبق خلال 3 (ثلاثة) أشهر من تاريخ انتهاء كل سنة مالية للشركة.</p>
          <p>2-13 يجب تقديم الميزانية العمومية وحساب الأرباح والخسائر إلى الجمعية العمومية السنوية للموافقة عليها واعتمادها.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
