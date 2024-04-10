"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


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
import { AdminContext } from "../../_context/Admincontext"
import { addDoctor } from "@/app/_utils/apiFeatures"
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
  metamask_addr: z.string().min(42, {
    message: "Metamask address must be at least 42 characters.",
  }),
  name: z.string().min(5, {
    message: "Metamask address must be at least 5 characters.",
  }),
  specialization: z.string().min(5, {
    message: "Specialization must be at least 5 characters.",
  }),
})


const AddDoctor = () => {
  const { state, address, name } = useContext(AdminContext);
  // ...
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metamask_addr: "",
      name: "",
      specialization: "",
    },
  })

  function onSubmit(values) {
    console.log(values);
    const check = addDoctor(state.contract, address, values.name, values.specialization, values.metamask_addr);
    if (check) {
      toast({
        title: "Info",
        description: "Doctor added successfully",
      })
      // setTimeout(() => {
      //     window.location.reload();
      // },1000)
    }
    else {
      toast({
        title: "Error",
        description: "Doctor not added. Problem with the Network",
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name of the Doctor" className="w-full" {...field} />
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
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <FormControl>
                <Input placeholder="Specialization of the Doctor" className="w-full" {...field} />
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

export default AddDoctor