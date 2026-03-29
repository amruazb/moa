import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page7(ctx: LLCAmendmentMOAContext, pageNum: number = 7): string {
  return `
    <div class="page">
      <div class="page-content">

        <!-- Power 3: Commercial Contracts -->
        <div class="article-pair">
          <div class="block">
            <p><strong>2.</strong> Concluding commercial contracts in the name of the Company, contracts covered by the Company activity and related thereto.</p>
          </div>
          <div class="block rtl">
            <p><strong>2.</strong> إبرام العقود التجارية باسم الشركة وهي العقود التي يكون ضمن نشاط الشركة والمتصلة به.</p>
          </div>
        </div>

        <!-- Power 3: Representation -->
        <div class="article-pair">
          <div class="block">
            <p><strong>3.</strong> To represent the Company before all government, local and federal departments, private companies and establishments, to sign jointly on all papers and transactions, to represent the Company before all courts, in all lawsuits filed by or against the Company, and to appoint one or more advocates and dismiss them.</p>
          </div>
          <div class="block rtl">
            <p><strong>3.</strong> تمثيل الشركة أمام جميع الجهات الحكومية والمحلية والاتحادية والشركات والمؤسسات الخاصة، والتوقيع مجتمعين على كافة الأوراق والمعاملات، وتمثيل الشركة أمام جميع المحاكم في الدعاوى المقامة من الشركة أو ضدها، وتعيين محام أو أكثر وعزلهم.</p>
          </div>
        </div>

        <!-- Power 4: Financial Statements -->
        <div class="article-pair">
          <div class="block">
            <p><strong>4.</strong> To prepare annual Balance Sheet, Profit and Loss Account, and annual report on the Company's activity and financial position, including their recommendations for profit distribution by 31 December of each year, and to deposit the same with the competent authority following approval.</p>
          </div>
          <div class="block rtl">
            <p><strong>4.</strong> إعداد الميزانية العمومية السنوية وحساب الأرباح والخسائر والتقرير السنوي عن نشاط الشركة ومركزها المالي، بما في ذلك توصيات توزيع الأرباح قبل 31 ديسمبر من كل سنة، وإيداع ذلك لدى الجهة المختصة بعد الاعتماد.</p>
          </div>
        </div>

        <!-- Power 5: Government Authorities -->
        <div class="article-pair">
          <div class="block">
            <p><strong>5.</strong> He is authorized to sign, submit, collect, and follow up on related documents with all local authorities, government, semi-government, private sector organizations, and individuals in the UAE. These organizations include, but are not limited to, the General Directorate of Residency & Foreigners Affairs, Ministry of Human Resources and Emiratisation, Department of Municipal Affairs, Chamber of Commerce and Industry, Police Stations, seaports, customs, airports, TAQA Distribution (formerly ADDC and AADC), Water and Electricity Authority, Etisalat, Du, post offices, Courts, Traffic, Ministry of Health, Department of Culture and Tourism, Department of Economic Development Abu Dhabi, Federal Tax Authority, TAMM, Health Insurance, Daman, and all companies, establishments, or other business entities. He is also authorized to sign all papers and contracts with or before such authorities.</p>
          </div>
          <div class="block rtl">
            <p><strong>5.</strong> وهو مفوض بالتوقيع، وتقديم، واستلام، ومتابعة المستندات المتعلقة بجميع الدوائر الحكومية، وشبه الحكومية، والمؤسسات الخاصة، والأفراد في دولة الإمارات العربية المتحدة، على سبيل المثال، ولكن دون حصر: الإدارة العامة للإقامة وشؤون الأجانب، وزارة الموارد البشرية والتوطين، دائرة الشؤون البلدية، غرفة التجارة والصناعة، مراكز الشرطة، الموانئ، الجمارك، المطارات، توزيع طاقة، اتصالات، شركة دو، مراكز البريد، المحاكم، المرور، وزارة الصحة، دائرة الثقافة والسياحة، دائرة التنمية الاقتصادية - أبوظبي، الهيئة الاتحادية للضرائب، تم، التأمين الصحي، ضمان، وجميع الشركات، والمؤسسات، أو الأعمال التجارية الأخرى. كما يُخوَّل بالتوقيع على كافة الأوراق والعقود مع أو أمام الجهات المذكورة.</p>
          </div>
        </div>

        <!-- Power 6: HR Management -->
        <div class="article-pair">
          <div class="block">
            <p><strong>6.</strong> To appoint and dismiss employees and consultants and fix their duties and remuneration as per U.A.E. Labour Laws.</p>
          </div>
          <div class="block rtl">
            <p><strong>6.</strong> تعيين أو إنهاء خدمة الموظفين والمستشارين وتحديد واجباتهم ومكافآتهم وفقا لقوانين العمل بدولة الإمارات العربية المتحدة.</p>
          </div>
        </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}

