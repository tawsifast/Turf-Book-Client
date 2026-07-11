import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins"; // ⚡ ১. Admin প্লাগিন ইম্পোর্ট করুন

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("turf");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  
  // ⚡ ২. Admin প্লাগিনটি রেজিস্টার করুন
  plugins: [
    admin() 
  ],
  
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: "user", // ডিফল্ট রোল "user" সেট হবে
            },
          };
        },
      },
    },
  },
});