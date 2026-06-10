import type { CSSProperties } from 'react'
import type { PreviewProps } from './types'
import { A4_W_MM, A4_H_MM, PREVIEW_SCALE, contentTypography, letterContentStyles } from './types'

export function LetterheadPreview({ data, theme, scale = PREVIEW_SCALE, printMode = false }: PreviewProps) {
  const u = (mm: number) => (printMode ? `${mm}mm` : `${mm * scale}px`)
  const bd = printMode ? '0.25mm' : '1px'
  const colorForce: CSSProperties = { WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }

  const hasContact = !!(data.address || data.phone || data.email || data.website)
  const isCenter = data.headerLayout === 'logo-center'
  const isRight = data.headerLayout === 'logo-right'
  const textAlign = isCenter ? 'center' : isRight ? 'right' : 'left'
  const bodyType = contentTypography(data.contentDir ?? 'ltr')
  const contentStyles = letterContentStyles(data)

  const dividerStyle: CSSProperties = {
    height: bd,
    backgroundColor: theme.divider,
    flexShrink: 0,
  }

  return (
    <div
      style={{
        width: u(A4_W_MM),
        height: u(A4_H_MM),
        backgroundColor: theme.background,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif",
        boxShadow: printMode ? 'none' : '0 4px 24px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        ...colorForce,
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: isCenter ? 'column' : isRight ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: isCenter ? 'center' : isRight ? 'flex-end' : 'flex-start',
        gap: u(isCenter ? 3 : 4),
        padding: `${u(12)} ${u(18)} ${u(6)}`,
        flexShrink: 0,
      }}>
        {data.logoUrl ? (
          <img
            src={data.logoUrl}
            alt="Company logo"
            style={{ width: u(data.logoWidthMm), height: 'auto', objectFit: 'contain', display: 'block', flexShrink: 0 }}
          />
        ) : (
          <div style={{
            width: u(data.logoWidthMm),
            height: u(data.logoWidthMm * 0.65),
            border: `${bd} dashed ${theme.muted}`,
            borderRadius: u(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.muted,
            fontSize: u(2.5),
            flexShrink: 0,
            backgroundColor: `${theme.primary}08`,
          }}>Logo</div>
        )}
        <div style={{ textAlign, flex: isCenter ? undefined : 1, minWidth: 0 }}>
          <div style={{ fontSize: u(6), fontWeight: 700, color: theme.primary, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {data.companyName || 'Company Name'}
          </div>
          {data.tagline ? (
            <div style={{ fontSize: u(3.2), color: theme.muted, marginTop: u(1), lineHeight: 1.35 }}>{data.tagline}</div>
          ) : null}
        </div>
      </div>

      {data.showHeaderDivider && <div style={{ ...dividerStyle, margin: `0 ${u(18)}` }} />}

      <div style={{
        flex: 1,
        margin: `${u(6)} ${u(18)} ${u(4)}`,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {data.letterDate ? (
          <div style={{
            textAlign: bodyType.dateAlign,
            direction: bodyType.direction,
            fontFamily: bodyType.fontFamily,
            fontSize: u(contentStyles.dateFontSizeMm),
            color: theme.muted,
            marginBottom: u(5),
            flexShrink: 0,
          }}>
            {data.letterDate}
          </div>
        ) : null}
        {data.content ? (
          <div style={{
            flex: 1,
            fontSize: u(contentStyles.contentFontSizeMm),
            color: theme.text,
            lineHeight: contentStyles.contentLineHeight,
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            direction: bodyType.direction,
            textAlign: bodyType.textAlign,
            fontFamily: bodyType.fontFamily,
            unicodeBidi: 'plaintext',
          }}>
            {data.content}
          </div>
        ) : (
          <div style={{
            flex: 1,
            border: `${bd} dashed ${theme.muted}40`,
            borderRadius: u(1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: u(2.8), color: theme.muted, opacity: 0.5 }}>
              Add date and content in the Letter tab
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: `${u(4)} ${u(18)} ${u(10)}`, flexShrink: 0 }}>
        {data.showFooterDivider && hasContact && (
          <div style={{ ...dividerStyle, marginBottom: u(4) }} />
        )}
        {hasContact && (
          <div style={{ textAlign, fontSize: u(2.6), color: theme.text, lineHeight: 1.55 }}>
            {data.address ? (
              <div style={{ color: theme.muted, marginBottom: u(1.5) }}>{data.address}</div>
            ) : null}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: isCenter ? 'center' : isRight ? 'flex-end' : 'flex-start',
              gap: `${u(1)} ${u(4)}`,
            }}>
              {data.phone ? <span><span style={{ color: theme.primary, fontWeight: 600 }}>Tel</span> {data.phone}</span> : null}
              {data.email ? <span><span style={{ color: theme.primary, fontWeight: 600 }}>Email</span> {data.email}</span> : null}
              {data.website ? <span><span style={{ color: theme.primary, fontWeight: 600 }}>Web</span> {data.website}</span> : null}
            </div>
          </div>
        )}
        {data.footerNote ? (
          <div style={{ marginTop: u(3), fontSize: u(2.2), color: theme.muted, textAlign, fontStyle: 'italic' }}>
            {data.footerNote}
          </div>
        ) : null}
      </div>
    </div>
  )
}
