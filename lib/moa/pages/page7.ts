import { MOAContext, pageFooter } from '../types'

export function page7(ctx: MOAContext, pageNum: number = 7): string {
  const { pronouns } = ctx

  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (11) - Continued</h3>
          <p>Seaports, Customs, Airports, Traffic and Licensing Department, Police Departments, Ruler's Offices, Ministry of Human Resources and Emiratization, Higher Corporation for Specialized Economic Zones, Critical National Infrastructure Authority, Federal Tax Authority, all companies and commercial and professional entities, and to sign all documents, papers and contracts with/before them and/or do any other acts, deeds or things that may be related to the affairs of the company and sign jointly or singly on all papers and transactions.</p>
          <p>5- The Managing Director is authorized jointly to open bank accounts with any bank ${pronouns.subject} deems fit, operate and close the same, manage all the company bank accounts, issue, sign and endorse cheques and documents, withdraw, deposit, issue L/Cs, guarantees, transfers and sign on all applications related to the company activity.</p>
          <p>6- ${pronouns.subject === 'she' ? 'She is' : 'He is'} also empowered to purchase all equipment, vehicles, materials, supplies, goods and movable assets and dispose of or sell them when needed by company name.</p>
          <p>7- To sign all the tenders, contracts, documents or receipts of financial or commercial nature on behalf of the company.</p>
          <p>8- To appoint and dismiss employees and consultants and fix their duties and remuneration as per U.A.E. Labour Laws.</p>
          <p>9- To represent before all the ministries and local authorities for establishing this company and do any other work in connection therewith.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (11) - تابع</h3>
          <p>والموانئ والجمارك والمطارات وإدارة المرور والترخيص ودوائر الشرطة ومكاتب سمو الحاكم ووزارة الموارد البشرية والتوطين وكافة وزارات الدولة وكافة الدوائر الحكومية وشبه الحكومية الأخرى والمؤسسة العليا للمناطق الاقتصادية المتخصصة وجهاز حماية المنشآت والمرافق الحيوية والهيئة التجارية والمهنية والتوقيع مع او امام الجهات المذكورة على كافة الأوراق والمستندات والعقود المتعلقة بأمور الشركة والتوقيع مجتمعين او منفردين علي كافة الأوراق والمعاملات.</p>
          <p>5- مدير${pronouns.subjectAr === 'هي' ? 'ة' : ''} الإدارة مفوض${pronouns.subjectAr === 'هي' ? 'ة' : ''} مجتمعين فتح الحسابات المصرفية باسم الشركة لدى أي بنك يراه مناسباً وتشغيلها وإقفالها وإدارة كافة الحسابات المصرفية للشركة وإصدار وتوقيع وتظهير الشيكات والمستندات والسحب والإيداع وإصدار خطابات الاعتماد والكفالات والتحويلات وتوقيع كافة الطلبات المتعلقة بنشاط الشركة.</p>
          <p>6- ول${pronouns.subjectAr === 'هي' ? 'ها' : 'ه'} الحق شراء جميع المعدات والمركبات والمواد والمهمات والبضائع والمنقولات والتصرف بها أو بيعها عند الحاجة باسم الشركة.</p>
          <p>7- التوقيع على كافة العطاءات والعقود والمستندات والإيصالات ذات الصفة المالية أو التجارية نيابة عن الشركة.</p>
          <p>8- تعيين أو إنهاء خدمة الموظفين والمستشارين وتحديد واجباتهم ومكافآتهم وفقاً لقوانين العمل في دولة الإمارات العربية المتحدة.</p>
          <p>9- التمثيل أمام كافة الوزارات والسلطات المحلية لتأسيس هذه الشركة والقيام بأي عمل يتعلق بهذا الشأن.</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
