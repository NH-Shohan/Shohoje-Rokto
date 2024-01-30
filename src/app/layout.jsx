import Navbar from "@/components/ui/navbar";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Shohoje Rokto",
  description: "A website for blood donor and blood needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white ${poppins.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
