import React from 'react'
import NomineeRecord from './NomineeRecord'

const NomineeRecords = () => {
    return (
        <div className='flex flex-col'>
            <div>
                <h1 className='text-md font-bold'>Nominee Records</h1>
            </div>
            <div>
                <NomineeRecord />
                <NomineeRecord />
                <NomineeRecord />
                <NomineeRecord />
                <NomineeRecord />
                
            </div>
        </div>
    )
}

export default NomineeRecords