import { LLCNewMOAContext, pageFooter } from '../types'
import { numberToWordsEn, numberToWordsAr } from '@/lib/utils/numberToWords'

export function page8(ctx: LLCNewMOAContext, pageNum: number = 8): string {
  return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 5 continued - 5-3 and 5-4 -->
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
      
      <!-- Article 7 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 7</h3>
          <h4 class="bold underline">DURATION OF THE COMPANY</h4>
          <p>The duration of the Company shall be for a period of 99 (Ninety nine) Gregorian years, which commenced on the date the Company was registered with the Commercial Register and shall be automatically renewed unless it is otherwise resolved by a Special Resolution of the General Assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 7</h3>
          <h4 class="bold underline">مدة الشركة</h4>
          <p>تكون مدة الشركة 99 (تسعة وتسعون) سنة ميلادية، تبدأ من تاريخ قيد الشركة في السجل التجاري وتجدد تلقائياً ما لم يقرر خلاف ذلك بموجب قرار خاص من الجمعية العمومية.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
