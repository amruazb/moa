// Re-export SPC MOA from modular structure
export { generateMOAHTML as generateSpcMoaHTML } from './spc_moa'
// Keep backward compatibility alias
export { generateMOAHTML } from './spc_moa'
export type { MOAContext, PrimaryParty, CompanyInfo, ManagerInfo, TextStyle } from './spc_moa'

// Export LLC MOA generator
export { generateLLCMoaHTML } from './llc_moa'
export type { LLCMOAContext, Partner } from './llc_moa'
