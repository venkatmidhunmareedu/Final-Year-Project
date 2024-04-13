
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
import { addPatient, checkPatient } from "@/app/_utils/apiFeatures"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    metamask_addr: z.string().min(42, {
        message: "Metamask address must be at least 42 characters.",
    }),
})



const FetchPatient = () => {
    const { toast } = useToast();
    const { push } = useRouter();
    const { state, address } = useContext(DoctorContext);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            metamask_addr: "",
        },
    })

    const onSubmit = async (values) => {
        console.log(values);
        const check = await checkPatient(state.contract, address, values.metamask_addr);
        if (check) {
            toast({
                title: "Info",
                description: "Patient found redirecting you to patient details",
            })
            setTimeout(() => {
                push("/doctor/viewpatient/" + values.metamask_addr)
            }, 2000)
        }
        else {
            toast({
                title: "Error",
                description: "Patient not found. Problem with network or check  your metamask address",
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

    // address patient,
    //     string calldata record_title,
    //     string calldata record_desc,
    //     string calldata record_data
    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
                control={form.control}
                name="metamask_addr"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Patient MetaMask Address</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter the patient's meta mask address" className="w-full" {...field} />
                        </FormControl>
                        <FormDescription>
                            Ask your patient to give you their metamask address
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit" >Search</Button>
        </form>
    </Form >)
}


export default FetchPatient



