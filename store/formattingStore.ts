import { create } from 'zustand'

export interface FontSettings {
  englishFont: string
  arabicFont: string
  englishFontSize: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'
  arabicFontSize: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'
  baseFontSize: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge' // legacy, for backward compatibility
  englishLineSpacing: number // line-height multiplier
  arabicLineSpacing: number // line-height multiplier
  boldEditedFields: boolean
  columnRatio: number // 0.5 = equal, < 0.5 = more space for Arabic
  pageMargin: number // left/right margin in mm (5-25mm)
}

export const LINE_SPACINGS = [
  { value: 1.0, label: '1.0' },
  { value: 1.2, label: '1.2' },
  { value: 1.4, label: '1.4' },
  { value: 1.5, label: '1.5' },
  { value: 1.6, label: '1.6' },
  { value: 1.8, label: '1.8' },
  { value: 2.0, label: '2.0' },
] as const

export const ENGLISH_FONTS = [
  { value: 'Noto Sans', label: 'Noto Sans' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Calibri', label: 'Calibri' },
  { value: 'Garamond', label: 'Garamond' },
]

export const ARABIC_FONTS = [
  { value: 'Arabic Transparent', label: 'Arabic Transparent' },
  { value: 'Noto Sans Arabic', label: 'Noto Sans Arabic' },
  { value: 'Amiri', label: 'Amiri (أميري)' },
  { value: 'Cairo', label: 'Cairo (القاهرة)' },
  { value: 'Tajawal', label: 'Tajawal (تجول)' },
  { value: 'Scheherazade New', label: 'Scheherazade (شهرزاد)' },
  { value: 'Noto Naskh Arabic', label: 'Noto Naskh Arabic' },
]

export const FONT_SIZES = [
  { value: 'xsmall', label: 'XS', basePt: 7 },
  { value: 'small', label: 'S', basePt: 8 },
  { value: 'medium', label: 'M', basePt: 9 },
  { value: 'large', label: 'L', basePt: 10 },
  { value: 'xlarge', label: 'XL', basePt: 11 },
  { value: 'xxlarge', label: '2XL', basePt: 12 },
  { value: 'xxxlarge', label: '3XL', basePt: 14 },
] as const

const FORMATTING_CACHE_KEY = 'moa_formatting_settings'

const defaultSettings: FontSettings = {
  englishFont: 'Noto Sans',
  arabicFont: 'Arabic Transparent',
  englishFontSize: 'medium',
  arabicFontSize: 'medium',
  baseFontSize: 'medium',
  englishLineSpacing: 1.5,
  arabicLineSpacing: 1.6,
  boldEditedFields: true,
  columnRatio: 0.5,
  pageMargin: 10, // 10mm default left/right margin
}

const loadFromCache = (): FontSettings => {
  if (typeof window === 'undefined') return defaultSettings
  try {
    const cached = localStorage.getItem(FORMATTING_CACHE_KEY)
    return cached ? { ...defaultSettings, ...JSON.parse(cached) } : defaultSettings
  } catch {
    return defaultSettings
  }
}

const saveToCache = (settings: FontSettings) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(FORMATTING_CACHE_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error('Failed to save formatting settings:', error)
  }
}

interface FormattingStore {
  settings: FontSettings
  setSettings: (settings: Partial<FontSettings>) => void
  resetToDefault: () => void
  initializeFromCache: () => void
}

export const useFormattingStore = create<FormattingStore>((set, get) => ({
  settings: defaultSettings, // Use default initially, load from cache on client
  setSettings: (newSettings) => {
    const updated = { ...get().settings, ...newSettings }
    set({ settings: updated })
    saveToCache(updated)
  },
  resetToDefault: () => {
    set({ settings: defaultSettings })
    saveToCache(defaultSettings)
  },
  initializeFromCache: () => {
    const cached = loadFromCache()
    set({ settings: cached })
  },
}))
