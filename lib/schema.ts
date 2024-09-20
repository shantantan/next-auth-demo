import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "メールアドレスを入力してください。" })
    .email({ message: "正しい形式のメールアドレスを入力してください。" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "パスワードを入力してください。" }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "ユーザーネームを入力してください。" })
      .max(12, { message: "文字数制限（12文字）を超えています。" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "メールアドレスを入力してください。" })
      .email({ message: "正しい形式のメールアドレスを入力してください。" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "パスワードを入力してください。" })
      .min(4, { message: "パスワードは最低4文字以上です。" })
      .max(8, { message: "パスワードは最大8文字までです。" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "確認用パスワードを入力してください。" })
      .max(8, { message: "確認用パスワードが長すぎます。" }),
  })
  .refine((values) => Boolean(values.password === values.confirmPassword), {
    message: "確認用パスワードが一致しません。",
    path: ["confirmPassword"],
  });
