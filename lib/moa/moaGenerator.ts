
import { MOAData, Party, ShareAllocation } from './types';

// Helper to convert number to English ordinal
const getOrdinalEn = (n: number): string => {
  const ordinals = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
  return ordinals[n] || `${n + 1} th`;
};

// Helper to convert number to Arabic ordinal
const getOrdinalAr = (n: number): string => {
  const ordinals = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر'];
  return ordinals[n] || `${n + 1} `;
};

const renderParty = (party: Party, index: number): string => {
  const partyTitleEn = `${getOrdinalEn(index)} Party: `;
  const partyTitleAr = `الطرف ${getOrdinalAr(index)}: `;

  let repHtml = '';
  if (party.representative) {
    const repIsPassport = party.representative.documentType === 'passport';
    const repIdLabelEn = repIsPassport ? 'Holder of Passport No.' : 'Holder of Emirates ID No.';
    const repIdLabelAr = repIsPassport ? 'حامل جواز سفر رقم' : 'حامل بطاقة الهوية الإماراتية رقم';
    
    repHtml = `
  < div class="row rep-row" >
    <div class="col-en" >
      <strong>Represented by: </strong><br>
        < span class="fill" > Mr.${party.representative.nameEn} </span>, <span class="fill">${party.representative.nationalityEn}</span > National, <br>
          Date of Birth: <span class="fill" > ${party.representative.dob} </span><br>
          ${repIdLabelEn}: <span class="fill" > ${party.representative.idNumber} </span><br>
          By virtue of < span class="fill" > ${party.representative.capacityEn} </span><br>
          residing at < span class="fill" > ${party.representative.addressEn || 'UAE'} </span>.
  </div>
  < div class="col-ar" dir = "rtl" >
    <strong>ممثل بواسطة: </strong><br>
السيد / <span class="fill" > ${party.representative.nameAr} </span> <span class="fill">${party.representative.nationalityAr}</span > الجنسية<br>
          تاريخ الميلاد: <span class="fill" > ${party.representative.dob} </span><br>
          ${repIdLabelAr}: <span class="fill" > ${party.representative.idNumber} </span><br>
بموجب < span class="fill" > ${party.representative.capacityAr} </span><br>
          ويقيم في: <span class="fill" > ${party.representative.addressAr || 'الإمارات'} </span>
  </div>
  </div>
    `;
  }

  const isPassport = party.documentType === 'passport';
  const idLabelEn = isPassport ? 'Passport No' : 'ID Card No';
  const idLabelAr = isPassport ? 'رقم جواز السفر' : 'بطاقة هوية رقم';
  
  return `
  < div class="party-section" >
    <div class="row party-header" >
      <div class="col-en" > <u style="font-weight: bold;" > ${partyTitleEn} </u></div >
        <div class="col-ar" dir = "rtl" > <u style="font-weight: bold;" > ${partyTitleAr} </u></div >
          </div>
          < div class="row party-details" >
            <div class="col-en" >
              <strong>MR.${party.nameEn.toUpperCase()}, </strong><br>
Nationality: <span class="fill" > ${party.nationalityEn} </span><br>
          ${idLabelEn}: <span class="fill" > ${party.idNumber} </span><br>
          Date of Birth: <span class="fill" > ${party.dob} </span>
  </div>
  < div class="col-ar" dir = "rtl" >
    <strong>السيد / ${party.nameAr} </strong><br>
الجنسية: <span class="fill" > ${party.nationalityAr} </span><br>
          ${idLabelAr}: <span class="fill" > ${party.idNumber} </span><br>
          تاريخ الميلاد: <span class="fill" > ${party.dob} </span>
  </div>
  </div>
      ${repHtml}
</div>
  `;
};

