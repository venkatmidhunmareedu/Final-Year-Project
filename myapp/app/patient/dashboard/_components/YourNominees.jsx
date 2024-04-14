import { getNominees } from '@/app/_utils/apiFeatures';
import React, { useContext, useEffect, useState } from 'react'
import { PatientContext } from '../../_context/Patientcontext';

const YourNominees = () => {
  const [ nominees , setNominees ] = useState(null);
  const { state , address } = useContext(PatientContext);
  // fetch all the nominees here
  useEffect(() => {
    const _fetchNominees = async () => {
      const contract = state.contract;
      const nominees = await getNominees(contract, address);
      setNominees(nominees);
    }
    _fetchNominees();
  } , [])

  return (
    <div className='flex flex-col'>
      <h1 className='text-sm font-bold'>
        Your nominees
      </h1>
      <div className='flex flex-col my-2 overflow-auto h-[30vh] scrollbar'>
        {
          nominees && nominees.nominees.length > 0 && nominees.nominees.map((nominee , index) => {
            return (
              <div className='bg-slate-50  rounded-md border px-2 py-1 my-2' key={index}>
                <p className='text-xs'>
                  Name : {nominee.name}
                </p>
                <p className='text-xs'>
                  Address : {nominees && nominees.nomineesAddress[index]}
                </p>
              </div>
            )
          })
        }
        {
          nominees && nominees.nominees.length === 0 && <p className='text-xs'>No nominees yet. Add a nominee to retrive your records on emergency</p>
        }
      </div>
    </div>
  )
}

export default YourNominees