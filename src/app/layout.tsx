import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <main className="container mx-auto">{children}</main>

        <Toaster richColors position="top-center" closeButton />
      </body>
    </html>
  );
}
