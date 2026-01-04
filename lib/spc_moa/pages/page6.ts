import { MOAContext, pageFooter } from '../types'

export function page6(ctx: MOAContext, pageNum: number = 6): string {
  const { manager, pronouns, company } = ctx

  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER III</h3>
          <h3 class="center">Company Management</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب الثالث</h3>
          <h3 class="center">إدارة الشركة</h3>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (10)</h3>
          <p>The Shareholders have agreed that the management of the Company shall be governed by the <strong>Managing Director <span class="edited">${pronouns.title} ${manager.name}</span></strong> holding Emirates ID number <span class="edited">${manager.id}</span>, resident of the Emirates of <span class="edited">${company.emirate}</span>, for an unlimited period. The Managing Director shall have the widest powers and authorities to manage and represent the Company and to carry out all acts required by its objects, including but not limited to the following:</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (10)</h3>
          <p>اتفق الشركاء على أن يتولى إدارة الشركة <strong>المدير${pronouns.subjectAr === 'هي' ? 'ة' : ''} العام${pronouns.subjectAr === 'هي' ? 'ة' : ''} <span class="edited">${pronouns.titleAr}/ ${manager.nameAr}</span></strong> يحمل بطاقة هوية رقم <span class="edited">${manager.id}</span> المقيم بإمارة <span class="edited">${company.emirateAr}</span>، لفترة غير محدودة. وتكون ل${pronouns.subjectAr === 'هي' ? 'ها' : 'ه'} أوسع السلطات في إدارة وتمثيل الشركة والقيام بجميع الأعمال التي تقتضيها أغراضها ويشمل ذلك دون حصر:</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (11)</h3>
          <p>The Managing Director shall have all necessary powers to manage the company and sign on its behalf singly and carry out all acts required by its objectives. Powers of the Managing Director include the following:</p>
          <p>1- Carrying out all administrative, technical and financial aspects without limitation to the powers entrusted in ${pronouns.object}, being without limitation.</p>
          <p>2- Carrying out the works required to achieve the company's goals and purpose.</p>
          <p>3- Concluding commercial contracts in the name of the Company, contracts covered by the Company activity and related thereto.</p>
          <p>4- The Managing Director shall represent the Company before all government, local and federal departments and private companies and establishments such as Department of Economic Development, Municipalities, UAE Chambers,</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (11)</h3>
          <p>يكون للمدير${pronouns.subjectAr === 'هي' ? 'ة' : ''} التنفيذي${pronouns.subjectAr === 'هي' ? 'ة' : ''} كافة الصلاحيات الضرورية لإدارة الشركة والتوقيع نيابة عنها منفرداً والقيام بجميع الأعمال التي تقتضيها أغراضها. تتضمن سلطات المدير${pronouns.subjectAr === 'هي' ? 'ة' : ''} التنفيذي${pronouns.subjectAr === 'هي' ? 'ة' : ''} ما يلي:</p>
          <p>1- القيام بجميع الأعمال الإدارية والفنية والمالية وبدون الحد من شمولية السلطات والصلاحيات المعطاة ل${pronouns.subjectAr === 'هي' ? 'ها' : 'ه'} بدون حصر.</p>
          <p>2- القيام بكافة الأعمال اللازمة لتحقيق أغراض الشركة وأهدافها.</p>
          <p>3- إبرام العقود التجارية باسم الشركة وهي العقود التي يكون ضمن نشاط الشركة والمتصلة به.</p>
          <p>4- يقوم مدير${pronouns.subjectAr === 'هي' ? 'ة' : ''} الإدارة بتمثيل الشركة لدى كافة المؤسسات الحكومية وشبه الحكومية والمحلية والاتحادية والمؤسسات الخاصة والشركات مثل دائرة التنمية الاقتصادية والبلديات وغرف الدولة،</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