const renderSharesTable = (data: MOAData): string => {
  // Calculate Totals dynamically to ensure accuracy
  const totalShares = data.shareAllocations.reduce((sum, s) => sum + s.shareCount, 0);
  const totalValue = data.shareAllocations.reduce((sum, s) => sum + s.shareValue, 0);
  const totalPercent = data.shareAllocations.reduce((sum, s) => sum + s.percentage, 0);

  const rows = data.parties.map((party, index) => {
    const alloc = data.shareAllocations.find(s => s.partyIndex === index);
    const shares = alloc ? alloc.shareCount : 0;
    const value = alloc ? alloc.shareValue : 0;
    const percent = alloc ? alloc.percentage : 0;

    // Arabic Party Row
    const arRow = `
  < tr >
  <td>${percent}% </td>
    < td > ${value.toLocaleString()} </td>
      < td > ${shares} </td>
        < td style = "text-align: right;" > <strong>الطرف ${getOrdinalAr(index)}: السيد / ${party.nameAr} </strong></td >
          </tr>
            `;

    // English Party Row (rendered separately in the combined table logic below to match image style)
    // The image shows a single table with Arabic headers on top, then English headers below, or a split.
    // Actually, the image shows ONE table with merged headers or a complex layout.
    // Let's replicate the structure from the image exactly: 
    // Top Half: Arabic Header & Data
    // Bottom Half: English Header & Data
    // OR a side-by-side. 
    // Looking at "uploaded_image_2...": 
    // It has a unified table. 
    // Columns: [Ratio] [Value] [No of Shares] [Name of Partners (Arabic)]
    // ...
    // [English names section below?]
    // Wait, the image shows TWO tables or one complex one. 
    // Let's look closer at the 3rd image.
    // It shows a table with Arabic headers.
    // Then BELOW it, a table with English headers.
    // This is safer to implement as two tables or one split table.

    return {
      arName: `الطرف ${getOrdinalAr(index)}: السيد / ${party.nameAr} `,
      enName: `${getOrdinalEn(index)} Party: Mr.${party.nameEn.toUpperCase()} `,
      shares,
      value,
      percent
    };
  });

  const arRowsHtml = rows.map(r => `
  < tr >
  <td>${r.percent}% </td>
    < td > ${r.value.toLocaleString()} </td>
      < td > ${r.shares} </td>
        < td style = "text-align: right; direction: rtl;" > <strong>${r.arName} </strong></td >
          </tr>
            `).join('');

  const enRowsHtml = rows.map(r => `
          < tr >
          <td style="text-align: left;" > <strong>${r.enName} </strong></td >
            <td>${r.shares} </td>
              < td > ${r.value.toLocaleString()} </td>
                < td > ${r.percent}% </td>
                  </tr>
                    `).join('');

  return `
                  < div style = "margin: 20px 0;" >
                    <!--Arabic Table Part-- >
                      <table class="shares-table" style = "width: 100%; border-collapse: collapse; margin-bottom: 0;" >
                        <thead>
                        <tr class="header-box" >
                          <th width="15%" > نسبة المشاركة </th>
                            < th width = "20%" > القيمة </th>
                              < th width = "15%" > عدد الحصص </th>
                                < th width = "50%" > أمساء الشركاء </th>
                                  </tr>
                                  </thead>
                                  <tbody>
                ${arRowsHtml}
<tr style="background-color: #f9f9f9;" >
  <td><strong>${totalPercent}% </strong></td >
    <td><strong>${totalValue.toLocaleString()} </strong></td >
      <td><strong>${totalShares} </strong></td >
        <td style="text-align: right;" > <strong>المجموع < /strong></td >
          </tr>
          </tbody>
          </table>

          < !--English Table Part-- >
            <table class="shares-table" style = "width: 100%; border-collapse: collapse; margin-top: -1px;" >
              <thead>
              <tr class="header-box" >
                <th width="50%" style = "text-align: left;" > Name of Partners </th>
                  < th width = "15%" > Number of shares </th>
                    < th width = "20%" > Value </th>
                      < th width = "15%" > Percentage of Participation </th>
                        </tr>
                        </thead>
                        <tbody>
                ${enRowsHtml}
<tr style="background-color: #f9f9f9;" >
  <td style="text-align: left;" > <strong>Total < /strong></td >
    <td><strong>${totalShares} </strong></td >
      <td><strong>${totalValue.toLocaleString()} </strong></td >
        <td><strong>${totalPercent}% </strong></td >
          </tr>
          </tbody>
          </table>
          </div>
            `;
};

