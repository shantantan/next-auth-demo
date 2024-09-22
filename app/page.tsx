import Link from "next/link";
import { getCurrentUserInfo } from "@/db/user";
import { SignOutButton } from "@/components/SignOutButton";

interface UserInfoProps {
  id: number;
  name: string;
  email: string;
  followedBy: {
    followerId: number;
    followingId: number;
    craatedAt: Date;
  }[];
  following: {
    followerId: number;
    followingId: number;
    craatedAt: Date;
  }[];
}

const UserInfo = ({ user }: { user: UserInfoProps | null }) => {
  if (!user) {
    return (
      <p className="p-6 border border-border rounded-md text-sm">
        ユーザー情報の取得に失敗しました。
      </p>
    );
  }

  const userInfo = JSON.stringify(user, null, 2);

  return (
    <pre className="p-4 bg-primary rounded-md text-primary-foreground">
      {userInfo}
      <SignOutButton className="block mt-4" />
    </pre>
  );
};

const Home = async () => {
  const user = await getCurrentUserInfo();

  return (
    <main className="mx-auto max-w-3xl px-6">
      <div className="py-24">
        <UserInfo user={user} />
      </div>
    </main>
  );
};

export default Home;
