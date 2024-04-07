
import "./globals.css";
import Header from "./_components/Header";
import MaxWidthWrapper from "./_components/MaxWidthWrapper";
import Footer from "./_components/Footer";

export const metadata = {
  title: "Medivault - Home",
  description: "Medivault - A Dapp for Health Record Management",
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
