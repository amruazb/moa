// PageBuilder - Dynamic pagination system for LLC to SPC document
// Distributes content chunks across pages based on height constraints

import { LLCToSPCContext, conversionPageFooter } from './types'

// Page dimension constants (A4 paper in mm)
export const PAGE_HEIGHT_MM = 297
export const FOOTER_HEIGHT_MM = 43
export const TOP_PADDING_MM = 15
export const BOTTOM_PADDING_MM = 5
export const CONTENT_HEIGHT_MM = PAGE_HEIGHT_MM - FOOTER_HEIGHT_MM - TOP_PADDING_MM - BOTTOM_PADDING_MM // ~234mm

// Content chunk types
export type ChunkType = 'header' | 'chapter' | 'article' | 'article-continuation' | 'signature'

// Content chunk definition
export interface ContentChunk {
    id: string                                    // Unique identifier (e.g., 'art8-intro')
    type: ChunkType                               // Type of content
    estimatedHeight: number                       // Height in mm (estimated)
    content: (ctx: LLCToSPCContext) => string    // HTML generator function
    keepWithNext?: boolean                        // Prevent page break after this chunk
}

// Page result after building
export interface BuiltPage {
    pageNumber: number
    chunks: ContentChunk[]
    html: string
}

/**
 * PageBuilder - Distributes content chunks across pages based on height
 * 
 * Usage:
 * ```typescript
 * const builder = new PageBuilder()
 * const pages = builder.buildPages(allChunks, ctx)
 * ```
 */
export class PageBuilder {
    private maxContentHeight: number

    constructor(maxContentHeight: number = CONTENT_HEIGHT_MM) {
        this.maxContentHeight = maxContentHeight
    }

    /**
     * Build pages from an array of content chunks
     * Returns array of HTML strings, one per page
     */
    buildPages(chunks: ContentChunk[], ctx: LLCToSPCContext): string[] {
        const pages: BuiltPage[] = []
        let currentChunks: ContentChunk[] = []
        let currentHeight = 0
        let pageNumber = 1

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i]
            const nextChunk = chunks[i + 1]

            // Check if adding this chunk would exceed page height
            if (currentHeight + chunk.estimatedHeight > this.maxContentHeight && currentChunks.length > 0) {
                // Finalize current page
                pages.push(this.createPage(currentChunks, ctx, pageNumber))
                pageNumber++
                currentChunks = []
                currentHeight = 0
            }

            // Add chunk to current page
            currentChunks.push(chunk)
            currentHeight += chunk.estimatedHeight

            // If keepWithNext is true and there's a next chunk, don't break yet
            if (chunk.keepWithNext && nextChunk) {
                // Check if next chunk fits, if not force a page break now
                if (currentHeight + nextChunk.estimatedHeight > this.maxContentHeight) {
                    // Next chunk won't fit, but we need to keep them together
                    // Move current chunk to next page
                    currentChunks.pop()
                    currentHeight -= chunk.estimatedHeight

                    if (currentChunks.length > 0) {
                        pages.push(this.createPage(currentChunks, ctx, pageNumber))
                        pageNumber++
                    }

                    currentChunks = [chunk]
                    currentHeight = chunk.estimatedHeight
                }
            }
        }

        // Finalize last page if there are remaining chunks
        if (currentChunks.length > 0) {
            pages.push(this.createPage(currentChunks, ctx, pageNumber, true))
        }

        return pages.map(p => p.html)
    }

    /**
     * Create a single page from chunks
     */
    private createPage(
        chunks: ContentChunk[],
        ctx: LLCToSPCContext,
        pageNumber: number,
        isLastPage: boolean = false
    ): BuiltPage {
        const contentHtml = chunks.map(chunk => chunk.content(ctx)).join('\n')

        const html = `
    <div class="page">
      <div class="page-content">
        ${contentHtml}
      </div>
      ${conversionPageFooter(pageNumber, isLastPage)}
    </div>`

        return {
            pageNumber,
            chunks,
            html
        }
    }

    /**
     * Get total estimated height of all chunks
     */
    getTotalHeight(chunks: ContentChunk[]): number {
        return chunks.reduce((sum, chunk) => sum + chunk.estimatedHeight, 0)
    }

    /**
     * Estimate number of pages needed for chunks
     */
    estimatePageCount(chunks: ContentChunk[]): number {
        const totalHeight = this.getTotalHeight(chunks)
        return Math.ceil(totalHeight / this.maxContentHeight)
    }

    /**
     * Build a single continuous document with CSS-based page breaks
     * This lets the browser/PDF renderer handle pagination naturally
     * Returns a single HTML string with all content in one continuous flow
     */
    buildContinuousFlow(chunks: ContentChunk[], ctx: LLCToSPCContext): string {
        // Generate all content with page-break hints
        const contentHtml = chunks.map(chunk => {
            const breakClass = chunk.keepWithNext ? 'keep-together' : ''
            const typeClass = `chunk-${chunk.type}`
            return `<div class="content-chunk ${typeClass} ${breakClass}" data-chunk-id="${chunk.id}">
              ${chunk.content(ctx)}
            </div>`
        }).join('\n')

        return `
    <div class="continuous-document">
      <div class="document-content">
        ${contentHtml}
      </div>
    </div>`
    }
}

// Default builder instance
export const pageBuilder = new PageBuilder()

// Height estimation helpers (in mm)
// These are approximate values based on typical content

/** Estimate height for an article-pair block */
export function estimateArticlePairHeight(
    paragraphCount: number = 1,
    hasTitle: boolean = true,
    isCompact: boolean = false
): number {
    const titleHeight = hasTitle ? 12 : 0
    const paragraphHeight = isCompact ? 15 : 20
    const padding = 8
    return titleHeight + (paragraphCount * paragraphHeight) + padding
}

/** Estimate height for a chapter header */
export function estimateChapterHeight(): number {
    return 18 // Compact chapter blocks
}

/** Estimate height for document header */
export function estimateHeaderHeight(): number {
    return 45 // Bilingual header block
}

/** Estimate height for a table */
export function estimateTableHeight(rowCount: number): number {
    const headerRow = 10
    const dataRow = 8
    return headerRow + (rowCount * dataRow) + 10 // padding
}

/** Estimate height for a list */
export function estimateListHeight(itemCount: number): number {
    const itemHeight = 6
    const padding = 10
    return (itemCount * itemHeight) + padding
}
