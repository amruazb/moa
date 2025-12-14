
import React from 'react';
import { MOAData, Party } from '@/lib/moa/types';

interface MOADocumentProps {
    data: MOAData;
}

const getOrdinalEn = (n: number): string => {
    const ordinals = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
    return ordinals[n] || `${n + 1}th`;
};

const getOrdinalAr = (n: number): string => {
    const ordinals = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر'];
    return ordinals[n] || `${n + 1}`;
};

export const MOADocument: React.FC<MOADocumentProps> = ({ data }) => {
    const totalShares = data.shareAllocations.reduce((sum, s) => sum + s.shareCount, 0);
    const totalValue = data.shareAllocations.reduce((sum, s) => sum + s.shareValue, 0);
    const totalPercent = data.shareAllocations.reduce((sum, s) => sum + s.percentage, 0);

    const rows = data.parties.map((party, index) => {
        const alloc = data.shareAllocations.find(s => s.partyIndex === index);
        const shares = alloc ? alloc.shareCount : 0;
        const value = alloc ? alloc.shareValue : 0;
        const percent = alloc ? alloc.percentage : 0;

        return {
            arName: `الطرف ${getOrdinalAr(index)}: السيد / ${party.nameAr}`,
            enName: `${getOrdinalEn(index)} Party: Mr.${party.nameEn.toUpperCase()}`,
            shares,
            value,
            percent
        };
    });

    // Hardcoded Article 9 logic (similar to generator)
    // Assuming 2nd party (index 1) is the manager if present, or fallback
    const managerParty = data.parties[1] || data.parties[0];

    return (
        <div className="moa-document bg-white p-8 max-w-[900px] mx-auto text-black font-serif text-[11pt] leading-[1.3]">
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap');
        
        .moa-document {
          font-family: "Times New Roman", "Noto Naskh Arabic", serif;
        }
        .moa-document .header-container {
          background-color: #e0e0e0;
          padding: 15px;
          margin-bottom: 30px;
          border: 1px solid #ccc;
        }
        .moa-document .header-title-en { font-weight: bold; font-size: 14pt; text-align: center; }
        .moa-document .header-title-ar { font-weight: bold; font-size: 16pt; text-align: center; font-family: "Noto Naskh Arabic", serif; }
        .moa-document u { text-decoration: underline; }
        .moa-document strong { font-weight: bold; }
        .moa-document .shares-table th, .moa-document .shares-table td {
          border: 1px solid #000;
          padding: 6px;
          text-align: center;
          vertical-align: middle;
          font-size: 10pt;
        }
        .moa-document .header-box th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        .moa-document ul { margin: 0; padding-left: 20px; }
        .moa-document ul[dir="rtl"] { padding-right: 20px; padding-left: 0; }
        .moa-document li { margin-bottom: 5px; }

        @media print {
            body { background: none; margin: 0; padding: 0; }
            .moa-document { width: 100%; max-width: none; padding: 0; }
            .header-box th { background-color: #f2f2f2 !important; -webkit-print-color-adjust: exact; }
            .header-container { background-color: #e0e0e0 !important; -webkit-print-color-adjust: exact; }
        }
      `}</style>

            {/* Main Header */}
            <div className="header-container">
                <div className="flex flex-row gap-5 items-center">
                    <div className="flex-1 text-left" dir="ltr">
                        <div className="header-title-en">
                            Addendum to the Partnership Agreement<br />
                            Assignment of shares of<br />
                            &quot;{data.company.nameEn}&quot;
                        </div>
                    </div>
                    <div className="flex-1 text-right" dir="rtl">
                        <div className="header-title-ar">
                            ملحق عقد شراكة<br />
                            تنازل عن حصص شركة<br />
                            &quot;{data.company.nameAr}&quot;
                        </div>
                    </div>
                </div>
            </div>

            {/* Parties */}
            {data.parties.map((party, index) => (
                <div key={index} className="party-section mb-5">
                    <div className="flex flex-row gap-5">
                        <div className="flex-1 text-left" dir="ltr"><u className="font-bold">{getOrdinalEn(index)} Party:</u></div>
                        <div className="flex-1 text-right" dir="rtl"><u className="font-bold">الطرف {getOrdinalAr(index)}:</u></div>
                    </div>
                    <div className="flex flex-row gap-5 mt-1">
                        <div className="flex-1 text-left" dir="ltr">
                            <strong>MR.{party.nameEn.toUpperCase()},</strong><br />
                            Nationality: <span className="font-normal">{party.nationalityEn}</span><br />
                            ID Card No: <span className="font-normal">{party.idNumber}</span><br />
                            Date of Birth: <span className="font-normal">{party.dob}</span>
                        </div>
                        <div className="flex-1 text-right" dir="rtl">
                            <strong>السيد / {party.nameAr}</strong><br />
                            الجنسية: <span className="font-normal">{party.nationalityAr}</span><br />
                            بطاقة هوية رقم: <span className="font-normal">{party.idNumber}</span><br />
                            تاريخ الميلاد: <span className="font-normal">{party.dob}</span>
                        </div>
                    </div>

                    {party.representative && (
                        <div className="flex flex-row gap-5 mt-3">
                            <div className="flex-1 text-left" dir="ltr">
                                <strong>Represented by: </strong><br />
                                <span className="font-normal">Mr.{party.representative.nameEn}</span>, <span className="font-normal">{party.representative.nationalityEn}</span> National,<br />
                                Date of Birth: <span className="font-normal">{party.representative.dob}</span><br />
                                Holder of Emirates ID No.: <span className="font-normal">{party.representative.idNumber}</span><br />
                                By virtue of <span className="font-normal">{party.representative.capacityEn}</span><br />
                                residing at <span className="font-normal">{party.representative.addressEn || 'UAE'}</span>.
                            </div>
                            <div className="flex-1 text-right" dir="rtl">
                                <strong>ممثل بواسطة: </strong><br />
                                السيد / <span className="font-normal">{party.representative.nameAr}</span> <span className="font-normal">{party.representative.nationalityAr}</span> الجنسية<br />
                                تاريخ الميلاد: <span className="font-normal">{party.representative.dob}</span><br />
                                حامل بطاقة الهوية الإماراتية رقم: <span className="font-normal">{party.representative.idNumber}</span><br />
                                بموجب <span className="font-normal">{party.representative.capacityAr}</span><br />
                                ويقيم في: <span className="font-normal">{party.representative.addressAr || 'الإمارات'}</span>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="h-5"></div>

            {/* Preamble Header */}
            <div className="flex flex-row gap-5">
                <div className="flex-1 text-left" dir="ltr">
                    <div className="bg-[#e0e0e0] text-center p-1 font-bold border border-[#ccc]">Preamble</div>
                </div>
                <div className="flex-1 text-right" dir="rtl">
                    <div className="bg-[#e0e0e0] text-center p-1 font-bold border border-[#ccc]">المقدمة</div>
                </div>
            </div>

            <br />

            {/* Preamble Content */}
            <div className="flex flex-row gap-5">
                <div className="flex-1 text-justify" dir="ltr">
                    Whereas the First party and Second party, owns the company namely(<strong>{data.company.nameEn}</strong>) under the Commercial License No <strong>{data.company.licenseNumber}</strong>...
                    <br /><br />
                    The First party wishes to assign a portion of his share of 9% from the capital of said company to the Third Party who has accepted it.
                </div>
                <div className="flex-1 text-justify text-right" dir="rtl">
                    حيث أن الطرف الأول والطرف الثاني يملكان الشركة المـسماة(&quot;<strong>{data.company.nameAr}</strong>&quot;) بموجب الرخصة التجارية رقم : <strong>{data.company.licenseNumber}</strong>...
                    <br /><br />
                    يرغب الطرف الأول في التنازل عن جزء من حصته البالغة 9% من رأس مال الشركة المذكورة إلى الطرف الثالث الذي قبل ذلك.
                </div>
            </div>

            <div className="flex flex-row gap-5 mt-4">
                <div className="flex-1 text-left" dir="ltr"><strong>And the above parties have agreed to the following:</strong></div>
                <div className="flex-1 text-right" dir="rtl"><strong>فقد اتفق الأطراف المذكورون على ما يلي:</strong></div>
            </div>

            {/* Clauses */}
            <div className="flex flex-row gap-5 mt-2">
                <div className="flex-1 text-left" dir="ltr">
                    <ul>
                        <li>The foregoing preamble is an integral part of this addendum.</li>
                        <li>The First Party assigned a portion of his shares, amounting to 9% (equivalent to 9 shares) of the capital of the said company, without payment, to the Third Party, who accepted it.</li>
                    </ul>
                </div>
                <div className="flex-1 text-right" dir="rtl">
                    <ul dir="rtl">
                        <li>التمهيد السابق جزء لا يتجزأ من هذا الملحق.</li>
                        <li>تنازل الطرف الأول عن جزء من حصته البالغة 9% (عدد الحصص: 9) من رأس مال الشركة المذكورة بدون مقابل للطرف الثالث القابل بذلك.</li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-row gap-5 mt-4">
                <div className="flex-1 text-left" dir="ltr">
                    With this assignment the First, Second and Third Parties shall become the sole owners of company and the shares of the company shall be divided among the partners as following:
                </div>
                <div className="flex-1 text-right" dir="rtl">
                    بهذا التنازل يكون الطرف الأول والثاني والثالث المالكين الوحيدين للشركة وحصص الشركة موزعة بين الشريكين على الوجه التالي:
                </div>
            </div>

            {/* Shares Table */}
            <div className="my-[20px]">
                {/* Arabic Table */}
                <table className="shares-table w-full border-collapse mb-0">
                    <thead>
                        <tr className="header-box">
                            <th className="w-[15%]">نسبة المشاركة</th>
                            <th className="w-[20%]">القيمة</th>
                            <th className="w-[15%]">عدد الحصص</th>
                            <th className="w-[50%]">أمساء الشركاء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i}>
                                <td>{r.percent}%</td>
                                <td>{r.value.toLocaleString()}</td>
                                <td>{r.shares}</td>
                                <td className="text-right" dir="rtl"><strong>{r.arName}</strong></td>
                            </tr>
                        ))}
                        <tr className="bg-[#f9f9f9]">
                            <td><strong>{totalPercent}%</strong></td>
                            <td><strong>{totalValue.toLocaleString()}</strong></td>
                            <td><strong>{totalShares}</strong></td>
                            <td className="text-right"><strong>المجموع</strong></td>
                        </tr>
                    </tbody>
                </table>

                {/* English Table */}
                <table className="shares-table w-full border-collapse mt-[-1px]">
                    <thead>
                        <tr className="header-box">
                            <th className="w-[50%] text-left">Name of Partners</th>
                            <th className="w-[15%]">Number of shares</th>
                            <th className="w-[20%]">Value</th>
                            <th className="w-[15%]">Percentage of Participation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i}>
                                <td className="text-left"><strong>{r.enName}</strong></td>
                                <td>{r.shares}</td>
                                <td>{r.value.toLocaleString()}</td>
                                <td>{r.percent}%</td>
                            </tr>
                        ))}
                        <tr className="bg-[#f9f9f9]">
                            <td className="text-left"><strong>Total</strong></td>
                            <td><strong>{totalShares}</strong></td>
                            <td><strong>{totalValue.toLocaleString()}</strong></td>
                            <td><strong>{totalPercent}%</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br />

            {/* Article 9 */}
            <div className="flex flex-row gap-5">
                <div className="flex-1 text-justify text-[10pt]" dir="ltr">
                    The article 9 shall be amended as follows : <br />
                    The Partners have agreed <strong>Mr.{managerParty?.nameEn || 'MANAGER NAME'}</strong> Indian National, holder of ID Card No: {managerParty?.idNumber}, shall be the Managing Director of the Company in all respects, including all managerial, Financial and commercial matters.<br /><br />
                    The Managing Director shall be appointed for unlimited period, unless otherwise is decided vide resolution passed by the General Assembly of the Company.<br /><br />
                    The Managing Director shall have all powers necessary for the management of the company, signing on its behalf and carrying out all acts required by its objectives.<br /><br />
                    <strong>Power of the Managing Director include the following: </strong>
                    <ul>
                        <li>All rights, authorities, and powers granted to the Managing Director under the previous Memorandum of Association shall remain in full force and effect.</li>
                        <li>Carrying out all administrative, technical and financial aspects without limitation to the powers entrusted in them.</li>
                        <li>Carrying out the works required to achieve the company&apos;s goals and objectives.</li>
                        <li>Concluding commercial contracts in the name of the Company.</li>
                        <li>He is authorized to sign submit, collect and follow up related documents to all local authorities, government, semi-government Private Sector organizations.</li>
                    </ul>
                </div>
                <div className="flex-1 text-justify text-right text-[10pt]" dir="rtl">
                    تعديل المادة 9 كما يلي: <br />
                    اتفق الشركاء على أن يكون <strong>السيد / {managerParty?.nameAr || 'اسم المدير'}</strong>، الهندي الجنسية، يحمل بطاقة هوية رقم: {managerParty?.idNumber} المدير التنفيذي للشركة في جميع المجالات شاملة كافة المسائل الإدارية والمالية والتجارية.<br /><br />
                    يكون تعيين المدير التنفيذي لمدة غير محدودة، ما لم يقرر خلاف ذلك عن طريق قرار صادر من الجمعية العمومية للشركة.<br /><br />
                    يكون للمدير التنفيذي كافة الصلاحيات الضرورية لإدارة الشركة والتوقيع نيابة عنها والقيام بجميع الاعمال التي تقتضيها أغراضها.<br /><br />
                    <strong>تتضمن سلطات المدير ما يلي: </strong>
                    <ul dir="rtl">
                        <li>تظل جميع الحقوق والصلاحيات والاختصاصات الممنوحة للمدير العام بموجب عقد التأسيس السابق سارية ونافذة.</li>
                        <li>القيام بجميع الأعمال الإدارية والفنية والمالية وبدون الحد من شمولية الصلاحيات المعطاة لهم.</li>
                        <li>القيام بكافة الأعمال اللازمة لتحقيق أغراض الشركة وأهدافها.</li>
                        <li>إبرام العقود التجارية باسم الشركة.</li>
                        <li>وهو مفوض للتوقيع وتقديم واستلام ومتابعة المستندات المعنية الي جميع الدوائر الحكومية وشبه الحكومية والمؤسسات الخاصة.</li>
                    </ul>
                </div>
            </div>

        </div>
    );
};
