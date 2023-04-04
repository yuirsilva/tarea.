import GoogleProvider from 'next-auth/providers/google'
import {
    type NextAuthOptions,
    type DefaultSession,
} from 'next-auth'
import NextAuth from 'next-auth'

declare module "next-auth" {
    export interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"]
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string
            }
            return session
        },
    },
    session: {
        strategy: 'jwt'
    }
}

export default NextAuth(authOptions)
