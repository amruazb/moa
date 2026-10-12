import { CvContext } from './types'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderContactItem(icon: string, content: string): string {
  if (!content.trim()) return ''
  return `
    <div class="contact-item">
      <span class="contact-icon">${icon}</span>
      <span>${escapeHtml(content)}</span>
    </div>
  `
}

function renderEducation(ctx: CvContext): string {
  return ctx.education
    .map(
      edu => `
    <div class="edu-item">
      <div class="edu-header">
        <span class="edu-qual">${escapeHtml(edu.qualification)}</span>
        ${edu.year ? `<span class="edu-year">${escapeHtml(edu.year)}</span>` : ''}
      </div>
      <div class="edu-inst">${escapeHtml(edu.institution)}</div>
    </div>
  `
    )
    .join('')
}

function renderExperience(ctx: CvContext): string {
  return ctx.experience
    .map(
      exp => `
    <div class="exp-item">
      <div class="exp-header">
        <span class="exp-title">${escapeHtml(exp.title)}</span>
        <span class="exp-period">${escapeHtml(exp.period)}</span>
      </div>
      <div class="exp-org">${escapeHtml(exp.organization)}</div>
      <div class="exp-desc">${escapeHtml(exp.description)}</div>
    </div>
  `
    )
    .join('')
}

function renderList(items: string[]): string {
  return items.map(item => `<li>${escapeHtml(item)}</li>`).join('')
}

export function renderCvPage(ctx: CvContext): string {
  const fullAddress = [ctx.addressLine1, ctx.addressLine2, ctx.district, `PIN: ${ctx.pinCode}`]
    .filter(Boolean)
    .join(', ')

  return `
    <div class="sidebar" style="background-color:#1e3a5f;color:#ffffff;">
      <div class="sidebar-section">
        <div class="sidebar-title">Contact</div>
        ${renderContactItem('&#9993;', fullAddress)}
        ${renderContactItem('&#9742;', ctx.phone)}
        ${renderContactItem('&#9993;', ctx.email)}
      </div>

      <div class="sidebar-section">
        <div class="sidebar-title">Skills</div>
        <ul class="skill-list">
          ${renderList(ctx.skills)}
        </ul>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-title">Languages</div>
        <ul class="lang-list">
          ${renderList(ctx.languages)}
        </ul>
      </div>
    </div>

    <div class="main">
      <div class="header">
        <h1>${escapeHtml(ctx.fullName)}</h1>
        <div class="job-title">${escapeHtml(ctx.title)}</div>
      </div>

      <div class="section">
        <div class="section-title">Professional Summary</div>
        <p class="summary">${escapeHtml(ctx.summary)}</p>
      </div>

      <div class="section">
        <div class="section-title">Education</div>
        ${renderEducation(ctx)}
      </div>

      <div class="section">
        <div class="section-title">Experience</div>
        ${renderExperience(ctx)}
      </div>
    </div>
  `
}
