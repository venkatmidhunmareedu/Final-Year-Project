"use client"
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Loader from './_components/Loader';

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [userAddress, setUserAddress] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            const initWeb3 = async () => {
                try {
                    // Initialize web3
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    // Request account access if needed
                    await window.ethereum.enable();

                    // Get user's Ethereum address
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccounts(accounts);

                    if (accounts.length > 0) {
                        setUserAddress(accounts[0]);
                        // Assuming user is logged in if there's at least one account connected
                        setIsLoggedIn(true);
                    }
                } catch (error) {
                    // Handle error
                    console.error('Error:', error);
                }
            };

            initWeb3();
        } else {
            // MetaMask is not installed, prompt users to install it
            alert('Please install MetaMask to use this application.');
        }
    }, []);

    // const handleLogout = () => {
    //     // Prompt the user to disconnect from MetaMask
    //     if (window.ethereum && window.ethereum.isMetaMask) {
    //         window.ethereum
    //             .request({ method: 'eth_requestAccounts' })
    //             .then(() => {
    //                 setIsLoggedIn(false);
    //                 setUserAddress('');
    //             })
    //             .catch((error) => {
    //                 console.error('Error disconnecting from MetaMask:', error);
    //             });
    //     }
    // };


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
                                <p className='text-center'><b>Patient</b></p>
                            </div>
                            <button className='bg-blue-700  text-white font-bold py-2 px-4 rounded w-fit ' disabled>Redirecting you to
                                {
                                    " your dashboard "
                                }
                                in
                                {
                                    " 5 seconds..."
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
