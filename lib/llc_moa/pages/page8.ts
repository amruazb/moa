import { LLCMOAContext, pageFooter } from '../types'

export function page8(ctx: LLCMOAContext, pageNum: number = 8): string {
  const { manager } = ctx
  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <p>3- Concluding commercial contracts in the name of the Company, contracts covered by the Company activity and related thereto.</p>
          <p>4- The Managing Director shall represent the Company before all government, local and federal departments and private companies such as Ministry, Department of Economic Development, Municipalities, UAE Chambers, Seaports, Customs, Airports, Traffic and Licensing Department, Police Departments, Ruler's Offices, Ministry of Human Resources and Emiratization, And All Ministry Of Nation, All Other Governmental And Semi-Governmental Departments, Higher Corporation for Specialized Economic Zones, Critical National Infrastructure Authority, Federal Tax Authority, TAMM, all companies and commercial and professional entities, and to sign all documents, papers and contracts with / before them and/or do any other acts, deeds or things that may be related to the affairs of the company and sign on all papers and transactions.</p>
          <p>5- The managing Director is authorized to open bank accounts in the name of the company at any bank ${manager.pronouns.subject} may deem fit, operate and close the same, mange all the company bank accounts, issue, sign and endorse cheques and documents, withdraw, L/Cs, guarantees, transfers and sign on all application related to the company activity and ${manager.pronouns.subject} is also authorized to operate the account via online or offline banking. And ${manager.pronouns.subject} has the right to obtain loans from any banks in United Arab Emirates.</p>
          <p>6- ${manager.pronouns.subject === 'she' ? 'She is' : 'He is'} also empowered to purchase all equipment's, vehicles, materials, supplies, goods and movable assets and dispose of or sell them when needed by company name</p>
        </div>
        <div class="block rtl">
          <p>3- إبرام العقود التجارية باسم الشركة وهي العقود التي يكون ضمن نشاط الشركة والمتصلة بها.</p>
          <p>4- تقوم مديرة الإدارة بتمثيل الشركة لدى كافة المؤسسات الحكومية وشبه الحكومية والمحلية والاتحادية والمؤسسات الخاصة والشركات مثل دائرة التنمية الاقتصادية والبلديات وغرف الدولة ، والموانيء والجمارك والمطارات وإدارة المرور والترخيص وديوان الشرطة ومكاتب سمو الحاكم ووزارة الموارد البشرية والتوطين وكافة وزارات الدولة وكافة الدوائر الحكومية وشبه الحكومية الأخرى والمؤسسة العليا للمناطق الاقتصادية المتخصصة وجهاز حماية المنشآت والمرافق الحيوية والبيئة الاتحادية للضرائب وتم والهيئة التجارية والمهنية والتوقيع مع او امام الجهات المذكورة على كافة الأوراق والمستندات والعقود المتعلقة بأمور الشركة والتوقيع على كافة الأوراق والمعاملات.</p>
          <p>5- مسيرة الإدارة مفوض لفتح الحسابات المصرفية باسم الشركة لدى اي بنك يراه مناسباً وتشغيلها واقفالها وإدارة جميع الحسابات المصرفية للشركة وإصدار وتوقيع وتظهير الشيكات والمستندات والسحب والإيداع وإصدار خطابات الاعتماد والكفالات والتحويلات وتوقيع كافة الطلبات المتعلقة بنشاط الشركة ولها الحق في إدارة الحساب بواسطة الإنترنت أو الهاتف. ولها الحق في الحصول على قروض من اي بنك في الإمارات العربية المتحدة</p>
          <p>6- ولها الحق شراء جميع المعدات والمركبات والمواد والمهمات والبضائع والمنقولات والتصرف بها أو بيعها عند الحاجة باسم الشركة</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
