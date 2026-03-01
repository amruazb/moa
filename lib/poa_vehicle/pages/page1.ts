// POA Vehicle Page 1: Title, Owner Info, Vehicle Details
import { POAVehicleContext, poaVehiclePageFooter } from '../types'

export function page1(ctx: POAVehicleContext, pageNum: number = 1): string {
  const { owner, bank, vehicles, poaNumber, poaDate } = ctx

  // Render first 2 vehicles on page 1 (or just 1 if there's only 1)
  const vehiclesPage1 = vehicles.slice(0, 2)

  const renderVehicleDetails = (vehicle: typeof vehicles[0], index: number) => `
    <div class="vehicle-item">
      <div class="vehicle-number">(${index + 1})</div>
      <div class="vehicle-detail">Vehicle Type: <span class="edited">${vehicle.vehicleType}</span></div>
      <div class="vehicle-detail">Vehicle Trademark: <span class="edited">${vehicle.trademark}</span></div>
      <div class="vehicle-detail">Manufacture Year: <span class="edited">${vehicle.manufactureYear}</span></div>
      <div class="vehicle-detail">Country of Origin: <span class="edited">${vehicle.countryOfOrigin}</span></div>
      <div class="vehicle-detail">Engine No: <span class="edited no-break">${vehicle.engineNumber}</span></div>
      <div class="vehicle-detail">Chassis No: <span class="edited no-break">${vehicle.chassisNumber}</span></div>
      <div class="vehicle-detail">License Plate No: <span class="edited no-break">${vehicle.licensePlate}</span></div>
    </div>
  `

  const renderVehicleDetailsAr = (vehicle: typeof vehicles[0], index: number) => `
    <div class="vehicle-item">
      <div class="vehicle-number">(${index + 1})</div>
      <div class="vehicle-detail">نوع المركبة: <span class="edited">${vehicle.vehicleTypeAr}</span></div>
      <div class="vehicle-detail">العلامة التجارية للمركبة: <span class="edited">${vehicle.trademarkAr}</span></div>
      <div class="vehicle-detail">سنة الصنع: <span class="edited">${vehicle.manufactureYear}</span></div>
      <div class="vehicle-detail">بلد المنشأ: <span class="edited">${vehicle.countryOfOriginAr}</span></div>
      <div class="vehicle-detail">رقم المحرك: <span class="edited no-break">${vehicle.engineNumber}</span></div>
      <div class="vehicle-detail">رقم الهيكل: <span class="edited no-break">${vehicle.chassisNumber}</span></div>
      <div class="vehicle-detail">رقم اللوحة: <span class="edited no-break">${vehicle.licensePlate}</span></div>
    </div>
  `

  return `
    <div class="page page-1">
      <div class="page-content">

      <!-- Title -->
      <div class="title-pair">
        <div class="title-en">Power of Attorney for Selling Mortgaged Vehicle</div>
        <div class="title-ar rtl">وكالة لبيع مركبة مرهونة</div>
      </div>

      <!-- Owner Info -->
      <div class="article-pair intro-section">
        <div class="block">
          <p>I, the undersigned:<br/>
          <span class="edited">${owner.name}</span>, <span class="edited">${owner.nationality}</span> national, holder of ${owner.documentType === 'eid' ? 'EID' : 'Passport'} No: <span class="edited no-break">${owner.eidOrPassport}</span>${owner.companyName ? `,<br/>in my capacity as Attorney under the Power of Attorney of <span class="edited">${owner.companyName}</span>, licensed by <span class="edited">${owner.issuingAuthority}</span> under License No.: <span class="edited no-break">${owner.licenseNumber}</span>` : ''},<br/>
          by virtue of the Power of Attorney attested by the Notary Public under No.: <span class="edited no-break">${poaNumber || '__________'}</span> on <span class="edited no-break">${poaDate || '__________'}</span>, being the owner of the vehicles whose details are mentioned below:</p>
        </div>
        <div class="block rtl">
          <p>أنا الموقع أدناه:<br/>
          <span class="edited">${owner.nameAr}</span>، <span class="edited">${owner.nationalityAr}</span> الجنسية، حامل ${owner.documentType === 'eid' ? 'بطاقة هوية' : 'جواز سفر'} رقم: <span class="edited no-break">${owner.eidOrPassport}</span>${owner.companyNameAr ? `،<br/>بصفتي وكيلاً بموجب الوكالة لشركة <span class="edited">${owner.companyNameAr}</span>، المرخصة من قبل <span class="edited">${owner.issuingAuthorityAr}</span> بموجب الرخصة رقم: <span class="edited no-break">${owner.licenseNumber}</span>` : ''}،<br/>
          بموجب التوكيل المصدق من kاتب العدل تحت رقم: <span class="edited no-break">${poaNumber || '__________'}</span> بتاريخ <span class="edited no-break">${poaDate || '__________'}</span>، وبصفتي مالكاً للمركبات التي تفاصيلها مذكورة أدناه:</p>
        </div>
      </div>

      <!-- Vehicle Details -->
      <div class="article-pair intro-section">
        <div class="block">
          <div class="vehicle-list">
            ${vehiclesPage1.map((v, i) => renderVehicleDetails(v, i)).join('')}
          </div>
        </div>
        <div class="block rtl">
          <div class="vehicle-list">
            ${vehiclesPage1.map((v, i) => renderVehicleDetailsAr(v, i)).join('')}
          </div>
        </div>
      </div>

      ${vehicles.length <= 2 ? `
      <!-- Bank Authorization (if all vehicles fit on page 1) -->
      <div class="article-pair intro-section">
        <div class="block">
          <p>We authorize (<span class="edited">${bank.name}</span>), holding commercial license issued by Abu Dhabi Department of Economic Development under No. <span class="edited no-break">${bank.licenseNumber}</span>, without the need to serve any prior warning, to retrieve, sell or waive the above-mentioned ${vehicles.length > 1 ? 'vehicles' : 'vehicle'} to itself or third parties at any price deemed appropriate by the Bank. Also, the Bank shall be hereby authorized to sign any legal document and/or conclude any agreement to sell/waive the above-mentioned ${vehicles.length > 1 ? 'vehicles' : 'vehicle'} to settle any due debts to the Bank, including interest and/or any applicable fees.</p>
        </div>
        <div class="block rtl">
          <p>نوكل (<span class="edited">${bank.nameAr}</span>)، حامل الرخصة التجارية الصادرة من دائرة التنمية الاقتصادية بأبوظبي تحت رقم <span class="edited no-break">${bank.licenseNumber}</span>، دون الحاجة إلى تقديم أي إنذار مسبق، لاسترداد أو بيع أو التنازل عن ${vehicles.length > 1 ? 'المركبات المذكورة' : 'المركبة المذكورة'} أعلاه لنفسه أو لأطراف ثالثة بأي سعر يراه البنك مناسباً. كما يُفوض البنك بموجب هذا بالتوقيع على أي مستند قانوني و/أو إبرام أي اتفاقية لبيع/التنازل عن ${vehicles.length > 1 ? 'المركبات المذكورة' : 'المركبة المذكورة'} أعلاه لتسوية أي ديون مستحقة للبنك، بما في ذلك الفوائد و/أو أي رسوم قابلة للتطبيق.</p>
        </div>
      </div>
      ` : ''}

      </div>
      ${poaVehiclePageFooter(pageNum)}
    </div>`
}
