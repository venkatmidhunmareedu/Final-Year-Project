"use client";
import React, { useContext, useEffect, useState } from 'react'
import { checkReadaccess, fetchPatient, fetchPatientRecord } from '@/app/_utils/apiFeatures';
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
import { record, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

const page = ({ params }) => {
  const { toast } = useToast();
  const { push } = useRouter();
  const { state, name, address } = useContext(DoctorContext);
  const [record, setRecord] = useState(null);
  console.log(state);

  const fetchRecordData = async (id) => {
    const checkRead = await checkReadaccess(state.contract, address, address, params.id);
    if (!checkRead) {
      toast({
        title: "Error",
        description: 'You are not allowed to view this record. Redirecting to Dashboard',
      });
      setTimeout(() => {
        push('/doctor/dashboard');
      }, 2000);
      return;
    }
    console.log(id);
    const record = await fetchPatientRecord(state.contract, address, id);
    if (record) {
      console.log(record);
      setRecord(record);
      toast({
        title: "Info",
        description: 'Record Fetched Successfully',
      })
    }
    else {
      toast({
        title: "Error",
        description: 'Error Fetching Record. Network Issue or check your record hash',
      })
    }

  }
  // async fetcher function
  // const fetchPatientData = async (id) => {
  //   console.log(id);
  //   try {
  //     var data = {};
  //     if (state.contract) {
  //       var data = await fetchPatient(state.contract, address, id)
  //     }
  //     console.log(data);
  //     setPatient(data);
  //     toast({
  //       title: "Info",
  //       description: 'Patient Fetched Successfully',
  //     })
  //   }
  //   catch (err) {
  //     console.log(err);
  //     toast({
  //       title: "Error",
  //       description: 'Error Fetching Patient',
  //     })
  //   }
  // }
  useEffect(() => {
    if (!state.contract) {
      return
    }
    fetchRecordData(params.id);
  }, [state])

  const formSchema = z.object({
    patient: z.string().min(42, {
      message: "Metamask address must be at least 42 characters.",
    }),
    record_title: z.string().min(5, {
      message: "Metamask address must be at least 42 characters.",
    }),
    record_data: z.string().min(5, {
      message: "Metamask address must be at least 42 characters.",
    }),
    record_desc: z.string().min(5, {
      message: "Metamask address must be at least 42 characters.",
    }),
  })
  function onSubmit(values) {
    console.log(values);
  }

  // address doctor;
  // address patient;
  // address[] read_allowed_doctors;
  // address[] write_allowed_doctors;
  // string record_title;
  // string record_desc;
  // string record_data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient: "",
      record_title: "",
      record_desc: "",
      record_data: "",
    },
  })
  return (
    <div className='bg-gray-100 rounded flex flex-col justify-start items-start h-[70vh] w-full my-3 scrollbar overflow-auto p-4'>
      <div className='font-bold text-lg my-3'>
        <p>
          Medivault Record Viewer
        </p>
        <p className='text-sm'>
          Viewing Record : {params.id}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="patient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Address</FormLabel>
                <FormControl>
                  <Input placeholder={record ? record.patient : ""} className="w-full" {...field} disabled />
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
            name="record_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Record Title</FormLabel>
                <FormControl>
                  <Input placeholder={record ? record.record_title : ""} className="w-full" {...field} disabled />
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
            name="record_desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Record Description</FormLabel>
                <FormControl>
                  <Input placeholder={record ? record.record_desc : ""} className="w-full" {...field} disabled />
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
            name="record_data"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Record Data</FormLabel>
                <FormControl>
                  <Textarea placeholder={record ? record.record_data : ""} className="w-full" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {/* <Button onClick={() => { push("/doctor/dashboard") }} className="mt-5" >Back</Button> */}
    </div>
  )
}

export default page