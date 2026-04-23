'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { TemplateManager } from '@/components/templates/TemplateManager'

interface Field {
  id: string
  label: string
  value: string
  bold: boolean
  labelBg: string   // '' = transparent
  valueBg: string   // '' = transparent
  showDirham?: boolean
}
type FieldStyle = 'line' | 'box' | 'rounded-box'

interface TextBand {
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

interface CardProps {
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

const PRESETS = [
  { name: 'Business Card', w: 85, h: 54 },
  { name: 'Small Label',   w: 100, h: 50 },
  { name: 'Medium Label',  w: 130, h: 80 },
  { name: 'Square Sticker',w: 70,  h: 70  },
  { name: 'Name Badge',    w: 90,  h: 55  },
]

// ── CardContent ─────────────────────────────────────────────────────────────
function CardContent(p: CardProps) {
  const u  = (mm: number) => p.printMode ? `${mm}mm` : `${mm * p.scale}px`
  const bd = p.printMode ? '0.3mm' : '1px'
  const gap = p.paddingMm * 0.4

  const fieldBoxStyle = (fs: FieldStyle): React.CSSProperties => {
    const h = u(p.fieldFontSizeMm * 1.8)
    const base: React.CSSProperties = { flex: 1, height: h, marginLeft: u(1) }
    if (fs === 'line')        return { ...base, borderBottom: `${bd} solid ${p.borderColor}` }
    if (fs === 'box')         return { ...base, border: `${bd} solid ${p.borderColor}` }
    if (fs === 'rounded-box') return { ...base, border: `${bd} solid ${p.borderColor}`, borderRadius: u(1.5) }
    return base
  }

  const FieldRows = ({ subset }: { subset: Field[] }) => (
    <>
      {subset.map(f => (
        <div key={f.id} style={{ display: 'flex', alignItems: 'center', marginBottom: u(1.2), direction: p.dir }}>
          <span style={{
            fontSize: u(p.fieldFontSizeMm),
            fontWeight: f.bold ? 'bold' : 'normal',
            minWidth: u(p.labelColWidthMm),
            whiteSpace: 'nowrap',
            lineHeight: 1.3,
            fontFamily,
            backgroundColor: f.labelBg || undefined,
            paddingLeft:  f.labelBg ? u(1)   : undefined,
            paddingRight: f.labelBg ? u(1)   : undefined,
            paddingTop:   f.labelBg ? u(0.3) : undefined,
            paddingBottom:f.labelBg ? u(0.3) : undefined,
          }}>{f.label}:</span>
          <div style={{
            ...fieldBoxStyle(p.fieldStyle),
            backgroundColor: f.valueBg || undefined,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: u(1.5),
            paddingRight: u(1.5),
            fontSize: u(p.fieldFontSizeMm),
            fontFamily,
            fontWeight: f.bold ? 'bold' : 'normal',
            color: '#111',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            direction: p.dir,
          }}>
            {f.value}
            {f.showDirham && (
              <img
                src="/aed-symbol-only.png"
                alt="AED"
                style={{
                  height: u(p.fieldFontSizeMm * (f.bold ? 1.1 : 0.85)),
                  width: 'auto',
                  marginLeft: u(1),
                  marginRight: u(0.2),
                  flexShrink: 0,
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              />
            )}
          </div>
        </div>
      ))}
    </>
  )

  const colorForce: React.CSSProperties = {
    WebkitPrintColorAdjust: 'exact',
    printColorAdjust: 'exact',
  }

  const HeaderBand = () => p.header.enabled ? (
    <div style={{
      textAlign: p.header.align,
      fontSize: u(p.header.fontSizeMm),
      fontWeight: p.header.bold ? 'bold' : 'normal',
      color: p.header.textColor,
      backgroundColor: p.header.bgColor,
      padding: `${u(p.header.paddingMm)} ${u(p.paddingMm)}`,
      borderBottom: p.header.border ? `${bd} solid ${p.borderColor}` : 'none',
      fontFamily,
      flexShrink: 0,
      ...colorForce,
    }}>{p.header.text}</div>
  ) : null

  const FooterBand = () => p.footer.enabled ? (
    <div style={{
      textAlign: p.footer.align,
      fontSize: u(p.footer.fontSizeMm),
      fontWeight: p.footer.bold ? 'bold' : 'normal',
      color: p.footer.textColor,
      backgroundColor: p.footer.bgColor,
      padding: `${u(p.footer.paddingMm)} ${u(p.paddingMm)}`,
      borderTop: p.footer.border ? `${bd} solid ${p.borderColor}` : 'none',
      fontFamily,
      flexShrink: 0,
      ...colorForce,
    }}>{p.footer.text}</div>
  ) : null

  const fontFamily = p.dir === 'rtl'
    ? "'Tahoma', 'Arial', sans-serif"
    : 'Arial, Helvetica, sans-serif'

  const outerStyle: React.CSSProperties = {
    width: u(p.widthMm),
    height: u(p.heightMm),
    border: `${bd} solid ${p.borderColor}`,
    backgroundColor: p.bgColor,
    boxSizing: 'border-box',
    overflow: 'hidden',
    pageBreakInside: 'avoid',
    breakInside: 'avoid',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    direction: p.dir,
  }

  // ── No logo ──────────────────────────────────────────────────────────────
  if (!p.logoUrl) {
    return (
      <div style={outerStyle}>
        <HeaderBand />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: u(p.paddingMm) }}>
          <FieldRows subset={p.fields} />
        </div>
        <FooterBand />
      </div>
    )
  }

  // ── With logo: absolute positioning in content area ───────────────────────
  const beside     = Math.min(p.fieldsNextToLogo, p.fields.length)
  const sideFields = p.fields.slice(0, beside)
  const belowFields = p.fields.slice(beside)

  const logoRight  = p.logoXMm + p.logoWidthMm
  const logoBottom = p.logoYMm + p.logoHeightMm

  // Side fields go opposite to whichever side the logo is on
  const logoInRight = p.logoXMm + p.logoWidthMm / 2 > p.widthMm / 2
  const sideLeft  = logoInRight ? u(p.paddingMm) : u(logoRight + gap)
  const sideRight = logoInRight ? u(p.widthMm - p.logoXMm + gap) : u(p.paddingMm)

  return (
    <div style={outerStyle}>
      <HeaderBand />

      {/* Content area — position:relative so logo + fields use absolute coords */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Logo */}
        <img
          src={p.logoUrl}
          alt="logo"
          style={{
            position: 'absolute',
            left: u(p.logoXMm),
            top: u(p.logoYMm),
            width: u(p.logoWidthMm),
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />

        {/* Fields beside logo */}
        {beside > 0 && (
          <div style={{
            position: 'absolute',
            left: sideLeft,
            right: sideRight,
            top: u(p.logoYMm),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
            <FieldRows subset={sideFields} />
          </div>
        )}

        {/* Fields below logo */}
        {belowFields.length > 0 && (
          <div style={{
            position: 'absolute',
            left: u(p.paddingMm),
            right: u(p.paddingMm),
            top: u(logoBottom + gap),
          }}>
            <FieldRows subset={belowFields} />
          </div>
        )}
      </div>

      <FooterBand />
    </div>
  )
}

// ── localStorage persistence ─────────────────────────────────────────────────
const STORAGE_KEY = 'label-maker-v1'
let _sv: Record<string, unknown> | null = null
function sv(): Record<string, unknown> {
  if (_sv !== null) return _sv
  if (typeof window === 'undefined') return (_sv = {})
  try { _sv = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') }
  catch { _sv = {} }
  return _sv!
}

// ── Snap grid (3×3) ─────────────────────────────────────────────────────────
const SNAP_GRID = [
  ['↖', '↑', '↗'],
  ['←', '·', '→'],
  ['↙', '↓', '↘'],
] as const

const TABS = ['card', 'logo', 'fields', 'style', 'print'] as const
type Tab = typeof TABS[number]

// ── Workspace ────────────────────────────────────────────────────────────────
export function LabelMakerWorkspace() {
  const [cardW, setCardW] = useState<number>(() => (sv().cardW as number | undefined) ?? 90)
  const [cardH, setCardH] = useState<number>(() => (sv().cardH as number | undefined) ?? 55)

  const [logoUrl,          setLogoUrl]          = useState<string | null>(() => (sv().logoUrl as string | null | undefined) ?? null)
  const [logoWidthMm,      setLogoWidthMm]      = useState<number>(() => (sv().logoWidthMm as number | undefined) ?? 22)
  const [logoHeightMm,     setLogoHeightMm]     = useState(0)
  const [logoXMm,          setLogoXMm]          = useState<number>(() => (sv().logoXMm as number | undefined) ?? 3)
  const [logoYMm,          setLogoYMm]          = useState<number>(() => (sv().logoYMm as number | undefined) ?? 3)
  const [fieldsNextToLogo, setFieldsNextToLogo] = useState<number>(() => (sv().fieldsNextToLogo as number | undefined) ?? 2)
  const [isDragging,       setIsDragging]       = useState(false)

  const [fields, setFields] = useState<Field[]>(() => {
    const saved = sv().fields
    return Array.isArray(saved) && saved.length ? saved as Field[] : [
      { id: '1', label: 'MODEL',           value: '', bold: true,  labelBg: '', valueBg: '' },
      { id: '2', label: 'SIZE & THICKNESS',value: '', bold: true,  labelBg: '', valueBg: '' },
      { id: '3', label: 'FACTORY',         value: '', bold: true,  labelBg: '', valueBg: '' },
      { id: '4', label: 'COUNTRY',         value: '', bold: true,  labelBg: '', valueBg: '' },
    ]
  })
  const [expandedColorId, setExpandedColorId] = useState<string | null>(null)

  const [header, setHeader] = useState<TextBand>(() => (sv().header as TextBand | undefined) ?? {
    enabled: false, text: 'AL SAQIYA', fontSizeMm: 4, align: 'center',
    bold: true, textColor: '#ffffff', bgColor: '#1e3a8a', paddingMm: 2, border: true,
  })
  const [footer, setFooter] = useState<TextBand>(() => (sv().footer as TextBand | undefined) ?? {
    enabled: false, text: 'Made in UAE', fontSizeMm: 3, align: 'center',
    bold: false, textColor: '#555555', bgColor: '#f3f4f6', paddingMm: 1.5, border: true,
  })

  const [borderColor,     setBorderColor]     = useState<string>(() => (sv().borderColor     as string  | undefined) ?? '#000000')
  const [bgColor,         setBgColor]         = useState<string>(() => (sv().bgColor         as string  | undefined) ?? '#ffffff')
  const [paddingMm,       setPaddingMm]       = useState<number>(() => (sv().paddingMm       as number  | undefined) ?? 3)
  const [fieldStyle,      setFieldStyle]      = useState<FieldStyle>(() => (sv().fieldStyle  as FieldStyle | undefined) ?? 'box')
  const [fieldFontSizeMm, setFieldFontSizeMm] = useState<number>(() => (sv().fieldFontSizeMm as number  | undefined) ?? 3.5)
  const [labelColWidthMm, setLabelColWidthMm] = useState<number>(() => (sv().labelColWidthMm as number  | undefined) ?? 30)

  const [dir, setDir] = useState<'ltr' | 'rtl'>(() => (sv().dir as 'ltr' | 'rtl' | undefined) ?? 'ltr')

  const [printCols, setPrintCols] = useState<number>(() => (sv().printCols as number | undefined) ?? 2)
  const [printRows, setPrintRows] = useState<number>(() => (sv().printRows as number | undefined) ?? 5)
  const [gapMm,     setGapMm]     = useState<number>(() => (sv().gapMm     as number | undefined) ?? 3)
  const [marginMm,  setMarginMm]  = useState<number>(() => (sv().marginMm  as number | undefined) ?? 10)

  const [tab, setTab] = useState<Tab>('logo')

  // Save all design state to localStorage whenever anything changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        cardW, cardH, logoUrl, logoWidthMm, logoXMm, logoYMm,
        fieldsNextToLogo, fields, header, footer,
        borderColor, bgColor, paddingMm, fieldStyle,
        fieldFontSizeMm, labelColWidthMm, dir,
        printCols, printRows, gapMm, marginMm,
      }))
    } catch { /* quota exceeded — ignore */ }
  }, [cardW, cardH, logoUrl, logoWidthMm, logoXMm, logoYMm,
    fieldsNextToLogo, fields, header, footer,
    borderColor, bgColor, paddingMm, fieldStyle,
    fieldFontSizeMm, labelColWidthMm, dir,
    printCols, printRows, gapMm, marginMm])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragRef      = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null)

