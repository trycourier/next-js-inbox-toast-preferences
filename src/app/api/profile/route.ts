import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { CourierClient } from '@trycourier/courier';

const courier = new CourierClient({
  authorizationToken: process.env.COURIER_AUTH_TOKEN!,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');

  if (!user_id) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
  }

  try {
    const profile = await courier.profiles.get(user_id);
    return NextResponse.json(profile);
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    return NextResponse.json({ error: 'Profile not found' }, { status: 500 });
  }
}