export async function POST(req: Request) {
    const body = await req.json()
    const resp = await fetch(`http://localhost:7777/register`, { method: "POST", body: JSON.stringify(body) })
    try {
        const data = await resp.json()
        return Response.json({ data }, { status: resp.status })
    } catch (e) {
        return Response.error
    }
}