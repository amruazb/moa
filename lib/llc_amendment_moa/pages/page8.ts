import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page8(ctx: LLCAmendmentMOAContext, pageNum: number = 8): string {
  return `
    <div class="page">
      <div class="page-content">

        <!-- Power 7: Bank Accounts -->
        <div class="article-pair">
          <div class="block">
            <p><strong>7.</strong> The Managing Directors are authorized to open bank accounts in the name of the Company at any bank they deem fit, operate and close the same, manage all Company bank accounts, issue, sign and endorse cheques and documents, withdraw, deposit, issue letters of credit, guarantees and transfers, and sign all applications related to the Company activity.</p>
          </div>
          <div class="block rtl">
            <p><strong>7.</strong> يحق للمديرين فتح الحسابات المصرفية باسم الشركة لدى أي بنك يرونه مناسبا، وتشغيلها وإغلاقها، وإدارة جميع الحسابات المصرفية للشركة، وإصدار الشيكات والمستندات وتوقيعها وتظهيرها، والسحب والإيداع، وإصدار خطابات الاعتماد والكفالات والتحويلات، والتوقيع على جميع الطلبات المتعلقة بنشاط الشركة.</p>
          </div>
        </div>

        <!-- Power 8: Company Assets -->
        <div class="article-pair">
          <div class="block">
            <p><strong>8.</strong> The Managing Directors are also empowered to purchase all equipment, vehicles, materials, supplies, goods and movable assets in the name of the Company and to dispose of or sell the same whenever needed.</p>
          </div>
          <div class="block rtl">
            <p><strong>8.</strong> كما يحق للمديرين شراء جميع المعدات والمركبات والمواد والمهمات والبضائع والمنقولات باسم الشركة، والتصرف فيها أو بيعها عند الحاجة.</p>
          </div>
        </div>

        <!-- Power 9: Courts and Legal Actions -->
        <div class="article-pair">
          <div class="block">
            <p><strong>9.</strong> The Managing Directors shall have the right to approach all courts of various instances and types with regard to all cases of the Company as plaintiff or defendant, file reports with Police Stations and Public Prosecutions, withdraw the same, lodge lawsuits before courts of all types and degrees and Public Prosecutions, declare, deny and waive, settle, reconcile, arbitrate, accept, take and reject oath, abandon hostility, waive judgments in whole or in part through means of challenge, lift attachment, abandon securities while keeping debt intact, claim forgery, and object to judge or expert.</p>
          </div>
          <div class="block rtl">
            <p><strong>9.</strong> يحق للمديرين مراجعة جميع المحاكم على اختلاف درجاتها وأنواعها بخصوص قضايا الشركة بصفتها مدعية أو مدعى عليها، وتقديم البلاغات لدى مراكز الشرطة والنيابة العامة وسحبها، ورفع الدعاوى أمام جميع المحاكم والنيابات، والإقرار والإنكار والتنازل والصلح والتوفيق والتحكيم وقبول وتوجيه ورد اليمين وترك الخصومة، والتنازل عن الأحكام كليا أو جزئيا بطريق الطعن، ورفع الحجز وترك التأمينات مع بقاء الدين، والادعاء بالتزوير ورد القاضي أو الخبير.</p>
          </div>
        </div>

        <!-- Power 10: Delegation -->
        <div class="article-pair">
          <div class="block">
            <p><strong>10.</strong> The Managing Directors may delegate others with all or part of the aforesaid authorities to conduct the Company businesses by way of a Power of Attorney.</p>
          </div>
          <div class="block rtl">
            <p><strong>10.</strong> يجوز للمديرين تفويض الغير بكل أو بعض الصلاحيات المذكورة أعلاه لمباشرة أعمال الشركة بموجب وكالة.</p>
          </div>
        </div>

        <!-- Power 11: Joint or Individual Authority -->
        <div class="article-pair">
          <div class="block">
            <p><strong>11.</strong> The Managing Directors are authorized to practice all their aforesaid powers whether singly or jointly to achieve the Company's goals and purpose.</p>
          </div>
          <div class="block rtl">
            <p><strong>11.</strong> للمديرين صلاحية ممارسة جميع السلطات المشار إليها أعلاه منفردين أو مجتمعين لتحقيق أغراض الشركة وأهدافها.</p>
          </div>
        </div>

        <!-- Article 8-4: Remuneration -->
        <div class="article-pair">
          <div class="block">
            <p><strong>8-4</strong> The Managing Directors, with mutual consent and as agreed upon, are entitled to charge salary to the General Expenses Account, in addition to recovery of representation, travel and transport expenses as well as their right to receive their share in the profits.</p>
          </div>
          <div class="block rtl">
            <p><strong>8-4</strong> يحق للمديرين، وبموافقة متبادلة ووفقا لما يتم الاتفاق عليه، تحميل رواتبهم على حساب المصروفات العمومية، إضافة إلى استرداد مصروفات التمثيل والسفر والنقل، وكذلك حقهم في استلام نصيبهم من الأرباح.</p>
          </div>
        </div>

        <!-- Power 12: Cheques -->
        <div class="article-pair">
          <div class="block">
            <p><strong>12.</strong> He is authorized to sign cheques and transactions related thereto.</p>
          </div>
          <div class="block rtl">
            <p><strong>12.</strong> وهو مفوض بالتوقيع على الشيكات والمعاملات المتعلقة بها.</p>
          </div>
        </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}

