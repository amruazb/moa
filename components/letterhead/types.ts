export interface LetterheadTheme {
  id: string
  name: string
  primary: string
  accent: string
  text: string
  muted: string
  background: string
  divider: string
}

export const THEMES: LetterheadTheme[] = [
  { id: 'navy',     name: 'Navy Professional', primary: '#1e3a5f', accent: '#3b82f6', text: '#0f172a', muted: '#64748b', background: '#ffffff', divider: '#1e3a5f' },
  { id: 'forest',   name: 'Forest Green',      primary: '#14532d', accent: '#22c55e', text: '#052e16', muted: '#6b7280', background: '#ffffff', divider: '#14532d' },
  { id: 'burgundy', name: 'Burgundy Classic',  primary: '#7f1d1d', accent: '#dc2626', text: '#1c1917', muted: '#78716c', background: '#ffffff', divider: '#7f1d1d' },
  { id: 'slate',    name: 'Slate Modern',      primary: '#334155', accent: '#64748b', text: '#0f172a', muted: '#94a3b8', background: '#ffffff', divider: '#cbd5e1' },
  { id: 'teal',     name: 'Teal Corporate',    primary: '#0f766e', accent: '#14b8a6', text: '#134e4a', muted: '#6b7280', background: '#ffffff', divider: '#0f766e' },
  { id: 'gold',     name: 'Gold Executive',    primary: '#92400e', accent: '#d97706', text: '#1c1917', muted: '#78716c', background: '#fffbeb', divider: '#d97706' },
]

export type HeaderLayout = 'logo-left' | 'logo-center' | 'logo-right'
export type ContentDirection = 'ltr' | 'rtl'

export function contentTypography(dir: ContentDirection = 'ltr') {
  const isRtl = dir === 'rtl'
  return {
    direction: dir,
    textAlign: (isRtl ? 'right' : 'left') as 'left' | 'right',
    dateAlign: (isRtl ? 'left' : 'right') as 'left' | 'right',
    fontFamily: isRtl
      ? "'Tahoma', 'Arial', 'Segoe UI', sans-serif"
      : "'Segoe UI', Arial, Helvetica, sans-serif",
  }
}

export interface LetterheadData {
  logoUrl: string | null
  logoWidthMm: number
  companyName: string
  tagline: string
  headerLayout: HeaderLayout
  address: string
  phone: string
  email: string
  website: string
  footerNote: string
  themeId: string
  showHeaderDivider: boolean
  showFooterDivider: boolean
  letterDate: string
  content: string
  contentDir: ContentDirection
  contentFontSizeMm: number
  contentLineHeight: number
  dateFontSizeMm: number
}

export function formatLetterDate(d = new Date()) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export const DEFAULT_DATA: LetterheadData = {
  logoUrl: null,
  logoWidthMm: 28,
  companyName: 'Your Company Name',
  tagline: 'Professional Services',
  headerLayout: 'logo-left',
  address: '123 Business Bay, Dubai, UAE',
  phone: '+971 4 000 0000',
  email: 'info@company.com',
  website: 'www.company.com',
  footerNote: '',
  themeId: 'navy',
  showHeaderDivider: true,
  showFooterDivider: true,
  letterDate: formatLetterDate(),
  content: '',
  contentDir: 'ltr',
  contentFontSizeMm: 3.5,
  contentLineHeight: 1.65,
  dateFontSizeMm: 3,
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function letterContentStyles(data: Partial<LetterheadData>) {
  return {
    contentFontSizeMm: clamp(data.contentFontSizeMm ?? DEFAULT_DATA.contentFontSizeMm, 2.5, 7),
    contentLineHeight: clamp(data.contentLineHeight ?? DEFAULT_DATA.contentLineHeight, 1.2, 2.5),
    dateFontSizeMm: clamp(data.dateFontSizeMm ?? DEFAULT_DATA.dateFontSizeMm, 2, 6),
  }
}

/** Merge saved/partial data with defaults (localStorage or Supabase load). */
export function mergeLetterheadData(partial: Partial<LetterheadData>): LetterheadData {
  const themeId =
    partial.themeId && THEMES.some(t => t.id === partial.themeId)
      ? partial.themeId
      : DEFAULT_DATA.themeId

  return {
    ...DEFAULT_DATA,
    ...partial,
    themeId,
    logoUrl: partial.logoUrl ?? null,
    letterDate: partial.letterDate ?? formatLetterDate(),
    content: partial.content ?? '',
    contentDir: partial.contentDir === 'rtl' ? 'rtl' : 'ltr',
    ...letterContentStyles(partial),
  }
}

export const TABS = ['logo', 'theme', 'header', 'letter', 'footer', 'print'] as const
export type Tab = typeof TABS[number]

export const A4_W_MM = 210
export const A4_H_MM = 297
export const PREVIEW_SCALE = 0.38

export interface PreviewProps {
  data: LetterheadData
  theme: LetterheadTheme
  scale?: number
  printMode?: boolean
}
