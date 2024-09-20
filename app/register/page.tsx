import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RegisterForm } from "@/components/form/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="h-screen grid place-items-center">
      <ScrollArea className="w-[min(100%,384px)] border border-border rounded-md shadow-lg">
        <div className="max-h-[calc(100vh-2px)] pt-10 px-6">
          <h1 className="text-xl font-bold">ユーザー登録</h1>

          <p className="mt-6 text-sm text-right">
            ログインは
            <Link
              href="/login"
              className="mx-1 text-blue-600 font-medium underline hover:text-blue-800"
            >
              コチラのページ
            </Link>
            から
          </p>

          <div className="mt-6 pb-12">
            <RegisterForm />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RegisterPage;
