import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin, jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("turf");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin(),
    jwt()
  ],

  session: {
    cookieCache :{
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 30
    }
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: "user",
            },
          };
        },
      },
    },
  },
});
