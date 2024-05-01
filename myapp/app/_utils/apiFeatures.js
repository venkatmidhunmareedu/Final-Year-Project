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



export async function checkSuperAdminRole(contract, address) {
    if (!contract) {
        return null;
    }
    const checksuperadmin = await contract.methods.checkSuperAdmin(address).call({ from: address });
    return checksuperadmin;
}



export async function fetchSuperadmin(contract, address) {
    if (!contract) {
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

export const retriveName = async (contract, address) => {
    const data = await fetchSuperadmin(contract, address);
    return data.name;
}

export const retriveNames = async (contract, address) => {
    const data = await contract.methods.fetchNames().call({ from: address });
    return data;
}

export async function editSuperAdmin(contract, address, name) {
    if (!contract) {
        return;
    } // Ensure contract is not null
    try {
        const value = await contract.methods.editSuperAdmin(name).send({ from: address });
        // console.log(value)
        return true
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export async function addSuperAdmin(contract, mm_address, address, name) {
    if (!contract) {
        return;
    } // Ensure contract is not null
    try {
        const value = await contract.methods.addSuperAdmin(mm_address, name).send({ from: address, gas: 200000 });
        console.log(value)
        return true
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


export async function addAdmin(contract, address, insitution_name, mm_address) {
    if (!contract) {
        return;
    }
    try {
        const value = await contract.methods.addAdmin(insitution_name, mm_address).send({ from: address, gas: 200000 });
        console.log(value);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export async function retriveAdminAddresses(contract, address) {
    if (!contract) {
        return null;
    }
    const adminAddress = await contract.methods.fetchAdminsAddresses().call({ from: address });
    console.log("api feature adminAddress", adminAddress);
    return adminAddress;
}

export async function fetchAdmins(contract, address) {
    if (!contract) {
        return null;
    }
    const admins = await contract.methods.fetchAdmins().call({ from: address });
    console.log("api feature admins", admins);
    return admins;
}

export async function deleteAdmin(contract, address, mm_address) {
    if (!contract) {
        return;
    }
    try {
        const value = await contract.methods.deleteAdmin(mm_address).send({ from: address });
        console.log(value);
        if (value) {
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


// ----------------------------------------------------------------------------------------------------
// admin functions

export async function checkAdminRole(contract, address) {
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

export async function editAdmin(contract, address, name) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.editAdmin(address, name).send({ from: address });
        console.log("Edited admin")
        return true
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


export async function addDoctor(contract, address, name, specilization, mm_address) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.addDoctor(name, specilization, mm_address).send({ from: address, gas: 200000 });
        console.log(value)
        return true
    }
    catch (err) {
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
    return { doctors, doctorAddress };
}

export async function deleteDoctor(contract, address, mm_address) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.deleteDoctor(mm_address).send({ from: address });
        console.log(value);
        if (value) {
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


// ----------------------------------------------------------------------------------------------------

// Doctor functions 

export async function checkDoctorRole(contract, address) {
    if (!contract) {
        return null;
    }
    const checkdoctor = await contract.methods.checkDoctor(address).call({ from: address });
    return checkdoctor;
}

export async function fetchDoctor(contract, address) {
    if (!contract) {
        return null;
    }
    const doctor = await contract.methods.fetchDoctor(address).call({ from: address });
    return doctor;
}

export async function addPatient(contract, address, name, age, gender, mm_address, contact, institution) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.addPatient(name, age, gender, address, contact, institution, mm_address).send({ from: address, gas: 500000 });
        console.log(value)
        return true
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export async function fetchPatient(contract, address, mm_address) {
    if (!contract) {
        console.log("Contract is null");
        return null;
    }
    try {
        const patient = await contract.methods.getPatient(mm_address).call({ from: address });
        console.log(patient);
        return patient;
    }
    catch (err) {
        console.log(err);
        return null;
    }

}

export async function createRecord(contract, address, mm_address, record_title, record_description, record_data) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.createRecord(mm_address, record_title, record_description, record_data).send({ from: address, gas: 1000000 });
        console.log(value)
        return true
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export async function checkReadaccess(contract, address, mm_address, record_hash) {
    if (!contract) {
        return null;
    }
    const checkaccess = await contract.methods.checkReadAccess(record_hash).call({ from: mm_address });
    console.log("checkreadaccess", checkaccess);
    return checkaccess;
}

export async function checkWriteaccess(contract, address, mm_address, record_hash) {
    if (!contract) {
        return null;
    }
    const checkaccess = await contract.methods.checkWriteAccess(record_hash).call({ from: mm_address });
    return checkaccess;
}
export async function checkRecord(contract, address, record_hash) {
    if (!contract) {
        return null;
    }
    const checkrecord = await contract.methods.checkRecord(record_hash).call({ from: address });
    return checkrecord;
}

// patient functions 
export async function checkPatient(contract, address, mm_address) {
    if (!contract) {
        return null;
    }
    const checkpatient = await contract.methods.checkPatient(mm_address).call({ from: address });
    console.log(checkpatient);
    return checkpatient;
}

export async function fetchPatientRecords(contract, address) {
    if (!contract) {
        return null;
    }
    // const patientrecords = await contract.methods.getAllRecords().call({ from: address });
    const patientrecords = await contract.methods.getAllRecordsOfPatient(address).call({ from: address });
    console.log(patientrecords);
    return patientrecords;
}

export async function getNominees(contract, address) {
    if (!contract) {
        return null;
    }
    const nomineesAddress = await contract.methods.getNominees(address).call({ from: address });
    // fetch addresses of all nominees by using a for loop
    const nominees = [];
    for (let i = 0; i < nomineesAddress.length; i++) {
        const patient = await contract.methods.getPatient(nomineesAddress[i]).call({ from: address });
        nominees.push(patient);
    }
    console.log({ nominees, nomineesAddress });
    return { nominees, nomineesAddress };
}

// function to add a nominee
export async function addNominee(contract, address, mm_address) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.addNominee(mm_address).send({ from: address });
        console.log(value)
        return true
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export async function FetchNomineeRecordsofPatient(contract, address) {
    if (!contract) {
        return null;
    }
    // get all nominees and loop around and fetch their records 
    const { nominees, nomineesAddress } = await getNominees(contract, address);
    const nomineerecords = [];
    for (let i = 0; i < nominees.length; i++) {
        const records = await contract.methods.getAllRecordsOfPatient(nomineesAddress[i]).call({ from: address });
        nomineerecords.push({ nominee: nominees[i], nomineeAddress: nomineesAddress[i], records });
    }
    console.log(nomineerecords);
    return nomineerecords;
}

// function to fetch a record of a particular patient
export async function fetchPatientRecord(contract, address, record_hash) {
    if (!contract) {
        return null;
    }
    const patientrecord = await contract.methods.getRecord(record_hash).call({ from: address });
    console.log(patientrecord);
    return patientrecord;
}

// function to fetch read access members of a particular record
export async function fetchReadAccessMembers(contract, address, record_hash) {
    if (!contract) {
        return null;
    }
    const readaccessmembers = await contract.methods.getReadAccessMembers(record_hash).call({ from: address });
    console.log(readaccessmembers);
    return readaccessmembers;
}

export async function fetchWriteAccessMembers(contract, address, record_hash) {
    if (!contract) {
        return null;
    }
    const writeaccessmembers = await contract.methods.getWriteAccessMembers(record_hash).call({ from: address });
    console.log(writeaccessmembers);
    return writeaccessmembers;
}

export async function giveReadAccess(contract, address, record_hash, patient_address) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.addMemberToReadAccess(record_hash, patient_address).send({ from: address , gas: 1000000  });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export async function giveWriteAccess(contract, address, record_hash, patient_address) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.addMemberToWriteAccess(record_hash, patient_address).send({ from: address , gas: 1000000  });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

// function to revoke read access
export async function revokeReadAccess(contract, address, record_hash, mm_address) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.revokeReadAccess(record_hash, mm_address).send({ from: address , gas: 1000000 });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export async function revokeWriteAccess(contract, address, record_hash, mm_address) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.revokeWriteAccess(record_hash, mm_address).send({ from: address ,gas: 1000000  });
        console.log("revoke write access from contract", value);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export async function editRecord(contract, address, record_hash, record_title, record_desc, record_data) {
    if (!contract) {
        return null;
    }
    try {
        const value = await contract.methods.editRecord(record_hash, record_title, record_desc, record_data).send({ from: address });
        return true;
    }
    catch (err) {
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



