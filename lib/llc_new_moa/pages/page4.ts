import { LLCNewMOAContext, pageFooter } from '../types'

export function page4(ctx: LLCNewMOAContext, pageNum: number = 4): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Definitions continued -->
      <div class="article-pair">
        <div class="block">
          <p><strong>"Managing Director"</strong> means the managing director appointed pursuant to this Memorandum.</p>

          <p><strong>"Memorandum"</strong> means this memorandum of association.</p>

          <p><strong>"Partner(s)"</strong> means the parties to this Memorandum and any Person, which becomes the holder of any Share in the capital of the Company in accordance with the terms and conditions of this Memorandum.</p>

          <p><strong>"Person"</strong> means any individual, partnership, firm, limited liability company, joint stock company, corporation, organization, association, trust, fund, unincorporated entity or any other legal entity.</p>

          <p><strong>"Register"</strong> shall have the meaning prescribed thereto in Article 11-1 of this Memorandum.</p>

          <p><strong>"Related Party Transaction"</strong> means any transaction, arrangement or dealing by the Company with any Partner and/or any of their Affiliates except the Affiliates wholly owned by both Partners.</p>

          <p><strong>"Share(s)"</strong> means the share(s) in the capital of the Company held from time to time by the Partners or either of them (as the context may require).</p>

          <p><strong>"Special Resolution"</strong> means, with regard to the resolutions passed by the General Assembly, the resolution passed at a General Assembly of the Company by a Partner who singularly, or Partners who in the aggregate hold not less than 75% (seventy five percent) of the Shares.</p>

          <p><strong>"Subsidiary/Subsidiaries"</strong> means any company or other legal entity in the UAE or abroad in which the Company (i) is a partner or a shareholder; (ii) owns shares, quotas, bonds or any other form of securities; and/or (iii) has the right of voting.</p>
        </div>
        <div class="block rtl">
          <p><strong>"المدير العام"</strong> يعني المدير العام المعين وفقًا لهذا العقد.</p>

          <p><strong>"العقد"</strong> يعني عقد التأسيس هذا.</p>

          <p><strong>"الشريك (الشركاء)"</strong> يعني أطراف هذا العقد وأي شخص يصبح حاملاً لأي حصة في رأس مال الشركة وفقًا لأحكام وشروط هذا العقد.</p>

          <p><strong>"الشخص"</strong> يعني أي فرد أو شراكة أو شركة أو شركة ذات مسؤولية محدودة أو شركة مساهمة أو مؤسسة أو منظمة أو جمعية أو ائتمان أو صندوق أو كيان غير مسجل أو أي كيان قانوني آخر.</p>

          <p><strong>"السجل"</strong> يكون له المعنى المنصوص عليه في المادة 11-1 من هذا العقد.</p>

          <p><strong>"معاملة الطرف ذي العلاقة"</strong> تعني أي معاملة أو ترتيب أو تعامل من قبل الشركة مع أي شريك و/أو أي من الشركات الحليفة له باستثناء الشركات الحليفة المملوكة بالكامل من قبل كلا الشريكين.</p>

          <p><strong>"الحصة (الحصص)"</strong> تعني الحصة (الحصص) في رأس مال الشركة المحتفظ بها من وقت لآخر من قبل الشركاء أو أي منهم (حسبما يقتضي السياق).</p>

          <p><strong>"القرار الخاص"</strong> يعني، فيما يتعلق بالقرارات الصادرة عن الجمعية العمومية، القرار الصادر في اجتماع الجمعية العمومية للشركة من قبل شريك منفرد، أو شركاء يمتلكون مجتمعين ما لا يقل عن 75٪ (خمسة وسبعون بالمائة) من الحصص.</p>

          <p><strong>"الشركة التابعة / الشركات التابعة"</strong> تعني أي شركة أو كيان قانوني آخر في الإمارات العربية المتحدة أو في الخارج تكون فيه الشركة (1) شريكًا أو مساهمًا؛ (2) تمتلك أسهمًا أو حصصًا أو سندات أو أي شكل آخر من الأوراق المالية؛ و/أو (3) لها حق التصويت.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
