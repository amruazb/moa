import type { CSSProperties } from 'react'
import type { CardProps, FieldStyle, Field } from './types'

export function CardContent(p: CardProps) {
  const u   = (mm: number) => p.printMode ? `${mm}mm` : `${mm * p.scale}px`
  const bd  = p.printMode ? '0.3mm' : '1px'
  const gap = p.paddingMm * 0.4

  const fontFamily = p.dir === 'rtl'
    ? "'Tahoma', 'Arial', sans-serif"
    : 'Arial, Helvetica, sans-serif'

  const fieldBoxStyle = (fs: FieldStyle): CSSProperties => {
    const h = u(p.fieldFontSizeMm * 1.8)
    const base: CSSProperties = { flex: 1, height: h, marginLeft: u(1) }
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

  const colorForce: CSSProperties = { WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }

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

  const outerStyle: CSSProperties = {
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

  const beside      = Math.min(p.fieldsNextToLogo, p.fields.length)
  const sideFields  = p.fields.slice(0, beside)
  const belowFields = p.fields.slice(beside)
  const logoRight   = p.logoXMm + p.logoWidthMm
  const logoBottom  = p.logoYMm + p.logoHeightMm
  const logoInRight = p.logoXMm + p.logoWidthMm / 2 > p.widthMm / 2
  const sideLeft    = logoInRight ? u(p.paddingMm) : u(logoRight + gap)
  const sideRight   = logoInRight ? u(p.widthMm - p.logoXMm + gap) : u(p.paddingMm)

  return (
    <div style={outerStyle}>
      <HeaderBand />
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <img src={p.logoUrl} alt="logo" style={{
          position: 'absolute', left: u(p.logoXMm), top: u(p.logoYMm),
          width: u(p.logoWidthMm), height: 'auto', objectFit: 'contain', display: 'block',
        }} />
        {beside > 0 && (
          <div style={{ position: 'absolute', left: sideLeft, right: sideRight, top: u(p.logoYMm), display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <FieldRows subset={sideFields} />
          </div>
        )}
        {belowFields.length > 0 && (
          <div style={{ position: 'absolute', left: u(p.paddingMm), right: u(p.paddingMm), top: u(logoBottom + gap) }}>
            <FieldRows subset={belowFields} />
          </div>
        )}
      </div>
      <FooterBand />
    </div>
  )
}
