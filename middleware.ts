import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value
    const url = request.nextUrl

    if (url.pathname.startsWith('/dashboard')) {
        if (!token) return NextResponse.redirect(new URL('/signin', request.url))
        try {
            await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!))
        } catch {
            const res = NextResponse.redirect(new URL('/signin', request.url))
            res.cookies.delete('auth_token')
            return res
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*'],
}