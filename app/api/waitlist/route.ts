import { NextRequest, NextResponse } from 'next/server';

// This will be replaced with actual database connection later
// For now, we'll simulate database storage and use the ZYNIQ backend

interface WaitlistEntry {
  email: string;
  source: string;
  commandId: string;
  priority: number;
  metadata: {
    timestamp: string;
    userAgent?: string;
    referrer?: string;
  };
}

// Generate Command ID in format: #XXXX-Y where XXXX is random 4 digits, Y is priority tier
function generateCommandId(email: string, source: string): { id: string; priority: number } {
  // Priority scoring algorithm
  let priority = 1; // Default tier
  
  // Higher priority for certain domains
  const emailDomain = email.split('@')[1]?.toLowerCase();
  const highPriorityDomains = ['vc.com', 'ventures.com', 'capital.com', 'invest.com'];
  const mediumPriorityDomains = ['tech.com', 'ai.com', 'startup.com'];
  
  if (highPriorityDomains.some(d => emailDomain?.includes(d))) {
    priority = 3; // VIP tier
  } else if (mediumPriorityDomains.some(d => emailDomain?.includes(d))) {
    priority = 2; // Premium tier
  }
  
  // Adjust by source
  if (source === 'core') priority = Math.max(priority, 2); // Core investors get at least premium
  
  // Generate 4-digit random number
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  
  return {
    id: `#${randomNum}-${priority}`,
    priority,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'core', metadata = {} } = body;

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Generate Command ID
    const { id: commandId, priority } = generateCommandId(email, source);

    // Prepare waitlist entry
    const waitlistEntry: WaitlistEntry = {
      email: email.toLowerCase(),
      source,
      commandId,
      priority,
      metadata: {
        timestamp: metadata.timestamp || new Date().toISOString(),
        userAgent: metadata.userAgent,
        referrer: metadata.referrer,
      },
    };

    // Save to ZYNIQ backend database
    let backendPersisted = false;
    try {
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
      
      const response = await fetch(`${backendUrl}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(waitlistEntry),
        signal: AbortSignal.timeout(3500),
      });

      if (response.ok) {
        backendPersisted = true;
      } else {
        const errorText = await response.text();
        // If duplicate email (409), still treat as persisted — data is safe
        if (response.status === 409) {
          const existingData = JSON.parse(errorText);
          return NextResponse.json(
            {
              success: true,
              message: 'You are already on the waitlist!',
              commandId: existingData.commandId || commandId,
              priority,
              alreadyRegistered: true,
            },
            { status: 200 }
          );
        }
        console.error('Backend storage failed:', errorText);
      }
    } catch (backendError) {
      console.error('Backend connection error:', backendError);
    }

    // TODO: When Communiverse microservice is ready, send confirmation email
    // await sendConfirmationEmail(email, commandId);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: backendPersisted
          ? 'Successfully joined the waitlist!'
          : 'Your Command ID has been generated. Please try again later if you don\'t receive a confirmation.',
        commandId,
        priority,
        persisted: backendPersisted,
        data: {
          email: waitlistEntry.email,
          source: waitlistEntry.source,
          timestamp: waitlistEntry.metadata.timestamp,
        },
      },
      { status: backendPersisted ? 201 : 202 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process waitlist submission. Please try again.' 
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check if email is already on waitlist
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      );
    }

    // Check backend database
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/waitlist/check?email=${encodeURIComponent(email)}`, {
      signal: AbortSignal.timeout(3500),
    });
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }

    return NextResponse.json(
      { exists: false },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
