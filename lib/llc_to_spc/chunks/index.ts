// Main chunks index - exports all content chunks in order
// This file combines all chunk modules into a single ordered array

import { ContentChunk } from '../pageBuilder'
import { headerChunks } from './header'
import { transferChunks } from './transfer'
import { objectivesChunks } from './objectivesArticle'
import { moaChunks } from './moaArticles'
import { finalChunks } from './finalArticles'

/**
 * All content chunks for the LLC to SPC conversion document
 * Ordered from start to finish
 */
export const allChunks: ContentChunk[] = [
    ...headerChunks,      // Document header, date, parties
    ...transferChunks,    // Preamble, Articles 1-5
    ...objectivesChunks,  // Chapter I: General Provisions with Objectives/Activities
    ...moaChunks,         // Chapters II-IV, Articles 6-18
    ...finalChunks        // Chapters V-VIII, Articles 19-28, Signatures
]

// Re-export individual chunk groups for flexibility
export { headerChunks } from './header'
export { transferChunks } from './transfer'
export { objectivesChunks } from './objectivesArticle'
export { moaChunks } from './moaArticles'
export { finalChunks } from './finalArticles'
