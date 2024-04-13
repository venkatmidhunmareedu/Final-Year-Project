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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useContext, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { DoctorContext } from "../../_context/Doctorcontext"
import { addPatient } from "@/app/_utils/apiFeatures"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  metamask_addr: z.string().min(42, {
    message: "Metamask address must be at least 42 characters.",
  }),
  name: z.string().min(5, {
    message: "Metamask address must be at least 5 characters.",
  }),
  age: z.string().min(1, {
    message: "Age must be at least 1 characters.",
  }),
  gender: z.string().min(1, {
    message: "Gender must be at least 1 characters.",
  }),
  contact: z.string().min(10, {
    message: "Contact must be at least 1 characters.",
  })
})

// fields 
// name
// age 
// gender
// mm_address
// contact 
// institution_addr

export function AddPatient(props) {
  const { state, address, name, institution } = useContext(DoctorContext);
  // ...
  const { toast } = useToast();
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metamask_addr: "",
      name: "",
      age: "",
      gender: "",
      contact: "",
    },
  })

  function onSubmit(values) {
    console.log(values);
    console.log("Hit")
    const check = addPatient(state.contract, address, values.name, values.age, values.gender, values.metamask_addr, values.contact, institution);
    if (check) {
      toast({
        title: "Info",
        description: "Patient added successfully",
      })
      // setTimeout(() => {
      //     push("/doctor/viewpatient/" + values.metamask_addr)
      // },2000)
    }
    else {
      toast({
        title: "Error",
        description: "Patient not added. Problem with the Network",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Patient's name" className="w-full" {...field} />
              </FormControl>
              {/* <FormDescription>
                          Enter the name of the institution
                      </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Age</FormLabel>
              <FormControl>
                <Input placeholder="Enter Patient's age" className="w-full" {...field} />
              </FormControl>
              {/* <FormDescription>
                          Enter the name of the institution
                      </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Patient's gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Contact</FormLabel>
              <FormControl>
                <Input placeholder="Enter Patient's contact" className="w-full" {...field} />
              </FormControl>
              {/* <FormDescription>
                          Enter the name of the institution
                      </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metamask_addr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MetaMask Address</FormLabel>
              <FormControl>
                <Input placeholder="Meta Mask Address here" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" >Add</Button>
      </form>
    </Form>
  )
}
