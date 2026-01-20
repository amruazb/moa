import { LLCNewMOAContext, pageFooter } from '../types'

export function page12(ctx: LLCNewMOAContext, pageNum: number = 12): string {
  const { company, manager } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 10: Register of Partners -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 10</h3>
          <h4 class="bold">REGISTER OF PARTNERS</h4>
          <p><strong>10-1</strong> The Company shall keep at its head office a special register for the Partners (the "Register") containing the following:</p>
          <p>(a) full name of each Partner, their domicile, address, profession and nationalities;</p>
          <p>(b) the number and value of the Shares held by each Partner; and</p>
          <p>(c) details of all dealings carried out with regard to the Shares, together with the dates thereof.</p>
          <p><strong>10-2</strong> The Managing Director shall be responsible for maintaining the said register and for the validity and accuracy of its contents.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 10</h3>
          <h4 class="bold">سجل الشركاء</h4>
          <p><strong>10-1</strong> تحتفظ الشركة في مقرها الرئيسي بسجل خاص للشركاء ("السجل") يحتوي على ما يلي:</p>
          <p>(أ) الاسم الكامل لكل شريك وموطنه وعنوانه ومهنته وجنسيته؛</p>
          <p>(ب) عدد وقيمة الحصص التي يملكها كل شريك؛ و</p>
          <p>(ج) تفاصيل جميع التعاملات المنفذة فيما يتعلق بالحصص مع تواريخها.</p>
          <p><strong>10-2</strong> يكون المدير الإداري مسؤولاً عن الاحتفاظ بالسجل المذكور وعن صحة ودقة محتوياته.</p>
        </div>
      </div>

      <!-- Article 11: Management of the Company -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 11</h3>
          <h4 class="bold">MANAGEMENT OF THE COMPANY</h4>
          <p><strong>11-1</strong> The Company shall be managed by one Managing Director. The appointment, dismissal, and replacement of the Managing Director and determining his remuneration shall be the exclusive right of the First Partner, without any involvement in this respect from the Second Partner and without the need to amend this Memorandum to effect such appointment, dismissal and/or replacement.</p>
          <p><strong>11-2</strong> Without prejudice to the provisions of Article 11-1 of this Memorandum, the Managing Director shall be:</p>
          <p>${manager.name}, ${manager.nationality} national and holder of Emirates ID number ${manager.eid} whose address is at ${manager.address}.</p>
          <p><strong>11-3</strong> The Managing Director shall be appointed for an indefinite period commencing from the date of his appointment, unless such Managing Director has been dismissed in the manner set out under Article 11-1 of this Memorandum.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 11</h3>
          <h4 class="bold">إدارة الشركة</h4>
          <p><strong>11-1</strong> تدار الشركة من قبل مدير إداري واحد. ويكون تعيين وعزل واستبدال المدير الإداري وتحديد مكافآته حقاً حصرياً للشريك الأول، دون أي تدخل في هذا الشأن من الشريك الثاني ودون الحاجة إلى تعديل هذا العقد لإجراء هذا التعيين أو العزل و/أو الاستبدال.</p>
          <p><strong>11-2</strong> دون الإخلال بأحكام المادة 11-1 من هذا العقد، يكون المدير الإداري هو:</p>
          <p>${manager.nameAr}، ${manager.nationalityAr} الجنسية وحامل بطاقة الهوية الإماراتية رقم ${manager.eid} وعنوانه ${manager.addressAr}.</p>
          <p><strong>11-3</strong> يعين المدير الإداري لفترة غير محددة تبدأ من تاريخ تعيينه، ما لم يتم عزل المدير الإداري بالطريقة المنصوص عليها في المادة 11-1 من هذا العقد.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
