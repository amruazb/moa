import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page6(ctx: LLCAmendmentMOAContext, pageNum: number = 6): string {
  const { manager } = ctx

  return `
    <div class="page">
      <div class="page-content">
        
        <!-- Article 9 Amendment: Managing Director -->
        <div class="article-pair">
          <div class="block">
            <h3 class="bold underline">ARTICLE 3: AMENDMENT TO ARTICLE 9 - MANAGING DIRECTOR</h3>
            <p>The article 9 shall be amended as follows:</p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة 3: تعديل المادة 9 - المدير العام</h3>
            <p>تعديل المادة 9 كما يلي:</p>
          </div>
        </div>

        <!-- Managing Director Appointment -->
        <div class="article-pair">
          <div class="block">
            <p>The Partners have agreed <span class="edited">${manager.pronouns.title} ${manager.name}</span>, <span class="edited">${manager.nationality}</span> National, holder of ID Card No: <span class="edited">${manager.eid}</span>, shall be the Managing Director of the Company in all respects, including all managerial, Financial and commercial matters.</p>
          </div>
          <div class="block rtl">
            <p>اتفق الشركاء على أن يكون <span class="edited">${manager.pronouns.titleAr}/ ${manager.nameAr}</span>، <span class="edited">${manager.nationalityAr}</span> الجنسية، يحمل بطاقة هوية رقم: <span class="edited">${manager.eid}</span> المدير العام للشركة في جميع المجالات شاملة كافة المسائل الإدارية والمالية والتجارية.</p>
          </div>
        </div>

        <!-- Term of Appointment -->
        <div class="article-pair">
          <div class="block">
            <p>The Managing Director shall be appointed for unlimited period, unless otherwise is decided vide resolution passed by the General Assembly of the Company.</p>
          </div>
          <div class="block rtl">
            <p>يكون تعيين المدير العام لمدة غير محدودة، مالم يقرر خلاف ذلك عن طريق قرار صادر من الجمعية العمومية للشركة.</p>
          </div>
        </div>

        <!-- General Powers -->
        <div class="article-pair">
          <div class="block">
            <p>The Managing Director shall have all powers necessary for the management of the company, signing on its behalf and carrying out all acts required by its objectives.</p>
          </div>
          <div class="block rtl">
            <p>يكون للمدير العام كافة الصلاحيات الضرورية لإدارة الشركة والتوقيع نيابة عنها والقيام بجميع الاعمال التي تقتضيها أغراضها.</p>
          </div>
        </div>

        <!-- Management Assumption -->
        <div class="article-pair">
          <div class="block">
            <p><span class="edited">${manager.pronouns.title} ${manager.name}</span>, <span class="edited">${manager.nationality}</span> National, holder of ID Card No: <span class="edited">${manager.eid}</span>, resident of the Emirate of <span class="edited">${manager.address}</span> shall assume the company's management in their capacity as Managing Director for an unlimited period approved by general assembly.</p>
          </div>
          <div class="block rtl">
            <p>يتولى إدارة الشركة <span class="edited">${manager.pronouns.titleAr}/ ${manager.nameAr}</span>، <span class="edited">${manager.nationalityAr}</span> الجنسية، يحمل بطاقة هوية رقم: <span class="edited">${manager.eid}</span> المقيم بإمارة <span class="edited">${manager.addressAr}</span>، بصفته المدير العام للشركة ويباشره الإدارة لمدة غير محدودة تقررها الجمعية العمومية.</p>
          </div>
        </div>

        <!-- Powers of Managing Director -->
        <div class="article-pair">
          <div class="block">
            <p>The Managing Director shall have all necessary powers to manage the company and sign on its behalf (Individually or jointly) and carry out all acts required by its objectives. Power of the Managing Director include the following:</p>
          </div>
          <div class="block rtl">
            <p>يكون للمديرين كافة الصلاحيات الضرورية لادارة الشركة والتوقيع نيابة عنها (منفردين أو مجتمعين) والقيام بجميع الأعمال التي تقتضيها أغراضها. تتضمن سلطات المديرين ما يلي:</p>
          </div>
        </div>

        <!-- Power 1: Administrative Powers -->
        <div class="article-pair">
          <div class="block">
            <p><strong>•</strong> Carrying out all administrative, technical and financial aspects without limitation to the powers entrusted in them, including but not limited to.</p>
          </div>
          <div class="block rtl">
            <p><strong>•</strong> القيام بجميع الأعمال الإدارية والفنية والمالية وبدون الحد من شمولية والصلاحيات المعطاة لهم على سبيل المثال لا الحصر.</p>
          </div>
        </div>

        <!-- Power 2: Company Goals -->
        <div class="article-pair">
          <div class="block">
            <p><strong>•</strong> Carrying out the works required to achieve the company's goals and objectives.</p>
          </div>
          <div class="block rtl">
            <p><strong>•</strong> القيام بكافة الأعمال اللازمة لتحقيق أغراض الشركة وأهدافها.</p>
          </div>
        </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}

