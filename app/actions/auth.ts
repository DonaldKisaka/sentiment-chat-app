'use server'

import { z } from 'zod'
import {
    createUser,
    createSession,
    verifyPassword,
    deleteSession,
} from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getUserByEmail } from '@/lib/dal'
import { cookies } from 'next/headers'

const SignInSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
})

const SignUpSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

export type SignInData = z.infer<typeof SignInSchema>
export type SignUpData = z.infer<typeof SignUpSchema>

export type ActionResponse = {
    success: boolean
    message: string
    errors?: Record<string, string[]>
    error?: string
    userId?: string
}

export const SignIn = async (formData: FormData): Promise<ActionResponse> => {
    try {
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const validationResult = SignInSchema.safeParse(data)

        if (!validationResult.success) {
            return {
                success: false,
                message: 'Validation failed',
                errors: validationResult.error.flatten().fieldErrors,
            }
        }

        const user = await getUserByEmail(data.email)

        if (!user) {
            return {
                success: false,
                message: 'Invalid email or password',
                errors: {
                    email: ['Invalid email or password'],
                },
            }
        }

        const isPasswordValid = await verifyPassword(data.password, user.password)

        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid email or password',
                errors: {
                    password: ['Invalid email or password'],
                }
            }
        }

        await createSession(user._id)

        return {
            success: true,
            message: 'Signed in successfully',
            userId: user._id,
        }
    } catch (e) {
        console.error(e)
        return {
            success: false,
            error: 'Failed to sign in',
            message: 'Failed to sign in',
        }
    }
}

export const SignUp = async (formData: FormData): Promise<ActionResponse> => {
    try {
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        }

        const validationResult = SignUpSchema.safeParse(data)

        if (!validationResult.success) {
            return {
                success: false,
                message: 'Validation failed',
                errors: validationResult.error.flatten().fieldErrors,
            }
        }

        const existingUser = await getUserByEmail(data.email)
        if (existingUser) {
            return {
                success: false,
                message: 'Email already exists',
                errors: {
                    email: ['Stop trying to spoof me!'],
                },
            }
        }

        const user = await createUser(data.email, data.password)

        if (!user) {
            return {
                success: false,
                message: 'Failed to create user',
                error: 'Failed to create user',
            }
        }

        await createSession(user._id)

        return {
            success: true,
            message: 'Account created successfully',
            userId: user._id,
        }
    } catch (e) {
        console.error(e)
        return {
            success: false,
            error: 'Failed to sign up',
            message: 'Failed to sign up',
        }
    }
}

export const signOut = async () => {
    try {
        const cookieStore = await cookies()
        cookieStore.set('userId', '', {
            path: '/',
            maxAge: 0,
            sameSite: 'lax',
        })
        await deleteSession()
    } catch (e) {
        console.error(e)
        throw e
    } finally {
        redirect('/signin')
    }
}

