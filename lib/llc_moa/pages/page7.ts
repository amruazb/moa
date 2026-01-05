import { LLCMOAContext, pageFooter } from '../types'

export function page7(ctx: LLCMOAContext, pageNum: number = 7): string {
  const { manager } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <p>3. Cases of assignment of shares and transfer of ownership thereof, indicating the dates and signature of the assigner and assignee, in case of disposal of the shares between the existing Partners and signature of the Managing Director and the person to whom the shares devolved, in case of transfer by inheritance.</p>
        </div>
        <div class="block rtl">
          <p>3- حالات التنازل عن الحصص وانتقال ملكيتها مع بيان تاريخ وتوقيع المتنازل والمتنازل إليه في حالة التصرف بين الأحياء وتوقيع المدير المفوض ومن آلت إليه الحصص في حالة الانتقال بطريق الميراث.</p>
        </div>
      </div>

      <div class="section-bar"><span>CHAPTER III</span><span class="rtl">الباب الثالث</span></div>
      <div class="section-bar"><span>Company Management</span><span class="rtl">إدارة الشركة</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (10)</h3>
          <p>The Shareholders have agreed that the management of the Company shall be governed by the Managing director <strong class="edited">${manager.pronouns.title} ${manager.name}</strong> <span class="edited">${manager.nationality}</span> national, holding Passport No: <span class="edited">${manager.id}</span>, for an unlimited period. The Managing director shall has the widest powers and authorities to manage, represent the Company and to carry out all acts required by its objects, including but not limited to the following:</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (10)</h3>
          <p>اتفق الشركاء على أن يتولى إدارة الشركة المدير العامة <strong class="edited">${manager.pronouns.titleAr}/ ${manager.nameAr}</strong>، الجنسية <span class="edited">${manager.nationalityAr}</span> تحمل جواز السفر رقم: <span class="edited">${manager.id}</span>، لفترة غير محدودة. وتكون لها أوسع السلطات في إدارة وتمثيل الشركة والتوقيع باسمها والقيام بجميع الأعمال التي تتطلبها أغراضها ويشمل ذلك دون حصر:</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (11)</h3>
          <p>The Managing Director shall have all necessary powers to manage the company and sign on its behalf specifically and collectively as required by its objectives. Powers of the Managing Director include the following:</p>
          <p>1- Carrying out all administrative, technical and financial aspects without limitation to the powers entrusted in her, being without limitation.</p>
          <p>2- Carrying out the works required to achieve the company's goals and purpose.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (11)</h3>
          <p>تكون للمديرة التنفيذية كافة الصلاحيات الضرورية لإدارة الشركة والتوقيع نيابة عنه منفرداً وللقيام بجميع الأعمال التي تقتضيها أغراضها. تتضمن سلطات المديرة التنفيذية ما يلي:</p>
          <p>1- القيام بجميع الأعمال الإدارية الفنية والمالية وبدون الحد من شمولية البيانات والصلاحيات المعطاة لها بدون حصر.</p>
          <p>2- القيام بكافة الأعمال اللازمة لتحقيق أغراض الشركة وأهدافها.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
