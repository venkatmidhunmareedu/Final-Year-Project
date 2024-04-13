"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DoctorContext } from "../_context/Doctorcontext";
import { useContext } from "react"
import { CreateRecord } from "./_components/CreateRecord";
import FetchRecord from "./_components/FetchRecord";
import { AddPatient } from "./_components/AddPatient";
import FetchPatient from "./_components/FetchPatient";



const page = () => {

  const { state, name, address } = useContext(DoctorContext);
  console.log(name);
  return (
    <div className="h-[70vh] flex m-5 p-5 bg-slate-100 rounded-lg flex-col">
      <div className="flex flex-col">
        <div className="text-gray-600">
          Welcome Doctor - <b>{name && name["name"]}</b>
        </div>
        <div>
          Specialization - <b>{name && name["specialization"]}</b>
        </div>
        <div className="font-bold text-xl">
          Your Dashboard
        </div>
      </div>
      <div className="mt-5 flex justify-center items-center">
        <Tabs defaultValue="add" className="w-full flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <TabsList className="bg-slate-200 w-[70vw] space-x-10 rounded-lg">
              <TabsTrigger value="add">Add Patient</TabsTrigger>
              <TabsTrigger value="create">Create Record</TabsTrigger>
              <TabsTrigger value="fetch">Fetch Record</TabsTrigger>
              <TabsTrigger value="fetchpatient">Fetch Patient</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex justify-start w-[60vw] h-[40vh] my-4 px-2 overflow-auto scrollbar">
              <TabsContent value="add" className="">
                {/* <AddAdmin /> */}
                <AddPatient />
              </TabsContent>
              <TabsContent value="create">
                {/* <AllAdmins /> */}
                <CreateRecord />
              </TabsContent>
              <TabsContent value="fetch" className="flex justify-center">
                {/* <AllSuperAdmins /> */}
                <FetchRecord />
              </TabsContent>
              <TabsContent value="fetchpatient">
                <FetchPatient />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default page