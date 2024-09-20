"use client";

import { signOutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const SignOutButton = ({ className }: Props) => {
  return (
    <Button
      onClick={() => signOutAction()}
      type="button"
      className={cn(className)}
    >
      <span className="pb-[.1em]">ログアウト</span>
    </Button>
  );
};
