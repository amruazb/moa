import { TerminationLetterContext } from '../types'

function noticePeriodText(months: number): string {
    if (months === 1) return 'one (1) month'
    if (months === 2) return 'two (2) months'
    if (months === 3) return 'three (3) months'
    return `${months} month${months !== 1 ? 's' : ''}`
}

export function page1(ctx: TerminationLetterContext, _pageNum: number): string {
    const noticeText = noticePeriodText(ctx.noticePeriodMonths)

    return `
    <div class="page page-1">
      <div class="page-content">
        <div class="letter-title">Termination Letter</div>

        <div class="date-row">Date: <span class="edited">${ctx.date}</span></div>

        <div class="to-block">
          <div class="label">To:</div>
          <div class="detail-row">
            <span class="detail-label">Mr.</span>
            <span class="edited">${ctx.employee.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Emirates ID No.:</span>
            <span class="edited">${ctx.employee.emiratesId}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date of Birth:</span>
            <span class="edited">${ctx.employee.dob}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Nationality:</span>
            <span class="edited">${ctx.employee.nationality}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Occupation:</span>
            <span class="edited">${ctx.employee.occupation}</span>
          </div>
        </div>

        <div class="salutation">
          Dear Mr. <span class="edited">${ctx.employee.name.split(' ')[0]}</span>,
        </div>

        <p class="body-para">
          This letter is to inform you that your employment with
          <span class="edited">${ctx.companyName}</span> is hereby terminated
          effective from <span class="edited">${ctx.terminationDate}</span>.
        </p>

        <p class="body-para">
          In accordance with UAE Labour Law, you are hereby given a notice period of
          <strong>${noticeText}</strong> prior to the effective termination date.
          During this notice period, you are expected to continue fulfilling your
          duties and responsibilities in a professional manner.
        </p>

        <p class="body-para">
          You are requested to complete all necessary clearance procedures and hand
          over any company property, documents, or assets in your possession before
          or on your last working day.
        </p>

        <p class="body-para">
          All your dues and entitlements, if any, will be settled in accordance with
          the UAE Labour Law and company policy.
        </p>

        <p class="body-para">
          We thank you for your services and wish you success in your future endeavors.
        </p>

        <div class="closing-block">
          <div class="sincerely">Sincerely,</div>
          <br/><br/><br/>
          <div class="company-name">${ctx.companyName}</div><br/>
          <div class="auth-label">Authorized Signatory</div>
        </div>
      </div>
    </div>
  `
}
