'use client'

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormGroup,
    FormLabel,
    FormInput,
    FormError,
} from "@/components/ui/form";
import Link from "next/link";
import toast from "react-hot-toast";
import { SignUp, ActionResponse } from '@/app/actions/auth'

const initialState: ActionResponse = {
    success: false,
    message: '',
    errors: undefined,
}

export default function SignUpPage() {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(async (prevState: ActionResponse, formData: FormData) => {
        try {
            const result = await SignUp(formData);

            if (result.success) {
                toast.success('Account created successfully');
                router.push('/dashboard');
                router.refresh();
            }

            return result;
        } catch (err) {
            return {
                success: false,
                message: (err as Error).message || 'An error occurred while creating account',
                errors: undefined
            }
        }
    }, initialState);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-3">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                        ChatSphere
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base font-medium">
                        Create your account to get started.
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl border border-white/20 p-6 sm:p-8 space-y-6">
                    <Form action={formAction} className="space-y-5">
                        {state?.message && !state.success && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <FormError className="text-red-700 text-sm font-medium">{state.message}</FormError>
                            </div>
                        )}

                        <FormGroup className="space-y-2">
                            <FormLabel htmlFor="email" className="text-gray-700 font-semibold text-sm">
                                Email Address
                            </FormLabel>
                            <FormInput 
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                required 
                                disabled={isPending}
                                aria-describedby="email-error"
                                placeholder="Enter your email"
                                className={`h-11 px-4 text-base transition-all duration-200 border-2 rounded-lg bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                                    state?.errors?.email 
                                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            />
                            {state?.errors?.email && (
                                <p id="email-error" className="text-red-600 text-sm font-medium flex items-center gap-1">
                                    <span className="text-red-500">⚠</span>
                                    {state.errors.email[0]}
                                </p>
                            )}
                        </FormGroup>

                        <FormGroup className="space-y-2">
                            <FormLabel htmlFor="password" className="text-gray-700 font-semibold text-sm">
                                Password
                            </FormLabel>
                            <FormInput 
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                required
                                disabled={isPending}
                                aria-describedby="password-error"
                                placeholder="Create a password"
                                className={`h-11 px-4 text-base transition-all duration-200 border-2 rounded-lg bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                                    state?.errors?.password 
                                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            />
                            {state?.errors?.password && (
                                <p id="password-error" className="text-red-600 text-sm font-medium flex items-center gap-1">
                                    <span className="text-red-500">⚠</span>
                                    {state.errors.password[0]}
                                </p>
                            )}
                        </FormGroup>

                        <FormGroup className="space-y-2">
                            <FormLabel htmlFor="confirmPassword" className="text-gray-700 font-semibold text-sm">
                                Confirm Password
                            </FormLabel>
                            <FormInput 
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                autoComplete="new-password"
                                required
                                disabled={isPending}
                                aria-describedby="confirmPassword-error"
                                placeholder="Confirm your password"
                                className={`h-11 px-4 text-base transition-all duration-200 border-2 rounded-lg bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                                    state?.errors?.confirmPassword 
                                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            />
                            {state?.errors?.confirmPassword && (
                                <p id="confirmPassword-error" className="text-red-600 text-sm font-medium flex items-center gap-1">
                                    <span className="text-red-500">⚠</span>
                                    {state.errors.confirmPassword[0]}
                                </p>
                            )}
                        </FormGroup>

                        <div className="pt-2">
                            <Button 
                                type="submit" 
                                disabled={isPending}
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                            >
                                {isPending ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Creating account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </div>
                    </Form>
                </div>

                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <Link 
                            href="/signin" 
                            className="font-semibold text-blue-600 hover:text-indigo-600 transition-colors duration-200 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
