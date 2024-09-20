import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-jp";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";

const title = "Next Auth Demo";
const description = "";
export const metadata: Metadata = {
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  description,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja">
      <body>
        <div className="px-6">{children}</div>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
