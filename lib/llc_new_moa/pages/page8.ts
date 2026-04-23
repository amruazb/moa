import { LLCNewMOAContext, pageFooter } from '../types'

export function page8(ctx: LLCNewMOAContext, pageNum: number = 8): string {
  const { company, activities } = ctx

  // Remaining activities from "Project Management Services" onwards
  const splitIdx = activities.findIndex(a => a.nameEn.toLowerCase().includes('project management'))
  const page8Acts = splitIdx >= 0 ? activities.slice(splitIdx) : []
  const activitiesListEn = page8Acts.map(a => `<p>➢ ${a.nameEn}</p>`).join('\n          ')
  const activitiesListAr = page8Acts.map(a => `<p>➢ ${a.nameAr}</p>`).join('\n          ')

  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 6 continued: remaining activities -->
      ${page8Acts.length > 0 ? `
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 6 (Continued)</h3>
          ${activitiesListEn}
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 6 (تكملة)</h3>
          ${activitiesListAr}
        </div>
      </div>` : ''}

      <!-- Article 7: Objects of the Company -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 7</h3>
          <h4 class="bold">OBJECTS OF THE COMPANY</h4>
          <p><strong>7-1</strong> The principal objects of the Company shall be to carry out the activities including but not limited to: Ships Management and Operation, Commercial Ships Rental, Ship Renting Intermediate, Onshore and Offshore Oil and Gas Fields and Facilities Services, Sea Shipping Lines Agents, Wholesale of Ships and Boats Trading, Retail Sale of Ships and Boats Spare Parts and its Components, Marine Transportation of Goods Between Countries, operation and maintenance of oil and gas industry facilities, port management and shore base operations, rental of commercial equipment and machinery, wholesale oil well chemicals trade, technical directional drilling and wholesale well drilling equipment trade, project management services and logistics consultancy.</p>
          <p><strong>7-2</strong> The Company has the right in exercising its activities:</p>
          <p><strong>(a)</strong> to use Company's funds to invest in any economical activities and fields related to the Company's activities, and have the right to participate, form joint ventures and have an interest of whatsoever nature with any other Person inside or outside the UAE whether by way of joint venture or otherwise in any type of business and to participate in their capital; and to own trademarks, patents, copyrights, industrial designs, and any other intellectual property rights the Company deems necessary for its business;</p>
          <p><strong>(b)</strong> to acquire and/or possess and/or sell, and/or transfer and/or assign companies, sole establishments and other legal entities related to the Company's objectives and to create Subsidiaries and branches in and/or outside the UAE after having obtained the necessary authorizations from the competent authorities;</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 7</h3>
          <h4 class="bold">أغراض الشركة</h4>
          <p><strong>7-1</strong> تكون الأغراض الرئيسية للشركة القيام بالأنشطة بما في ذلك على سبيل المثال لا الحصر: إدارة وتشغيل السفن، تأجير السفن التجارية، وساطة تأجير السفن، خدمات حقول ومنشآت النفط والغاز البرية والبحرية، وكلاء خطوط الشحن البحري، تجارة الجملة للسفن والقوارب، بيع التجزئة لقطع غيار السفن والقوارب ومكوناتها، النقل البحري للبضائع بين الدول، تشغيل وصيانة منشآت صناعة النفط والغاز، إدارة الموانئ والعمليات الساحلية، تأجير المعدات والآلات التجارية، تجارة الجملة للمواد الكيميائية لآبار النفط، الحفر الاتجاهي الفني وتجارة الجملة لمعدات حفر الآبار، خدمات إدارة المشاريع والاستشارات اللوجستية.</p>
          <p><strong>7-2</strong> يحق للشركة في ممارسة أنشطتها:</p>
          <p><strong>(أ)</strong> استخدام أموال الشركة للاستثمار في أي أنشطة ومجالات اقتصادية ذات صلة بأنشطة الشركة، ولها الحق في المشاركة وتشكيل مشاريع مشتركة وأن يكون لها مصلحة من أي نوع مع أي شخص آخر داخل أو خارج دولة الإمارات العربية المتحدة سواء عن طريق مشروع مشترك أو غير ذلك في أي نوع من الأعمال والمشاركة في رأسمالها؛ وامتلاك العلامات التجارية وبراءات الاختراع وحقوق النشر والتصاميم الصناعية وأي حقوق ملكية فكرية أخرى تراها الشركة ضرورية لأعمالها؛</p>
          <p><strong>(ب)</strong> الحصول على و/أو امتلاك و/أو بيع و/أو نقل و/أو التنازل عن الشركات والمؤسسات الفردية والكيانات القانونية الأخرى المتعلقة بأهداف الشركة وإنشاء شركات تابعة وفروع داخل و/أو خارج دولة الإمارات العربية المتحدة بعد الحصول على التراخيص اللازمة من السلطات المختصة؛</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
