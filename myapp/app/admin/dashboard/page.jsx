"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminContext } from "../_context/Admincontext";
import { useContext } from "react"
import AccountDetails from "./_components/AccountDetails";
import AddDoctor from "./_components/AddDoctor";
import DeleteDoctor from "./_components/DeleteDoctor";
import AllDoctors from "./_components/AllDoctors";



const page = () => {

    const { state, name, address } = useContext(AdminContext);
    console.log("state",state);
    console.log("address" , address);
    return (
        <div className="h-[70vh] flex m-5 p-5 bg-slate-100 rounded-lg flex-col">
            <div className="flex flex-col">
                <div className="text-gray-600">
                    Welcome Admin - <b>{name}</b>
                </div>
                <div className="font-bold text-xl">
                    Your Dashboard
                </div>
            </div>
            <div className="mt-5 flex justify-center items-center">
                <Tabs defaultValue="account" className="w-full flex-col justify-center items-center">
                    <div className="flex justify-center items-center">
                        <TabsList className="bg-slate-200 w-[70vw] space-x-10 rounded-lg">
                            <TabsTrigger value="account" >Account Details</TabsTrigger>
                            <TabsTrigger value="add">Add Doctor</TabsTrigger>
                            <TabsTrigger value="delete">Delete Doctor</TabsTrigger>
                            <TabsTrigger value="doctors">All Doctors</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex justify-start w-[60vw] h-[40vh] my-4 px-2 overflow-auto scrollbar">
                            <TabsContent value="account">
                                <AccountDetails />
                            </TabsContent>
                            <TabsContent value="add" className="">
                                <AddDoctor />
                            </TabsContent>
                            <TabsContent value="delete">
                                <DeleteDoctor />
                            </TabsContent>
                            <TabsContent value="doctors">
                                <AllDoctors />
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default page