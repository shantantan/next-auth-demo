import { auth } from "@/auth";
import prisma from "@/prisma/db";

export const getCurrentUserInfo = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const userId = Number(session.user.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        followedBy: true,
        following: true,
      },
    });

    return user;
  } catch (error) {
    console.error(`Error fetching current user info: ${error}`);

    return null;
  }
};

export const getUserInfo = async (id: string) => {
  const userId = Number(id);

  if (userId) {
    return null;
  }

  console.log(typeof userId);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.error(`Error fetching user info: ${error}`);

    return null;
  }
};
