import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page6(ctx: LLCAmendmentMOAContext, pageNum: number = 6): string {
  const { manager } = ctx

  return `
    <div class="page">
      <div class="page-content">
        
        <!-- Article 8 Amendment: Management of the Company -->
        <div class="article-pair">
          <div class="block">
            <h3 class="bold underline">ARTICLE 3: AMENDMENT TO ARTICLE 8 - MANAGEMENT OF THE COMPANY</h3>
            <p>The Partners have agreed to amend Article 8 of the Memorandum of Association. The article 8 shall be amended as follows:</p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة 3: تعديل المادة 8 - إدارة الشركة</h3>
            <p>اتفق الشركاء على تعديل المادة 8 من عقد التأسيس. تُعدل المادة 8 على النحو التالي:</p>
          </div>
        </div>

        <!-- Article 8 -->
        <div class="article-pair">
          <div class="block">
            <p style="margin-left: 20px;">
              <strong>8-1</strong> The Partners have agreed that the management of the Company shall be entrusted to <span class="edited">${manager.pronouns.title} ${manager.name}</span>, <span class="edited">${manager.nationality}</span> national, holder of ID Card No: <span class="edited">${manager.eid}</span>, in his capacity as the Managing Director.
            </p>
            <p style="margin-left: 20px;">
              <strong>8-2</strong> The Managing Director shall be subject to removal in accordance with the Commercial Companies Law or by virtue of a resolution issued from the General Assembly.
            </p>
          </div>
          <div class="block rtl">
            <p style="margin-right: 20px;">
              <strong>8-1</strong> اتفق الشركاء على أن تُعهد إدارة الشركة إلى <span class="edited">${manager.pronouns.titleAr}/ ${manager.nameAr}</span>، <span class="edited">${manager.nationalityAr}</span> الجنسية، يحمل بطاقة هوية رقم: <span class="edited">${manager.eid}</span>، بصفته المدير العام.
            </p>
            <p style="margin-right: 20px;">
              <strong>8-2</strong> يخضع المدير العام للعزل وفقاً لقانون الشركات التجارية أو بموجب قرار صادر عن الجمعية العامة.
            </p>
          </div>
        </div>

        <!-- Management Assumption -->
        <div class="article-pair">
          <div class="block">
            <p><span class="edited">${manager.pronouns.title} ${manager.name}</span>, <span class="edited">${manager.nationality}</span> National, holder of ID Card No: <span class="edited">${manager.eid}</span>, resident of <span class="edited">${manager.address}</span>, shall assume the company's management in his capacity as Managing Director for an unlimited period as approved by the Partners.</p>
          </div>
          <div class="block rtl">
            <p>يتولى إدارة الشركة <span class="edited">${manager.pronouns.titleAr}/ ${manager.nameAr}</span>، <span class="edited">${manager.nationalityAr}</span> الجنسية، يحمل بطاقة هوية رقم: <span class="edited">${manager.eid}</span> المقيم في <span class="edited">${manager.addressAr}</span>، بصفته المدير العام للشركة ويباشر الإدارة لمدة غير محدودة كما وافق الشركاء.</p>
          </div>
        </div>

        <!-- Powers of Managing Director -->
        <div class="article-pair">
          <div class="block">
            <p><strong>8-3</strong> The Powers of the Managing Directors include the following:</p>
          </div>
          <div class="block rtl">
            <p><strong>8-3</strong> تشمل صلاحيات المديرين ما يلي:</p>
          </div>
        </div>

        <!-- Power 0: Existing Powers Continue -->
        <div class="article-pair">
          <div class="block">
            <p><strong>•</strong> All rights, authorities, and powers granted to the Managing Director under the previous Memorandum of Association shall remain in full force and effect and shall be deemed an integral part of this amended Memorandum. Nothing in this amendment shall be construed as limiting or revoking any of the Managing Director's existing powers.</p>
          </div>
          <div class="block rtl">
            <p><strong>•</strong> تظل جميع الحقوق والصلاحيات والسلطات الممنوحة للمدير العام بموجب عقد التأسيس السابق سارية ونافذة بالكامل، وتعد جزءا لا يتجزأ من عقد التأسيس المعدل. ولا يجوز تفسير أي حكم في هذا التعديل على أنه يحد من أي من صلاحيات المدير العام القائمة أو يلغيها.</p>
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
            <p><strong>1.</strong> Carrying out the works required to achieve the Company's goals and purpose.</p>
          </div>
          <div class="block rtl">
            <p><strong>1.</strong> القيام بكافة الأعمال اللازمة لتحقيق أغراض الشركة وأهدافها.</p>
          </div>
        </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}

