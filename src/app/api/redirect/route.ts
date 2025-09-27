import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const shortcode = searchParams.get('code');
    
    if (!shortcode) {
        return NextResponse.json({ error: 'Shortcode not found' }, { status: 404 });
    }
    const url = globalThis.urlMap?.get(shortcode);
    if (!url) {
        return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }
    return NextResponse.json({ url: url }, { status: 200 });
}