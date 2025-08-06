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