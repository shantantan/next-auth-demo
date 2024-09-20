import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/form/SignOutButton";

const Home = async () => {
  const session = await auth();

  return (
    <main className="px-6">
      <div className="mx-auto max-w-3xl pt-24">
        <div>
          {session ? (
            <>
              <p>
                <span className="font-bold">{session.user.name}</span>
                としてログインしています
              </p>
              <SignOutButton className="mt-6" />
            </>
          ) : (
            <p>
              <Link
                href="/login"
                className="mr-1 text-sky-500 hover:text-sky-600 hover:underline"
              >
                ログイン
              </Link>
              していません
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
