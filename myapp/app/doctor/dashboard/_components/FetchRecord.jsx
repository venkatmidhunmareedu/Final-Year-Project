
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"



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
import { addPatient, checkReadaccess, checkRecord, checkWriteaccess } from "@/app/_utils/apiFeatures"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  recordhash: z.string().min(32, {
    message: "Metamask address must be at least 42 characters.",
  }),
})



const FetchRecord = () => {
  const { state, address } = useContext(DoctorContext);
  const { toast } = useToast();
  const { push } = useRouter();
  const [record_hash, setRecord_hash] = useState("");
  const [checkRead, setCheckRead] = useState(false);
  const [checkWrite, setCheckWrite] = useState(false);
  const [hidden, setHidden] = useState(true);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recordhash: "",
    },
  })

  const onSubmit = async (values) => {
    console.log(values);
    const check = await checkRecord(state.contract, address, values.recordhash);
    const readAccess = await checkReadaccess(state.contract, address, address, values.recordhash);
    const writeAccess = await checkWriteaccess(state.contract, address, address, values.recordhash);
    setCheckRead(readAccess);
    setCheckWrite(writeAccess);
    if (check) {
      setRecord_hash(values.recordhash);
      setHidden(false);
      toast({
        title: "Info",
        description: "Record found",
      })
    }
    else {
      toast({
        title: "Error",
        description: "Record not found. Problem with the Network or check your record hash",
      })
    }

    // console.log("Hit")
    // const check = addPatient(state.contract, address, values.name, values.age, values.gender, values.metamask_addr, values.contact, institution);
    // if (check) {
    //     toast({
    //         title: "Info",
    //         description: "Patient added successfully",
    //     })
    //     setTimeout(() => {
    //         push("/doctor/viewpatient/" + values.metamask_addr)
    //     }, 2000)
    // }
    // else {
    //     toast({
    //         title: "Error",
    //         description: "Patient not added. Problem with the Network",
    //     })
    // }
  }
  return (
    <div className="flex justify-between  space-x-5">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
              control={form.control}
              name="recordhash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Record Hash</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the patient's Record hash" className="w-full" {...field} />
                  </FormControl>
                  <FormDescription>Ask the patient for record hash</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" >Search</Button>
          </form>
        </Form>
        <p className="text-gray-500 my-3 text-sm">
          Fetched record details will be displayed here
        </p>
        <div className={hidden ? "hidden" : "w-[20vw] h-[25vh] bg-slate-200 p-4 rounded-md my-3 "}  >
          <div>
            <p className="text-sm">
              Record Hash
            </p>
            <Input className="" placeholder={record_hash} disabled />
          </div>
          <TooltipProvider>
            <div className="flex space-x-1 mt-3">
              <Tooltip>
                <TooltipTrigger>
                  <Button className="" onClick={() => {
                    if (checkRead) {
                      push("/doctor/viewrecord/" + record_hash)
                    }
                  }} {...(checkRead ? { disabled: false } : { disabled: true })}>View</Button>
                </TooltipTrigger>
                <TooltipContent>
                  {
                    checkRead ? <p>You have view access for this record</p> : <p>You don't have view access for this record. Ask your patient to give you read access</p>
                  }
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button className="disabled:cursor-not-allowed" onClick={() => {
                    if (checkWrite) {
                      push("/doctor/editrecord/" + record_hash)
                    }
                  }} {...(checkWrite ? { disabled: false } : { disabled: true })}>Edit</Button>
                </TooltipTrigger>
                <TooltipContent>
                  {
                    checkWrite ? <p>You have edit access for this record</p> : <p>You don't have edit access for this record. Ask your patient to give you write access</p>
                  }
                </TooltipContent>
              </Tooltip>
            </div>

          </TooltipProvider>
        </div>
      </div>

    </div>
  )
}


export default FetchRecord



