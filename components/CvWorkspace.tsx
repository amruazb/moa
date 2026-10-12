'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  generateCv,
  extractCvContext,
  sampleCvData,
  cvSampleProfiles,
  CvData,
  CvEducation,
  CvExperience,
} from '@/lib/cv'
import { useFormattingStore } from '@/store/formattingStore'
import { FormattingToolbar } from './workspace/FormattingToolbar'

const inputClass =
  'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200'

const createSampleCopy = (data: CvData): CvData => ({
  ...data,
  education: data.education?.map(item => ({ ...item })),
  experience: data.experience?.map(item => ({ ...item })),
  skills: data.skills ? [...data.skills] : undefined,
  languages: data.languages ? [...data.languages] : undefined,
})

export function CvWorkspace() {
  const settings = useFormattingStore(state => state.settings)
  const initializeFormattingFromCache = useFormattingStore(state => state.initializeFromCache)
  const previewRef = useRef<HTMLIFrameElement>(null)

  const [formData, setFormData] = useState<CvData>(sampleCvData)
  const [selectedSample, setSelectedSample] = useState(cvSampleProfiles[0]?.label ?? 'Custom')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    initializeFormattingFromCache()
  }, [initializeFormattingFromCache])

  const handleSampleChange = (label: string) => {
    const sample = cvSampleProfiles.find(option => option.label === label)
    if (!sample) return

    setSelectedSample(label)
    setFormData(createSampleCopy(sample.data))
  }

  const handleChange = (field: keyof CvData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleEducationChange = (index: number, field: keyof CvEducation, value: string) => {
    setFormData(prev => {
      const education = [...(prev.education || [])]
      education[index] = { ...education[index], [field]: value }
      return { ...prev, education }
    })
  }

  const handleExperienceChange = (index: number, field: keyof CvExperience, value: string) => {
    setFormData(prev => {
      const experience = [...(prev.experience || [])]
      experience[index] = { ...experience[index], [field]: value }
      return { ...prev, experience }
    })
  }

  const handleSkillsChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: value.split('\n').filter(s => s.trim()),
    }))
  }

  const handleLanguagesChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      languages: value.split('\n').filter(s => s.trim()),
    }))
  }

  const context = useMemo(() => extractCvContext(formData), [formData])
  const htmlContent = useMemo(() => generateCv(context, settings), [context, settings])

  const resizePreviewIframe = () => {
    const iframe = previewRef.current
    const docEl = iframe?.contentDocument?.querySelector('.doc') as HTMLElement | null
    if (!iframe || !docEl) return
    const height = Math.ceil(docEl.getBoundingClientRect().height) + 2
    iframe.style.height = `${height}px`
  }

  useEffect(() => {
    const iframe = previewRef.current
    if (!iframe) return

    const handleLoad = () => {
      resizePreviewIframe()
    }

    iframe.addEventListener('load', handleLoad)
    handleLoad()

    return () => iframe.removeEventListener('load', handleLoad)
  }, [htmlContent])

  const generatePDF = async () => {
    const iframe = previewRef.current
    const iframeDoc = iframe?.contentDocument
    const docEl = iframeDoc?.querySelector('.doc') as HTMLElement | null
    if (!docEl || !iframeDoc) return

    setIsGenerating(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default

      const pageWidthPx = 794
      const pageHeightPx = 1123

      const wrapper = document.createElement('div')
      wrapper.style.position = 'fixed'
      wrapper.style.left = '-9999px'
      wrapper.style.top = '0'
      wrapper.style.width = `${pageWidthPx}px`
      wrapper.style.height = `${pageHeightPx}px`
      wrapper.style.overflow = 'hidden'
      wrapper.style.background = '#ffffff'

      const styleContent = iframeDoc.querySelector('style')?.textContent || ''
      const styleEl = document.createElement('style')
      styleEl.textContent = `${styleContent}
        .doc {
          margin: 0 !important;
          box-shadow: none !important;
          width: ${pageWidthPx}px !important;
          min-height: ${pageHeightPx}px !important;
          height: auto !important;
          display: table !important;
          table-layout: fixed !important;
        }
        .sidebar {
          background-color: #1e3a5f !important;
          color: #ffffff !important;
          display: table-cell !important;
          width: 272px !important;
          min-width: 272px !important;
          vertical-align: top !important;
        }
        .main {
          display: table-cell !important;
          vertical-align: top !important;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      `
      wrapper.appendChild(styleEl)

      const clone = docEl.cloneNode(true) as HTMLElement
      clone.style.width = `${pageWidthPx}px`
      clone.style.minHeight = `${pageHeightPx}px`
      clone.style.height = 'auto'
      clone.style.margin = '0'
      clone.style.boxShadow = 'none'
      clone.style.display = 'table'
      clone.style.tableLayout = 'fixed'

      const sidebar = clone.querySelector('.sidebar') as HTMLElement | null
      if (sidebar) {
        sidebar.style.backgroundColor = '#1e3a5f'
        sidebar.style.color = '#ffffff'
        sidebar.style.width = '272px'
        sidebar.style.display = 'table-cell'
        sidebar.style.verticalAlign = 'top'
      }

      const main = clone.querySelector('.main') as HTMLElement | null
      if (main) {
        main.style.display = 'table-cell'
        main.style.verticalAlign = 'top'
      }

      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)

      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))

      const measuredHeight = Math.max(Math.ceil(clone.getBoundingClientRect().height), pageHeightPx)
      wrapper.style.height = `${measuredHeight}px`

      const opt = {
        margin: 0,
        filename: `CV_${context.fullName.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          width: pageWidthPx,
          height: measuredHeight,
          windowWidth: pageWidthPx,
          windowHeight: measuredHeight,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc: Document) => {
            const clonedSidebar = clonedDoc.querySelector('.sidebar') as HTMLElement | null
            if (clonedSidebar) {
              clonedSidebar.style.backgroundColor = '#1e3a5f'
              clonedSidebar.style.color = '#ffffff'
            }
          },
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait' as const,
        },
      }

      await html2pdf().set(opt).from(clone).save()
      document.body.removeChild(wrapper)
    } catch (error) {
      console.error('PDF generation error:', error)
      alert('PDF generation failed. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
      }, 600)
    }
  }

  return (
    <div className="flex gap-6 items-start">
      <div className="w-[480px] flex-shrink-0">
        <FormattingToolbar />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4 mt-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Sample CV</label>
            <select
              className={inputClass}
              value={selectedSample}
              onChange={e => handleSampleChange(e.target.value)}
            >
              {cvSampleProfiles.map(sample => (
                <option key={sample.label} value={sample.label}>
                  {sample.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-sm font-semibold text-gray-900">CV Details</h2>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-semibold text-indigo-900 mb-1">Professional CV</h3>
            <p className="text-sm text-indigo-800">
              Edit the fields below — the preview updates instantly. Download as a polished A4 PDF.
            </p>
            <p className="text-xs text-indigo-700 mt-2">
              When printing, enable &quot;Background graphics&quot; in your browser print settings if colours do not appear.
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Full Name</label>
            <input
              className={inputClass}
              value={formData.fullName ?? ''}
              onChange={e => handleChange('fullName', e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Professional Title</label>
            <input
              className={inputClass}
              value={formData.title ?? ''}
              onChange={e => handleChange('title', e.target.value)}
            />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Address</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Address Line 1</label>
                <input
                  className={inputClass}
                  value={formData.addressLine1 ?? ''}
                  onChange={e => handleChange('addressLine1', e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Address Line 2 (P.O.)</label>
                <input
                  className={inputClass}
                  value={formData.addressLine2 ?? ''}
                  onChange={e => handleChange('addressLine2', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">District</label>
                  <input
                    className={inputClass}
                    value={formData.district ?? ''}
                    onChange={e => handleChange('district', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">PIN Code</label>
                  <input
                    className={inputClass}
                    value={formData.pinCode ?? ''}
                    onChange={e => handleChange('pinCode', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Phone</label>
              <input
                className={inputClass}
                value={formData.phone ?? ''}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Email</label>
              <input
                className={inputClass}
                type="email"
                value={formData.email ?? ''}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Professional Summary</label>
            <textarea
              className={`${inputClass} resize-y min-h-[80px]`}
              rows={4}
              value={formData.summary ?? ''}
              onChange={e => handleChange('summary', e.target.value)}
            />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Education</h3>
            {(formData.education || []).map((edu, i) => (
              <div key={i} className="mb-4 p-3 bg-gray-50 rounded-lg space-y-2">
                <input
                  className={inputClass}
                  placeholder="Qualification"
                  value={edu.qualification}
                  onChange={e => handleEducationChange(i, 'qualification', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={e => handleEducationChange(i, 'institution', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Year (optional)"
                  value={edu.year}
                  onChange={e => handleEducationChange(i, 'year', e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">Experience</h3>
            {(formData.experience || []).map((exp, i) => (
              <div key={i} className="mb-4 p-3 bg-gray-50 rounded-lg space-y-2">
                <input
                  className={inputClass}
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={e => handleExperienceChange(i, 'title', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Organization"
                  value={exp.organization}
                  onChange={e => handleExperienceChange(i, 'organization', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Period"
                  value={exp.period}
                  onChange={e => handleExperienceChange(i, 'period', e.target.value)}
                />
                <textarea
                  className={`${inputClass} resize-y min-h-[60px]`}
                  rows={3}
                  placeholder="Description"
                  value={exp.description}
                  onChange={e => handleExperienceChange(i, 'description', e.target.value)}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Skills (one per line)</label>
            <textarea
              className={`${inputClass} resize-y min-h-[100px]`}
              rows={5}
              value={(formData.skills || []).join('\n')}
              onChange={e => handleSkillsChange(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Languages (one per line)</label>
            <textarea
              className={`${inputClass} resize-y min-h-[60px]`}
              rows={3}
              value={(formData.languages || []).join('\n')}
              onChange={e => handleLanguagesChange(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Print
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="sticky top-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm font-semibold text-white">Live Preview</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50">
              <iframe
                ref={previewRef}
                srcDoc={htmlContent}
                className="w-full bg-white rounded border border-gray-300"
                style={{ height: '600px', transition: 'height 0.2s ease' }}
                title="CV Preview"
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
