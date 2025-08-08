'use client'

import { LogOutIcon } from "lucide-react"
import { useTransition } from "react"
import { signOut } from "@/app/actions/auth"

export default function SignOutButton() {
    const [isPending, startTransition] = useTransition()

    const handleSignOut = () => {
        startTransition( () => {
             signOut()
        })
    }

    return (
        <button onClick={handleSignOut} disabled={isPending} className="flex items-center w-full px-3 py-2.5 gap-3 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

            <LogOutIcon size={18} className="text-slate-400 group-hover:text-red-500 transition-colors duration-200 flex-shrink-0 relative z-10" />

            <span className="hidden md:inline font-medium tracking-wide relative z-10">{isPending ? 'Signing out...' : 'Sign out'}</span>

            {
                isPending && (
                 <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 border border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                 </div>
                )
            }
        </button>
    )
}
