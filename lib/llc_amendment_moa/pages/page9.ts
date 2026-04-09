import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page9(ctx: LLCAmendmentMOAContext, pageNum: number = 8): string {
  const p = ctx.powers

  const block9a = p.approachCourts
    ? `
        <div class="article-pair">
          <div class="block">
            <p><strong>8-3-9.</strong> The Managing Directors shall have the right to approach all courts of various instances and types with regard to all cases of the Company as plaintiff or defendant, file reports with Police Stations and Public Prosecutions, withdraw the same, lodge lawsuits before courts of all types and degrees and Public Prosecutions, </p>
          </div>
          <div class="block rtl">
            <p><strong>8-3-9.</strong> يحق للمديرين مراجعة جميع المحاكم على اختلاف درجاتها وأنواعها بخصوص قضايا الشركة بصفتها مدعية أو مدعى عليها، وتقديم البلاغات لدى مراكز الشرطة والنيابة العامة وسحبها، ورفع الدعاوى أمام جميع المحاكم والنيابات، </p>
          </div>
        </div>`
    : ''

  const block9b = p.approachCourts
    ? `
        <div class="article-pair">
          <div class="block">
            <p>declare, deny and waive, settle, reconcile, arbitrate, accept, take and reject oath, abandon hostility, waive judgments in whole or in part through means of challenge, lift attachment, abandon securities while keeping debt intact, claim forgery, and object to judge or expert.</p>
          </div>
          <div class="block rtl">
            <p>والإقرار والإنكار والتنازل والصلح والتوفيق والتحكيم وقبول وتوجيه ورد اليمين وترك الخصومة، والتنازل عن الأحكام كليا أو جزئيا بطريق الطعن، ورفع الحجز وترك التأمينات مع بقاء الدين، والادعاء بالتزوير ورد القاضي أو الخبير.</p>
          </div>
        </div>`
    : ''

  const block10 = `
        <div class="article-pair">
          <div class="block">
            <p><strong>8-3-10.</strong> The Managing Directors may delegate others with all or part of the aforesaid authorities to conduct the Company businesses by way of a Power of Attorney.</p>
          </div>
          <div class="block rtl">
            <p><strong>8-3-10.</strong> يجوز للمديرين تفويض الغير بكل أو بعض الصلاحيات المذكورة أعلاه لمباشرة أعمال الشركة بموجب وكالة.</p>
          </div>
        </div>`

  const block11 = `
        <div class="article-pair">
          <div class="block">
            <p><strong>8-3-11.</strong> The Managing Directors are authorized to practice all their aforesaid powers whether singly or jointly to achieve the Company's goals and purpose.</p>
          </div>
          <div class="block rtl">
            <p><strong>8-3-11.</strong> للمديرين صلاحية ممارسة جميع السلطات المشار إليها أعلاه منفردين أو مجتمعين لتحقيق أغراض الشركة وأهدافها.</p>
          </div>
        </div>`

  const block84 = `
        <div class="article-pair">
          <div class="block">
            <p><strong>8-4</strong> The Managing Directors, with mutual consent and as agreed upon, are entitled to charge salary to the General Expenses Account, in addition to recovery of representation, travel and transport expenses as well as their right to receive their share in the profits.</p>
          </div>
          <div class="block rtl">
            <p><strong>8-4</strong> يحق للمديرين، وبموافقة متبادلة ووفقا لما يتم الاتفاق عليه، تحميل رواتبهم على حساب المصروفات العمومية، إضافة إلى استرداد مصروفات التمثيل والسفر والنقل، وكذلك حقهم في استلام نصيبهم من الأرباح.</p>
          </div>
        </div>`

  const block12 = p.banks
    ? `
        <div class="article-pair">
          <div class="block">
            <p><strong>8-3-12.</strong> He is authorized to sign cheques and transactions related thereto.</p>
          </div>
          <div class="block rtl">
            <p><strong>8-3-12.</strong> وهو مفوض بالتوقيع على الشيكات والمعاملات المتعلقة بها.</p>
          </div>
        </div>`
    : ''

  const closingArticles = block10 + block11 + block12 + block84

  return `
    <div class="page">
      <div class="page-content">

        ${block9a}
        ${block9b}
        ${closingArticles}

        <!-- Partners' Acknowledgment -->
        <div class="article-pair" style="margin-top: 30px;">
          <div class="block">
            <p>The First and Second Party undertake that they had received all their entitlements from the company.</p>
          </div>
          <div class="block rtl">
            <p>يقر الطرف الأول والثاني بأنهما قد استلما كافة حقوقهما من الشركة.</p>
          </div>
        </div>

      </div>
      ${pageFooter(pageNum, false)}
    </div>`
}
