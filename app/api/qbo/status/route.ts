// app/api/qbo/status/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/qbo'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const sb = supabaseAdmin()

  const { data: { user }, error: authError } = await sb.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json({ error: 'Invalid auth token' }, { status: 401 })
  }

  const { data: conn } = await sb
    .from('qbo_connections')
    .select('realm_id, company_name, connected_at, last_sync_at, sync_error')
    .eq('user_id', user.id)
    .single()

  if (!conn) {
    return NextResponse.json({ connected: false })
  }

  return NextResponse.json({
    connected: true,
    company_name: conn.company_name,
    realm_id: conn.realm_id,
    connected_at: conn.connected_at,
    last_sync_at: conn.last_sync_at,
    sync_error: conn.sync_error,
  })
}
