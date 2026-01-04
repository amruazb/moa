import { LLCMOAContext, pageFooter } from '../types'

export function page7(ctx: LLCMOAContext, pageNum: number = 7): string {
    const { manager } = ctx

    return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (9)</h3>
          <h3 class="underline center">PARTNERS REGISTER</h3>
          <p>A special register for partners shall be maintained at the Company's head office containing the following:</p>
          <ol class="list">
            <li>Names of the Partners, their nationalities and domiciles</li>
            <li>Number of shares held by each Partner and the amounts paid</li>
            <li>Cases of assignment of shares and transfer of ownership thereof, indicating the date and signature of the assignor and assignee in case of disposal between existing partners, and signature of the Managing Director and the person to whom the shares devolved in case of transfer by inheritance</li>
          </ol>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (9)</h3>
          <h3 class="underline center">سجل الشركاء</h3>
          <p>يحتفظ في مقر الشركة الرئيسي بسجل خاص للشركاء يتضمن ما يلي:</p>
          <ol class="list">
            <li>أسماء الشركاء وجنسياتهم ومحال إقامتهم</li>
            <li>عدد الحصص التي يملكها كل شريك ومقدار ما دفعه</li>
            <li>حالات التنازل عن الحصص وانتقال ملكيتها مع بيان تاريخ وتوقيع المتنازل والمتنازل إليه في حالة التصرف بين الشركاء، وتوقيع المدير ومن آلت إليه الحصص في حالة الانتقال بطريق الميراث</li>
          </ol>
        </div>
      </div>

      <div class="section-bar"><span>CHAPTER THREE: MANAGEMENT</span><span class="rtl">الباب الثالث: الإدارة</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (10)</h3>
          <h3 class="underline center">MANAGEMENT OF THE COMPANY</h3>
          <p>The Company shall be managed by one or more directors who may or may not be partners.</p>
          <p>The partners hereby appoint <strong class="edited">${manager.pronouns.title} ${manager.name}</strong>, holder of Emirates ID No: <span class="edited">${manager.id}</span>, as the Managing Director of the Company.</p>
          <p>The Managing Director shall have full authority to manage the Company and represent it before all courts, government departments, private entities, and third parties.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (10)</h3>
          <h3 class="underline center">إدارة الشركة</h3>
          <p>تدار الشركة بواسطة مدير أو أكثر سواء كانوا من الشركاء أم من غيرهم.</p>
          <p>ويعين الشركاء بموجب هذا العقد <strong class="edited">${manager.pronouns.titleAr}/ ${manager.nameAr}</strong>، حامل بطاقة هوية رقم: <span class="edited">${manager.id}</span>، مديراً للشركة.</p>
          <p>ويكون للمدير كامل الصلاحيات لإدارة الشركة وتمثيلها أمام جميع المحاكم والدوائر الحكومية والجهات الخاصة والغير.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (11)</h3>
          <h3 class="underline center">POWERS OF THE MANAGING DIRECTOR</h3>
          <p>The Managing Director shall have the following powers, without limitation:</p>
          <ol class="list">
            <li>Represent the Company before all courts, government departments, and private entities</li>
            <li>Sign contracts, agreements, and documents on behalf of the Company</li>
            <li>Open and operate bank accounts, sign cheques, and manage Company funds</li>
            <li>Appoint, dismiss, and determine the salaries of employees</li>
            <li>Delegate any of the above powers to others</li>
          </ol>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (11)</h3>
          <h3 class="underline center">صلاحيات المدير</h3>
          <p>يكون للمدير الصلاحيات التالية دون حصر:</p>
          <ol class="list">
            <li>تمثيل الشركة أمام جميع المحاكم والدوائر الحكومية والجهات الخاصة</li>
            <li>توقيع العقود والاتفاقيات والمستندات نيابة عن الشركة</li>
            <li>فتح وتشغيل الحسابات البنكية وتوقيع الشيكات وإدارة أموال الشركة</li>
            <li>تعيين وفصل وتحديد رواتب الموظفين</li>
            <li>تفويض أي من الصلاحيات المذكورة أعلاه للغير</li>
          </ol>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
