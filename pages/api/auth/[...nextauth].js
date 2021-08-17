import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import { session } from "next-auth/client";

const prisma = new PrismaClient();

const options = {
  providers: [
    // OAuth authentication providers...

    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID2,
      clientSecret: process.env.GITHUB_CLIENT_SECRET2,
    }),
    Providers.Twitter({
      clientId: process.env.twitterapi2,
      clientSecret: process.env.twittersecre2,
    }),
    // Providers.Auth0({
    //   clientId: process.env.AUTH0_CLIENTID,
    //   clientSecret: process.env.AUTH0_CLIENTSECRET,
    //   domain: process.env.AUTH0_DOMAIN,
    // }),
  ],
  // Optional SQL or MongoDB database to persist users
  // debug: process.env.NODE_ENV === "developmant",
  adapter: Adapters.Prisma.Adapter({
    prisma,
    modelMapping: {
      User: "user",
      Account: "account",
      Session: "session",
      VerificationRequest: "verificationRequest",
    },
  }),
  // database: process.env.DATABASE_URL,
  secret: process.env.AUTH_SECRET,
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },

  callbacks: {
    // signIn: async (user, account, profile) => {
    //   return Promise.resolve(true, user, account, profile);
    // },
    async session(session, token) {
      session.accessToken = token.accessToken;
      session.token = token;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
        token.user = user;

        token.profile = profile;
        token.isNewUser = isNewUser;
      }
      return token;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
