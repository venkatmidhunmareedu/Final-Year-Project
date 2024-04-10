"use client"
import React,{ useState, useEffect, useContext, Children } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import { connectWallet, setterFunction,checkAdminRole, fetchAdmin } from '@/app/_utils/apiFeatures';

export const AdminContext = React.createContext();

export const AdminProvider = ({children}) => {
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
        const checkadmin = await checkAdminRole(contract, walletaddress);
        if (checkadmin) {
            const name = await fetchAdmin(contract, walletaddress);
            setName(name.institution_name);
            console.log("Admin name", name.institution_name);
            console.log("success");
        } else {
            router.push("/auth");
        }
    }

    useEffect(() => {
        authenticator();
    }, [])
    return (
        <AdminContext.Provider value={{ state, address, name , provider }}>
            {children}
        </AdminContext.Provider>
    )

}