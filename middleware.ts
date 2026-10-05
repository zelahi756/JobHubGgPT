import {auth} from '@/auth';
export default auth((req)=>{if(req.nextUrl.pathname.startsWith('/admin')&&!['EDITOR','VERIFIER','ADMIN','SUPER_ADMIN'].includes(req.auth?.user?.role||''))return Response.redirect(new URL('/login',req.nextUrl));});
export const config={matcher:['/admin/:path*']};
