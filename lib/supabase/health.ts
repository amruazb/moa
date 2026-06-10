import { getSupabasePublicConfig, isSupabaseConfigured } from './client'

export type SupabaseHealthStatus =
  | { ok: true }
  | { ok: false; message: string; hint?: string }

function formatFetchError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err)
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('ERR_NAME_NOT_RESOLVED')) {
    return 'Cannot reach Supabase (network/DNS). The project URL in .env may be wrong or the project was deleted/paused.'
  }
  return msg || 'Unknown connection error'
}

/** Client-side connectivity check (REST ping). */
export async function checkSupabaseHealth(): Promise<SupabaseHealthStatus> {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: 'Supabase is not configured.',
      hint: 'Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env or .env.local, then restart the dev server.',
    }
  }

  const { url, anonKey } = getSupabasePublicConfig()

  try {
    const res = await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    })

    if (res.ok || res.status === 401 || res.status === 404) {
      return { ok: true }
    }

    return {
      ok: false,
      message: `Supabase responded with ${res.status} ${res.statusText}`,
      hint: 'Check your anon/publishable key in Supabase → Settings → API.',
    }
  } catch (err) {
    return {
      ok: false,
      message: formatFetchError(err),
      hint: `Verify Project URL in Supabase dashboard matches .env (currently: ${url}).`,
    }
  }
}

export function formatSupabaseError(err: unknown): string {
  return formatFetchError(err)
}
