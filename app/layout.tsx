import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from "@vercel/speed-insights/next";
import 'easymde/dist/easymde.min.css';
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: [
     "200", "300", "400", "500", "600", "700", "800" // All weights
  ],
  variable: "--font-manrope", // Custom CSS variable name
});

export const metadata: Metadata = {
  title: "Campus board",
  description: "Get all your campus news in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={manrope.variable}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
          }}
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
