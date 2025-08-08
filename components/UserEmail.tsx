import { getCurrentUser } from "@/lib/dal"
import { UserIcon } from "lucide-react"
import SignOutButton from '@/components/SignOutButton'

const UserEmail = async () => {
    const user = await getCurrentUser()

    if (!user) {
        return null
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-start px-3 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                <UserIcon size={18} className="mr-3 text-slate-400 flex-shrink-0" />
                <div>
                    <span className="text-sm font-medium text-slate-700 truncate block leading-tight">
                        {user?.email}
                    </span>
                </div>   
            </div>
            <SignOutButton />
        </div>
    )
}

export default UserEmail