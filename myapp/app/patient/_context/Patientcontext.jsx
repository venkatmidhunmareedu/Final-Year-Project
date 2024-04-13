"use client"
import React,{ useState, useEffect, useContext, Children } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import { connectWallet, setterFunction, checkPatient,fetchPatient } from '@/app/_utils/apiFeatures';

export const PatientContext = React.createContext();

export const PatientProvider = ({children}) => {
    const router = useRouter();
    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    const [state, setState] = useState({ web3: null, contract: null });
    const [address, setAddress] = useState(null);
    const [name, setName] = useState(null);
    const authenticator = async () => {
        const walletaddress = await connectWallet();
        setAddress(walletaddress);
        const { web3, contract } = await setterFunction(provider);
        setState({ web3, contract });
        const checkpatient = await checkPatient(contract, walletaddress,walletaddress);
        if (checkpatient) {
            const name = await fetchPatient(contract, walletaddress,walletaddress);
            setName(name);
            // console.log(name["name"]);
            // const name = await fetchSuperadmin(contract, walletaddress);
            // setName(name.name);
            // console.log("checksuperadmin name", name.name);
            // setInstitution(name["institution"]);
        } else {
            router.push("/auth");
        }
    }

    useEffect(() => {
        authenticator();
    }, [])
    return (
        <PatientContext.Provider value={{ state, address, name , provider }}>
            {children}
        </PatientContext.Provider>
    )
}
