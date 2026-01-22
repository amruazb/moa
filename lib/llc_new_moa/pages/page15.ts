import { LLCNewMOAContext, pageFooter } from '../types'

export function page15(ctx: LLCNewMOAContext, pageNum: number = 15): string {
  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 11-4 continued -->
      <div class="article-pair">
        <div class="block">
          <p><strong>(f)</strong> to approve, adopt and/or amend the Annual Budget and Business Plan;</p>
          <p><strong>(g)</strong> to approve, adopt and/or amend any employee stock option plans, pension schemes and other incentive schemes (including any senior management);</p>
          <p><strong>(h)</strong> to approve Related Party Transactions;</p>
          <p><strong>(i)</strong> to represent and manage the Company from administrative and legal aspects, to represent the Company from all financial, technical and operational aspects and sign, receive, deliver, review, and settle on its behalf on all transactions before official, semi-official governmental and private authorities, departments and entities whether inside or outside the UAE such as ministries, embassies, companies, establishments, departments, authorities, medical insurance companies, hospitals, health authorities, preventive medicine, civil defence and firefighting, environment agency, social services and commercial buildings authority, electricity and water distribution companies, post offices (including Emirates Post and Empost), seaports, airports, customs, municipalities, chambers of commerce and industry, departments of economic development, commercial register, ministry of economy, ministry of finance, urban planning, housing, notary public and all other local departments and free zone authorities such as Ministry of Finance, Ministry of Economy, Abu Dhabi Municipality, Abu Dhabi Department of Economic Development, Abu Dhabi Health Authority, Department of Transport, Abu Dhabi Distribution Company, Tawtheeq Registration,</p>
        </div>
        <div class="block rtl">
          <p><strong>(ح)</strong> الموافقة على و/أو إقرار و/أو تعديل الميزانية السنوية وخطة العمل؛</p>
          <p><strong>(خ)</strong> الموافقة على و/أو اعتماد و/أو تعديل أي خطط الخيار لشراء الأسهم وخطط التقاعد وأي خطط حوافز أخرى (بما في ذلك الإدارة العليا)؛</p>
          <p><strong>(د)</strong> الموافقة على المعاملات مع الأطراف ذات العلاقة؛</p>
          <p><strong>(ذ)</strong> تمثيل الشركة من كافة النواحي المالية والفنية والتشغيلية والإدارية والقانونية وتمثيل الشركة والتوقيع واستلام وتسليم ومراجعة وتسوية جميع المعاملات نيابة عنها لدى السلطات والدوائر والجهات الرسمية وشبه الرسمية والحكومية والخاصة سواء داخل أو خارج الدولة كالوزارات والسفارات والشركات والمؤسسات والدوائر والهيئات وشركات التأمين الصحي والمستشفيات وهيئات الصحة والطب الوقائي والدفاع المدني والمطافئ وهيئة البيئة وهيئة الخدمات الاجتماعية وسلطة المباني التجارية وشركات توزيع المياه والكهرباء ومكاتب البريد ومن ضمنها بريد الإمارات وإمبوست والموانئ البحرية والمطارات والجمارك والبلديات وغرف التجارة والصناعة ودوائر التنمية الاقتصادية والسجل التجاري ووزارة الاقتصاد ووزارة المالية والتخطيط العمراني والإسكان وكاتب العدل وجميع الدوائر المحلية وكافة سلطات المناطق الحرة مثل وزارة المالية ووزارة الاقتصاد وبلدية أبوظبي ودائرة التنمية الاقتصادية بأبوظبي وهيئة الصحة بأبوظبي وهيئة الطرق والمواصلات وشركة أبوظبي للتوزيع وتوثيق</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
