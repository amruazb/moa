import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page6(ctx: LLCToSPCContext, pageNum: number = 6): string {
  const { manager } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 10: Company Management - Intro and Items 1-4 ONLY -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (10): Company Management - Continued</h3>
          <p>Company and to carry out all acts required by its objects, including but not limited to the following:</p>
          <p>1- Carrying out all administrative, technical and financial aspects without limitation to the powers entrusted in ${manager.pronouns.object}, being without limitation.</p>
          <p>2- Carrying out the works required to achieve the company's goals and purpose.</p>
          <p>3- Concluding commercial contracts in the name of the Company, contracts covered by the Company activity and related thereto.</p>
          <p>4- The Managing Director shall represent the Company before all government, local and federal departments and private companies and establishments such as Department of Economic Development, Municipalities, UAE Chambers, Seaports, Customs, Airports, Traffic and Licensing Department, Police Departments, Ruler's Offices, Ministry of Human Resources and Emiratization, Higher Corporation for Specialized Economic Zones, Critical National Infrastructure Authority, Federal Tax Authority, all companies and commercial and professional entities, and to sign all documents, papers and contracts with/before them and/or do any other acts, deeds or things that may be related to the affairs of the company and sign jointly or singly on all papers and transactions.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (10): إدارة الشركة - تابع</h3>
          <p>الشركة والقيام بجميع الأعمال التي تقتضيها أغراضها ويشمل ذلك دون حصر:</p>
          <p>1- القيام بجميع الأعمال الإدارية والفنية والمالية وبدون الحد من شمولية السلطات والصلاحيات المعطاة له بدون حصر.</p>
          <p>2- القيام بكافة الأعمال اللازمة لتحقيق أغراض الشركة وأهدافها.</p>
          <p>3- إبرام العقود التجارية باسم الشركة وهي العقود التي يكون ضمن نشاط الشركة والمتصلة به.</p>
          <p>4- يقوم مدير الإدارة بتمثيل الشركة لدى كافة المؤسسات الحكومية وشبه الحكومية والمحلية والاتحادية والمؤسسات الخاصة والشركات مثل دائرة التنمية الاقتصادية والبلديات وغرف الدولة، والموانئ والجمارك والمطارات وإدارة المرور والترخيص ودوائر الشرطة ومكاتب سمو الحاكم ووزارة الموارد البشرية والتوطين والمؤسسة العليا للمناطق الاقتصادية المتخصصة وجهاز حماية المنشآت والمرافق الحيوية والهيئة الاتحادية للضرائب وكافة الشركات والجهات التجارية والمهنية، والتوقيع على كافة المستندات والأوراق والعقود معهم أو أمامهم و/أو القيام بأي أعمال أو تصرفات أخرى تتعلق بشؤون الشركة والتوقيع مجتمعين أو منفردين على كافة الأوراق والمعاملات.</p>
        </div>
      </div>

      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
