import { AdnocLetterContext } from './types'

export function page1(ctx: AdnocLetterContext): string {
  return `
    <div class="page">
      <div class="header-date">التاريخ : ${ctx.date}</div>

      <div class="salutation">
        <div class="row">
          <span>السيد/ الي من يهمه الأمر</span>
          <span>المحترمين</span>
        </div>
        <div>تحية طيبة وبعد ،،</div>
      </div>

      <div class="subject">
        الموضوع : اقرار و تعهد بعدم عمل في ادنوك ومجموعة شركاتها
      </div>

      <div class="body-text">
        أنا <span class="bold">${ctx.name}</span> يحمل بطاقة هوية 
        رقم : <span class="bold">${ctx.eidNumber}</span> وبصفتي شريك الرخصة التجارية 
        "<span class="bold">${ctx.companyName}</span>"
        <br/>
        رقم الرخصة: <span class="bold">${ctx.companyNumber}</span>
        الصادرة من دائرة التنمية الاقتصادية ابوظبي الان انا في اقامة شريك . واقر واتعهد بأنني لا اعمل
        لدى ادنوك ومجموعة شركاتها. وهذا تعهد مني بذلك..
      </div>

      <div class="footer">
        وتفضلو بقبول فائق الاحترام<br/>
        مقدمه
      </div>

      <div class="signature-section">
        <div class="name" style="margin-bottom: ${ctx.signatureSpacing}px;">${ctx.name}</div>
        <div>التوقيع: <span class="line"></span></div>
      </div>
    </div>
  `
}