  const PREVIEW_SCALE    = 3.2
  const A4_PREVIEW_SCALE = 1.8

  // Auto-detect logo height when logo or width changes
  useEffect(() => {
    if (!logoUrl) { setLogoHeightMm(0); return }
    const img = new Image()
    img.onload = () => {
      if (img.naturalWidth > 0)
        setLogoHeightMm(logoWidthMm * img.naturalHeight / img.naturalWidth)
    }
    img.src = logoUrl
  }, [logoUrl, logoWidthMm])

  // Estimated content area height (between header and footer)
  const estHeaderH = header.enabled ? header.fontSizeMm * 1.5 + header.paddingMm * 2 : 0
  const estFooterH = footer.enabled ? footer.fontSizeMm * 1.5 + footer.paddingMm * 2 : 0
  const contentH   = Math.max(10, cardH - estHeaderH - estFooterH)

  // ── Snap logo to one of 9 positions ──────────────────────────────────────
  const snapLogo = useCallback((row: number, col: number) => {
    const lw = logoWidthMm
    const lh = logoHeightMm > 0 ? logoHeightMm : logoWidthMm * 0.6
    const p  = paddingMm

    const xMap = [p, (cardW - lw) / 2, cardW - lw - p]
    const yMap = [p, (contentH - lh) / 2, contentH - lh - p]

    setLogoXMm(Math.max(0, xMap[col]))
    setLogoYMm(Math.max(0, yMap[row]))
  }, [logoWidthMm, logoHeightMm, paddingMm, cardW, contentH])

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const handleLogoDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragRef.current = { startX: e.clientX, startY: e.clientY, initX: logoXMm, initY: logoYMm }
    setIsDragging(true)

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return
      const dx = (ev.clientX - dragRef.current.startX) / PREVIEW_SCALE
      const dy = (ev.clientY - dragRef.current.startY) / PREVIEW_SCALE
      const lh = logoHeightMm > 0 ? logoHeightMm : logoWidthMm * 0.6
      setLogoXMm(Math.max(0, Math.min(cardW - logoWidthMm, dragRef.current.initX + dx)))
      setLogoYMm(Math.max(0, Math.min(contentH - lh,       dragRef.current.initY + dy)))
    }

    const onUp = () => {
      setIsDragging(false)
      dragRef.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [logoXMm, logoYMm, logoWidthMm, logoHeightMm, cardW, contentH, PREVIEW_SCALE])

  // ── Logo upload ───────────────────────────────────────────────────────────
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setLogoUrl(ev.target?.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // ── Field helpers ─────────────────────────────────────────────────────────
  const addField    = () => setFields(prev => [...prev, { id: Date.now().toString(), label: 'NEW FIELD', value: '', bold: false, labelBg: '', valueBg: '', showDirham: false }])
  const removeField = (id: string) => setFields(prev => prev.filter(f => f.id !== id))
  const updateField = (id: string, ch: Partial<Field>) => setFields(prev => prev.map(f => f.id === id ? { ...f, ...ch } : f))
  const moveField   = (id: string, dir: -1 | 1) => {
    setFields(prev => {
      const idx = prev.findIndex(f => f.id === id)
      const nxt = idx + dir
      if (nxt < 0 || nxt >= prev.length) return prev
      const arr = [...prev];[arr[idx], arr[nxt]] = [arr[nxt], arr[idx]]; return arr
    })
  }

  // ── Template save/load ────────────────────────────────────────────────────
  const currentData = {
    cardW, cardH, logoUrl, logoWidthMm, logoXMm, logoYMm,
    fieldsNextToLogo, fields, header, footer,
    borderColor, bgColor, paddingMm, fieldStyle,
    fieldFontSizeMm, labelColWidthMm, dir,
    printCols, printRows, gapMm, marginMm,
  }

  const handleLoadTemplate = (data: typeof currentData) => {
    if (!data) return
    if (data.cardW)            setCardW(data.cardW)
    if (data.cardH)            setCardH(data.cardH)
    if (data.logoUrl !== undefined) setLogoUrl(data.logoUrl)
    if (data.logoWidthMm)      setLogoWidthMm(data.logoWidthMm)
    if (data.logoXMm !== undefined) setLogoXMm(data.logoXMm)
    if (data.logoYMm !== undefined) setLogoYMm(data.logoYMm)
    if (data.fieldsNextToLogo !== undefined) setFieldsNextToLogo(data.fieldsNextToLogo)
    if (data.fields?.length)   setFields(data.fields)
    if (data.header)           setHeader(data.header)
    if (data.footer)           setFooter(data.footer)
    if (data.borderColor)      setBorderColor(data.borderColor)
    if (data.bgColor)          setBgColor(data.bgColor)
    if (data.paddingMm)        setPaddingMm(data.paddingMm)
    if (data.fieldStyle)       setFieldStyle(data.fieldStyle)
    if (data.fieldFontSizeMm)  setFieldFontSizeMm(data.fieldFontSizeMm)
    if (data.labelColWidthMm)  setLabelColWidthMm(data.labelColWidthMm)
    if (data.dir)              setDir(data.dir)
    if (data.printCols)        setPrintCols(data.printCols)
    if (data.printRows)        setPrintRows(data.printRows)
    if (data.gapMm !== undefined) setGapMm(data.gapMm)
    if (data.marginMm !== undefined) setMarginMm(data.marginMm)
  }

  // ── Print ─────────────────────────────────────────────────────────────────
  const handlePrint = () => {
    const id = 'lm-print-css'
    let el = document.getElementById(id) as HTMLStyleElement | null
    if (!el) { el = document.createElement('style'); el.id = id; document.head.appendChild(el) }
    el.textContent = `@media print { @page{size:A4;margin:0} body>*{visibility:hidden!important} #lm-print-sheet{visibility:visible!important;position:fixed!important;top:0;left:0} #lm-print-sheet *{visibility:visible!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important} }`
    window.print()
  }

  const sharedProps: Omit<CardProps, 'scale' | 'printMode'> = {
    widthMm: cardW, heightMm: cardH,
    logoUrl, logoXMm, logoYMm, logoWidthMm, logoHeightMm,
    fieldsNextToLogo, fields, header, footer,
    borderColor, bgColor, paddingMm,
    fieldFontSizeMm, labelColWidthMm, fieldStyle, dir,
  }

  const totalCards = printCols * printRows

  // Logo overlay position in the preview (accounts for 1px border)
  const overlayLeft = logoXMm * PREVIEW_SCALE + 1
  const overlayTop  = (logoYMm + estHeaderH) * PREVIEW_SCALE + 1
  const overlayW    = logoWidthMm * PREVIEW_SCALE
  const overlayH    = (logoHeightMm > 0 ? logoHeightMm : logoWidthMm * 0.6) * PREVIEW_SCALE

  return (
    <div className="flex gap-5 items-start min-h-screen bg-gray-50 p-5">

      {/* ── Left Panel ── */}
      <div className="w-72 flex-shrink-0 space-y-3">
        {/* Save / Load to Supabase */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
          <TemplateManager
            documentType="label-maker"
            currentData={currentData}
            onLoadTemplate={handleLoadTemplate}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 text-xs font-semibold capitalize transition-colors ${tab === t ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-gray-600'}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="p-4 space-y-4">

            {/* ── CARD ── */}
            {tab === 'card' && (
              <>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Presets</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESETS.map(p => (
                    <button key={p.name} onClick={() => { setCardW(p.w); setCardH(p.h) }}
                      className={`text-left text-xs py-2 px-2.5 rounded-lg border transition-colors ${cardW === p.w && cardH === p.h ? 'bg-indigo-500 text-white border-indigo-500' : 'border-gray-200 hover:border-indigo-300 text-gray-700'}`}>
                      <span className="font-medium block">{p.name}</span>
                      <span className="opacity-70">{p.w}×{p.h} mm</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Custom Size</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Width (mm)</label>
                    <input type="number" value={cardW} min={20} max={297}
                      onChange={e => setCardW(Math.max(20, +e.target.value))}
                      className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Height (mm)</label>
                    <input type="number" value={cardH} min={10} max={210}
                      onChange={e => setCardH(Math.max(10, +e.target.value))}
                      className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400" />
                  </div>
                </div>
              </>
            )}

            {/* ── LOGO ── */}
            {tab === 'logo' && (
              <>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                <button onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors font-medium">
                  {logoUrl ? 'Change Logo' : '+ Upload Logo Image'}
                </button>

                {logoUrl ? (
                  <>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <img src={logoUrl} alt="logo" className="w-20 h-14 object-contain rounded border border-gray-200 bg-white" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-1">Logo uploaded</p>
                        <button onClick={() => setLogoUrl(null)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                      </div>
                    </div>

                    {/* Width slider */}
                    <div>
                      <label className="text-xs text-gray-500">Logo Width: <strong>{logoWidthMm}mm</strong></label>
                      <input type="range" min={5} max={80} step={1} value={logoWidthMm}
                        onChange={e => setLogoWidthMm(+e.target.value)}
                        className="w-full mt-1 accent-indigo-600" />
                    </div>

                    {/* 9-grid snap */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Snap to position <span className="text-gray-400">(or drag in preview)</span></p>
                      <div className="grid grid-cols-3 gap-1 w-28 mx-auto">
                        {SNAP_GRID.map((row, ri) =>
                          row.map((icon, ci) => (
                            <button key={`${ri}-${ci}`} onClick={() => snapLogo(ri, ci)}
                              className="h-8 w-8 rounded border border-gray-200 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 text-gray-500 text-sm transition-colors flex items-center justify-center">
                              {icon}
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    {/* X / Y fine-tune */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">X: <strong>{logoXMm.toFixed(1)}mm</strong></label>
                        <input type="range" min={0} max={cardW - logoWidthMm} step={0.5} value={logoXMm}
                          onChange={e => setLogoXMm(+e.target.value)}
                          className="w-full mt-1 accent-indigo-600" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Y: <strong>{logoYMm.toFixed(1)}mm</strong></label>
                        <input type="range" min={0} max={contentH - (logoHeightMm || 5)} step={0.5} value={logoYMm}
                          onChange={e => setLogoYMm(+e.target.value)}
                          className="w-full mt-1 accent-indigo-600" />
                      </div>
                    </div>

                    {/* Fields beside logo */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <label className="text-xs text-gray-500 block mb-1">
                        Fields beside logo: <strong>{fieldsNextToLogo === 0 ? 'none' : fieldsNextToLogo}</strong>
                      </label>
                      <input type="range" min={0} max={fields.length} step={1} value={fieldsNextToLogo}
                        onChange={e => setFieldsNextToLogo(+e.target.value)}
                        className="w-full accent-indigo-600" />
                      <p className="text-xs text-gray-400 mt-1">
                        {fieldsNextToLogo === 0
                          ? 'All fields below logo'
                          : `"${fields.slice(0, fieldsNextToLogo).map(f => f.label).join('", "')}" beside logo`}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-gray-400 text-center">Upload a PNG, JPG, or SVG logo to place it on the label</p>
                )}
              </>
            )}

            {/* ── FIELDS ── */}
            {tab === 'fields' && (
              <>
                {/* Direction toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Direction</span>
                  <div className="flex rounded-lg border border-gray-200 overflow-hidden ml-auto">
                    <button
                      onClick={() => setDir('ltr')}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${dir === 'ltr' ? 'bg-indigo-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                      LTR
                    </button>
                    <button
                      onClick={() => setDir('rtl')}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors border-l border-gray-200 ${dir === 'rtl' ? 'bg-indigo-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                      RTL عربي
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {fields.map((f, i) => {
                    const colorsOpen = expandedColorId === f.id
                    return (
                      <div key={f.id} className="rounded-lg border border-gray-100 overflow-hidden">
                        {/* Main row */}
                        <div className="flex items-center gap-1.5 bg-gray-50 p-2">
                          <div className="flex flex-col gap-0.5">
                            <button onClick={() => moveField(f.id, -1)} disabled={i === 0}
                              className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none px-0.5">▲</button>
                            <button onClick={() => moveField(f.id, 1)} disabled={i === fields.length - 1}
                              className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none px-0.5">▼</button>
                          </div>
                          <input value={f.label} onChange={e => updateField(f.id, { label: e.target.value })}
                            className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 min-w-0 focus:outline-none focus:border-indigo-400"
                            placeholder="Field label" />
                          <button onClick={() => updateField(f.id, { bold: !f.bold })}
                            className={`text-xs font-bold px-2 py-1 rounded border transition-colors ${f.bold ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-200 text-gray-400 hover:border-gray-400'}`}>B</button>
                          {/* Dirham symbol toggle */}
                          <button
                            onClick={() => updateField(f.id, { showDirham: !f.showDirham })}
                            title="Toggle AED dirham symbol"
                            className={`flex items-center justify-center px-1.5 py-1 rounded border transition-colors ${f.showDirham ? 'bg-green-600 border-green-600' : 'border-gray-200 hover:border-gray-400'}`}
                          >
                            <img src="/aed-symbol-only.png" alt="AED" className={`w-3.5 h-3.5 ${f.showDirham ? 'brightness-0 invert' : 'opacity-50'}`} />
                          </button>
                          {/* Palette toggle */}
                          <button
                            onClick={() => setExpandedColorId(colorsOpen ? null : f.id)}
                            title="Field colours"
                            className={`text-sm px-1.5 py-1 rounded border transition-colors ${colorsOpen ? 'bg-indigo-500 text-white border-indigo-500' : (f.labelBg || f.valueBg ? 'border-indigo-300 text-indigo-500' : 'border-gray-200 text-gray-400 hover:border-gray-400')}`}
                          >■</button>
                          <button onClick={() => removeField(f.id)}
                            className="text-red-300 hover:text-red-500 text-sm px-1">✕</button>
                        </div>

                        {/* Value input row */}
                        <div className="flex items-center gap-1.5 px-2 pb-2 bg-gray-50 border-t border-gray-100">
                          <span className="text-xs text-gray-400 shrink-0 w-10">Value</span>
                          <input
                            value={f.value}
                            onChange={e => updateField(f.id, { value: e.target.value })}
                            dir={dir}
                            className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 min-w-0 focus:outline-none focus:border-indigo-400 bg-white"
                            placeholder={dir === 'rtl' ? 'اكتب هنا...' : 'Type value...'}
                          />
                        </div>

                        {/* Colour pickers (expandable) */}
                        {colorsOpen && (
                          <div className="bg-white border-t border-gray-100 px-3 py-2.5 space-y-2">
                            {/* Label background */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-20 shrink-0">Label BG</span>
                              <input
                                type="color"
                                value={f.labelBg || '#e5e7eb'}
                                onChange={e => updateField(f.id, { labelBg: e.target.value })}
                                className="w-7 h-7 rounded cursor-pointer border border-gray-200 p-0.5"
                              />
                              {/* Swatch preview */}
                              <span className="text-xs px-2 py-0.5 rounded font-medium"
                                style={{ backgroundColor: f.labelBg || 'transparent', border: '1px solid #e5e7eb' }}>
                                {f.label}:
                              </span>
                              {f.labelBg && (
                                <button onClick={() => updateField(f.id, { labelBg: '' })}
                                  className="text-xs text-gray-400 hover:text-red-500 ml-auto">Clear</button>
                              )}
                            </div>

                            {/* Value box background */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-20 shrink-0">Value BG</span>
                              <input
                                type="color"
                                value={f.valueBg || '#e5e7eb'}
                                onChange={e => updateField(f.id, { valueBg: e.target.value })}
                                className="w-7 h-7 rounded cursor-pointer border border-gray-200 p-0.5"
                              />
                              {/* Swatch preview */}
                              <div className="flex-1 h-5 rounded border border-gray-300"
                                style={{ backgroundColor: f.valueBg || 'transparent' }} />
                              {f.valueBg && (
                                <button onClick={() => updateField(f.id, { valueBg: '' })}
                                  className="text-xs text-gray-400 hover:text-red-500 ml-auto">Clear</button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <button onClick={addField}
                  className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                  + Add Field
                </button>
                <div className="pt-2 border-t border-gray-100 space-y-3">
                  <div>
                    <label className="text-xs text-gray-500">Font Size: <strong>{fieldFontSizeMm}mm</strong></label>
                    <input type="range" min={2} max={8} step={0.5} value={fieldFontSizeMm}
                      onChange={e => setFieldFontSizeMm(+e.target.value)} className="w-full mt-1 accent-indigo-600" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Label Column Width: <strong>{labelColWidthMm}mm</strong></label>
                    <input type="range" min={10} max={70} step={1} value={labelColWidthMm}
                      onChange={e => setLabelColWidthMm(+e.target.value)} className="w-full mt-1 accent-indigo-600" />
                  </div>
                </div>
              </>
            )}

            {/* ── STYLE ── */}
            {tab === 'style' && (
              <>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Field Value Style</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {([
                      { val: 'line',        label: 'Line',    icon: '▁' },
                      { val: 'box',         label: 'Box',     icon: '▭' },
                      { val: 'rounded-box', label: 'Rounded', icon: '▢' },
                    ] as { val: FieldStyle; label: string; icon: string }[]).map(opt => (
                      <button key={opt.val} onClick={() => setFieldStyle(opt.val)}
                        className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg border text-xs transition-colors ${fieldStyle === opt.val ? 'bg-indigo-500 text-white border-indigo-500' : 'border-gray-200 text-gray-600 hover:border-indigo-300'}`}>
                        <span className="text-base leading-none">{opt.icon}</span>{opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Border Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)}
                        className="w-10 h-8 rounded cursor-pointer border border-gray-200" />
                      <span className="text-xs text-gray-500">{borderColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Background</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                        className="w-10 h-8 rounded cursor-pointer border border-gray-200" />
                      <span className="text-xs text-gray-500">{bgColor}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Inner Padding: <strong>{paddingMm}mm</strong></label>
                  <input type="range" min={1} max={12} step={0.5} value={paddingMm}
                    onChange={e => setPaddingMm(+e.target.value)} className="w-full mt-1 accent-indigo-600" />
                </div>

                {/* Header */}
                <div className="border-t border-gray-100 pt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-600">Header</p>
                    <button onClick={() => setHeader(h => ({ ...h, enabled: !h.enabled }))}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${header.enabled ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {header.enabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  {header.enabled && (
                    <>
                      <input value={header.text} onChange={e => setHeader(h => ({ ...h, text: e.target.value }))}
                        placeholder="Header text"
                        className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400" />
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['left','center','right'] as const).map(a => (
                          <button key={a} onClick={() => setHeader(h => ({ ...h, align: a }))}
                            className={`text-xs py-1.5 rounded-lg border capitalize transition-colors ${header.align === a ? 'bg-indigo-500 text-white border-indigo-500' : 'border-gray-200 text-gray-600'}`}>{a}</button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><label className="text-xs text-gray-400">Text color</label>
                          <input type="color" value={header.textColor} onChange={e => setHeader(h => ({ ...h, textColor: e.target.value }))}
                            className="w-full h-7 mt-0.5 rounded cursor-pointer border border-gray-200" /></div>
                        <div><label className="text-xs text-gray-400">Background</label>
                          <input type="color" value={header.bgColor} onChange={e => setHeader(h => ({ ...h, bgColor: e.target.value }))}
                            className="w-full h-7 mt-0.5 rounded cursor-pointer border border-gray-200" /></div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400">Font size: <strong>{header.fontSizeMm}mm</strong></label>
                        <input type="range" min={2} max={8} step={0.5} value={header.fontSizeMm}
                          onChange={e => setHeader(h => ({ ...h, fontSizeMm: +e.target.value }))} className="w-full mt-0.5 accent-indigo-600" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400">Padding: <strong>{header.paddingMm}mm</strong></label>
                        <input type="range" min={0.5} max={6} step={0.5} value={header.paddingMm}
                          onChange={e => setHeader(h => ({ ...h, paddingMm: +e.target.value }))} className="w-full mt-0.5 accent-indigo-600" />
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="hdr-bold" checked={header.bold} onChange={e => setHeader(h => ({ ...h, bold: e.target.checked }))} className="accent-indigo-600" />
                        <label htmlFor="hdr-bold" className="text-xs text-gray-500">Bold</label>
                        <input type="checkbox" id="hdr-border" checked={header.border} onChange={e => setHeader(h => ({ ...h, border: e.target.checked }))} className="accent-indigo-600 ml-3" />
                        <label htmlFor="hdr-border" className="text-xs text-gray-500">Divider line</label>
                      </div>
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 pt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-600">Footer</p>
                    <button onClick={() => setFooter(f => ({ ...f, enabled: !f.enabled }))}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${footer.enabled ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {footer.enabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  {footer.enabled && (
                    <>
                      <input value={footer.text} onChange={e => setFooter(f => ({ ...f, text: e.target.value }))}
                        placeholder="Footer text"
                        className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400" />
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['left','center','right'] as const).map(a => (
                          <button key={a} onClick={() => setFooter(f => ({ ...f, align: a }))}
                            className={`text-xs py-1.5 rounded-lg border capitalize transition-colors ${footer.align === a ? 'bg-indigo-500 text-white border-indigo-500' : 'border-gray-200 text-gray-600'}`}>{a}</button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><label className="text-xs text-gray-400">Text color</label>
                          <input type="color" value={footer.textColor} onChange={e => setFooter(f => ({ ...f, textColor: e.target.value }))}
                            className="w-full h-7 mt-0.5 rounded cursor-pointer border border-gray-200" /></div>
                        <div><label className="text-xs text-gray-400">Background</label>
                          <input type="color" value={footer.bgColor} onChange={e => setFooter(f => ({ ...f, bgColor: e.target.value }))}
                            className="w-full h-7 mt-0.5 rounded cursor-pointer border border-gray-200" /></div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400">Font size: <strong>{footer.fontSizeMm}mm</strong></label>
                        <input type="range" min={2} max={8} step={0.5} value={footer.fontSizeMm}
                          onChange={e => setFooter(f => ({ ...f, fontSizeMm: +e.target.value }))} className="w-full mt-0.5 accent-indigo-600" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400">Padding: <strong>{footer.paddingMm}mm</strong></label>
                        <input type="range" min={0.5} max={6} step={0.5} value={footer.paddingMm}
                          onChange={e => setFooter(f => ({ ...f, paddingMm: +e.target.value }))} className="w-full mt-0.5 accent-indigo-600" />
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="ftr-bold" checked={footer.bold} onChange={e => setFooter(f => ({ ...f, bold: e.target.checked }))} className="accent-indigo-600" />
                        <label htmlFor="ftr-bold" className="text-xs text-gray-500">Bold</label>
                        <input type="checkbox" id="ftr-border" checked={footer.border} onChange={e => setFooter(f => ({ ...f, border: e.target.checked }))} className="accent-indigo-600 ml-3" />
                        <label htmlFor="ftr-border" className="text-xs text-gray-500">Divider line</label>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {/* ── PRINT ── */}
            {tab === 'print' && (
              <>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">A4 Grid Layout</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Columns', val: printCols, set: setPrintCols, max: 10 },
                    { label: 'Rows',    val: printRows, set: setPrintRows, max: 30 },
                    { label: 'Gap (mm)',val: gapMm,     set: setGapMm,     max: 20 },
                    { label: 'Margin (mm)', val: marginMm, set: setMarginMm, max: 30 },
                  ].map(({ label, val, set, max }) => (
                    <div key={label}>
                      <label className="text-xs text-gray-500">{label}</label>
                      <input type="number" value={val} min={0} max={max}
                        onChange={e => set(Math.max(0, +e.target.value))}
                        className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-400" />
                    </div>
                  ))}
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 text-xs text-indigo-700">
                  <strong>{totalCards}</strong> labels per A4 sheet &nbsp;·&nbsp; {printCols}×{printRows} grid
                </div>
                <button onClick={handlePrint}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm">
                  Print A4 Sheet
                </button>
              </>
            )}
          </div>
        </div>

        {tab !== 'print' && (
          <button onClick={handlePrint}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm">
            Print A4 Sheet ({totalCards} labels)
          </button>
        )}
      </div>

      {/* ── Right Preview Panel ── */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Single card preview — with drag overlay */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Label Preview — {cardW}×{cardH} mm
          </p>
          {logoUrl && (
            <p className="text-xs text-indigo-500 mb-3">Drag the logo to reposition it</p>
          )}
          <div className="flex justify-center">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <CardContent {...sharedProps} scale={PREVIEW_SCALE} printMode={false} />

              {/* Invisible drag handle over logo */}
              {logoUrl && (
                <div
                  onMouseDown={handleLogoDragStart}
                  style={{
                    position: 'absolute',
                    left: overlayLeft,
                    top: overlayTop,
                    width: overlayW,
                    height: overlayH,
                    cursor: isDragging ? 'grabbing' : 'grab',
                    zIndex: 20,
                    border: `1.5px dashed ${isDragging ? '#6366f1' : 'rgba(99,102,241,0.5)'}`,
                    borderRadius: 2,
                    boxSizing: 'border-box',
                  }}
                  title="Drag to move logo"
                />
              )}
            </div>
          </div>
        </div>

        {/* A4 sheet preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            A4 Sheet Preview — {printCols}×{printRows} grid
          </p>
          <div className="overflow-auto">
            <div style={{
              width: 210 * A4_PREVIEW_SCALE,
              height: 297 * A4_PREVIEW_SCALE,
              background: 'white',
              border: '1px solid #d1d5db',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
              padding: `${marginMm * A4_PREVIEW_SCALE}px`,
              display: 'grid',
              gridTemplateColumns: `repeat(${printCols}, ${cardW * A4_PREVIEW_SCALE}px)`,
              gridTemplateRows: `repeat(${printRows}, ${cardH * A4_PREVIEW_SCALE}px)`,
              gap: `${gapMm * A4_PREVIEW_SCALE}px`,
              boxSizing: 'border-box',
              flexShrink: 0,
              overflow: 'hidden',
            }}>
              {Array.from({ length: totalCards }).map((_, i) => (
                <CardContent key={i} {...sharedProps} scale={A4_PREVIEW_SCALE} printMode={false} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Print sheet */}
      <style>{`#lm-print-sheet{display:none}@media print{#lm-print-sheet{display:block}}`}</style>
      <div id="lm-print-sheet">
        <div style={{
          width: '210mm', padding: `${marginMm}mm`,
          display: 'grid',
          gridTemplateColumns: `repeat(${printCols}, ${cardW}mm)`,
          gap: `${gapMm}mm`,
          boxSizing: 'border-box',
        }}>
          {Array.from({ length: totalCards }).map((_, i) => (
            <CardContent key={i} {...sharedProps} scale={0} printMode={true} />
          ))}
        </div>
      </div>
    </div>
  )
}
