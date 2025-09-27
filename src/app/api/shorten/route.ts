import { NextRequest, NextResponse } from "next/server";

declare global {
    var urlMap: Map<string, string> | undefined;
}

const urlMap = globalThis.urlMap ?? new Map<string, string>();

globalThis.urlMap = urlMap;

const generateShortUrl = () => {
    const shortCodeLength = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for (let i = 0; i < shortCodeLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result

}

export async function POST(request: NextRequest) {
    try {

        const { url } = await request.json();

        if (!url || !url.startsWith('http')) {
            return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
        }
        const shortcode = generateShortUrl();

        urlMap.set(shortcode, url);

        console.log("API URL Map:   ", urlMap);

        const shortUrl = `${request.nextUrl.origin}/${shortcode}`;

        return NextResponse.json({ shortUrl });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}