// app/api/qbo/sync-invoice/route.ts
import { NextRequest, NextResponse } from 'next/server'
import {
  supabaseAdmin,
  getValidToken,
  qboApiFetch,
  findOrCreateCustomer,
} from '@/lib/qbo'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const sb = supabaseAdmin()

  // Verify the calling user via Supabase auth
  const { data: { user }, error: authError } = await sb.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Invalid auth token' }, { status: 401 })
  }

  // Parse request body
  let body: {
    job_id: string
    client_name: string
    client_email?: string | null
    client_phone?: string | null
    service_type: string
    price: number
    date: string
    notes?: string | null
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { job_id, client_name, client_email, client_phone, service_type, price, date, notes } = body

  if (!job_id || !client_name || !service_type || !price) {
    return NextResponse.json(
      { error: 'Missing required fields: job_id, client_name, service_type, price' },
      { status: 400 }
    )
  }

  try {
    // 1. Get valid QBO access token (auto-refreshes if needed)
    const { accessToken, realmId } = await getValidToken(user.id)

    // 2. Find or create the customer in QBO
    const customer = await findOrCreateCustomer(
      accessToken,
      realmId,
      client_name,
      client_email,
      client_phone
    )

    // Log customer lookup
    await sb.from('qbo_sync_log').insert({
      user_id: user.id,
      job_id,
      action: 'find_or_create_customer',
      payload: { customer_id: customer.Id, display_name: customer.DisplayName },
    })

    // 3. Create the invoice in QBO
    const invoicePayload = {
      CustomerRef: { value: customer.Id },
      TxnDate: date,
      DueDate: date,
      PrivateNote: notes || `Synced from Opervo — Job ${job_id}`,
      Line: [
        {
          Amount: price,
          DetailType: 'SalesItemLineDetail',
          Description: service_type,
          SalesItemLineDetail: {
            Quantity: 1,
            UnitPrice: price,
          },
        },
      ],
    }

    const invoiceResult = await qboApiFetch(
      'POST',
      '/invoice',
      accessToken,
      realmId,
      invoicePayload
    )

    const qboInvoiceId = invoiceResult.Invoice.Id
    const qboInvoiceNumber = invoiceResult.Invoice.DocNumber

    // 4. Create a payment against the invoice (since it's already paid)
    try {
      await qboApiFetch(
        'POST',
        '/payment',
        accessToken,
        realmId,
        {
          CustomerRef: { value: customer.Id },
          TotalAmt: price,
          Line: [
            {
              Amount: price,
              LinkedTxn: [
                {
                  TxnId: qboInvoiceId,
                  TxnType: 'Invoice',
                },
              ],
            },
          ],
        }
      )
    } catch (paymentErr) {
      // Non-critical — invoice still created, just won't show as "paid" in QBO
      console.warn('QBO payment creation failed (invoice still created):', paymentErr)
    }

    // 5. Update the job in Supabase with QBO invoice ID
    await sb
      .from('jobs')
      .update({
        qbo_invoice_id: qboInvoiceId,
        qbo_sync_status: 'synced',
        qbo_synced_at: new Date().toISOString(),
      })
      .eq('id', job_id)
      .eq('user_id', user.id)

    // 6. Update last_sync_at on connection
    await sb
      .from('qbo_connections')
      .update({
        last_sync_at: new Date().toISOString(),
        sync_error: null,
      })
      .eq('user_id', user.id)

    // Log success
    await sb.from('qbo_sync_log').insert({
      user_id: user.id,
      job_id,
      action: 'create_invoice',
      payload: {
        qbo_invoice_id: qboInvoiceId,
        qbo_invoice_number: qboInvoiceNumber,
        amount: price,
        customer: customer.DisplayName,
      },
    })

    return NextResponse.json({
      success: true,
      qbo_invoice_id: qboInvoiceId,
      qbo_invoice_number: qboInvoiceNumber,
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('QBO sync-invoice error:', errorMessage)

    // Update job with error status
    await sb
      .from('jobs')
      .update({
        qbo_sync_status: 'error',
      })
      .eq('id', job_id)
      .eq('user_id', user.id)

    // Update connection with error
    await sb
      .from('qbo_connections')
      .update({ sync_error: errorMessage })
      .eq('user_id', user.id)

    // Log error
    await sb.from('qbo_sync_log').insert({
      user_id: user.id,
      job_id,
      action: 'error',
      payload: { error: errorMessage },
    })

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
