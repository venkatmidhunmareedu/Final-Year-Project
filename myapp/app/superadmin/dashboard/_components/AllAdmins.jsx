"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";

import { SuperadminContext } from "../../_context/Superadmincontext";


const AllAdmins = () => {
    return (
        <div>
            {/* <Input placeholder="Search by Institution name" className="w-full mb-4" />
             */}
            {/* search feature to be implemented */}
            <div className="flex justify-center flex-col gap-3 overflow-auto scrollbar">
                <Card >
                    <CardHeader className="flex">
                        <CardTitle className="text-sm">Institution name</CardTitle>
                        <CardDescription className="text-xs">Account Address : 0xfd17Ab831C8a6ad212167036123DC6f7b8Fe818a</CardDescription>
                        <CardDescription className="text-xs w-full">
                            Institution Address : Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card >
                    <CardHeader className="flex">
                        <CardTitle className="text-sm">Institution name</CardTitle>
                        <CardDescription className="text-xs">0xfd17Ab831C8a6ad212167036123DC6f7b8Fe818a</CardDescription>
                        <CardDescription className="text-xs w-full">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, perspiciatis architecto! Harum vero officia error exercitationem quam, ex dicta dolorum hic nisi facilis assumenda repellendus quas ad, aliquid consectetur cumque.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card >
                    <CardHeader className="flex">
                        <CardTitle className="text-sm">Institution name</CardTitle>
                        <CardDescription className="text-xs">0xfd17Ab831C8a6ad212167036123DC6f7b8Fe818a</CardDescription>
                        <CardDescription className="text-xs w-full">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, perspiciatis architecto! Harum vero officia error exercitationem quam, ex dicta dolorum hic nisi facilis assumenda repellendus quas ad, aliquid consectetur cumque.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default AllAdmins