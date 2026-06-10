'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { LetterheadPreview } from '@/components/letterhead/LetterheadPreview'
import { TabLogo } from '@/components/letterhead/TabLogo'
import { TabTheme } from '@/components/letterhead/TabTheme'
import { TabHeader } from '@/components/letterhead/TabHeader'
import { TabLetter } from '@/components/letterhead/TabLetter'
import { TabFooter } from '@/components/letterhead/TabFooter'
import { TabPrint } from '@/components/letterhead/TabPrint'
import { TemplateManager } from '@/components/templates/TemplateManager'
import {
  DEFAULT_DATA,
  THEMES,
  TABS,
  mergeLetterheadData,
  contentTypography,
  letterContentStyles,
  type Tab,
  type LetterheadData,
} from '@/components/letterhead/types'

const STORAGE_KEY = 'letterhead-maker-v1'

function loadSaved(): Partial<LetterheadData> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<LetterheadData>
  } catch {
    return {}
  }
}

export function LetterheadWorkspace() {
  const [tab, setTab] = useState<Tab>('logo')
  const [data, setData] = useState<LetterheadData>(DEFAULT_DATA)

  useEffect(() => {
    const saved = loadSaved()
    if (Object.keys(saved).length > 0) {
      setData(mergeLetterheadData(saved))
    }
  }, [])

  const handleLoadTemplate = useCallback((loaded: Partial<LetterheadData>) => {
    if (!loaded) return
    setData(mergeLetterheadData(loaded))
  }, [])
  const [pdfLoading, setPdfLoading] = useState(false)

  const theme = useMemo(
    () => THEMES.find(t => t.id === data.themeId) ?? THEMES[0],
    [data.themeId],
  )

  const patch = useCallback((p: Partial<LetterheadData>) => {
    setData(prev => ({ ...prev, ...p }))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const handlePrint = () => {
    const html = buildPrintHtml(data, theme)
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(html)
    w.document.close()
    w.focus()
    setTimeout(() => w.print(), 300)
  }

  const handlePdf = async () => {
    const el = document.getElementById('lh-pdf-render')
    if (!el) return
    setPdfLoading(true)
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      })
      const img = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
      pdf.addImage(img, 'PNG', 0, 0, 210, 297)
      pdf.save(`${sanitizeFilename(data.companyName)}-letterhead.pdf`)
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div className="flex gap-6 items-start p-6">
      {/* Controls */}
      <div className="w-80 flex-shrink-0 space-y-3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Cloud storage</p>
          <TemplateManager
            documentType="letterhead"
            currentData={data}
            onLoadTemplate={handleLoadTemplate}
          />
          <p className="text-xs text-gray-400 leading-relaxed">
            Save letterheads to Supabase. Load a saved file to select and continue editing.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {TABS.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-colors ${
                  tab === t
                    ? 'bg-sky-50 text-sky-700 border-b-2 border-sky-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="p-4 space-y-4">
            {tab === 'logo' && <TabLogo data={data} onChange={patch} />}
            {tab === 'theme' && <TabTheme data={data} onChange={patch} />}
            {tab === 'header' && <TabHeader data={data} onChange={patch} />}
            {tab === 'letter' && <TabLetter data={data} onChange={patch} />}
            {tab === 'footer' && <TabFooter data={data} onChange={patch} />}
            {tab === 'print' && (
              <TabPrint pdfLoading={pdfLoading} onPrint={handlePrint} onPdf={handlePdf} />
            )}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 min-w-0 flex flex-col items-center">
        <p className="text-xs text-gray-400 mb-3 self-start">Live preview — A4 letterhead</p>
        <LetterheadPreview data={data} theme={theme} />
      </div>

      {/* Hidden full-size render for PDF */}
      <div
        id="lh-pdf-render"
        style={{ position: 'fixed', left: '-9999px', top: 0, pointerEvents: 'none' }}
        aria-hidden
      >
        <LetterheadPreview data={data} theme={theme} scale={1} printMode />
      </div>
    </div>
  )
}

function sanitizeFilename(name: string) {
  return (name || 'letterhead').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-') || 'letterhead'
}

function buildPrintHtml(data: LetterheadData, theme: (typeof THEMES)[0]) {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  const isCenter = data.headerLayout === 'logo-center'
  const isRight = data.headerLayout === 'logo-right'
  const flexDir = isCenter ? 'column' : isRight ? 'row-reverse' : 'row'
  const textAlign = isCenter ? 'center' : isRight ? 'right' : 'left'
  const justify = isCenter ? 'center' : isRight ? 'flex-end' : 'flex-start'

  const logoHtml = data.logoUrl
    ? `<img src="${data.logoUrl}" alt="Logo" style="width:${data.logoWidthMm}mm;height:auto;object-fit:contain;display:block;flex-shrink:0;" />`
    : ''

  const contactParts: string[] = []
  if (data.address) contactParts.push(`<div class="address">${esc(data.address)}</div>`)
  const inline: string[] = []
  if (data.phone) inline.push(`<span><strong>Tel</strong> ${esc(data.phone)}</span>`)
  if (data.email) inline.push(`<span><strong>Email</strong> ${esc(data.email)}</span>`)
  if (data.website) inline.push(`<span><strong>Web</strong> ${esc(data.website)}</span>`)
  if (inline.length) contactParts.push(`<div class="footer-inline">${inline.join('')}</div>`)
  const contactHtml = contactParts.join('')
  const hasContact = contactParts.length > 0
  const contentDir = data.contentDir ?? 'ltr'
  const bodyType = contentTypography(contentDir)
  const contentStyles = letterContentStyles(data)

  return `<!DOCTYPE html><html lang="${contentDir === 'rtl' ? 'ar' : 'en'}"><head><meta charset="utf-8"/><title>${esc(data.companyName)} Letterhead</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, Helvetica, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 210mm; height: 297mm; background: ${theme.background}; display: flex; flex-direction: column; }
  .header { display: flex; flex-direction: ${flexDir}; align-items: center; justify-content: ${justify}; gap: 4mm; padding: 12mm 18mm 6mm; }
  .header-text { text-align: ${textAlign}; flex: ${isCenter ? 'none' : '1'}; min-width: 0; }
  .company { font-size: 6mm; font-weight: 700; color: ${theme.primary}; line-height: 1.2; }
  .tagline { font-size: 3.2mm; color: ${theme.muted}; margin-top: 1mm; }
  .divider { height: 0.25mm; background: ${theme.divider}; margin: 0 18mm; }
  .body { flex: 1; margin: 6mm 18mm 4mm; display: flex; flex-direction: column; overflow: hidden; direction: ${bodyType.direction}; }
  .letter-date { text-align: ${bodyType.dateAlign}; direction: ${bodyType.direction}; font-family: ${bodyType.fontFamily}; font-size: ${contentStyles.dateFontSizeMm}mm; color: ${theme.muted}; margin-bottom: 5mm; flex-shrink: 0; }
  .letter-content { flex: 1; font-size: ${contentStyles.contentFontSizeMm}mm; color: ${theme.text}; line-height: ${contentStyles.contentLineHeight}; white-space: pre-wrap; direction: ${bodyType.direction}; text-align: ${bodyType.textAlign}; font-family: ${bodyType.fontFamily}; unicode-bidi: plaintext; }
  .footer { padding: 4mm 18mm 10mm; }
  .address { font-size: 2.6mm; color: ${theme.muted}; margin-bottom: 1.5mm; line-height: 1.5; }
  .footer-inline { display: flex; flex-wrap: wrap; justify-content: ${justify}; gap: 1mm 4mm; font-size: 2.6mm; color: ${theme.text}; }
  .footer-inline strong { color: ${theme.primary}; font-weight: 600; margin-right: 0.5mm; }
  .footer-note { margin-top: 3mm; font-size: 2.2mm; color: ${theme.muted}; text-align: ${textAlign}; font-style: italic; }
</style></head><body>
<div class="page">
  <div class="header">${logoHtml}<div class="header-text">
    <div class="company">${esc(data.companyName || 'Company Name')}</div>
    ${data.tagline ? `<div class="tagline">${esc(data.tagline)}</div>` : ''}
  </div></div>
  ${data.showHeaderDivider ? '<div class="divider"></div>' : ''}
  <div class="body">
    ${data.letterDate ? `<div class="letter-date">${esc(data.letterDate)}</div>` : ''}
    ${data.content ? `<div class="letter-content">${esc(data.content).replace(/\n/g, '<br>')}</div>` : ''}
  </div>
  <div class="footer">
    ${data.showFooterDivider && hasContact ? '<div class="divider" style="margin-bottom:4mm;"></div>' : ''}
    ${hasContact ? `<div class="footer-contacts">${contactHtml}</div>` : ''}
    ${data.footerNote ? `<div class="footer-note">${esc(data.footerNote)}</div>` : ''}
  </div>
</div></body></html>`
}
