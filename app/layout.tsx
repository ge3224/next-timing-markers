import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TimingProvider } from "./lib/context/timing_context";
import IconGithub from "./lib/ui/icons/github";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PacePoints",
  description:
    "A simple web app to calculate time markers for parts of a presentation, discussion, lecture, etc.",
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
        <header className="mx-auto flex w-full max-w-screen-sm flex-col items-center justify-center text-center">
          <h1 className="font-extrabold text-4xl">PacePoints</h1>
          <p>
            A straightforward tool that helps you plan and track time segments
            during speaking&nbsp;engagements.
          </p>
        </header>
        <TimingProvider>{children}</TimingProvider>
        <footer className="flex items-center justify-center gap-2 text-sm text-neutral-500">
          <span>PacePoints</span>
          <span>&copy; {new Date().getFullYear()}</span>
          <span>
            <a
              href="https://github.com/ge3224/next-timing-markers"
              target="_blank"
            >
              <IconGithub />
            </a>
          </span>
        </footer>
      </body>
    </html>
  );
}
