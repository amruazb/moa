import { LLCNewMOAContext, pageFooter } from '../types'

export function page3(ctx: LLCNewMOAContext, pageNum: number = 3): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Definitions continued -->
      <div class="article-pair">
        <div class="block">
          <p><strong>"Business Day"</strong> means any day other than Fridays and Saturdays or public holidays on which commercial banks are closed in the Emirate of <span class="edited">${company.emirate}</span>.</p>

          <p><strong>"Business Plan"</strong> means the business plan for the Company, prepared annually by the Managing Director.</p>

          <p><strong>"Company"</strong> means "<span class="edited">${company.name}</span>".</p>

          <p><strong>"Commercial Register"</strong> means the commercial register held at the Department of Economic Development in the Emirate of <span class="edited">${company.emirate}</span>.</p>

          <p><strong>"Commercial Companies Law"</strong> means the Federal Law No. 32 of 2021 concerning Commercial Companies and any regulations or decrees to be enacted for its implementation or as amended, completed, substituted or re-enacted in full by subsequent laws to the extent (where the context permits) applicable to the provisions of this Memorandum.</p>

          <p><strong>"Confidential Information"</strong> means all information relating to the Company in general, the Partners and their relations, and the trade secrets, price, customer and supplier lists, pricing and marketing plans, policies and strategies, details of client and consultant contracts, operations methods, business acquisition plans, new personnel acquisition plans and all other confidential information with respect to the businesses of either of the Partners or the Company.</p>

          <p><strong>"General Assembly"</strong> means each meeting of the Partners of the Company (including the annual General Assembly) duly convened and held in accordance with this Memorandum.</p>
        </div>
        <div class="block rtl">
          <p><strong>"يوم العمل"</strong> يعني أي يوم عدا أيام الجمعة والسبت أو العطلات الرسمية التي تكون فيها البنوك التجارية مغلقة في إمارة <span class="edited">${company.emirateAr}</span>.</p>

          <p><strong>"خطة العمل"</strong> تعني خطة العمل الخاصة بالشركة، والتي يعدها المدير العام سنويًا.</p>

          <p><strong>"الشركة"</strong> تعني "<span class="edited">${company.nameAr}</span>".</p>

          <p><strong>"السجل التجاري"</strong> يعني السجل التجاري المحفوظ لدى دائرة التنمية الاقتصادية في إمارة <span class="edited">${company.emirateAr}</span>.</p>

          <p><strong>"قانون الشركات التجارية"</strong> يعني القانون الاتحادي رقم 32 لسنة 2021 بشأن الشركات التجارية وأي لوائح أو مراسيم تصدر لتنفيذه أو كما يتم تعديله أو استكماله أو استبداله أو إعادة سنه بالكامل بموجب قوانين لاحقة بالقدر (حيثما يسمح السياق) المطبق على أحكام هذا العقد.</p>

          <p><strong>"المعلومات السرية"</strong> تعني جميع المعلومات المتعلقة بالشركة بشكل عام، والشركاء وعلاقاتهم، والأسرار التجارية، والأسعار، وقوائم العملاء والموردين، وخطط التسعير والتسويق، والسياسات والاستراتيجيات، وتفاصيل عقود العملاء والاستشاريين، وطرق العمليات، وخطط الاستحواذ على الأعمال، وخطط اكتساب الموظفين الجدد وجميع المعلومات السرية الأخرى فيما يتعلق بأعمال أي من الشركاء أو الشركة.</p>

          <p><strong>"الجمعية العمومية"</strong> تعني كل اجتماع لشركاء الشركة (بما في ذلك الجمعية العمومية السنوية) يتم عقده وانعقاده حسب الأصول وفقًا لهذا العقد.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
