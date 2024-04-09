"use client";
import MaxWidthWrapper from "@/app/_components/MaxWidthWrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountDetails } from "./_components/AccountDetails"
import { AddAdmin } from "./_components/AddAdmin"
import { DeleteAdmin } from "./_components/DeleteAdmin"
import AllAdmins from "./_components/AllAdmins"
import AllSuperAdmins from "./_components/AllSuperAdmins"
import { SuperadminContext } from "../_context/Superadmincontext"
import { useContext } from "react"
import {AddSuperAdmin} from "./_components/AddSuperAdmin";



const page = () => {

  const { state, name, address } = useContext(SuperadminContext);
  return (
    <div className="h-[70vh] flex m-5 p-5 bg-slate-100 rounded-lg flex-col">
      <div className="flex flex-col">
        <div className="text-gray-600">
          Welcome Super Admin - <b>{ name }</b>
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
              <TabsTrigger value="add">Add Admin</TabsTrigger>
              <TabsTrigger value="delete">Delete Admin</TabsTrigger>
              <TabsTrigger value="admins">All Admins</TabsTrigger>
              <TabsTrigger value="superadmins">All Super Admins</TabsTrigger>
              <TabsTrigger value="addadmin">Add Super Admin</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex justify-start w-[60vw] h-[40vh] my-4 px-2 overflow-auto scrollbar">
              <TabsContent value="account">
                <AccountDetails name={name} />
              </TabsContent>
              <TabsContent value="add" className="">
                <AddAdmin />
              </TabsContent>
              <TabsContent value="delete">
                <DeleteAdmin />
              </TabsContent>
              <TabsContent value="admins">
                <AllAdmins />
              </TabsContent>
              <TabsContent value="superadmins">
                <AllSuperAdmins />
              </TabsContent>
              <TabsContent value="addadmin">
                <AddSuperAdmin />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default page