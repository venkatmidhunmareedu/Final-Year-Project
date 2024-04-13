"use client";
import React, { useContext, useEffect, useState } from 'react'
import { fetchPatient } from '@/app/_utils/apiFeatures';
import { DoctorContext } from '../../_context/Doctorcontext';
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams, useRouter } from 'next/navigation';


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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const page = ({ params }) => {
  const { toast } = useToast();
  const { push } = useRouter();
  const [patient, setPatient] = useState({})
  const { state, name, address } = useContext(DoctorContext);
  console.log(state);
  // async fetcher function
  const fetchPatientData = async (id) => {
    console.log(id);
    try {
      var data = {};
      if (state.contract) {
        var data = await fetchPatient(state.contract, address, id)
      }
      console.log(data);
      setPatient(data);
      toast({
        title: "Info",
        description: 'Patient Fetched Successfully',
      })
    }
    catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: 'Error Fetching Patient',
      })
    }
  }
  useEffect(() => {
    if (!state.contract) {
      return
    }
    fetchPatientData(params.id);
  }, [state])

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
  function onSubmit(values) {
    console.log(values);
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metamask_addr: params.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      contact: patient.contact,
    },
  })
  return (
    <div className='bg-gray-100 rounded flex flex-col justify-start items-start h-[70vh] w-full my-3 scrollbar overflow-auto p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient name</FormLabel>
                <FormControl>
                  <Input placeholder={patient.name} className="w-full" {...field} disabled />
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
                  <Input placeholder={patient.age} className="w-full" {...field} disabled />
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
                <Select onValueChange={field.onChange} defaultValue={patient.gender} disabled>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={patient.gender} />
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
                  <Input placeholder={patient.contact} className="w-full" {...field} disabled />
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
                  <Input placeholder="" className="w-full" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Created Under Institution</FormLabel>
                <FormControl>
                  <Input placeholder={patient.institution
                  } className="w-full" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Created By Doctor</FormLabel>
                <FormControl>
                  <Input placeholder={patient.addr} className="w-full" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



        </form>
      </Form>
      <Button onClick={() => { push("/doctor/dashboard") }} className="mt-5" >Back</Button>
    </div>
  )
}

export default page