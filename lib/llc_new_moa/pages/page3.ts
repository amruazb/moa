import { LLCNewMOAContext, pageFooter } from '../types'

export function page3(ctx: LLCNewMOAContext, pageNum: number = 3): string {
    const { company } = ctx

    return `
    <div class="page">
      <div class="page-content">
      
      <!-- Definitions continued -->
      <div class="article-pair">
        <div class="block">
          <p><strong><u>6-Partner:</u></strong> Any individual shareholder or body corporate being the owner of any share/shares in the Company in accordance with terms of this Memorandum.</p>
          <p><strong><u>7-Share:</u></strong> A share in the capital of the Company.</p>
          <p><strong><u>8-Register:</u></strong> Shall have the meaning prescribed thereto in Article 11 of this Memorandum.</p>
          <p><strong><u>9-Related Party Transaction:</u></strong> means any transaction, arrangement or dealing by the Company with any Partner and/or any of their Affiliates except the Affiliates wholly owned by such Partners.</p>
          <p><strong><u>10-Special Resolution:</u></strong> means, with regard to the resolutions passed by the General Assembly, the resolution passed at a General Assembly of the Company by a Partner who singularly, or Partners who in the aggregate hold not less than 75% (seventy five percent) of the Shares.</p>
          <p><strong><u>11-Subsidiary/Subsidiaries:</u></strong> means any company or other legal entity in the UAE or abroad in which the Company (i) is a partner or a shareholder; (ii) owns shares, quotas, bonds or any other form of securities; and/or (iii) has the right of voting.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>6-الشريك:</u></strong> أي فرد من المساهمين أو شخص اعتباري يملك أي حصة/حصص في الشركة وفقا لأحكام هذا العقد.</p>
          <p><strong><u>7-الحصة:</u></strong> تعني حصة/حصص في رأس مال الشركة.</p>
          <p><strong><u>8-السجل:</u></strong> يقصد به المعنى المحدد له في المادة 11 من هذا العقد.</p>
          <p><strong><u>9-معاملات الأطراف ذات الصلة:</u></strong> تعني أي صفقات أو ترتيبات أو معاملات من قبل الشركة مع أي شريك و/أو أي من الشركات التابعة له باستثناء الشركات التابعة المملوكة كليا من قبل هؤلاء الشركاء.</p>
          <p><strong><u>10-قرار خاص:</u></strong> يعني فيما يتعلق بالقرارات الصادرة عن الجمعية العمومية، القرار الصادر في الجمعية العمومية للشركة من شريك بمفرده أو من الشركاء مجتمعين يملكون ما لا يقل عن 75% (خمسة وسبعون بالمائة) من الحصص.</p>
          <p><strong><u>11-الشركة التابعة/الشركات التابعة:</u></strong> تعني أي شركة أو أي كيان قانوني آخر في الإمارات أو الخارج تكون الشركة فيها (1) شريكا أو مساهما؛ (2) تملك أسهما أو حصصا أو سندات أو أي شكل آخر من الأوراق المالية؛ و/أو (3) لها حق التصويت.</p>
        </div>
      </div>
      
      <!-- Article 1 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 1</h3>
          <h4 class="bold underline">REVOCATION OF THE MEMORANDUM OF ASSOCIATION</h4>
          <p>The Partners agreed to replace the Memorandum of Association, with this Memorandum without need for any notification or any other procedure as of the date of signing this Memorandum before the notary public, so that the Memorandum of Association is hereby replaced and superseded by this Memorandum.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 1</h3>
          <h4 class="bold underline">إلغاء عقد التأسيس</h4>
          <p>اتفق الشركاء على استبدال عقد التأسيس بهذا العقد دون الحاجة إلى أي إخطار أو أي إجراء آخر اعتباراً من تاريخ التوقيع على هذا العقد أمام كاتب العدل، بحيث يعتبر عقد التأسيس ملغياً ومستبدلاً بهذا العقد.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
