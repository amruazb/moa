import { LLCMOAContext, pageFooter, listManagersEn, listManagersAr } from '../types'

export function page7(ctx: LLCMOAContext, pageNum: number = 7): string {
  const managers = ctx.managers?.length ? ctx.managers : [ctx.manager]
  const manager = managers[0]
  const multi = managers.length > 1
  const isMale = manager.salutation === 'mr'
  const possAr = isMale ? 'له' : 'لها'
  const directorAr = isMale ? 'المدير التنفيذي' : 'المديرة التنفيذية'
  const appointmentEn = listManagersEn(managers)
  const appointmentAr = listManagersAr(managers)
  const roleEn = multi ? 'Managing Directors' : 'Managing director'
  const roleAr = multi ? 'المديران العامان' : (isMale ? 'المدير العام' : 'المديرة العامة')
  const periodEn = multi
    ? 'each for an unlimited period. Each Managing Director shall have the widest powers and authorities to manage, represent the Company and to carry out all acts required by its objects, whether individually or jointly, including but not limited to the following:'
    : 'for an unlimited period. The Managing director shall has the widest powers and authorities to manage, represent the Company and to carry out all acts required by its objects, including but not limited to the following:'
  const periodAr = multi
    ? 'كل منهما لفترة غير محدودة. ويكون لكل منهما أوسع السلطات في إدارة وتمثيل الشركة والتوقيع باسمها منفرداً أو مجتمعين والقيام بجميع الأعمال التي تتطلبها أغراضها ويشمل ذلك دون حصر:'
    : `لفترة غير محدودة. وتكون ${possAr} أوسع السلطات في إدارة وتمثيل الشركة والتوقيع باسمها والقيام بجميع الأعمال التي تتطلبها أغراضها ويشمل ذلك دون حصر:`
  const article11TitleEn = multi ? 'Powers of Managing Directors' : 'Powers of Managing Director'
  const article11TitleAr = multi ? 'صلاحيات المديرين' : 'صلاحيات المدير'
  const article11En = multi
    ? 'Each Managing Director shall have all necessary powers to manage the company and sign on its behalf individually or jointly as required by its objectives. Powers of each Managing Director include the following:'
    : 'The Managing Director shall have all necessary powers to manage the company and sign on its behalf specifically and collectively as required by its objectives. Powers of the Managing Director include the following:'
  const article11Ar = multi
    ? 'تكون لكل من المديرين كافة الصلاحيات الضرورية لإدارة الشركة والتوقيع نيابة عنها منفرداً أو مجتمعين وللقيام بجميع الأعمال التي تقتضيها أغراضها. تتضمن سلطات كل مدير ما يلي:'
    : `تكون ل${directorAr} كافة الصلاحيات الضرورية لإدارة الشركة والتوقيع نيابة عنه منفرداً وللقيام بجميع الأعمال التي تقتضيها أغراضها. تتضمن سلطات ${directorAr} ما يلي:`
  const powersObjectEn = multi ? 'each of them' : manager.pronouns.object
  const powersPossAr = multi ? 'لهم' : possAr

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
          <h3 class="underline center">Article (10): Company Management</h3>
          <p>The Shareholders have agreed that the management of the Company shall be governed by the ${roleEn} ${appointmentEn}, ${periodEn}</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (10): إدارة الشركة</h3>
          <p>اتفق الشركاء على أن يتولى إدارة الشركة ${roleAr} ${appointmentAr}، ${periodAr}</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (11): ${article11TitleEn}</h3>
          <p>${article11En}</p>
          <p>1- Carrying out all administrative, technical and financial aspects without limitation to the powers entrusted in ${powersObjectEn}, being without limitation.</p>
          <p>2- Carrying out the works required to achieve the company's goals and purpose.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (11): ${article11TitleAr}</h3>
          <p>${article11Ar}</p>
          <p>1- القيام بجميع الأعمال الإدارية الفنية والمالية وبدون الحد من شمولية البيانات والصلاحيات المعطاة ${powersPossAr} بدون حصر.</p>
          <p>2- القيام بكافة الأعمال اللازمة لتحقيق أغراض الشركة وأهدافها.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
