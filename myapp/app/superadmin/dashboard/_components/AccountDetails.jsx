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
import { useState, useContext, useEffect } from "react"
import { SuperadminContext } from "../../_context/Superadmincontext"
import { editSuperAdmin } from "@/app/_utils/apiFeatures"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    username: z.string().min(4, {
        message: "username must be at least 4 characters.",
    }),
})

export function AccountDetails() {
    const { toast } = useToast();
    const { router } = useRouter();
    const [isDisabled, setIsDisabled] = useState({ "disabled": "disabled", check: true })

    const { state, name, address, provider } = useContext(SuperadminContext);
    const [username, setUsername] = useState(name);

    // ...
    // useEffect(() => {
    //     setUsername(name)
    // }, [username])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: username || name,
        },
    })

    function onSubmit(values) {
        console.log(values);
        const check = editSuperAdmin(state.contract, address, values.username)
        console.log({
            contract: state.contract,
            address: address,
            username: values.username
        });
        if (check.toString()) {
            setIsDisabled({ "disabled": "disabled", check: true })
            // setUsername(values.username)
            setTimeout(() => {
                window.location.reload();
            },1000)

            toast({
                title: "Info",
                description: "Username set successfully"
            })
        } else {
            toast({
                title: "Error",
                description: "Username not set"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder={username || name} className="w-full" {...field} {...isDisabled} />
                            </FormControl>
                            <FormDescription>
                                This is your display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex space-x-2 items-center">
                    {
                        isDisabled.check && <Button onClick={() => setIsDisabled({ "disabled": "", check: false })}>Edit</Button>
                    }
                    {
                        !isDisabled.check && <Button type="submit">Save</Button>
                    }
                    {
                        !isDisabled.check && <Button onClick={() => setIsDisabled({ "disabled": "disabed", check: true })} varient="destructive">Cancel</Button>
                    }
                </div>
            </form>
        </Form>
    )
}
