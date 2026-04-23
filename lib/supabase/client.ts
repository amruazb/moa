// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validate URL format
const isValidUrl = supabaseUrl && supabaseUrl.startsWith('https://') && supabaseUrl.includes('.supabase.co')

// Validate key format (supports both old JWT format and new publishable/secret format)
const isValidKey = supabaseAnonKey && (
  supabaseAnonKey.startsWith('eyJ') || // Old JWT format
  supabaseAnonKey.startsWith('sb_publishable_') || // New publishable format
  supabaseAnonKey.startsWith('sb_secret_') // New secret format (shouldn't be used client-side, but we'll allow it)
)

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Template saving will be disabled.')
  console.warn('URL:', supabaseUrl || 'MISSING')
  console.warn('Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING')
} else if (!isValidUrl) {
  console.error('Invalid Supabase URL format. Expected: https://xxxxx.supabase.co')
  console.error('Got:', supabaseUrl)
} else if (!isValidKey) {
  console.error('Invalid Supabase key format. Expected JWT (eyJ...) or publishable key (sb_publishable_...)')
  console.error('Got:', supabaseAnonKey.substring(0, 30) + '...')
} else {
  console.log('Supabase client initialized:', supabaseUrl)
  console.log('Using key format:', supabaseAnonKey.startsWith('sb_') ? 'New (publishable/secret)' : 'Legacy (JWT)')

  // Test DNS resolution (client-side check)
  if (typeof window !== 'undefined') {
    const testUrl = new URL(supabaseUrl)
    console.log('Testing connection to:', testUrl.hostname)
    // Note: Actual DNS resolution happens during API calls
    // If you see ERR_NAME_NOT_RESOLVED, the project URL is incorrect or the project doesn't exist
  }
}

// Only create client if we have valid credentials
// Use a dummy client if credentials are missing to avoid runtime errors
const dummyUrl = 'https://placeholder.supabase.co'
const dummyKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE1MTYyMzkwMjJ9.placeholder'

export const supabase = supabaseUrl && supabaseAnonKey && isValidUrl
  ? createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
  : createClient(dummyUrl, dummyKey) // Dummy client - operations will fail gracefully

// Document types
export type DocumentType = 'poa' | 'llc-moa' | 'llc-amendment-moa' | 'llc-new-moa' | 'llc-to-spc' | 'spc-moa' | 'label-maker'

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
