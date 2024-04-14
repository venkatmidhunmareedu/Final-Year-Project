import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from "next/navigation"

const RecordCard = (props) => {
    const { push } = useRouter();

    return (
        <div className='flex justify-between items-center space-x-9 px-3 py-2 my-2 border rounded-md bg-slate-50'>
            <div>
                <h1 className='font-bold text-sm'>{"Record Title : " + props && props.record.recordData["record_title"]}</h1>
                <p className='text-xs'>{"Record hash : "}
                    <span className=''>
                        { props && props.record.recordHash }
                    </span>
                </p>
            </div>
            <div>
                <Button onClick={
                    () => {
                        push(`/patient/viewrecord/${props.record.recordHash}`);
                    }
                }>View</Button>
            </div>
        </div>
    )
}

export default RecordCard