import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { issueTokens, encode, decode } from '@/lib/auth/jwt';
import { NextResponse } from 'next/server';

const mockUser = {
  id: '1',
  email: 'user@example.com',
  name: 'Test User',
  role: 'admin',
  password: 'Password123!',
};

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email ?? '';
        const password = credentials?.password ?? '';
        if (!email || !password) {
          return null;
        }
        if (email === mockUser.email && password === mockUser.password) {
          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
            role: mockUser.role,
          } as any;
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  jwt: {
    encode,
    decode,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, refreshToken } = issueTokens({
          id: (user as any).id,
          email: user.email!,
          name: user.name!,
          role: (user as any).role,
        });
        (token as any).user = user;
        (token as any).accessToken = accessToken;
        (token as any).refreshToken = refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user = (token as any).user;
      (session as any).accessToken = (token as any).accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };