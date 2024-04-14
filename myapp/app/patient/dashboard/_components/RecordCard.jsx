import { Button } from '@/components/ui/button'
import React from 'react'

const RecordCard = (props) => {
    return (
        <div className='flex justify-between items-center space-x-9 px-3 py-2 my-2 border rounded-md bg-slate-50'>
            <div>
                <h1 className='font-bold text-sm'>{"Record Title : " + props && props.record["record_title"]}</h1>
                <p className='text-xs'>{"Record hash : "}
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

export default RecordCard