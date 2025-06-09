import { CourierClient } from "@trycourier/courier";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const courier = new CourierClient({
  authorizationToken: process.env.COURIER_AUTH_TOKEN!,
});

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const user_id = cookieStore.get("user_id")?.value;

  if (!user_id) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  const { title, body, actions } = await req.json();

  const res = await courier.send({
    message: {
      to: { user_id },
      content: {
        title,
        body,
        version: "2025-01-01",
        ...(actions?.length
          ? {
              elements: actions.map((a: any) => ({
                type: "action",
                content: a.content,
                href: a.href,
              })),
            }
          : {}),
      },
      routing: {
        method: "single",
        channels: ["inbox"],
      },
    },
  });

  return NextResponse.json(res);
}