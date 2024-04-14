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
import { addAdmin, checkReadaccess, checkWriteaccess, revokeReadAccess, revokeWriteAccess } from "@/app/_utils/apiFeatures"
import { useToast } from "@/components/ui/use-toast"
import { PatientContext } from "@/app/patient/_context/Patientcontext"

const formSchema = z.object({
    metamask_addr: z.string().min(42, {
        message: "Metamask address must be at least 42 characters.",
    }),
})

export function RevokeAccess(props) {
    const { state, address, name } = useContext(PatientContext);
    const [ clickedRead , setClickedRead ] = useState(false);
    const [ clickedWrite , setClickedWrite ] = useState(false);
    // ...
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            metamask_addr: "",
        },
    })

    async function onSubmit(values) {
        console.log(values);
        if(clickedRead && !clickedWrite) {
            console.log("read" , values.metamask_addr);
            var check = await checkReadaccess(state.contract, address, values.metamask_addr , props.id);
            if(!check) {
                toast({
                    title: "Info",
                    description: "Already had no read access for this address",
                })
            }
            else {
                check = await revokeReadAccess(state.contract, address, props.id,values.metamask_addr);
                if(check) {
                    toast({
                        title: "Info",
                        description: "Read access revoked successfully",
                    })
                }
                else {
                    toast({
                        title: "Error",
                        description: "Problem with the Network or check your metamask address",
                    })
                }
            }
        }
        else {
            console.log("write" , values.metamask_addr);
            var check_1 = await checkWriteaccess(state.contract, address, values.metamask_addr , props.id);
            if(!check_1) {
                toast({
                    title: "Info",
                    description: "Already had no write access for this address",
                })
            }
            else {
                check_1 = await revokeWriteAccess(state.contract, address, props.id,values.metamask_addr);
                if(check_1) {
                    toast({
                        title: "Info",
                        description: "Write access revoked successfully",
                    })
                }
                else{
                    toast({
                        title: "Error",
                        description: "Problem with the Network or check your metamask address",
                    })
                }
            }
        }
        // console.log("Hit")
        // const check = addAdmin(state.contract,address,values.institution_name,values.metamask_addr);
        // if(check){
        //     toast({
        //         title: "Info",
        //         description: "Admin added successfully",
        //     })
        //     // setTimeout(() => {
        //     //     window.location.reload();
        //     // },1000)
        // }
        // else {
        //     toast({
        //         title: "Error",
        //         description: "Super Admin not added. Problem with the Network",
        //     })
        // }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                <div className="flex space-x-1">
                    <Button type="submit" onClick = {  
                        () => {
                            setClickedRead(true);
                            setClickedWrite(false);
                        }
                    } >Revoke Read Access</Button>
                    <Button type="submit" 
                    onClick = { 
                        () => {
                            setClickedWrite(true);
                            setClickedRead(false);
                        }
                    }>Revoke Write Access</Button>
                </div>
            </form>
        </Form>
    )
}
