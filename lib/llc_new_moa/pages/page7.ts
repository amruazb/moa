import { LLCNewMOAContext, pageFooter } from '../types'

export function page7(ctx: LLCNewMOAContext, pageNum: number = 7): string {
  return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 5 continued -->
      <div class="article-pair">
        <div class="block">
          <p>(c) to act as an agent for the companies, establishments international organizations and other legal entities in relation to the Company's objectives and to represent the same in the UAE and abroad;</p>
          <p>(d) to enter into commercial and financial transactions, execute and implement contracts and other obligations, draw, accept and negotiate negotiable instruments, open and operate bank accounts and borrow money for any period of time with or without security on any or all of the assets of the Company, issue guarantees for its self and third parties, invest monies and deal with such investments on its own account and generally to institute, participate in or promote commercial and mercantile enterprises and activities all kinds in relation to or for the purpose of the business of the Company, and to do all such other things as may be considered to be incidental to or conducive to the above objects or any of them;</p>
          <p>(e) to carry on any other new business or activity, including establishing or closing branches and/or Subsidiary as may be permitted by the competent authorities within UAE or outside the UAE; and/or</p>
          <p>(f) to conduct any other businesses related to the above objectives, and through the Company's own resources or through another company or Person(s) who deal in the same field of activity.</p>
        </div>
        <div class="block rtl">
          <p>(ج) العمل كوكيل للشركات والمنشآت والمنظمات الدولية والكيانات القانونية الأخرى فيما يتعلق بأهداف الشركة وتمثيلها في الإمارات والخارج؛</p>
          <p>(د) الدخول في معاملات تجارية ومالية وتنفيذ العقود والالتزامات الأخرى وسحب وقبول والتفاوض على الأوراق القابلة للتداول وفتح وتشغيل حسابات مصرفية واقتراض الأموال لأي فترة زمنية مع أو بدون ضمان على أي من أصول الشركة أو جميعها، وإصدار ضمانات لنفسها ولأطراف ثالثة، واستثمار الأموال والتعامل مع هذه الاستثمارات لحسابها الخاص وبشكل عام تأسيس أو المشاركة في أو تعزيز المشاريع والأنشطة التجارية من جميع الأنواع فيما يتعلق بأعمال الشركة أو لغرضها، والقيام بجميع الأمور الأخرى التي قد تعتبر تابعة أو مؤدية إلى الأهداف المذكورة أعلاه أو أي منها؛</p>
          <p>(هـ) ممارسة أي أعمال أو أنشطة جديدة أخرى، بما في ذلك إنشاء أو إغلاق فروع و/أو شركات تابعة كما قد تسمح به السلطات المختصة داخل الإمارات أو خارجها؛ و/أو</p>
          <p>(و) إجراء أي أعمال أخرى تتعلق بالأهداف المذكورة أعلاه، ومن خلال موارد الشركة الخاصة أو من خلال شركة أخرى أو شخص/أشخاص يعملون في نفس مجال النشاط.</p>
        </div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p>5-3 Article 5-2 shall be construed and interpreted in its widest meaning and not restrictively. The Company may achieve its objectives and exercise its mentioned authorities within the UAE and anywhere else in the world, and may from time to time add to and expand it.</p>
          <p>5-4 The Company shall not engage in the business of insurance, banking or investment of funds for the account of third parties.</p>
        </div>
        <div class="block rtl">
          <p>5-3 تُفسر المادة 5-2 وتُفهم بأوسع معانيها وليس بشكل تقييدي. ويجوز للشركة تحقيق أهدافها وممارسة صلاحياتها المذكورة داخل الإمارات وفي أي مكان آخر في العالم، ويجوز لها من وقت لآخر الإضافة إليها وتوسيعها.</p>
          <p>5-4 لا يجوز للشركة أن تعمل في أعمال التأمين أو الخدمات المصرفية أو استثمار الأموال لحساب الغير.</p>
        </div>
      </div>
      
      <!-- Article 6 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 6</h3>
          <h4 class="bold underline">PRINCIPAL PLACE OF BUSINESS</h4>
          <p>The head office of the Company shall continue to be in the Emirate of ${ctx.company.emirate}. The Company may establish branch offices, Subsidiaries and/or agencies within and outside the UAE.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 6</h3>
          <h4 class="bold underline">المركز الرئيسي للشركة</h4>
          <p>يظل المقر الرئيسي للشركة في إمارة ${ctx.company.emirateAr}. ويجوز للشركة أن تنشئ مكاتب فرعية وشركات تابعة و/أو وكالات داخل وخارج الإمارات.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
