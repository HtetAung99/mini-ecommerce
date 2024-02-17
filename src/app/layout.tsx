import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./context/auth-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { SocketProvider } from "./context/socket-provider";
import { StoreProvider } from "./context/store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dark Store",
  description: "This is Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="" lang="en">
      <body className={cn(inter.className)}>
        <AuthProvider>
          <StoreProvider>
            <SocketProvider>{children}</SocketProvider>
          </StoreProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
