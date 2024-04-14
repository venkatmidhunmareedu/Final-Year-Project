"use client"
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Loader from './_components/Loader';
import { useRouter } from 'next/navigation';
import Medivault from "../contracts/Medivault.json";
import { connectWallet, setterFunction, checkSuperAdminRole, checkAdminRole, checkDoctorRole, checkPatient } from '../_utils/apiFeatures';
import { useToast } from '@/components/ui/use-toast';

const App = () => {
    const [count, setCount] = useState(5);
    const [timerId, setTimerId] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

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
            const checkAdmin = await checkAdminRole(contract, walletaddress);
            const checkDoctor = await checkDoctorRole(contract, walletaddress);
            const checkpatient = await checkPatient(contract, walletaddress,walletaddress);
            console.log("checksuperadmin", checksuperadmin);
            console.log("checkDoctor",checkDoctor);
            if (checksuperadmin) {
                console.log("Updated role");
                setRole("Super Admin");
                setIsConnected(true);
                startCountdown();
                toast({
                    title: "Info",
                    description: `Identified as Super Admin. Redirecting you to your Dashboard!`,
                })
                setTimeout(() => {
                    router.push("/superadmin/dashboard");
                },4000)
            }
            else if(checkAdmin){
                setRole("Admin");
                setIsConnected(true);
                startCountdown();
                toast({
                    title: "Info",
                    description: `Identified as admin. Redirecting you to your Dashboard!`,
                })
                setTimeout(() => {
                    router.push("/admin/dashboard");
                },4000)
            }
            else if(checkDoctor){
                setRole("Doctor");
                setIsConnected(true);
                startCountdown();
                toast({
                    title: "Info",
                    description: `Identified as doctor. Redirecting you to your Dashboard!`,
                })
                setTimeout(() => {
                    router.push("/doctor/dashboard");
                },4000)
            }
            else if (checkpatient) {
                setRole("Patient");
                setIsConnected(true);
                startCountdown();
                toast({
                    title: "Info",
                    description: `Identified as patient. Redirecting you to your Dashboard!`,
                })
                setTimeout(() => {
                    router.push("/patient/dashboard");
                },4000)
            }
            else {
                // setRole("Not a super admin");
                setIsConnected(false);
                toast({
                    title: "Info",
                    description: "You don't have an account in Medivault. Please ask your superior to create one.",
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
                        isConnected ? "Connected" : "Wallet Not Connected"
                    }
                </div>
                <div className=''>
                    {
                        address ? <div><b>Your Address</b> : {address}</div> : <div className='flex justify-center items-center'><Loader /></div>
                    }
                </div>
                <div className='flex justify-center'>
                    {
                        role ? <div><b>Role</b> : {role}</div> : <div><b>You Don't have an account in Medivault</b> </div>
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
