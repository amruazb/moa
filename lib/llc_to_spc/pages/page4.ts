import { LLCToSPCContext, conversionPageFooter } from '../types'
import { numberToWordsEn, numberToWordsAr } from '@/lib/utils/numberToWords'

export function page4(ctx: LLCToSPCContext, pageNum: number = 4): string {
  const { newOwner, capitalInfo } = ctx
  const { capital, shareCount, shareValue } = capitalInfo
  const capitalWordsEn = numberToWordsEn(capital)
  const capitalWordsAr = numberToWordsAr(capital)

  return `
    <div class="page">
      <div class="page-content">

      <!-- Chapter II: Capital and Shares -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER II</h3>
          <h3 class="center">Capital and Shares</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الثاني</h3>
          <h3 class="center">رأس مال الشركة وحصص الشركاء</h3>
        </div>
      </div>

      <!-- Article 6: Capital -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (6): Capital</h3>
          <p>The capital of the Company is fixed at AED <span class="edited">${capital.toLocaleString()}</span> (<span class="edited">${capitalWordsEn}</span> Dirhams) divided into (<span class="edited">${shareCount}</span>) shares of a nominal value of AED <span class="edited">${shareValue.toLocaleString()}</span> each. Capital is fully subscribed and paid, and has been distributed among partners as follows:</p>
          <table>
            <tr><th>Partner</th><th>Shares</th><th>Value (AED)</th><th>%</th></tr>
            <tr><td class="edited">${newOwner.pronouns.title} ${newOwner.name}</td><td class="edited">${shareCount}</td><td class="edited">${capital.toLocaleString()}</td><td>100%</td></tr>
            <tr><td><strong>Total</strong></td><td><strong class="edited">${shareCount}</strong></td><td><strong class="edited">${capital.toLocaleString()}</strong></td><td><strong>100%</strong></td></tr>
          </table>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (6): رأس المال</h3>
          <p>رأس مال الشركة <span class="edited">${capital.toLocaleString()}</span> درهم إماراتي (<span class="edited">${capitalWordsAr}</span> درهم) موزع على (<span class="edited">${shareCount}</span>) حصة قيمة كل حصة <span class="edited">${shareValue.toLocaleString()}</span> درهم إماراتي وجميعها حصص نقدية تم سدادها بالكامل وقد توزعت على الشريك كما يلي:</p>
          <table>
            <tr><th>الشريك</th><th>الحصص</th><th>القيمة (درهم)</th><th>%</th></tr>
            <tr><td class="edited">${newOwner.pronouns.titleAr}/ ${newOwner.nameAr}</td><td class="edited">${shareCount}</td><td class="edited">${capital.toLocaleString()}</td><td>100%</td></tr>
            <tr><td><strong>المجموع</strong></td><td><strong class="edited">${shareCount}</strong></td><td><strong class="edited">${capital.toLocaleString()}</strong></td><td><strong>100%</strong></td></tr>
          </table>
        </div>
      </div>

      <!-- Article 7: Increase of Capital -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (7): Increase of Capital</h3>
          <p>The capital may be increased in one or more payments either by issuing new shares or by converting the free capital reserve to shares upon resolution of the assembly and in accordance with the provisions stipulated in law and its executive regulations.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (7): زيادة رأس المال</h3>
          <p>يجوز زيادة رأس المال على دفعة واحدة أو أكثر سواء بإصدار حصص جديدة أو بتحويل رأس المال الاحتياطي الحر إلى حصص ويتم ذلك بقرار من قبل الجمعية العمومية وطبقاً لأحكام المنصوص عليها في القانون ولوائحها التنفيذية.</p>
        </div>
      </div>

      <!-- Article 8: Transfer of Shares -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (8): Transfer of Shares</h3>
          <p>Shares are transferable among partners or between them and third party provided that such transfer or disposal shall be entered in the register prepared for such purpose.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (8): انتقال الحصص</h3>
          <p>الحصص قابلة للانتقال بين الشركاء أو بينهم وبين الغير. ويجب أن يثبت هذا الانتقال أو التصرف في الحصص في السجل المعد لذلك الغرض.</p>
        </div>
      </div>

      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
