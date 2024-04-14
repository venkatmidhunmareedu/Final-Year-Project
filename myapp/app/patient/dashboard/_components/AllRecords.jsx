import React, { useContext, useEffect, useState } from 'react'
import RecordCard from './RecordCard'
import { PatientContext } from '../../_context/Patientcontext';
import { fetchPatientRecords } from '@/app/_utils/apiFeatures';




const AllRecords = () => {
    const { state , address } = useContext(PatientContext);
    const [ records , setRecords ] = useState(null);
    // fetch all records here
    useEffect(() => {
        const _fetchRecords = async () => {
            const contract = state.contract;
            const records = await fetchPatientRecords(contract, address);
            setRecords(records);
        }
        _fetchRecords();
    } , [state])
    return (
        <div className='flex flex-col'>
            <div>
                <h1 className='text-md font-bold'>All Records</h1>
            </div>
            <div>
                {
                    records && records.map((record , index) => {
                        return <RecordCard key={index} record={record} />
                    })
                }
                {
                    records && records.length == 0 && <p>No records found</p>
                }
            </div>
        </div>
    )
}

export default AllRecords