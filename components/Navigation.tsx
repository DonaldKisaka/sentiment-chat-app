import Link from "next/link"
import { HomeIcon, LogInIcon, MessageCircleIcon } from "lucide-react"
import UserEmail from "@/components/UserEmail"
import { Suspense } from "react"
import Navlink from "@/components/Navlink"
import Image from "next/image"

const Navigation = () => {
  return (
      <aside className="fixed inset-y-0 left-0 w-16 md:w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-center md:justify-start h-16 px-4 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-3 group transition-all duration-200 hover:scale-105">
            <Image 
              className="hidden md:inline rounded-lg shadow-sm" 
              src="/logo.png" 
              alt="ChatSphere Logo" 
              width={32} 
              height={32} 
            />
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                ChatSphere
              </h1>
              <p className="text-xs text-slate-500 -mt-0.5">AI Chatbot</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col px-3 py-6 space-y-1">
          <div className="mb-2">
            <p className="hidden md:block text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">
              Workspace
            </p>
            <Navlink href="/dashboard" icon={<HomeIcon size={18} />} label="Dashboard" />
            <Navlink href="/dashboard/chat" icon={<MessageCircleIcon size={18} />} label="Chat" />
          </div>
        </nav>

        {/* User Section */}
        <div className="px-3 py-4 border-t border-slate-100 bg-slate-50/50">
          <Suspense 
             fallback={
              <Navlink 
                 href="/signin"
                 icon={<LogInIcon size={18} />}
                 label="Sign In"
              />
             }
          >
            <UserEmail />
          </Suspense>
        </div>  
      </aside>      
  )
}

export default Navigation
