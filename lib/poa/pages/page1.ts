// POA Page 1: Header, Principal Info, Attorney Info, Section 1
import { POAContext, poaPageFooter } from '../types'

export function page1(ctx: POAContext, pageNum: number = 1): string {
  const { principal, attorney, license } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Title -->
      <div class="title-pair">
        <div class="title-en">SPECIAL POWER OF ATTORNEY</div>
        <div class="title-ar rtl">وكـــالة خاصـــة</div>
      </div>

      <!-- Principal Info -->
      <div class="article-pair">
        <div class="block">
          <p>I, the undersigned:<br/>
          <span class="edited">${principal.pronouns.title} ${principal.name}</span>, <span class="edited">${principal.nationality}</span> national, holder of resident Emirates<br/>
          ID No. <span class="edited">${principal.eidOrPassport}</span>,</p>
        </div>
        <div class="block rtl">
          <p>أنا الموقعـــة أدناه:<br/>
          <span class="edited">${principal.pronouns.titleAr} / ${principal.nameAr}</span>، <span class="edited">${principal.nationalityAr}</span> الجنسية<br/>
          بحمل بطاقة هوية مقيـــم رقـــم:<br/>
          <span class="edited">${principal.eidOrPassport}</span>،</p>
        </div>
      </div>

      <!-- License Info -->
      <div class="article-pair">
        <div class="block">
          <p>In My capacity as the partner of the<br/>
          following License No: <span class="edited">${license.licenseNumber}</span><br/>
          named :-<br/>
          "<span class="edited">${license.companyName}</span>"<br/>
          issued from the <span class="edited">${license.issuingAuthority}</span>,<br/>
          do hereby authorize:</p>
        </div>
        <div class="block rtl">
          <p>بصفتي شريكة في الرخصة رقم: <span class="edited">${license.licenseNumber}</span><br/>
          المسماة :-<br/>
          "<span class="edited">${license.companyNameAr}</span>" الصادرة<br/>
          من <span class="edited">${license.issuingAuthorityAr}</span>،<br/>
          أوكل:</p>
        </div>
      </div>

      <!-- Attorney Info -->
      <div class="article-pair">
        <div class="block">
          <p><span class="edited">${attorney.pronouns.title} ${attorney.name}</span>, <span class="edited">${attorney.nationality}</span> national,<br/>
          holder of resident Emirates<br/>
          ID No. <span class="edited">${attorney.eidOrPassport}</span>,</p>
        </div>
        <div class="block rtl">
          <p><span class="edited">${attorney.pronouns.titleAr}/ ${attorney.nameAr}</span>، <span class="edited">${attorney.nationalityAr}</span> الجنسية<br/>
          بحمل بطاقة هوية مقيــم رقم:<br/>
          <span class="edited">${attorney.eidOrPassport}</span>،</p>
        </div>
      </div>

      <!-- Authority Statement -->
      <div class="article-pair">
        <div class="block">
          <p>To act and represent me, to perform on my behalf, and to sign jointly within the limits of my share in the license, as provided hereunder:</p>
        </div>
        <div class="block rtl">
          <p>لينوب عني ويقوم مقامي ويمضي بالتوقيع، وذلك في حدود حصتي فيما يخص الرخصة المذكورة أعلاه وذلك كما يلي:</p>
        </div>
      </div>

      <!-- Section 1: Execute Transactions -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>1</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">To Execute Transactions:</span></p>
          <p>To contact all the relevant government and non-government departments, Ministries, local authorities, embassies, committees, councils, semi-government departments, consulates, notary public, Ministry of Human Resources and Emiratization, Department of Economic Development (to open branches, issue all licenses required, change activities and Trade Name), Chamber of Commerce and Industry, Abu Dhabi Tourism and Cultural Authority,</p>
        </div>
        <div class="block rtl">
          <p><strong>1</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">إنهاء المعاملات:</span></p>
          <p>مراجعة كافة الدوائر وكافة الجهات الحكومية حكومية والوزارات والهيئات المحلية والسفــارات واللجان والمجالس والدوائر حكومية والقنصليـــات والكتاب العدل ووزارة الموارد البشـــرية والتوطين ودائرة التنميـــة الاقتصادية لفتح فروعها واصـــدار كل الرخص المطلوبة وتعديل نشـــاطات والاســـم التجاري، وغرفة التجارة والصناعة وهيئة أبوظبي للسياحة والثقافية</p>
        </div>
      </div>

      </div>
      ${poaPageFooter(pageNum)}
    </div>`
}
