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
import { deleteAdmin } from "@/app/_utils/apiFeatures"
import { SuperadminContext } from "../../_context/Superadmincontext"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    metamask_addr: z.string().min(42, {
        message: "Metamask address must be at least 42 characters.",
    })
})

export function DeleteAdmin(props) {
    const { toast } = useToast();
    const { state, address } = useContext(SuperadminContext);
    // ...
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            metamask_addr: "",
        },
    })
    function onSubmit(values) {
        console.log(values);
        const check = deleteAdmin(state.contract, address, values.metamask_addr);
        if (check == true) {
            toast({
                title: "Info",
                description: "Admin deleted successfully",
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        else {
            toast({
                title: "Error",
                description: "Admin not deleted. Check admin address and try again!",
            });
        }
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
                            <FormDescription>
                                Enter the metamask address of the admin account you want to delete
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" >Delete</Button>
            </form>
        </Form>
    )
}
