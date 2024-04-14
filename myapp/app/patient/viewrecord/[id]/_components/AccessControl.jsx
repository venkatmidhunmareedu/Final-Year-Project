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
import { PatientContext } from '@/app/patient/_context/Patientcontext'
import ReadAccessCard from './ReadAccessCard'
import { fetchDoctor, fetchReadAccessMembers, fetchWriteAccessMembers } from '@/app/_utils/apiFeatures'

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

const AccessControl = (props) => {
    const { toast } = useToast();
    const { router } = useRouter();
    const { state, name, address, provider } = useContext(PatientContext);
    const [readMem, setReadMem] = useState(null);
    const [writeMem, setWriteMem] = useState(null);
    // fetch read access members 
    useEffect(() => {
        const fetchReadAccess = async () => {
            const readMemAddr = await fetchReadAccessMembers(state.contract, address, props.id);
            // make a loop and fetch all the names of the members by using fetchDoctor function 
            const readMem = [];
            for (let i = 0; i < readMemAddr.length; i++) {
                const doctor = await fetchDoctor(state.contract, readMemAddr[i]);
                readMem.push({
                    name: doctor.name,
                    address: readMemAddr[i],
                });
            }
            console.log(readMem);
            setReadMem(readMem);
        }
        const fetchWriteAccess = async () => {
            const writeMemAddr = await fetchWriteAccessMembers(state.contract, address, props.id);
            // make a loop and fetch all the names of the members by using fetchDoctor function 
            const writeMem = [];
            for (let i = 0; i < writeMemAddr.length; i++) {
                const doctor = await fetchDoctor(state.contract, writeMemAddr[i]);
                writeMem.push({
                    name: doctor.name,
                    address: writeMemAddr[i],
                });
            }
            console.log(writeMem);
            setWriteMem(writeMem);
        }
        fetchReadAccess();
        fetchWriteAccess();
        console.log(readMem);
        console.log(writeMem);
        // fetchReadAccess();
    }, [state])

    return (
        <div className='grid grid-cols-2  w-[65vw] space-x-1'>
            <div className='col-span-1'>
                <div>
                    <div className='text-sm font-bold'>Read Access Control(Members)</div>
                    <div className='overflow-auto h-[33vh] scrollbar text-xs flex my-2 flex-col'>

                        {
                            readMem && readMem.map((member) => {
                                return <ReadAccessCard key={member.address} name={member.name} address={member.address} />
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='col-span-1'>
                <div>
                    <div className='text-sm font-bold'>Write Access Control(Members)</div>
                    <div className='overflow-auto h-[33vh] scrollbar text-xs flex my-2 flex-col'>
                        {
                            writeMem && writeMem.map((member) => {
                                return <ReadAccessCard key={member.address} name={member.name} address={member.address} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AccessControl