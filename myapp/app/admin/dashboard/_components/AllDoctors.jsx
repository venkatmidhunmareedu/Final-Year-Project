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

import { AdminContext } from "../../_context/Admincontext";
import { useContext, useEffect, useState } from "react";
import { fetchDoctors } from "@/app/_utils/apiFeatures";


const AllDoctors = () => {
  const { state, address } = useContext(AdminContext);
  const [doctors, setDoctors] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const retriveDoctors = async () => {
      try {
        const { doctors, doctorAddress } = await fetchDoctors(state.contract, address);
        setDoctors(doctors);
        setAddresses(doctorAddress);
        console.log("doctos", doctors);
        console.log("adddress", doctorAddress);
      }
      catch (err) {
        console.log(err);
      }
    }
    retriveDoctors();
  }, [])
  return (
    <div>
      {/* <Input placeholder="Search by Institution name" className="w-full mb-4" />
             */}
      {/* search feature to be implemented */}
      <div className="flex justify-center flex-col gap-3 overflow-auto scrollbar">
        {
          doctors && doctors.length > 0 ?
            doctors.map((doctor, index) => {
              return (
                <Card key={index}>
                  <CardHeader className="flex">
                    <CardTitle className="text-sm">Doctor name : <b>{doctor[0]}</b></CardTitle>
                    <CardTitle className="text-sm">Doctor Specialization : <b>{doctor[1]}</b></CardTitle>
                    <CardDescription className="text-xs">Account Address : {addresses[index]}</CardDescription>
                    <CardDescription className="text-xs">Institution Address : {doctor[2]}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })
            :
            <p>No Doctors</p>
        }
      </div>
    </div>
  )
}

export default AllDoctors