import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/components/convex-client.provider";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import ReduxProvider from "@/providers/redux-provider";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="emerald">
      <body className={inter.className}>
        <ReduxProvider>
          <ConvexClientProvider>
            <Toaster richColors />
            <NuqsAdapter>{children}</NuqsAdapter>
          </ConvexClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
