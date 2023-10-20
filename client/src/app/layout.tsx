import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });
import RootLayout from "@/layouts/RootLayout";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer />
      </body>
    </html>
  );
}
