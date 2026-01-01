import { create } from 'zustand'

export interface FontSettings {
  englishFont: string
  arabicFont: string
  baseFontSize: 'small' | 'medium' | 'large' | 'xlarge'
  boldEditedFields: boolean
  columnRatio: number // 0.5 = equal, < 0.5 = more space for Arabic
}

export const ENGLISH_FONTS = [
  { value: 'Noto Sans', label: 'Noto Sans' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Calibri', label: 'Calibri' },
  { value: 'Garamond', label: 'Garamond' },
]

export const ARABIC_FONTS = [
  { value: 'Noto Sans Arabic', label: 'Noto Sans Arabic' },
  { value: 'Amiri', label: 'Amiri (أميري)' },
  { value: 'Cairo', label: 'Cairo (القاهرة)' },
  { value: 'Tajawal', label: 'Tajawal (تجول)' },
  { value: 'Scheherazade New', label: 'Scheherazade (شهرزاد)' },
  { value: 'Noto Naskh Arabic', label: 'Noto Naskh Arabic' },
]

export const FONT_SIZES = [
  { value: 'small', label: 'Small', basePt: 8 },
  { value: 'medium', label: 'Medium', basePt: 9 },
  { value: 'large', label: 'Large', basePt: 10 },
  { value: 'xlarge', label: 'Extra Large', basePt: 11 },
] as const

const FORMATTING_CACHE_KEY = 'moa_formatting_settings'

const defaultSettings: FontSettings = {
  englishFont: 'Noto Sans',
  arabicFont: 'Noto Sans Arabic',
  baseFontSize: 'medium',
  boldEditedFields: true,
  columnRatio: 0.5,
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
