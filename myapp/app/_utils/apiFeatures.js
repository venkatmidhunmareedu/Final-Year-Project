import Web3 from "web3";
import Medivault from "../contracts/Medivault.json";

export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            return console.log("Install Metamask");
        }
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        return firstAccount
    }
    catch (err) {
        console.log(err);
    }
}

export const setterFunction = async (provider) => {
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Medivault.networks[networkId];
    const contract = new web3.eth.Contract(Medivault.abi, deployedNetwork && deployedNetwork.address);
    return { web3, contract }
}


export async function checkRole(contract,address) {
    if (!contract) {
        return null;
    } 
    const checksuperadmin = await contract.methods.checkSuperAdmin(address).call({ from: address });
    return checksuperadmin;
}

export async function fetchSuperadmin(contract, address) {
    if(!contract) {
        return null;
    }
    const superadmin = await contract.methods.fetchSuperadmin(address).call({ from: address });
    return superadmin;
}


export async function fetchSuperadmins(contract, address) {
    if (!contract) {
        return;
    } // Ensure contract is not null
    const superadmins = await contract.methods.getAllSuperAdmins().call({ from: address });
    return superadmins;
}

// const fetchContract = (signerOrProvider) => {
//     console.log(MedivaultABI, MedivaultAddress);

//     return new ethers.Contract( MedivaultAddress, MedivaultABI, signerOrProvider);
// }

// export const connectingWithContract = async (address) => {
//     try {
//         const web3model = new Web3Model();
//         const connection = await web3model.connect();
//         const provider = new ethers.providers.Web3Provider(connection);
//         // const providersAdrress = await provider.getCode(address)
//         // console.log("providers address : " , providersAdrress);
//         const signer = provider.getSigner();
//         const contract = fetchContract(signer);
//         return contract;
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const convertTime = (time) => {
//     const newTime = new Date (time.toNumber());
//     const realTime =
//     newTime.getHours + "/"
//     + newTime.getMinutes + "/"
//     + newTime.getSeconds +
//     " Date:" +
//     newTime.getDate() +
//     "/" +
//     (newTime.getMonth() + 1) +
//     "/" +
//     newTime.getFullYear();

//     return realTime;
// }



