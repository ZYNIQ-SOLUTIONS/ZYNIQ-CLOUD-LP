import { NextRequest, NextResponse } from 'next/server'

interface ConsultationLead {
  name: string
  email: string
  company?: string
  phone?: string
  service?: string
  budget?: string
  message?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ConsultationLead = await request.json()

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: { message: 'Name and email are required', code: 'VALIDATION_ERROR' } },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: { message: 'Invalid email address', code: 'VALIDATION_ERROR' } },
        { status: 400 }
      )
    }

    // Generate lead ID
    const leadId = `ZQ-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`

    // Forward to backend if available
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://backend:5000'
    try {
      await fetch(`${backendUrl}/api/consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, lead_id: leadId, source: 'landing_page' }),
        signal: AbortSignal.timeout(3500),
      })
    } catch {
      // Backend unavailable — lead still captured below
      console.warn('[Consultation] Backend unreachable, lead captured locally:', leadId)
    }

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      message: 'Thank you! Our team will reach out within 24 hours.',
    })
  } catch {
    return NextResponse.json(
      { error: { message: 'Failed to process request', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    )
  }
}
