export async function GET(req: Request) {
    const resp = await fetch(`http://localhost:7777/auth-status`, { method: "GET" })
    try {
        const data = await resp.json()
        return Response.json({ data }, { status: resp.status })
    } catch (e) {
        return Response.error
    }
}