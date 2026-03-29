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
                        <p>Whereas the First Party, Second Party, and Third Party own the company namely (${ctx.company.name}) under the Commercial License No ${ctx.company.licenseNo} issued by Department of Economic Development Abu Dhabi, whereas the First Party owns <span class="edited">51%</span> of its capital, the Second Party owns <span class="edited">25%</span> of its capital, and the Third Party owns <span class="edited">24%</span> of its capital as per the Articles of Association of the company attested by the Notary Public in Abu Dhabi under No: <span class="edited">2105029059</span> dated: <span class="edited">27/09/2021</span>. The Third Party wishes to assign all of his shares amounting to <span class="edited">24%</span> from the capital of said company to the Second Party, and the First Party wishes to assign <span class="edited">1%</span> of his shares to the Second Party, who has accepted both transfers.</p>
                    </div>
                    <div class="block rtl">
                        <p>حيث أن الطرف الأول والطرف الثاني والطرف الثالث يملكون الشركة المسماة (${ctx.company.nameAr}) بموجب الرخصة التجارية رقم: ${ctx.company.licenseNo} الصادرة عن دائرة التنمية الاقتصادية – أبوظبي، بحيث يملك الطرف الأول نسبة <span class="edited">51%</span> من رأس مالها، ويملك الطرف الثاني نسبة <span class="edited">25%</span> من رأس المال، ويملك الطرف الثالث نسبة <span class="edited">24%</span> من رأس المال، وذلك طبقاً لعقد تأسيس الشركة المصدق لدى كاتب العدل في أبوظبي برقم: <span class="edited">2105029059</span> بتاريخ: <span class="edited">27/09/2021</span>. وحيث إن الطرف الثالث يرغب في التنازل عن جميع حصصه البالغة <span class="edited">24%</span> من رأس مال الشركة المذكورة لصالح الطرف الثاني، وأن الطرف الأول يرغب في التنازل عن <span class="edited">1%</span> من حصصه لصالح الطرف الثاني، والذي قبل بكلا التنازلين؛</p>
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
                        <p>• The Third Party assigned all of his shares, amounting to <span class="edited">24%</span> (equivalent to <span class="edited">24</span> shares) of the capital of the said company to the Second Party, and the First Party assigned <span class="edited">1%</span> (equivalent to <span class="edited">1</span> share) of his shares to the Second Party, who accepted both transfers.</p>
                    </div>
                    <div class="block rtl">
                        <p>• تنازل الطرف الثالث عن جميع حصصه البالغة <span class="edited">24%</span> (ما يعادل <span class="edited">24</span> حصة) من رأس مال الشركة المذكورة لصالح الطرف الثاني، وتنازل الطرف الأول عن <span class="edited">1%</span> (ما يعادل <span class="edited">1</span> حصة) من حصصه لصالح الطرف الثاني، وقد قبل بكلا التنازلين.</p>
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
                        <p>With these assignments, the Third Party exits the company and the First Party and Second Party shall become the sole owners of the company in equal partnership, and the shares of the company shall be divided among the partners as following: First Party <span class="edited">50%</span> and Second Party <span class="edited">50%</span>.</p>
                    </div>
                    <div class="block rtl">
                        <p>بهذه التنازلات، يخرج الطرف الثالث من الشركة ويكون الطرف الأول والطرف الثاني المالكان الوحيدان للشركة بشراكة متساوية، وحصص الشركة موزعة بين الشركاء على الوجه التالي: الطرف الأول <span class="edited">50%</span> والطرف الثاني <span class="edited">50%</span>.</p>
                    </div>
                </div>

            </div>
            ${pageFooter(pageNum)}
        </div>
    `
}
