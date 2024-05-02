// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

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
    }),
    (CredentialsProvider as any).default({
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
      async authorize(credentials: any, req: any) {
        let user = null;

        console.log("Credentials: ", credentials)
        // console.log("Request: ", req)

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        //   const res = await fetch("/api/auth/signin", {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        //     headers: { "Content-Type": "application/json" }
        //   })
        //   const user = await res.json()
        const Email = credentials?.email
        console.log("Email: ", Email)

        user = await prisma.user.findFirst({
          where: { email: Email },
        });
        console.log("User: ", user);

        // If no error and we have user data, return it
        if (!user) {
          console.log("User not found 007");
        //   return user;
        }
        // Return null if user data could not be retrieved
        else if (user){
          console.log("User found 007");
          return user
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as any,
});
