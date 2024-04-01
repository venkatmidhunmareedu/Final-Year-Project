import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./_components/MaxWidthWrapper";

export default function Home() {
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <MaxWidthWrapper>
        <div className="mx-1">
          <p className="text-center">
            Welcome to <b>MediVault</b>. Please make sure you have MetaMask enabled in your browser.
          </p>
        </div>
        <div className="flex justify-center mt-5">
          <Link href={"/auth"} className="bg-black text-white px-5 py-2 rounded hover:bg-white border-2 border-black hover:text-black ">
            Login
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
