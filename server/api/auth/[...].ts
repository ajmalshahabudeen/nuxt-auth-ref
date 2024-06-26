// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
      strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    (GoogleProvider as any).default({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    (CredentialsProvider as any).default({
      allowDangerousEmailAccountLinking: true,
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any) {
        let user = null;

        // console.log("Credentials: ", credentials)
      
        const Email = credentials?.email
        // console.log("Email: ", Email)

        user = await prisma.user.findFirst({
          where: { email: Email },
        });
        const checkedPassword = bcrypt.compareSync(credentials?.password, (user as any)?.password)
        console.log("User: ", user);

        // If no error and we have user data, return it
        if (!user || !checkedPassword) {
          console.log("User not found 007");
        //   return user;
        }
        // Return null if user data could not be retrieved
        else if (user && checkedPassword) {
          console.log("User found 007");
          return user
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as any,
});
