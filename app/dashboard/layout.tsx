import Navigation from "@/components/Navigation"

export const dynamic = 'force-dynamic'
export const revalidate = 0             

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <Navigation />
            <main className="pl-16 md:pl-64 pt-0 min-h-screen">
                <div className="max-w-6xl mx-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}       

export default DashboardLayout