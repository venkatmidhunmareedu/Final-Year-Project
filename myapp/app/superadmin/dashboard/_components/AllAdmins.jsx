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
import { useContext, useEffect, useState } from "react";
import { fetchAdmins, retriveAdminAddresses } from "@/app/_utils/apiFeatures";


const AllAdmins = () => {
    const { state, address } = useContext(SuperadminContext);
    const [admins, setAdmins] = useState([]);
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        const retriveAdmins = async () => {
            try {
                const admins = await fetchAdmins(state.contract, address);
                const adminAddrs = await retriveAdminAddresses(state.contract, address);
                setAdmins(admins);
                setAddresses(adminAddrs);
                console.log("admins", admins);
                console.log("adminAddrs", adminAddrs);
            }
            catch (err) {
                console.log(err);
            }
        }
        retriveAdmins();
    }, [])
    return (
        <div>
            {/* <Input placeholder="Search by Institution name" className="w-full mb-4" />
             */}
            {/* search feature to be implemented */}
            <div className="flex justify-center flex-col gap-3 overflow-auto scrollbar">
                {
                    admins && admins.length > 0 ? 
                    admins.map((admin, index) => {
                        return (
                            <Card key={index}>
                                <CardHeader className="flex">
                                    <CardTitle className="text-sm">Institution name : <b>{admin.institution_name}</b></CardTitle>
                                    <CardDescription className="text-xs">Account Address : {addresses[index]}</CardDescription>
                                </CardHeader>
                            </Card>
                        )
                    })
                    : 
                    <p>No Admins</p>
                }
            </div>
        </div>
    )
}

export default AllAdmins