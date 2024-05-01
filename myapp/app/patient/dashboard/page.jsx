"use client";
import React, { useContext } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientContext } from '../_context/Patientcontext';
import { AccountDetails } from './_components/AccountDetails';
import AllRecords from './_components/AllRecords';
import NomineeRecords from './_components/NomineeRecords';
import { AddNominee } from './_components/AddNominee';
import YourNominees from './_components/YourNominees';

const page = () => {

    const { state, name, address } = useContext(PatientContext);
    console.log(name);
    return (
        <div className="h-[70vh] flex m-5 p-5 bg-slate-100 rounded-lg flex-col">
            <div className="flex flex-col">
                <div className="text-gray-600">
                    Welcome patient - <b>{name && name["name"]}</b>
                </div>
                <div className="font-bold text-xl">
                    Your Dashboard
                </div>
            </div>
            <div className="mt-5 flex justify-center items-center">
                <Tabs defaultValue="account" className="w-full flex-col justify-center items-center">
                    <div className="flex justify-center items-center">
                        <TabsList className="bg-slate-200 w-[80vw] space-x-10 rounded-lg">
                            <TabsTrigger value="account" >Account Details</TabsTrigger>
                            <TabsTrigger value="allrecords">All Records</TabsTrigger>
                            {/* <TabsTrigger value="nominee">Nominee Records</TabsTrigger>
                            <TabsTrigger value="addnominee">Add Nominee</TabsTrigger>
                            <TabsTrigger value="nominees">Your Nominees</TabsTrigger> */}
                            {/* removing nominees feature */}
                        </TabsList>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex justify-start w-[60vw] h-[40vh] my-4 px-2 overflow-auto scrollbar">
                            <TabsContent value="account">
                                <AccountDetails />
                            </TabsContent>
                            <TabsContent value="allrecords" className="">
                                <AllRecords />
                            </TabsContent>
                            <TabsContent value="nominees">
                                <YourNominees />
                            </TabsContent>
                            <TabsContent value="nominee">
                                <NomineeRecords />
                            </TabsContent>
                            <TabsContent value="addnominee">
                                <AddNominee />
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default page