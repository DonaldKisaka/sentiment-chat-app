import { compare, hash } from 'bcryptjs'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import * as jose from 'jose'

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

export async function hashedPassword(password: string) {
    return await hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword)
}

