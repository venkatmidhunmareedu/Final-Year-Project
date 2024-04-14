import { Button } from '@/components/ui/button'
import React from 'react'

const NomineeRecord = (props) => {
    return (
        <div className='flex justify-between items-center space-x-9 px-3 py-2 my-2 border rounded-md bg-slate-50'>
            <div>
                <h1 className='font-bold text-sm'>{"Record Title : Diabetes"}</h1>
                <p className='text-xs'>{"Nominee Name : "}
                    <span className=''>
                        Bhargav
                    </span>
                </p>
                <p className='text-xs'>{"Nominee Record hash : "}
                    <span className=''>
                        12112121212212nnk12nknk1n3k1nk2
                    </span>
                </p>
                <p className='text-xs'>{"Nominee Address : "}
                    <span className=''>
                        12112121212212nnk12nknk1n3k1nk2
                    </span>
                </p>
            </div>
            <div>
                <Button>View</Button>
            </div>
        </div>
    )
}

export default NomineeRecord;