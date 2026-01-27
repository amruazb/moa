import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page7(ctx: LLCAmendmentMOAContext, pageNum: number = 7): string {
  return `
    <div class="page">
      <div class="page-content">

        <!-- Power 3: Commercial Contracts -->
        <div class="article-pair">
          <div class="block">
            <p><strong>•</strong> Concluding commercial contracts in the name of the Company, contracts covered by the Company activity and related thereto.</p>
          </div>
          <div class="block rtl">
            <p><strong>•</strong> إبرام العقود التجارية باسم الشركة وهي العقود التي يكون ضمن نشاط الشركة والمتصلة به.</p>
          </div>
        </div>

        <!-- Power 4: Government Authorities -->
        <div class="article-pair">
          <div class="block">
            <p><strong>•</strong> He is authorized to sign, submit, collect, and follow up on related documents with all local authorities, government, semi-government, private sector organizations, and individuals in the UAE. These organizations include, but are not limited to, the General Directorate of Residency & Foreigners Affairs, Ministry of Human Resources and Emiratisation, Department of Municipal Affairs, Chamber of Commerce & Industry, Police Stations, seaports, customs, airports, TAQA Distribution (formerly ADDC & AADC), Water & Electricity Authority, Etisalat, Du, post offices, Courts, Traffic, Ministry of Health, Department of Culture and Tourism, Department of Economic Development Abu Dhabi, Federal Tax Authority, TAMM, Health Insurance, Daman, and all companies, establishments, or other business entities. He is also authorized to sign all papers and contracts with or before such authorities.</p>
          </div>
          <div class="block rtl">
            <p><strong>•</strong> وهو مفوض بالتوقيع، وتقديم، واستلام، ومتابعة المستندات المتعلقة بجميع الدوائر الحكومية، وشبه الحكومية، والمؤسسات الخاصة، والأفراد في دولة الإمارات العربية المتحدة، على سبيل المثال، ولكن دون حصر: الإدارة العامة للإقامة وشؤون الأجانب، وزارة الموارد البشرية والتوطين، دائرة الشؤون البلدية، غرفة التجارة والصناعة، مراكز الشرطة، الموانئ، الجمارك، المطارات، توزيع طاقة، اتصالات، شركة دو، مراكز البريد، المحاكم، المرور، وزارة الصحة، دائرة الثقافة والسياحة، دائرة التنمية الاقتصادية - أبوظبي، الهيئة الاتحادية للضرائب، تم، التأمين الصحي، ضمان، وجميع الشركات، والمؤسسات، أو الأعمال التجارية الأخرى. كما يُخوَّل بالتوقيع على كافة الأوراق والعقود مع أو أمام الجهات المذكورة.</p>
          </div>
        </div>

        <!-- Power 5: HR Management -->
        <div class="article-pair">
          <div class="block">
            <p><strong>•</strong> To appoint and dismiss employees and consultants and fix their duties and remuneration as per U.A.E. Labour Laws.</p>
          </div>
          <div class="block rtl">
            <p><strong>•</strong> تعيين أو إنهاء خدمة الموظفين والمستشارين و تحديد واجباتهم ومكافأتهم وفقا لقوانين العمل بدولة الامارات العربية المتحدة.</p>
          </div>
        </div>

        <!-- Power 6: Banking -->
        <div class="article-pair">
          <div class="block">
            <p><strong>•</strong> The Managing Director can open, manage, and close bank accounts in the name of the company with any bank they choose. They can handle all banking matters like signing documents, withdrawing and depositing money, issuing guarantees, letters of credit, making transfers, and signing any forms related to the company's work. They can also use online and phone banking. However, they are not allowed to take any loans or do anything related to loans.</p>
          </div>
          <div class="block rtl">
            <p><strong>•</strong> المدير العام يمكن فتح الحسابات المصرفية باسم الشركة في أي بنك يختارانه، ويمكنهما إدارة هذه الحسابات أو إغلاقها. كما يمكنهما التعامل مع جميع الأمور البنكية مثل توقيع المستندات، السحب والإيداع، إصدار الكفالات، خطابات الاعتماد، التحويلات، وتوقيع أي نماذج تخص نشاط الشركة. ويمكنهما استخدام الخدمات المصرفية عبر الإنترنت أو الهاتف. لكن لا يحق لهما أخذ أي قروض أو القيام بأي نشاط متعلق بالقروض.</p>
          </div>
        </div>

        <!-- Partners' Acknowledgment -->
        <div class="article-pair">
          <div class="block">
            <p>The First and Second Party undertake that they had received all their entitlements from the company.</p>
          </div>
          <div class="block rtl">
            <p>يقر الطرف الاول والثاني بأنهما قد استلما كافة حقوقهما من الشركة.</p>
          </div>
        </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}

