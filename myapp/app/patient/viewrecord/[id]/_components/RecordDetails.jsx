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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState, useContext, useEffect } from "react"
import { PatientContext } from "@/app/patient/_context/Patientcontext"
// import { } from "@/app/_utils/apiFeatures"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { fetchPatientRecord } from "@/app/_utils/apiFeatures"


const formSchema = z.object({
    doctor: z.string().min(4, {
        message: "username must be at least 4 characters.",
    }),
    patient: z.string().min(4, {
        message: "username must be at least 4 characters."
    }),
    record_title: z.string().min(4, {
        message: "username must be at least 4 characters.",
    }),
    record_desc: z.string().min(4, {
        message: "username must be at least 4 characters.",
    }),
    record_data: z.string().min(4, {
        message: "username must be at least 4 characters.",
    })
})

export default function AccountDetails(props) {
    const { toast } = useToast();
    const { router } = useRouter();
    // const [isDisabled, setIsDisabled] = useState({ "disabled": "disabled", check: true })

    const { state, name, address, provider } = useContext(PatientContext);
    // const [username, setUsername] = useState(name && name["name"]);
    const [ record , setRecord ] = useState(null);
    useEffect(() => {
        const _fetchRecord = async () => {
            const record = await fetchPatientRecord(state.contract, address, props.id);
            setRecord(record);
        }
        _fetchRecord();
    } , [state])
    // address doctor;
    //     address patient;
    //     address[] read_allowed_doctors;
    //     address[] write_allowed_doctors;
    //     string record_title;
    //     string record_desc;
    //     string record_data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            doctor: record && record.doctor,
            patient: record && record.patient,
            record_title: record && record.record_title,
            record_desc: record && record.record_desc,
            record_data: record && record.record_data,
        },
    })

    function onSubmit(values) {
        console.log(values);
        // const check = editSuperAdmin(state.contract, address, values.username)
        // console.log({
        //     contract: state.contract,
        //     address: address,
        //     username: values.username
        // });
        // if (check) {
        //     setIsDisabled({ "disabled": "disabled", check: true })
        //     // setUsername(values.username)
        //     setTimeout(() => {
        //         window.location.reload();
        //     },1000)

        //     toast({
        //         title: "Info",
        //         description: "Username set successfully"
        //     })
        // } else {
        //     toast({
        //         title: "Error",
        //         description: "Username not set"
        //     })
        // }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="doctor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Doctor </FormLabel>
                            <FormControl>
                                <Input placeholder={record && record.doctor} className="w-full" {...field} disabled />
                            </FormControl>
                            <FormDescription>
                                Doctor's Meta Mask address
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Patient</FormLabel>
                            <FormControl>
                                <Input placeholder={record && record.patient} className="w-full" {...field} disabled />
                            </FormControl>
                            <FormDescription>
                                Patient's Meta Mask address
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} {...isDisabled}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={name && name["name"]} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <FormField
                    control={form.control}
                    name="record_title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Record Title</FormLabel>
                            <FormControl>
                                <Input placeholder={record && record.record_title} className="w-full" {...field} disabled />
                            </FormControl>
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
                                <Input placeholder={record && record.record_desc } className="w-full" {...field} disabled />
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
                                <Textarea placeholder={record && record.record_data} className="w-full" {...field} disabled />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
