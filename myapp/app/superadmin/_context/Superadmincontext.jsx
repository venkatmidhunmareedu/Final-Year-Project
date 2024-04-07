"use client"
import React,{ useState, useEffect, useContext, Children } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import { connectWallet, setterFunction, checkSuperAdminRole } from '@/app/_utils/apiFeatures';
import { fetchSuperadmin } from '@/app/_utils/apiFeatures';

export const SuperadminContext = React.createContext();

export const SuperadminProvider = ({children}) => {
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
        const checksuperadmin = await checkSuperAdminRole(contract, walletaddress);
        if (checksuperadmin) {
            const name = await fetchSuperadmin(contract, walletaddress);
            setName(name.name);
            console.log("checksuperadmin name", name.name);
        } else {
            router.push("/auth");
        }
    }

    useEffect(() => {
        authenticator();
    }, [])
    return (
        <SuperadminContext.Provider value={{ state, address, name , provider }}>
            {children}
        </SuperadminContext.Provider>
    )
}
