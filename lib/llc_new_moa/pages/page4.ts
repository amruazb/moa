import { LLCNewMOAContext, pageFooter } from '../types'

export function page4(ctx: LLCNewMOAContext, pageNum: number = 4): string {
    const { company } = ctx

    return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 2 - Definitions -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 2</h3>
          <h4 class="bold underline">DEFINITIONS</h4>
          <p>In this Memorandum, the following words shall have the following meanings:</p>
          <p><strong>"Affiliate"</strong> means in relation to a Partner, any Person controlling, controlled by, or under common control with, that Partner, whether directly or indirectly, where "control" means in relation to a body corporate, the power of a person to secure that the affairs of the body corporate are conducted in accordance with the wishes of that Person: (a) by means of holding stocks, shares and/or voting rights in or in relation to that or any other body corporate; or (b) as a result of any powers conferred by the articles of association or any other document regulating that or any other body corporate.</p>
          <p><strong>"Annual Budget"</strong> means the budget approved and adopted annually by the Managing Director and its approved and adopted amendments in accordance with the provisions of this Memorandum.</p>
          <p><strong>"Auditor"</strong> means the auditor of the Company appointed from time to time and shall have the powers and responsibilities stipulated under this Memorandum.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 2</h3>
          <h4 class="bold underline">التعريفات</h4>
          <p>يكون للكلمات التالية في هذا العقد المعاني التالية:</p>
          <p><strong>"الشركة التابعة"</strong> تعني فيما يتعلق بأي شخص يتحكم أو يكون تحت سيطرة مشتركة مع ذلك الشريك، سواء بشكل مباشر أو غير مباشر، حيث "السيطرة" تعني فيما يتعلق بالشركة، سلطة شخص ما لضمان إدارة شؤون الشركة وفقاً لرغبات ذلك الشخص: (أ) عن طريق امتلاك أسهم و/أو حقوق تصويت في تلك الشركة أو أي شركة أخرى؛ أو (ب) نتيجة أي صلاحيات ممنوحة بموجب النظام الأساسي أو أي وثيقة أخرى تنظم تلك الشركة أو أي شركة أخرى.</p>
          <p><strong>"الميزانية السنوية"</strong> تعني الميزانية المعتمدة سنوياً من قبل المدير العام وتعديلاتها المعتمدة وفقاً لأحكام هذا العقد.</p>
          <p><strong>"مدقق الحسابات"</strong> يعني مدقق حسابات الشركة المعين من وقت لآخر ويكون له كافة الصلاحيات والمسؤوليات المنصوص عليها في هذا العقد.</p>
        </div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p><strong>"Business Day"</strong> means any day other than Fridays and Saturdays or public holidays on which commercial banks are closed in the Emirate of Abu Dhabi.</p>
          <p><strong>"Business Plan"</strong> means the business plan for the Company, prepared annually by the Managing Director.</p>
          <p><strong>"Company"</strong> means "<span class="edited">${company.name}</span>".</p>
          <p><strong>"Commercial Register"</strong> means the commercial register held at the Department of Economic Development in the Emirate of Abu Dhabi.</p>
        </div>
        <div class="block rtl">
          <p><strong>"يوم العمل"</strong> يعني أي يوم باستثناء أيام الجمعة والسبت أو العطلات الرسمية التي تغلق فيها البنوك التجارية في إمارة أبوظبي.</p>
          <p><strong>"خطة العمل"</strong> تعني خطة عمل الشركة التي يعدها المدير العام سنوياً.</p>
          <p><strong>"الشركة"</strong> تعني "<span class="edited">${company.nameAr}</span>".</p>
          <p><strong>"السجل التجاري"</strong> يعني السجل التجاري المحفوظ لدى دائرة التنمية الاقتصادية في إمارة أبوظبي.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
