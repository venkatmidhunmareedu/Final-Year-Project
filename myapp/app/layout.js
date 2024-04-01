import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import MaxWidthWrapper from "./_components/MaxWidthWrapper";
import Footer from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Block chain based Health record management system",
  description: "BHRMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-[poppins]">
      <body className="">
        <Header />
        <MaxWidthWrapper >
          {children}
        </MaxWidthWrapper>
        <Footer />
      </body>
    </html>
  );
}
