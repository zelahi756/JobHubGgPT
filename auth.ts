import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {db} from '@/lib/db';
import {verifyPassword} from '@/lib/password';
export const {handlers,auth,signIn,signOut} = NextAuth({
  session:{strategy:'jwt'},
  providers:[Credentials({credentials:{email:{label:'Email',type:'email'},password:{label:'Password',type:'password'}},async authorize(credentials){
    if(typeof credentials?.email!=='string'||typeof credentials?.password!=='string') return null;
    const user=await db.user.findUnique({where:{email:credentials.email.toLowerCase()}});
    if(!user?.passwordHash || !(await verifyPassword(credentials.password,user.passwordHash))) return null;
    return {id:user.id,email:user.email,role:user.role};
  }})],
  callbacks:{async jwt({token,user}){if(user){token.role=(user as {role?:string}).role;token.uid=user.id}return token},async session({session,token}){if(session.user){session.user.id=String(token.uid||'');session.user.role=String(token.role||'USER')}return session}},
  pages:{signIn:'/login'}
});
