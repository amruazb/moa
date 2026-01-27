import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page3(ctx: LLCAmendmentMOAContext, pageNum: number = 3): string {
    return `
        <div class="page">
            <div class="page-content">

                <!-- Preamble Header -->
                <div class="article-pair">
                    <div class="block">
                        <h2 class="bold underline">PREAMBLE</h2>
                    </div>
                    <div class="block rtl">
                        <h2 class="bold underline">التمهيد</h2>
                    </div>
                </div>

                <!-- Main Preamble Content -->
                <div class="article-pair">
                    <div class="block">
                        <p>Whereas the First party and Second party, owns the company namely (${ctx.company.name}) under the Commercial License No ${ctx.company.licenseNo} issued by Department of Economic Development Abu Dhabi, whereas the First Party owns <span class="edited">51%</span> of its capital, the Second party owns <span class="edited">49%</span> of its capital as per the Articles of Association of the company attested by the Notary Public in Abu Dhabi under No: <span class="edited">1809007999</span> dated: <span class="edited">2018/07/3</span>, The Second party wishes to assign a portion of his share of <span class="edited">10%</span> from the capital of said company to the Third Party who has accepted it.</p>
                    </div>
                    <div class="block rtl">
                        <p>حيث أن الطرف الأول والطرف الثاني يملكان الشركة المسماة (${ctx.company.nameAr}) بموجب الرخصة التجارية رقم: ${ctx.company.licenseNo} الصادرة عن دائرة التنمية الاقتصادية – أبوظبي، بحيث يملك الطرف الأول نسبة <span class="edited">51%</span> من رأس مالها، ويملك الطرف الثاني نسبة <span class="edited">49%</span> من رأس المال، وذلك طبقاً لعقد تأسيس الشركة المصدق لدى كاتب العدل في أبوظبي برقم: <span class="edited">1809007999</span> بتاريخ: <span class="edited">2018/07/3</span>، إنه في يوم الاثنين الموافق 2018/07/3
                        وحيث إن الطرف الثاني يرغب في التنازل عن جزء من حصته البالغ <span class="edited">10%</span> من رأس مال الشركة المذكورة لصالح الطرف الثالث، والذي قبل بذلك؛</p>
                    </div>
                </div>

                <!-- Agreement Statement -->
                <div class="article-pair">
                    <div class="block">
                        <p>And the above parties have agreed to the following:</p>
                    </div>
                    <div class="block rtl">
                        <p>فقد اتفق الأطراف المذكورون على ما يلي:</p>
                    </div>
                </div>

                <!-- Bullet Point 1 -->
                <div class="article-pair">
                    <div class="block">
                        <p>• The foregoing preamble is an integral part of this addendum.</p>
                    </div>
                    <div class="block rtl">
                        <p>• يُعد التمهيد السابق جزءاً لا يتجزأ من هذا الملحق.</p>
                    </div>
                </div>

                <!-- Bullet Point 2 -->
                <div class="article-pair">
                    <div class="block">
                        <p>• The Second Party assigned a portion of his shares, amounting to <span class="edited">10%</span> (equivalent to <span class="edited">10</span> shares) of the capital of the said company, without payment, to the Third Party, who accepted it.</p>
                    </div>
                    <div class="block rtl">
                        <p>• تنازل الطرف الثاني عن جزء من حصته البالغة <span class="edited">10%</span> (ما يعادل <span class="edited">10</span> حصة) من رأس مال الشركة المذكورة بدون مقابل للطرف الثالث، وقد قبل بذلك.</p>
                    </div>
                </div>

                <!-- Bullet Point 3 -->
                <div class="article-pair">
                    <div class="block">
                        <p>• The Parties agree to enter into this Memorandum of Association to comply with provisions of the New Commercial Companies Law No. (32) For 2021 and to replace the foregoing Memorandum of Association and the terms and conditions herein govern the Partners' contractual relationship.</p>
                    </div>
                    <div class="block rtl">
                        <p>• اتفق الاطراف على تحرير عقد التأسيس هذا للمطابقة مع بنود قانون الشركات الجديد رقم 32 لعام 2021 واستبدال عقد التأسيس السابق و أن أحكام وشروط هذه الوثيقة هي التي تسري على وتنظم العلاقة التعاقدية للشركاء.</p>
                    </div>
                </div>

                <!-- Final Statement -->
                <div class="article-pair">
                    <div class="block">
                        <p>With this assignment the First, Second and Third Parties shall become the sole owners of company and the shares of the company shall be divided among the partners as following: First Party <span class="edited">51%</span>, Second Party <span class="edited">39%</span>, and Third Party <span class="edited">10%</span>.</p>
                    </div>
                    <div class="block rtl">
                        <p>بهذا التنازل يكون الطرف الأول والطرف الثاني والطرف الثالث المالكون الوحيدون للشركة وحصص الشركة موزعة بين الشركاء على الوجه التالي: الطرف الأول <span class="edited">51%</span>، الطرف الثاني <span class="edited">39%</span>، والطرف الثالث <span class="edited">10%</span>.</p>
                    </div>
                </div>

            </div>
            ${pageFooter(pageNum)}
        </div>
    `
}
