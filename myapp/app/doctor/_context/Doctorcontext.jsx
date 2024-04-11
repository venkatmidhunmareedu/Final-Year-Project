"use client"
import React,{ useState, useEffect, useContext, Children } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import { connectWallet, setterFunction, checkDoctorRole, fetchDoctor } from '@/app/_utils/apiFeatures';

export const DoctorContext = React.createContext();

export const DoctorProvider = ({children}) => {
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
        const checksuperadmin = await checkDoctorRole(contract, walletaddress);
        if (checksuperadmin) {
            const name = await fetchDoctor(contract, walletaddress);
            setName(name);
            console.log(name["name"]);
            // const name = await fetchSuperadmin(contract, walletaddress);
            // setName(name.name);
            // console.log("checksuperadmin name", name.name);
        } else {
            router.push("/auth");
        }
    }

    useEffect(() => {
        authenticator();
    }, [])
    return (
        <DoctorContext.Provider value={{ state, address, name , provider }}>
            {children}
        </DoctorContext.Provider>
    )
}
