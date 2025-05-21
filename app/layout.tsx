import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import MouseFollowAnimation from "./components/MouseFollowAnimation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Research Project | Interactive Research Website",
  description: "Discover our innovative research project, access documents, presentations, meet our team, and learn about our technologies and methodologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageTransition>
          {children}
        </PageTransition>
        <MouseFollowAnimation 
          color="rgba(59, 130, 246, 0.2)"
          border="1px solid rgba(59, 130, 246, 0.6)"
          size={40}
          showOnlyOnLinks={true}
          disableOnMobile={true}
        />
      </body>
    </html>
  );
}
