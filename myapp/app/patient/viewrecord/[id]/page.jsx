"use client";
import React, { useContext } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientContext } from '../../_context/Patientcontext';
import RecordDetails from './_components/RecordDetails';
import { GiveAccess } from './_components/GiveAccess';
import AccessControl from './_components/AccessControl';
import { RevokeAccess } from './_components/RevokeAccess';

const page = ({ params }) => {

  const { state, name, address } = useContext(PatientContext);
  console.log(name);
  return (
    <div className="h-[70vh] flex m-5 p-5 bg-slate-100 rounded-lg flex-col">
      <div className="flex flex-col">
        <div className="font-bold text-xl">
          Medivault Record Viewer
        </div>
        <div className="text-gray-600 ">
          Record Hash - {params.id}
        </div>
      </div>
      <div className="mt-5 flex justify-center items-center">
        <Tabs defaultValue="details" className="w-full flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <TabsList className="bg-slate-200 w-[80vw] space-x-10 rounded-lg">
              <TabsTrigger value="details" >Record Details</TabsTrigger>
              <TabsTrigger value="give">Give Access</TabsTrigger>
              <TabsTrigger value="revoke">Revoke Access</TabsTrigger>
              <TabsTrigger value="access">Record Control</TabsTrigger>
              {/* <TabsTrigger value="nominees">Your Nominees</TabsTrigger> */}
            </TabsList>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex justify-start w-[70vw] h-[40vh] my-4 px-2 overflow-auto scrollbar">
              <TabsContent value="details">
                <RecordDetails id={params.id} />
              </TabsContent>
              <TabsContent value="give">
                <GiveAccess id={params.id} />
              </TabsContent>
              <TabsContent value="revoke">
                <RevokeAccess id={params.id} />
              </TabsContent>
              <TabsContent value="access" className="">
                <AccessControl id={params.id} />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default page