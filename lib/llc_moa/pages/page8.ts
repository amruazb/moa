import { LLCMOAContext, pageFooter } from '../types'

export function page8(ctx: LLCMOAContext, pageNum: number = 8): string {
  const managers = ctx.managers?.length ? ctx.managers : [ctx.manager]
  const manager = managers[0]
  const multi = managers.length > 1
  const isMale = manager.salutation === 'mr'
  const directorLabel = multi ? 'أي من المديرين' : (isMale ? 'مدير الإدارة' : 'مديرة الإدارة')
  const possAr = multi ? 'لهم' : (isMale ? 'له' : 'لها')
  const subject = multi ? 'they' : manager.pronouns.subject
  const directorEn = multi ? 'Each Managing Director' : 'The Managing Director'
  const managingEn = multi ? 'Each Managing Director' : 'The managing Director'
  const theyEn = multi ? 'they' : manager.pronouns.subject
  const item6En = multi
    ? 'Each Managing Director is also empowered to purchase all equipment\'s, vehicles, materials, supplies, goods and movable assets and dispose of or sell them when needed by company name'
    : `${manager.pronouns.subject === 'she' ? 'She is' : 'He is'} also empowered to purchase all equipment's, vehicles, materials, supplies, goods and movable assets and dispose of or sell them when needed by company name`

  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <p>3- Concluding commercial contracts in the name of the Company, contracts covered by the Company activity and related thereto.</p>
          <p>4- ${directorEn} shall represent the Company before all government, local and federal departments and private companies such as Ministry, Department of Economic Development, Municipalities, UAE Chambers, Seaports, Customs, Airports, Traffic and Licensing Department, Police Departments, Ruler's Offices, Ministry of Human Resources and Emiratization, And All Ministry Of Nation, All Other Governmental And Semi-Governmental Departments, Higher Corporation for Specialized Economic Zones, Critical National Infrastructure Authority, Federal Tax Authority, TAMM, all companies and commercial and professional entities, and to sign all documents, papers and contracts with / before them and/or do any other acts, deeds or things that may be related to the affairs of the company and sign on all papers and transactions, whether individually or jointly.</p>
          <p>5- ${managingEn} is authorized to open bank accounts in the name of the company at any bank ${theyEn} may deem fit, operate and close the same, mange all the company bank accounts, issue, sign and endorse cheques and documents, withdraw, L/Cs, guarantees, transfers and sign on all application related to the company activity and ${subject} ${multi ? 'are' : 'is'} also authorized to operate the account via online or offline banking. And ${subject} ${multi ? 'have' : 'has'} the right to obtain loans from any banks in United Arab Emirates, whether individually or jointly.</p>
          <p>6- ${item6En}</p>
        </div>
        <div class="block rtl">
          <p>3- إبرام العقود التجارية باسم الشركة وهي العقود التي يكون ضمن نشاط الشركة والمتصلة بها.</p>
          <p>4- يقوم ${directorLabel} بتمثيل الشركة لدى كافة المؤسسات الحكومية وشبه الحكومية والمحلية والاتحادية والمؤسسات الخاصة والشركات مثل دائرة التنمية الاقتصادية والبلديات وغرف الدولة ، والموانيء والجمارك والمطارات وإدارة المرور والترخيص وديوان الشرطة ومكاتب سمو الحاكم ووزارة الموارد البشرية والتوطين وكافة وزارات الدولة وكافة الدوائر الحكومية وشبه الحكومية الأخرى والمؤسسة العليا للمناطق الاقتصادية المتخصصة وجهاز حماية المنشآت والمرافق الحيوية والبيئة الاتحادية للضرائب وتم والهيئة التجارية والمهنية والتوقيع مع او امام الجهات المذكورة على كافة الأوراق والمستندات والعقود المتعلقة بأمور الشركة والتوقيع على كافة الأوراق والمعاملات منفرداً أو مجتمعين.</p>
          <p>5- ${directorLabel} مفوض لفتح الحسابات المصرفية باسم الشركة لدى اي بنك يراه مناسباً وتشغيلها واقفالها وإدارة جميع الحسابات المصرفية للشركة وإصدار وتوقيع وتظهير الشيكات والمستندات والسحب والإيداع وإصدار خطابات الاعتماد والكفالات والتحويلات وتوقيع كافة الطلبات المتعلقة بنشاط الشركة و${possAr} الحق في إدارة الحساب بواسطة الإنترنت أو الهاتف. و${possAr} الحق في الحصول على قروض من اي بنك في الإمارات العربية المتحدة منفرداً أو مجتمعين</p>
          <p>6- و${possAr} الحق شراء جميع المعدات والمركبات والمواد والمهمات والبضائع والمنقولات والتصرف بها أو بيعها عند الحاجة باسم الشركة</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
