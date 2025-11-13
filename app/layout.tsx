import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mythic Nexus — Character Mastery Hub",
  description:
    "Explore game characters with rich lore, abilities, fan art, and strategy guides to master your gameplay."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-night text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