export function generateMOA(data: MOAData): string {
  const partiesHtml = data.parties.map((p, i) => renderParty(p, i)).join('<br>');
  const tableHtml = renderSharesTable(data);
  const effectiveDate = data.effectiveDate || new Date().toLocaleDateString('en-GB');

  // Hardcoded Article 9 as per image for visualization
  const managerIsPassport = data.parties[1]?.documentType === 'passport';
  const managerIdLabelEn = managerIsPassport ? 'Passport No' : 'ID Card No';
  const managerIdLabelAr = managerIsPassport ? 'رقم جواز السفر' : 'بطاقة هوية رقم';
  
  const article9En = `
      The article 9 shall be amended as follows : <br>
  The Partners have agreed < strong > Mr.${data.parties[1]?.nameEn || 'MANAGER NAME'} </strong> Indian National, holder of ${managerIdLabelEn}: ${data.parties[1]?.idNumber || '...'}, shall be the Managing Director of the Company in all respects, including all managerial, Financial and commercial matters.<br><br>
      The Managing Director shall be appointed for unlimited period, unless otherwise is decided vide resolution passed by the General Assembly of the Company.< br > <br>
  The Managing Director shall have all powers necessary for the management of the company, signing on its behalf and carrying out all acts required by its objectives.< br > <br>
    <strong>Power of the Managing Director include the following: </strong>
      < ul >
      <li>All rights, authorities, and powers granted to the Managing Director under the previous Memorandum of Association shall remain in full force and effect.</li>
        < li > Carrying out all administrative, technical and financial aspects without limitation to the powers entrusted in them.</li>
          < li > Carrying out the works required to achieve the company's goals and objectives.</li>
            < li > Concluding commercial contracts in the name of the Company.</li>
              < li > He is authorized to sign submit, collect and follow up related documents to all local authorities, government, semi - government Private Sector organizations.</li>
                </ul>
                  `;

  const article9Ar = `
      تعديل المادة 9 كما يلي: <br>
  اتفق الشركاء على أن يكون < strong > السيد / ${data.parties[1]?.nameAr || 'اسم المدير'} </strong>، الهندي الجنسية، يحمل ${managerIdLabelAr}: ${data.parties[1]?.idNumber || '...'} المدير التنفيذي للشركة في جميع المجالات شاملة كافة المسائل الإدارية والمالية والتجارية.<br><br>
      يكون تعيين المدير التنفيذي لمدة غير محدودة، ما لم يقرر خلاف ذلك عن طريق قرار صادر من الجمعية العمومية للشركة.< br > <br>
  يكون للمدير التنفيذي كافة الصلاحيات الضرورية لإدارة الشركة والتوقيع نيابة عنها والقيام بجميع الاعمال التي تقتضيها أغراضها.< br > <br>
    <strong>تتضمن سلطات المدير ما يلي: </strong>
      < ul dir = "rtl" >
        <li>تظل جميع الحقوق والصلاحيات والاختصاصات الممنوحة للمدير العام بموجب عقد التأسيس السابق سارية ونافذة.</li>
          < li > القيام بجميع الأعمال الإدارية والفنية والمالية وبدون الحد من شمولية الصلاحيات المعطاة لهم.</li>
            < li > القيام بكافة الأعمال اللازمة لتحقيق أغراض الشركة وأهدافها.</li>
              < li > إبرام العقود التجارية باسم الشركة.</li>
                < li > وهو مفوض للتوقيع وتقديم واستلام ومتابعة المستندات المعنية الي جميع الدوائر الحكومية وشبه الحكومية والمؤسسات الخاصة.</li>
                  </ul>
                    `;

  return `
                  < !DOCTYPE html >
                    <html lang="en" >
                      <head>
                      <meta charset="UTF-8" >
                        <style>
                        @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap');
  
  body {
  font - family: "Times New Roman", "Noto Naskh Arabic", serif;
  font - size: 11pt;
  line - height: 1.3;
  color: #000;
  margin: 0;
  padding: 20px;
  background - color: #fff;
}
  
  .container {
  max - width: 900px;
  margin: 0 auto;
  background: white;
}

  /* Grid Layout for Side-by-Side */
  .row {
  display: flex;
  flex - direction: row;
  gap: 20px;
  align - items: flex - start;
  margin - bottom: 15px;
}
  .col - en { flex: 1; text - align: left; direction: ltr; }
  .col - ar { flex: 1; text - align: right; direction: rtl; }

  /* Header Box Styling */
  .header - container {
  background - color: #e0e0e0;
  padding: 15px;
  margin - bottom: 30px;
  border: 1px solid #ccc;
}
  .header - title - en { font - weight: bold; font - size: 14pt; text - align: center; }
  .header - title - ar { font - weight: bold; font - size: 16pt; text - align: center; font - family: "Noto Naskh Arabic", serif; }
  .company - name { text - align: center; margin - top: 10px; font - weight: bold; font - size: 12pt; }

  /* Typography */
  u { text - decoration: underline; }
  strong { font - weight: bold; }
  .fill { font - weight: normal; } /* Data fields usually normal weight in bold context, or vice versa */

  /* Table Styling */
  .shares - table th, .shares - table td {
  border: 1px solid #000;
  padding: 6px;
  text - align: center;
  vertical - align: middle;
  font - size: 10pt;
}
  .header - box th {
  background - color: #f2f2f2; /* Light grey header background */
  font - weight: bold;
}
  
  ul { margin: 0; padding - left: 20px; }
ul[dir = "rtl"] { padding - right: 20px; padding - left: 0; }
  li { margin - bottom: 5px; }

/* Print */
@media print {
    body { background: none; margin: 0; padding: 0; }
    .container { width: 100 %; max - width: none; }
    .header - box th { background - color: #f2f2f2!important; -webkit - print - color - adjust: exact; }
    .header - container { background - color: #e0e0e0!important; -webkit - print - color - adjust: exact; }
}
</style>
  </head>
  < body >

  <div class="container" >

    <!--Main Header-- >
      <div class="header-container" >
        <div class="row" style = "margin-bottom: 0; align-items: center;" >
          <div class="col-en header-title-en" >
            +Addendum to the Partnership Agreement<br>
        Assignment of shares of<br>
"${data.company.nameEn}"
  </div>
  < div class="col-ar header-title-ar" >
    ملحق عقد شراكة<br>
        تنازل عن حصص شركة<br>
"${data.company.nameAr}"
  </div>
  </div>
  </div>

  < !--Parties -->
    ${partiesHtml}

<div style="height: 20px;" > </div>

  < !--Preamble Header-- >
    <div class="row" style = "margin-bottom: 0;" >
      <div class="col-en" > <div style="background:#e0e0e0; text-align:center; padding:5px; font-weight:bold; border:1px solid #ccc;" > Preamble < /div></div >
        <div class="col-ar" > <div style="background:#e0e0e0; text-align:center; padding:5px; font-weight:bold; border:1px solid #ccc;" > المقدمة < /div></div >
          </div>

          < br >

          <div class="row" >
            <div class="col-en" style = "text-align: justify;" >
              Whereas the First party and Second party, owns the company namely(<strong>${data.company.nameEn} < /strong>) under the Commercial License No <strong>${data.company.licenseNumber}</strong >...
                <br><br>
                The First party wishes to assign a portion of his share of 9 % from the capital of said company to the Third Party who has accepted it.
    </div>
              < div class= "col-ar" dir = "rtl" style = "text-align: justify;" >
              حيث أن الطرف الأول والطرف الثاني يملكان الشركة المـسماة("<strong>${data.company.nameAr}</strong>") بموجب الرخصة التجارية رقم : <strong>${data.company.licenseNumber} </strong>...
              < br > <br>
              يرغب الطرف الأول في التنازل عن جزء من حصته البالغة 9 % من رأس مال الشركة المذكورة إلى الطرف الثالث الذي قبل ذلك.
    </div>
              </div>

              < div class= "row" >
              <div class="col-en" > <strong>And the above parties have agreed to the following: </strong></div >
              <div class="col-ar" dir = "rtl" > <strong>فقد اتفق الأطراف المذكورون على ما يلي: </strong></div >
              </div>

              < !--Clauses -->
              <div class="row" >
              <div class="col-en" >
              <ul>
              <li>The foregoing preamble is an integral part of this addendum.</li>
              < li > The First Party assigned a portion of his shares, amounting to 9 % (equivalent to 9 shares) of the capital of the said company, without payment, to the Third Party, who accepted it.</li>
                </ul>
                </div>
                < div class="col-ar" dir = "rtl" >
                  <ul>
                  <li>التمهيد السابق جزء لا يتجزأ من هذا الملحق.</li>
                    < li > تنازل الطرف الأول عن جزء من حصته البالغة 9 % (عدد الحصص: 9) من رأس مال الشركة المذكورة بدون مقابل للطرف الثالث القابل بذلك.</li>
                      </ul>
                      </div>
                      </div>

                      < div class="row" >
                        <div class="col-en" >
                          With this assignment the First, Second and Third Parties shall become the sole owners of company and the shares of the company shall be divided among the partners as following:
</div>
  < div class="col-ar" dir = "rtl" >
    بهذا التنازل يكون الطرف الأول والثاني والثالث المالكين الوحيدين للشركة وحصص الشركة موزعة بين الشريكين على الوجه التالي:
</div>
  </div>

  < !--Shares Table-- >
    ${tableHtml}

<br>

  <!--Article 9 / Management-- >
    <div class="row" >
      <div class="col-en" style = "font-size: 10pt; text-align: justify;" >
        ${article9En}
</div>
  < div class="col-ar" dir = "rtl" style = "font-size: 10pt; text-align: justify;" >
    ${article9Ar}
</div>
  </div>

  </div>

  </body>
  </html>
    `;
}

