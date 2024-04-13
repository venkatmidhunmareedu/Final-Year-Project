"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useContext, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { DoctorContext } from "../../_context/Doctorcontext"
import { addPatient, createRecord } from "@/app/_utils/apiFeatures"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  patient_metamask: z.string().min(42, {
    message: "Metamask address must be at least 42 characters.",
  }),
  record_title: z.string().min(5, {
    message: "Record title must be at least 1 characters.",
  }),
  record_description: z.string().min(10, {
    message: "Record description must be at least 10 characters.",
  }),
  record_data: z.string().min(10, {
    message: "Record data must be at least 10 characters.",
  })
})

// fields 
// name
// age 
// gender
// mm_address
// contact 
// institution_addr

export function CreateRecord(props) {
  const { state, address, name, institution } = useContext(DoctorContext);
  // ...
  const { toast } = useToast();
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient_metamask: "",
      record_title: "",
      record_description: "",
      record_data: "",
    },
  })

  const  onSubmit = async (values) => {
    console.log(values);
    const check = await createRecord(state.contract, address, values.patient_metamask, values.record_title, values.record_description, values.record_data);
    if(check) {
      toast({
        title: "Info",
        description: "Record added successfully",
      })
    }
    else {
      toast({
        title: "Error",
        description: "Record not added. Problem with the Network",
      })
    }
    // console.log("Hit")
    // const check = addPatient(state.contract, address, values.name, values.age, values.gender, values.metamask_addr, values.contact, institution);
    // if (check) {
    //   toast({
    //     title: "Info",
    //     description: "Patient added successfully",
    //   })
    //   setTimeout(() => {
    //       push("/doctor/viewpatient/" + values.metamask_addr)
    //   },2000)
    // }
    // else {
    //   toast({
    //     title: "Error",
    //     description: "Patient not added. Problem with the Network",
    //   })
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="patient_metamask"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Meta Mask Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter Patient's metamask address" className="w-full" {...field} />
              </FormControl>
              <FormDescription>
                Ask your Patient for meta mask address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="record_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Record Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter record title" className="w-full" {...field} />
              </FormControl>
              <FormDescription>
                (eg. Diabetes, Blood Pressure, etc)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="record_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Record Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter record description" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="record_data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Record Data</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter record data" className="w-full h-[200px]"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" >Create</Button>
      </form>
    </Form>
  )
}
