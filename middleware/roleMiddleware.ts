import { NextRequest, NextResponse } from 'next/server';

export function roleMiddleware(request: NextRequest, role: string) {

  const check = {
    isLogin: request.cookies.get('user-id') ? true : false,
    adminRole: request.cookies.get('admin-role')?.value,
    adminStatus: request.cookies.get('admin-status')?.value === "true" ? true : false,
    masterStatus: request.cookies.get('master-status')?.value === "true" ? true : false
  }

  if(check && check.masterStatus) return NextResponse.redirect('/master-dashboard/main');

  if(check && role === 'Pengurus' && check.adminStatus && check.isLogin) {
    return NextResponse.next();
  } 
  
  if (!check?.isLogin || check?.adminRole !== role || !check?.adminStatus) {
    const homeUrl = new URL(check.adminStatus ? '/dashboard/main' : '/', request.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
