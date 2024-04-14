import React, { useContext, useEffect, useState } from 'react'
import NomineeRecord from './NomineeRecord'
import { FetchNomineeRecordsofPatient } from '@/app/_utils/apiFeatures';
import { PatientContext } from '../../_context/Patientcontext';

const NomineeRecords = () => {
    const [ nomineeRecords , setNomineeRecords ] = useState(null);
    const { state , address } = useContext(PatientContext);

    // fetch nominee records
    useEffect( () => {
        // fetch all records
        const _fetchRecords = async () => {
            const contract = state.contract;
            const records = await FetchNomineeRecordsofPatient(contract,address);
            console.log(records);
            setNomineeRecords(records);
        }
        state && address && _fetchRecords();
    },[state])
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