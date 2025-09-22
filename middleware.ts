import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0];
  const path = request.nextUrl.pathname;

  if (subdomain && subdomain !== 'www' && subdomain !== 'localhost') {
    const url = request.nextUrl.clone();
    url.pathname = `/_sites/${subdomain}${path}`;

    const response = NextResponse.rewrite(url);
    response.headers.set('x-pathname', path); 

    return response;
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', path); 
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|static|.*\\..*).*)'],
};
