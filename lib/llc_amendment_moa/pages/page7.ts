import { LLCAmendmentMOAContext, pageFooter } from '../types'
import { power3Blocks } from './article8Power3'

/**
 * Article 8-3: administrative bullets, then sub-clauses 8-3-1 … 8-3-5 (first part of 5).
 * Printed page 6 in the full document.
 */
export function page7(ctx: LLCAmendmentMOAContext, pageNum: number = 6): string {
    const p = ctx.powers

    const leadIn = `
        <!-- Power 1: Administrative Powers -->
        <div class="article-pair">
          <div class="block">
            <p><strong>•</strong> Carrying out all administrative, technical and financial aspects without limitation to the powers entrusted in them, including but not limited to.</p>
          </div>
          <div class="block rtl">
            <p><strong>•</strong> القيام بجميع الأعمال الإدارية والفنية والمالية وبدون الحد من شمولية والصلاحيات المعطاة لهم على سبيل المثال لا الحصر.</p>
          </div>
        </div>

        <!-- Item 1: Company Goals -->
        <div class="article-pair">
          <div class="block">
            <p><strong>8-3-1.</strong> Carrying out the works required to achieve the Company's goals and purpose.</p>
          </div>
          <div class="block rtl">
            <p><strong>8-3-1.</strong> القيام بكافة الأعمال اللازمة لتحقيق أغراض الشركة وأهدافها.</p>
          </div>
        </div>`

    const block2 = p.contracts
        ? `
        <div class="article-pair">
          <div class="block">
            <p><strong>8-3-2.</strong> Concluding commercial contracts in the name of the Company, contracts covered by the Company activity and related thereto.</p>
          </div>
          <div class="block rtl">
            <p><strong>8-3-2.</strong> إبرام العقود التجارية باسم الشركة وهي العقود التي يكون ضمن نشاط الشركة والمتصلة به.</p>
          </div>
        </div>`
        : ''

    const block3 = power3Blocks(ctx)

    const block4 = `
        <div class="article-pair">
          <div class="block">
            <p><strong>8-3-4.</strong> To prepare annual Balance Sheet, Profit and Loss Account, and annual report on the Company's activity and financial position, including their recommendations for profit distribution by 31 December of each year, and to deposit the same with the competent authority following approval.</p>
          </div>
          <div class="block rtl">
            <p><strong>8-3-4.</strong> إعداد الميزانية العمومية السنوية وحساب الأرباح والخسائر والتقرير السنوي عن نشاط الشركة ومركزها المالي، بما في ذلك توصيات توزيع الأرباح قبل 31 ديسمبر من كل سنة، وإيداع ذلك لدى الجهة المختصة بعد الاعتماد.</p>
          </div>
        </div>`

    const block5a =
        p.executeTransactions || p.utilities
            ? `
        <div class="article-pair">
          <div class="block">
            <p><strong>8-3-5.</strong> He is authorized to sign, submit, collect, and follow up on related documents with all local authorities, government, semi-government, private sector organizations, and individuals in the UAE. These organizations include, but are not limited to, the General Directorate of Residency & Foreigners Affairs, Ministry of Human Resources and Emiratisation, Department of Municipal Affairs, Chamber of Commerce and Industry, Police Stations, seaports, customs, airports, </p>
          </div>
          <div class="block rtl">
            <p><strong>8-3-5.</strong> وهو مفوض بالتوقيع، وتقديم، واستلام، ومتابعة المستندات المتعلقة بجميع الدوائر الحكومية، وشبه الحكومية، والمؤسسات الخاصة، والأفراد في دولة الإمارات العربية المتحدة، على سبيل المثال، ولكن دون حصر: الإدارة العامة للإقامة وشؤون الأجانب، وزارة الموارد البشرية والتوطين، دائرة الشؤون البلدية، غرفة التجارة والصناعة، مراكز الشرطة، الموانئ، الجمارك، المطارات، </p>
          </div>
        </div>`
            : ''

    const body = leadIn + block2 + block3 + block4 + block5a

    return `
    <div class="page">
      <div class="page-content">
        ${body}
      </div>
      ${pageFooter(pageNum, false)}
    </div>`
}
