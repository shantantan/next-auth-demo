"use server";

import prisma from "@/prisma/db";
import { signIn as NextAuthSignIn, signOut } from "@/auth";
import type { z } from "zod";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "@/lib/schema";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import type { ServerActionsResponse } from "@/types";

export const signUpAction = async (
  values: z.infer<typeof registerSchema>,
): Promise<ServerActionsResponse> => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: {
        message: "不正な値が入力されました。",
      },
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUserCount = await prisma.user.count({
      where: { email: email },
    });

    if (existingUserCount > 0) {
      return {
        success: false,
        error: {
          message: "このメールアドレスは既に登録されています。",
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,

      message: "ユーザー登録が完了しました。",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: {
        message: "ユーザー登録に失敗しました。",
      },
    };
  }
};

export const signInAction = async (
  values: z.infer<typeof loginSchema>,
): Promise<ServerActionsResponse> => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: {
        message: "不正な値が入力されました。",
      },
    };
  }

  const { email, password } = validatedFields.data;

  try {
    // await NextAuthSignIn("credentials", {
    //   email,
    //   password,
    //   redirect: false,
    // });

    await NextAuthSignIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {
      success: true,
      message: "ログインに成功しました。",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: {
              message: "メールアドレスまたはパスワードが間違っています。",
            },
          };
        default:
          return {
            success: false,
            error: {
              message: "ログインに失敗しました。",
            },
          };
      }
    }

    throw error;
  }
};

export const signOutAction = async () => {
  return signOut({ redirectTo: "/login" });
};
