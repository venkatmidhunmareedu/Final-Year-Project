"use client"
import Brand from "./Brand"
import { IoMenu } from "react-icons/io5";
import MaxWidthWrapper from "./MaxWidthWrapper"
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";

const Header = () => {
    const [opened, setOpened] = useState(false)
    return (
        <div className="p-5 border-b bg-gray-100">
            <MaxWidthWrapper>
                <div className="flex justify-between items-center ">
                    <Brand />
                    <div className="md:flex hidden items-center">
                        <ul className="md:flex justify-between items-center">
                            <li>
                                {/* <a href="/auth">Dashboard</a> */}
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center space-x-4 md:hidden">
                        <button className="" onClick={() => setOpened(prev => !prev)}>
                            {
                                opened ? <IoClose className="text-3xl" /> : <IoMenu className="text-3xl" />
                            }
                        </button>
                    </div>
                    {/* Sidebar mobile menu */}
                    <div className={cn("rounded-e-xl translate-x-[-100%] backdrop-blur-sm bg-opacity-50 fixed md:hidden bg-gray-300 left-0 top-0 z-10 h-screen w-1/2  flex justify-center items-center flex-col gap-5 transition-transform duration-300" , {"translate-x-0" : opened})}>
                        {/* // (opened ? "translate-x-0" : "translate-x-full")}"translate-x-[-100%] fixed md:hidden bg-blue-700 left-0 top-0 z-10 h-screen w-1/2  flex justify-center items-center flex-col gap-5 transition-transform duration-300" */}
                        <div className="relative w-full">
                            <ul className="flex flex-col gap-5 font-bold">
                                <Link href={"#"} className="w-full">
                                    <li className="py-2 w-full text-center hover:bg-white">
                                        Dashboard
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default Header