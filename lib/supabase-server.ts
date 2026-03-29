import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sbnykmxckfwkkxvhrkot.supabase.co'

export function getSupabaseServer() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY not set')
  return createClient(supabaseUrl, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
