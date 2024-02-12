import { CourierClient } from '@trycourier/courier';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

const courier = new CourierClient({});

export async function POST(
    req: NextRequest & {
        body: {
            title: string;
            body: string;
            actions: {
                href: string;
                content: string;
            }[];
        };
    }
) {
    const cookieStore = cookies();
    const user_id = cookieStore.get('user_id')?.value;
    const payload = await req.json();
    const { title, body, actions } = payload;
    console.log({ title, body, actions, payload });
    if (!user_id) {
        return Response.json({ error: 'user_id not found' }, { status: 400 });
    } else {
        const res = await courier.send({
            message: {
                to: { user_id },
                content: {
                    version: '2022-01-01',
                    elements: (actions || []).map((a) => ({
                        type: 'action',
                        ...a,
                    })),
                    title,
                    body,
                },
                routing: {
                    method: 'single',
                    channels: ['inbox'],
                },
            },
        });
        return Response.json(res);
    }
}
