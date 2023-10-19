import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import RootLayout from "@/layouts/RootLayout";

export const metadata: Metadata = {
  title: "CloudMingle",
  description: "Store and manage your files on cloud",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
        <div id="modal"></div>
      </body>
    </html>
  );
}
