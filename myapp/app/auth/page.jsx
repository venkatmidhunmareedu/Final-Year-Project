"use client"
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Loader from './_components/Loader';
import { useRouter } from 'next/navigation';

const App = () => {
    const [userAddress, setUserAddress] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [seconds, setSeconds] = useState(5);
    const [balance, setBalance] = useState();
    const { push } = useRouter();


    useEffect(() => {

        const web3 = new Web3(window.ethereum);
        async function loadAccounts() {
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            setUserAddress(account);
            setIsLoggedIn(true);
            const balance = await web3.eth.getBalance(account);
            console.log(balance);
            setBalance(balance);
            push("/patient/dashboard");
        }
        loadAccounts();
    }, []);




    return (
        <div className="h-[70vh] flex justify-center items-center mx-4">
            <div className='p-5 bg-gray-100 rounded border flex flex-col'>
                <div className='text-lg font-bold text-center'>Connecting to your MetaMask wallet</div>
                <div className='flex justify-center pt-6'>

                    {
                        !isLoggedIn && (
                            <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-80' disabled>
                                {
                                    loading ? <Loader /> : <p ><span>Connecting</span> <img src="/metamask-icon.svg" className='w-15 h-15' alt="" /></p>
                                }
                            </button>
                        )
                    }
                    {isLoggedIn && (
                        <div className='flex flex-col justify-center items-center gap-5'>
                            <div>
                                <p>Logged in as: {userAddress}</p>
                                <p>Balance : {parseInt(balance)}</p>
                                <p className='text-center'><b>Patient</b></p>
                            </div>
                            <button className='bg-blue-700  text-white font-bold py-2 px-4 rounded w-fit ' disabled>Redirecting you to
                                {
                                    " your dashboard "
                                }
                                in
                                {
                                    " " + seconds + " seconds..."
                                }
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
