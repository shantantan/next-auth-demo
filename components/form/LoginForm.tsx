"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { loginSchema } from "@/lib/schema";
import { signInAction } from "@/lib/actions/auth";
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

export const LoginForm = () => {
  const { isPending, errorMessage, startSubmit, setError, finishSubmit } =
    useFormStatus();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const toast = useToast();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    startSubmit();

    try {
      const response = await signInAction(values);

      // if (response.success) {
      //   router.push("/");
      //   router.refresh();
      // } else {
      //   setError(response.error.message);
      // }

      if (response && !response.success) {
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
            name="email"
            render={({ field }) => (
              <FormItem>
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

          <Button type="submit" className="mt-10 w-full" disabled={isPending}>
            ログイン
          </Button>
        </form>
      </Form>
    </>
  );
};
