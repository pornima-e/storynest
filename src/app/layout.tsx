import type { Metadata } from "next";
import { Geist, Geist_Mono, Birthstone, Lavishly_Yours } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Font config
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const birthstone = Birthstone({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-birthstone",
});
const lavishlyYours = Lavishly_Yours({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lavishly-yours",
});

export const metadata: Metadata = {
  title: "Story Nest",
  description: "A place to find and review stories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/story.png" type="image/png" />
      </head>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${birthstone.variable}
          ${lavishlyYours.variable}
          antialiased
        `}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
