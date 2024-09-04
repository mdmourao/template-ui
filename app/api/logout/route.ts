export async function POST(req: Request, res: Response) {
    const resp = await fetch(`http://localhost:7777/logout`, {
        method: "POST",
        credentials: "same-origin"
    })
    try {
        const data = await resp.json()
        const response = Response.json({ data }, { status: resp.status })
        return response
    } catch (e) {
        return Response.error
    }
}