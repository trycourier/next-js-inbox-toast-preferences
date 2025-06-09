import { CourierClient } from "@trycourier/courier";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

const courier = new CourierClient({
  authorizationToken: process.env.COURIER_AUTH_TOKEN!,
});

const userId = process.env.NEXT_PUBLIC_COURIER_USER_ID || "user@example.com";

export async function GET(req: NextRequest) {
  console.log("GET /api/token hit");

  const token = await courier.authTokens.issueToken({
    scope: `user_id:${userId} inbox:read:messages inbox:write:events realtime:connect`,
    expires_in: "24h"
  });

  console.log("Issuing token for:", userId);
  
  // Add CORS headers
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return NextResponse.json({ token: token.token }, { headers });
}

// Add OPTIONS handler for CORS preflight
export async function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return new NextResponse(null, { headers });
}

export async function POST(req: NextRequest) {
  const { title, body, actions } = await req.json();

  const res = await courier.send({
    message: {
      to: { user_id: userId },
      content: {
        version: "2025-01-01",
        title,
        body,
        elements: (actions || []).map((a: any) => ({
          type: "action",
          ...a,
        })),
      },
      routing: {
        method: "single",
        channels: ["inbox"],
      },
    },
  });

  console.log("Sending message to:", userId);
  return NextResponse.json(res);
}