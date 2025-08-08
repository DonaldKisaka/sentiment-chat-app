import { getSession } from '@/lib/auth'

export async function getUserByEmail(email: string) {
    try {
        const res = await fetch(`http://localhost:5000/api/user?email=${email}`)
        if (!res.ok) return null
        const data = await res.json()
        return data.success ? data.data : null
    } catch {
        return null
    }
}

export async function getCurrentUser() {
    const session = await getSession()
    if (!session) {
        return null
    }

    try {
        const res = await fetch(`http://localhost:5000/api/user/${session.userId}`, { cache: 'no-store' })
        if (!res.ok) return null
        const data = await res.json()
        return data.success ? data.data : null
    } catch (error) {
        console.error(error)
        return null
    }
}