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
import { setterFunction } from "@/app/_utils/apiFeatures";


const AllSuperAdmins = () => {
    return (
        <div>
            {/* <Input placeholder="Search by Institution name" className="w-full mb-4" />
             */}
            {/* search feature to be implemented */}
            <div className="flex justify-center flex-col gap-3 overflow-auto scrollbar">
                <Card >
                    <CardHeader className="flex">
                        <CardTitle className="text-sm">Username</CardTitle>
                        <CardDescription className="text-xs">Account Address : 0xfd17Ab831C8a6ad212167036123DC6f7b8Fe818a</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default AllSuperAdmins;