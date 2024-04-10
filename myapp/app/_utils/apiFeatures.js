import Web3 from "web3";
import Medivault from "../contracts/Medivault.json";


// base functions 
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

// ----------------------------------------------------------------------------------------------------

// super admin functions 

export const setterFunction = async (provider) => {
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Medivault.networks[networkId];
    const contract = new web3.eth.Contract(Medivault.abi, deployedNetwork && deployedNetwork.address);
    return { web3, contract }
}



export async function checkSuperAdminRole(contract,address) {
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
    console.log(superadmins);
    return superadmins;
}

export const retriveName = async (contract,address) =>  {
    const data = await fetchSuperadmin(contract,address);
    return data.name;
}

export const retriveNames = async (contract,address) =>  {
    const data = await contract.methods.fetchNames().call({ from: address });
    return data;
} 

export async function editSuperAdmin(contract , address , name ) {
    if (!contract) {
        return;
    } // Ensure contract is not null
    try {
        const value = await contract.methods.editSuperAdmin(name).send({ from: address });
        // console.log(value)
        return true
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

export async function addSuperAdmin(contract , mm_address,address, name ) {
    if (!contract) {
        return;
    } // Ensure contract is not null
    try {
        const value = await contract.methods.addSuperAdmin(mm_address , name).send({ from: address , gas: 200000});
        console.log(value)
        return true
    }
    catch(err) {
        console.log(err);
        return false;
    }
}


export async function addAdmin(contract , address, insitution_name,mm_address ) {
    if (!contract) {
        return;
    }
    try {
        const value = await contract.methods.addAdmin(insitution_name,mm_address).send({ from: address , gas: 200000 });
        console.log(value);
        return true;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

export async function retriveAdminAddresses(contract, address) {
    if (!contract) {
        return null;
    }
    const adminAddress = await contract.methods.fetchAdminsAddresses().call({ from: address });
    console.log("api feature adminAddress",adminAddress);
    return adminAddress;
}

export async function fetchAdmins(contract, address) {
    if (!contract) {
        return null;
    }
    const admins = await contract.methods.fetchAdmins().call({ from: address });
    console.log("api feature admins",admins);
    return admins;
}

export async function deleteAdmin(contract , address,mm_address) {
    if (!contract) {
        return;
    }
    try {
        const value = await contract.methods.deleteAdmin(mm_address).send({ from: address });
        console.log(value);
        if(value){
            return true;
        }
        return false;
    }
    catch(err) {
        console.log(err);
        return false;
    }
} 


// ----------------------------------------------------------------------------------------------------
// admin functions

export async function checkAdminRole(contract,address) {
    if (!contract) {
        return null;
    } 
    const checkadmin = await contract.methods.checkAdmin(address).call({ from: address });
    return checkadmin;
}

export async function fetchAdmin(contract, address) {
    if (!contract) {
        return null;
    }
    const admin = await contract.methods.fetchAdmin(address).call({ from: address });
    return admin;
}

export async function editAdmin(contract , address , name ) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.editAdmin( address , name).send({ from: address });
        console.log("Edited admin")
        return true
    }
    catch(err) {
        console.log(err);
        return false;
    }
}


export async function addDoctor(contract , address , name , specilization , mm_address) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.addDoctor(name,specilization,mm_address).send({ from: address , gas: 200000 });
        console.log(value)
        return true
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

export async function fetchDoctors(contract, address) {
    if (!contract) {
        return null;
    }
    const doctors = await contract.methods.fetchDoctors().call({ from: address });
    const doctorAddress = await contract.methods.fetchDoctorAddresses().call({ from: address });
    return { doctors , doctorAddress };
}

export async function deleteDoctor(contract , address , mm_address) {
    if(!contract) {
        return null;
    }
    try {
        const value = await contract.methods.deleteDoctor(mm_address).send({ from: address });
        console.log(value);
        if(value){
            return true;
        }
        return false;
    }
    catch(err){
        console.log(err);
        return false;
    }
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



