export interface Field {
  id: string
  label: string
  value: string
  bold: boolean
  labelBg: string   // '' = transparent
  valueBg: string   // '' = transparent
  showDirham?: boolean
}

export type FieldStyle = 'line' | 'box' | 'rounded-box'

export interface TextBand {
  enabled: boolean
  text: string
  fontSizeMm: number
  align: 'left' | 'center' | 'right'
  bold: boolean
  textColor: string
  bgColor: string
  paddingMm: number
  border: boolean
}

export interface CardProps {
  widthMm: number
  heightMm: number
  logoUrl: string | null
  logoXMm: number
  logoYMm: number
  logoWidthMm: number
  logoHeightMm: number
  fieldsNextToLogo: number
  fields: Field[]
  header: TextBand
  footer: TextBand
  borderColor: string
  bgColor: string
  paddingMm: number
  fieldFontSizeMm: number
  labelColWidthMm: number
  fieldStyle: FieldStyle
  dir: 'ltr' | 'rtl'
  scale: number
  printMode: boolean
}

export const TABS = ['card', 'logo', 'fields', 'style', 'print'] as const
export type Tab = typeof TABS[number]
