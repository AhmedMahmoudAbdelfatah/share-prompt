import NextAuth from 'next-auth';
import Auth0Provider from "next-auth/providers/auth0";

import User from '@models/user';
import { connectToDB } from '@utils/database';


const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
      issuer: process.env.AUTH0_ISSUER
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session.user) throw Error("User Not Found");
      
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      
      return session;
    },
    async signIn({profile }) {
      try {
        if (!profile) throw Error("No User Found");

        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture ?? profile.image ?? '',
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false
      }
    },
  },
});

export { handler as GET, handler as POST }