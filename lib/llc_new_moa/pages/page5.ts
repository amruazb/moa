import { LLCNewMOAContext, pageFooter } from '../types'

export function page5(ctx: LLCNewMOAContext, pageNum: number = 5): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 2 continued & Article 3 -->
      <div class="article-pair">
        <div class="block">
          <p><strong>"Commercial Companies Law"</strong> means the Federal Law No. 2 of 2015 concerning Commercial Companies and any regulations or decrees to be enacted for its implementation or as amended, completed, substituted or re-enacted in full by subsequent laws to the extent (where the context permits) applicable to the provisions of this Memorandum.</p>
          <p><strong>"Confidential Information"</strong> means all information relating to the Company in general, the Partners and their relations, and the trade secrets, price, customer and supplier lists, pricing and marketing plans, policies and strategies, details of client and consultant contracts, operations methods, business acquisition plans, new personnel acquisition plans and all other confidential information with respect to the businesses of either of the Partners or the Company.</p>
          <p><strong>"General Assembly"</strong> means each meeting of the Partners of the Company (including the annual General Assembly) duly convened and held in accordance with this Memorandum.</p>
          <p><strong>"Managing Director"</strong> means the managing director appointed pursuant to this Memorandum.</p>
        </div>
        <div class="block rtl">
          <p><strong>"قانون الشركات التجارية"</strong> يعني القانون الاتحادي رقم 2 لسنة 2015 بشأن الشركات التجارية وأي لوائح أو مراسيم تصدر لتنفيذه أو كما تم تعديله أو استكماله أو استبداله أو إعادة سنه بالكامل بموجب قوانين لاحقة بالقدر (حيثما يسمح السياق) المنطبق على أحكام هذا العقد.</p>
          <p><strong>"المعلومات السرية"</strong> تعني جميع المعلومات المتعلقة بالشركة بشكل عام والشركاء وعلاقاتهم والأسرار التجارية وقوائم الأسعار والعملاء والموردين وخطط وسياسات واستراتيجيات التسعير والتسويق وتفاصيل عقود العملاء والاستشاريين وأساليب العمليات وخطط الاستحواذ التجاري وخطط توظيف موظفين جدد وجميع المعلومات السرية الأخرى فيما يتعلق بأعمال أي من الشركاء أو الشركة.</p>
          <p><strong>"الجمعية العمومية"</strong> تعني كل اجتماع للشركاء في الشركة (بما في ذلك الجمعية العمومية السنوية) المنعقد حسب الأصول وفقاً لهذا العقد.</p>
          <p><strong>"المدير العام"</strong> يعني المدير العام المعين بموجب هذا العقد.</p>
        </div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p><strong>"Memorandum"</strong> means this restated memorandum of association.</p>
          <p><strong>"Partner[s]"</strong> means the parties to this Memorandum and any Person, which becomes the holder of any Share in the capital of the Company in accordance with the terms and conditions of this Memorandum.</p>
        </div>
        <div class="block rtl">
          <p><strong>"العقد"</strong> يعني عقد التأسيس المعدل هذا.</p>
          <p><strong>"الشريك/الشركاء"</strong> يعني أطراف هذا العقد وأي شخص يصبح مالكاً لأي حصة في رأس مال الشركة وفقاً لأحكام وشروط هذا العقد.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
