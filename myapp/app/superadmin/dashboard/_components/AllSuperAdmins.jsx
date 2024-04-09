"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { SuperadminContext } from "../../_context/Superadmincontext";
import { fetchSuperadmin, fetchSuperadmins, retriveName, retriveNames } from "@/app/_utils/apiFeatures";
import { useContext, useEffect, useState } from "react";


const AllSuperAdmins = () => {
    const { state, name, address } = useContext(SuperadminContext);
    const [superAdmins, setSuperAdmins] = useState([]);
    const [ usernames , setUsernames ] = useState([]);
    useEffect(() => {
        const retriveSAs = async () => {
            try {
                const superAdmins = await fetchSuperadmins(state.contract, address);
                setSuperAdmins(superAdmins);
                const usernames = await retriveNames(state.contract , address);
                setUsernames(usernames);
                console.log(usernames);
                console.log(superAdmins);
            }
            catch(err) {
                console.log(err);
            } 
        }
        retriveSAs();
    }, [])

    return (
        <div>
            {/* <Input placeholder="Search by Institution name" className="w-full mb-4" />
             */}
            {/* search feature to be implemented */}
            <div className="flex justify-center flex-col gap-3 overflow-auto scrollbar">
                {
                    superAdmins.map((superAdmin , index) => {
                        return (
                            <Card key={index}>
                                <CardHeader className="flex">
                                    <CardTitle className="text-sm">{usernames[index]}</CardTitle>
                                    <CardDescription className="text-xs">Account Address : { superAdmin } </CardDescription>
                                </CardHeader>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllSuperAdmins;