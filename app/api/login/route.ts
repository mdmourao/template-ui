import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    const body = await req.json()
    const resp = await fetch(`http://localhost:7777/login`, { 
        method: "POST",
        body: JSON.stringify(body),
        credentials: "same-origin" })
    try {
        const data = await resp.json()
        const  response = Response.json({ data }, { status: resp.status , headers: { 'set-cookie': resp.headers.get('set-cookie') || "" }})
        return response
    } catch (e) {
        return Response.error
    }
}