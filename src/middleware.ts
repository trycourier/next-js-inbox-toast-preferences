'use server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { monotonicFactory } from 'ulid';
// or import {factory} from 'ulid'

const prng = () => {
    const buffer = new Uint8Array(1);
    crypto.getRandomValues(buffer);
    return buffer[0] / 0xff;
};
export const ulid = monotonicFactory(prng); // or factory(prng)

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    if (!request.cookies.has('user_id')) {
        response.cookies.set('user_id', ulid());
    }
    return response;
}
