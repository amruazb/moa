// POA Vehicle Page 2: Remaining Vehicles + Authorization + Validity
import { POAVehicleContext, poaVehiclePageFooter, yearsToWords } from '../types'

export function page2(ctx: POAVehicleContext, pageNum: number = 2): string {
  const { bank, vehicles, validityYears } = ctx
  const yearsText = yearsToWords(validityYears)

  // Render remaining vehicles (from index 2 onwards)
  const vehiclesPage2 = vehicles.slice(2)

  const renderVehicleDetails = (vehicle: typeof vehicles[0], index: number) => `
    <div class="vehicle-item">
      <div class="vehicle-number">(${index + 3})</div>
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
      <div class="vehicle-number">(${index + 3})</div>
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
    <div class="page page-2">
      <div class="page-content">

      ${vehiclesPage2.length > 0 ? `
      <!-- Remaining Vehicle Details -->
      <div class="article-pair intro-section">
        <div class="block">
          <div class="vehicle-list">
            ${vehiclesPage2.map((v, i) => renderVehicleDetails(v, i)).join('')}
          </div>
        </div>
        <div class="block rtl">
          <div class="vehicle-list">
            ${vehiclesPage2.map((v, i) => renderVehicleDetailsAr(v, i)).join('')}
          </div>
        </div>
      </div>
      ` : ''}

      ${vehicles.length > 2 || vehiclesPage2.length === 0 ? `
      <!-- Bank Authorization -->
      <div class="article-pair intro-section">
        <div class="block">
          <p>We authorize (<span class="edited">${bank.name}</span>), holding commercial license issued by Abu Dhabi Department of Economic Development under No. <span class="edited no-break">${bank.licenseNumber}</span>, without the need to serve any prior warning, to retrieve, sell or waive the above-mentioned ${vehicles.length > 1 ? 'vehicles' : 'vehicle'} to itself or third parties at any price deemed appropriate by the Bank. Also, the Bank shall be hereby authorized to sign any legal document and/or conclude any agreement to sell/waive the above-mentioned ${vehicles.length > 1 ? 'vehicles' : 'vehicle'} to settle any due debts to the Bank, including interest and/or any applicable fees.</p>
        </div>
        <div class="block rtl">
          <p>نوكل (<span class="edited">${bank.nameAr}</span>)، حامل الرخصة التجارية الصادرة من دائرة التنمية الاقتصادية بأبوظبي تحت رقم <span class="edited no-break">${bank.licenseNumber}</span>، دون الحاجة إلى تقديم أي إنذار مسبق، لاسترداد أو بيع أو التنازل عن ${vehicles.length > 1 ? 'المركبات المذكورة' : 'المركبة المذكورة'} أعلاه لنفسه أو لأطراف ثالثة بأي سعر يراه البنك مناسباً. كما يُفوض البنك بموجب هذا بالتوقيع على أي مستند قانوني و/أو إبرام أي اتفاقية لبيع/التنازل عن ${vehicles.length > 1 ? 'المركبات المذكورة' : 'المركبة المذكورة'} أعلاه لتسوية أي ديون مستحقة للبنك، بما في ذلك الفوائد و/أو أي رسوم قابلة للتطبيق.</p>
        </div>
      </div>
      ` : ''}

      <!-- Bank Authorization to Settle Debts -->
      <div class="article-pair intro-section">
        <div class="block">
          <p>We authorize the Bank to utilize the sale proceeds to settle any due debts to the Bank, including interest and/or any applicable fees. Furthermore, we hereby authorize the Bank to reissue replacement for lost of ${vehicles.length > 1 ? 'vehicle licenses' : 'vehicle license'}/Vehicle Title Card whenever necessary for the above mentioned ${vehicles.length > 1 ? 'vehicles' : 'vehicle'}.</p>
        </div>
        <div class="block rtl">
          <p>نفوض البنك باستخدام عائدات البيع لتسوية أي ديون مستحقة للبنك، بما في ذلك الفوائد و/أو أي رسوم قابلة للتطبيق. علاوة على ذلك، نفوض البنك بموجب هذا بإعادة إصدار بدل فاقد لـ ${vehicles.length > 1 ? 'رخص المركبات' : 'رخصة المركبة'}/بطاقة ملكية المركبة عند الضرورة ${vehicles.length > 1 ? 'للمركبات المذكورة' : 'للمركبة المذكورة'} أعلاه.</p>
        </div>
      </div>

      <!-- Validity Period -->
      <div class="article-pair intro-section">
        <div class="block">
          <p>This power of attorney is valid until <span class="edited no-break">13/04/2028</span>, unless it is terminated for another reason.</p>
        </div>
        <div class="block rtl">
          <p>هذا التوكيل صالح لغاية <span class="edited no-break">13/04/2028</span>، ما لم يتم إنهاؤه لسبب آخر.</p>
        </div>
      </div>

      <!-- Redesigned Centered Signature Section with Stacked Names -->
      <div class="signature-centered-box">
        <div class="sig-name-line">
          ${ctx.owner.companyName ? `
            <div class="sig-name-en edited">${ctx.owner.companyName}</div>
            <div class="sig-name-ar edited">${ctx.owner.companyNameAr}</div>
            <div class="sig-name-en edited">${ctx.owner.name}</div>
            <div class="sig-name-ar edited">${ctx.owner.nameAr}</div>
          ` : `
            <div class="sig-name-en edited">${ctx.owner.name}</div>
            <div class="sig-name-ar edited">${ctx.owner.nameAr}</div>
          `}
        </div>
        
        <div class="sig-line-container">
          <div class="sig-label-bilingual">
            <span class="ltr">Signature</span> / <span class="rtl">التوقيع</span>
          </div>
        </div>
      </div>

      </div>
    </div>`
}
