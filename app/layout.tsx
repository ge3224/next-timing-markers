import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TimingProvider } from "./lib/context/timing_context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timer Markers",
  description:
    "A simple web app to conveniently calculate time markers for parts of a presentation, discussion, lecture, etc.",
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
        <header>header here</header>
        <TimingProvider>{children}</TimingProvider>
        <footer>footer here</footer>
      </body>
    </html>
  );
}
