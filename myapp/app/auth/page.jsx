"use client"
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Loader from './_components/Loader';
import { useRouter } from 'next/navigation';
import Medivault from "../contracts/Medivault.json";
import { connectWallet, setterFunction, checkSuperAdminRole } from '../_utils/apiFeatures';
import { useToast } from '@/components/ui/use-toast';

const App = () => {
    const [count, setCount] = useState(4);
    const [timerId, setTimerId] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const router = useRouter();

    const [data, setData] = useState(null);
    const { toast } = useToast();

    const [state, setState] = useState({ web3: null, contract: null });
    var contract = null;

    const [address, setAddress] = useState(null);
    const [role, setRole] = useState(null);


    const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    const startCountdown = () => {
        if (timerId) return; // Prevent multiple timers from being started

        const id = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);

        setTimerId(id);
    };

    useEffect(() => {
        async function initWalletAndWeb3() {
            const walletaddress = await connectWallet();
            setAddress(walletaddress);

            const { web3, contract } = await setterFunction(provider);
            setState({ web3: web3, contract: contract });

            console.log(state);

            // Once state is updated with contract, call checkSuperAdminRole
            const checksuperadmin = await checkSuperAdminRole(contract, walletaddress);
            console.log("checksuperadmin", checksuperadmin);
            if (checksuperadmin) {
                console.log("Updated role");
                setRole("super Admin");
                setIsConnected(true);
                startCountdown();
                toast({
                    title: "Info",
                    description: `Identified as super admin. Redirecting you to your Dashboard!`,
                })
                setTimeout(() => {
                    router.push("/superadmin/dashboard");
                },4000)
            }
            else {
                setRole("Not a super admin");
                toast({
                    title: "Info",
                    description: "You don't have an account in Medivault. Please ask your doctor to create one.",
                })
            }
        }

        initWalletAndWeb3(role);
    }, []);


    // console.log("State", state);
    // console.log("address", address);

    // async function checkSuperAdminRole(contract,address) {
    //     if (!contract) {
    //         console.log("Null here");
    //         return;
    //     } // Ensure contract is not null
    //     console.log("Checking role");
    //     console.log("address : " ,address)
    //     const checksuperadmin = await contract.methods.checkSuperAdmin(address).call({ from: address });
    //     console.log("checksuperadmin", checksuperadmin);
    //     if (checksuperadmin) {
    //         console.log("Updated role");
    //         setRole("super Admin");
    //         toast({
    //             title: "Info",
    //             description: "Redirecting to Super admin dashboard",
    //         })
    //     }
    //     else {
    //         setRole("Not a super admin");
    //     }
    // }



    return (
        <div className="h-[70vh] flex justify-center items-center mx-4">
            <div className='p-5 bg-gray-100 rounded border flex flex-col'>
                <div className='text-lg font-bold text-center'>
                    {
                        isConnected ? "Connected" : "Connecting to your MetaMask wallet"
                    }
                </div>
                <div className=''>
                    {
                        address ? <div><b>Your Address</b> : {address}</div> : <div className='flex justify-center items-center'><Loader /></div>
                    }
                </div>
                <div className='flex justify-center'>
                    {
                        role && <div><b>Role</b> : {role}</div>
                    }
                </div>
                <p className='text-center'>
                    {
                        role && <div>
                            redirecting you to dashboard in {count}
                        </div>
                    }

                </p>
            </div>
        </div>
    );

}


export default App;
