import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


declare global {
    var urlMap: Map<string, string> | undefined;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    console.log("Middleware Pathname:   ", pathname);

    if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    const shortcode = pathname.substring(1);

    try {

        const apiurl = new URL('/api/redirect', request.url);
        const response = await fetch(`${apiurl.origin}/api/redirect?code=${shortcode}`);

        if (response.ok) {
            const data = await response.json();
            if (data.url) {
                return NextResponse.redirect(data.url);

            }
        }
    } catch (error) {
        console.log("Middleware Error:   ", error);
    }

    return NextResponse.next();

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}