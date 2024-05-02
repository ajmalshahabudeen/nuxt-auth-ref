// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
           clientId: process.env.GITHUB_ID,
           clientSecret: process.env.GITHUB_SECRET
        })
    ],
    adapter: PrismaAdapter(prisma) as any,
    
})
