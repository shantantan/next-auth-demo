import prisma from "@/prisma/db";
import type { User } from "@prisma/client";

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(`Error fetching user by id: ${error}`);
    return null;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(`Error fetching user by email: ${error}`);
    return null;
  }
};
