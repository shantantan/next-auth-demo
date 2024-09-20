"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { registerSchema } from "@/lib/schema";
import { signUpAction } from "@/lib/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "@/hooks/useFormStatus";

export const RegisterForm = () => {
  const { isPending, errorMessage, startSubmit, setError, finishSubmit } =
    useFormStatus();
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const toast = useToast();

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    startSubmit();

    try {
      const response = await signUpAction(values);

      if (response.success) {
        router.push("/login");
        router.refresh();
      } else {
        setError(response.error.message);
      }
    } catch (error) {
      console.log(error);
      setError("予期せぬエラーが発生しました。");
    } finally {
      finishSubmit();
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="mb-6 p-4 border border-red-600 bg-red-100 text-red-600 text-sm font-medium">
          {errorMessage}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ユーザーネーム</FormLabel>
                <FormControl>
                  <Input
                    type="name"
                    placeholder="ユーザーネームを入力してください"
                    {...field}
                    className="font-base"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="メールアドレスを入力してください"
                    {...field}
                    className="font-base"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="パスワードを入力してください"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>確認用パスワード</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="確認用パスワードを入力してください"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-10 w-full" disabled={isPending}>
            登録する
          </Button>
        </form>
      </Form>
    </>
  );
};
