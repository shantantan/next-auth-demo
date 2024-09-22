"use client";

import { signOutAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const SignOutButton = ({ className }: Props) => {
  return (
    <button
      onClick={() => signOutAction()}
      type="button"
      className={cn("hover:underline", className)}
    >
      signOut
    </button>
  );
};
