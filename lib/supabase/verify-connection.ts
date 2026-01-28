// Helper script to verify Supabase connection
// Run this in browser console or as a test

export async function verifySupabaseConnection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase credentials not found in environment variables')
    return false
  }

  console.log('🔍 Testing Supabase connection...')
  console.log('URL:', supabaseUrl)
  console.log('Key:', supabaseAnonKey.substring(0, 20) + '...')

  try {
    // Test basic connectivity
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    })

    if (response.ok) {
      console.log('✅ Supabase connection successful!')
      return true
    } else {
      console.error('❌ Supabase connection failed:', response.status, response.statusText)
      return false
    }
  } catch (error: any) {
    if (error.message.includes('Failed to fetch') || error.message.includes('ERR_NAME_NOT_RESOLVED')) {
      console.error('❌ DNS Resolution Failed:')
      console.error('   The Supabase project URL does not exist or is incorrect.')
      console.error('   Please verify the Project URL in your Supabase dashboard:')
      console.error('   https://app.supabase.com → Settings → API → Project URL')
    } else {
      console.error('❌ Connection error:', error.message)
    }
    return false
  }
}
