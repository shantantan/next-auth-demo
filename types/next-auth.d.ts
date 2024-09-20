import type { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UsreRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
