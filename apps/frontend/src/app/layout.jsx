import Navbar from "@/app/(Navbar)/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  manifest: "/manifest.json",
  title: "Shohoje Rokto",
  description: "A website for donors to donate blood or get blood",
};

export const viewport = {
  themeColor: "#F04242",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${roboto.className} bg-[#fff5f5] dark:bg-background`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Navbar />
            {children}
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
