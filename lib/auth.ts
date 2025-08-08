import { compare } from 'bcryptjs'
import { cookies } from 'next/headers'
import * as jose from 'jose'
import { cache } from 'react'

interface JWTPayload {
    userId: string
    [key: string]: string | number | boolean | null | undefined
}

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set')
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

const JWT_EXPIRATION = '7d'

const REFRESH_THRESHOLD = 24 * 60 * 60



export async function verifyPassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword)
}

export async function createUser(email: string, password: string) {
    try {
        const res = await fetch ('http://localhost:5000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }

        const data = await res.json()
        return data;
        
    } catch (error) {
        console.error(error)
        return { error: 'Failed to create user' }
    }

}

export async function generateJWT(payload: JWTPayload) {
    return await new jose.SignJWT( payload )
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRATION)
        .sign(JWT_SECRET)
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET)
        return payload as JWTPayload
    } catch (error) {
        console.error('JWT verification failed:', error)
        return null
    }
}

export async function shouldRefreshToken(token: string): Promise<boolean> {
    try {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
            clockTolerance: 15,
        })

        const exp = payload.exp as number
        const now = Math.floor(Date.now() / 1000)
        return exp - now < REFRESH_THRESHOLD
    } catch {
        return false
    }
}

export async function createSession(userId: string) {
    try {
        const token = await generateJWT({ userId })

        const cookieStore = await cookies()
        cookieStore.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax'
        })
        
        return true
    } catch (error) {
        console.error('Session creation failed:', error)
        return false
    }
}

export const getSession = cache(async () => {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('auth_token')?.value
      if (!token) return null
  
      const payload = await verifyJWT(token)
      return payload ? { userId: payload.userId } : null
    } catch (error) {
      console.error('Session retrieval failed:', error)
      return null
    }
  })
  
  export async function deleteSession() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete('auth_token')
        return true
    } catch (error) {
        console.error('Session deletion failed:', error)
        return false
    }
  }

