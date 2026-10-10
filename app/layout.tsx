import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "aiqr — Small code. Human connections.",
  description:
    "Turn a QR scan into honest customer reviews and meaningful feedback. Manage your business QR experience, customer relationships, and analytics in one workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
