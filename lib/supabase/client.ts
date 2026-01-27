// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Template saving will be disabled.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Document types
export type DocumentType = 'poa' | 'llc-moa' | 'llc-amendment-moa' | 'llc-new-moa' | 'llc-to-spc'

// Template metadata
export interface TemplateMetadata {
  id?: string
  name: string
  documentType: DocumentType
  createdAt?: string
  updatedAt?: string
  description?: string
}

// Template with data
export interface Template extends TemplateMetadata {
  data: any // Document-specific data (POAData, LLCData, etc.)
}
