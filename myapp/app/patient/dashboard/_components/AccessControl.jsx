import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState, useContext, useEffect } from "react"
import { PatientContext } from '../../_context/Patientcontext'
import ReadAccessCard from './ReadAccessCard'

const formSchema = z.object({
    username: z.string().min(4, {
        message: "username must be at least 4 characters.",
    }),
    age: z.string().min(1, {
        message: "age must be at least 1 characters.",
    }),
    contact: z.string().min(1, {
        message: "contact must be at least 1 characters.",
    }),
})

const AccessControl = () => {
    const { toast } = useToast();
    const { router } = useRouter();
    const { state, name, address, provider } = useContext(PatientContext);
    const [ readMem , setReadMem] = useState(null);
    const [ writeMem , setWriteMem] = useState(null);
    // fetch read access members 
    useEffect(() => {
        const fetchReadAccess = async () => {
            const readAccess = await state.contract.methods.readAccess(address).call();
            setReadMem(readAccess);
        }
        fetchReadAccess();
    })

    return (
        <div className='grid grid-cols-2  w-[58vw] space-x-1'>
            <div className='col-span-1'>
                <div>
                    <div className='text-sm font-bold'>Read Access Control(Members)</div>
                    <div className='overflow-auto h-[33vh] scrollbar text-xs flex my-2 flex-col'>

                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                    </div>
                </div>
            </div>
            <div className='col-span-1'>
                <div>
                    <div className='text-sm font-bold'>Write Access Control(Members)</div>
                    <div className='overflow-auto h-[33vh] scrollbar text-xs flex my-2 flex-col'>
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                        <ReadAccessCard />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AccessControl