// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Medivault {
    // function to check if an address is an admin or patient or doctor or super admin

    // structure of super admin
    struct SuperAdmin {
        string name;
    }
    mapping(address => SuperAdmin) public superAdmins;
    address[] public superAdminAddresses;

    constructor() {
        superAdminAddresses.push(msg.sender);
        superAdmins[msg.sender] = SuperAdmin({name: "Super admin"});
    }

    function checkSuperAdmin(address pubkey) public view returns (bool) {
        return bytes(superAdmins[pubkey].name).length > 0;
    }

    function editSuperAdmin(string memory name) public {
        superAdmins[msg.sender].name = name;
    }

    function addSuperAdmin(address _address, string memory _name) public {
        superAdmins[_address] = SuperAdmin(_name);
        superAdminAddresses.push(_address);
    }

    function getAllSuperAdmins() public view returns (address[] memory) {
        return superAdminAddresses;
    }

    function fetchNames() public view returns (string[] memory) {
        string[] memory names = new string[](superAdminAddresses.length);
        for (uint256 i = 0; i < superAdminAddresses.length; i++) {
            names[i] = superAdmins[superAdminAddresses[i]].name;
        }
        return names;
    }

    function fetchSuperadmin(address _address)
        public
        view
        returns (SuperAdmin memory)
    {
        require(checkSuperAdmin(msg.sender), "Sender is not a super admin");
        return superAdmins[_address];
    }

    function addAdmin(string calldata institution_name, address _address)
        public
    {
        adminAddresses.push(_address);
        admins[_address] = Admin({institution_name: institution_name});
    }

    function fetchAdminsAddresses() public view returns (address[] memory) {
        return adminAddresses;
    }

    function fetchAdmins() public view returns (Admin[] memory) {
        Admin[] memory _admins = new Admin[](adminAddresses.length);
        for (uint256 i = 0; i < adminAddresses.length; i++) {
            _admins[i] = admins[adminAddresses[i]];
        }
        return _admins;
    }

    function deleteAdmin(address _address) public returns (bool) {
        delete admins[_address];
        // search for the _address in the adminAddresses array and delete it
        for (uint256 i = 0; i < adminAddresses.length; i++) {
            if (adminAddresses[i] == _address) {
                adminAddresses[i] = adminAddresses[adminAddresses.length - 1];
                adminAddresses.pop(); // remove the last element
                return true; // exit the function after successful deletion
            }
        }
        return false; // return false if admin doesn't exist or sender is not a super admin
    }

    // -----------------------------------------------------------------------------------------

    // Admin structure
    struct Admin {
        string institution_name;
    }
    mapping(address => Admin) public admins;
    address[] public adminAddresses;

    // admin functions
    // function to check if an address is an admin
    function checkAdmin(address pubkey) public view returns (bool) {
        return bytes(admins[pubkey].institution_name).length > 0;
    }

    function fetchAdmin(address pubkey) public view returns (Admin memory) {
        return admins[pubkey];
    }

    function editAdmin(address pubkey, string memory institution_name)
        public
        returns (bool)
    {
        admins[pubkey].institution_name = institution_name;
        return true;
    }

    function addDoctor(
        string calldata name,
        string calldata specialization,
        address pubkey
    ) public returns (bool) {
        doctors[pubkey] = Doctor({
            name: name,
            specialization: specialization,
            institution: msg.sender
        });
        doctorAddresses.push(pubkey);
        return true;
    }

    function deleteDoctor(address pubkey) public returns (bool) {
        // delete the address in the doctorAddresses array
        for (uint256 i = 0; i < doctorAddresses.length; i++) {
            if (doctorAddresses[i] == pubkey) {
                doctorAddresses[i] = doctorAddresses[
                    doctorAddresses.length - 1
                ];
                doctorAddresses.pop();
                break;
            }
        }
        // delete main doctor structure
        delete doctors[pubkey];
        return true;
    }

    function fetchDoctors() public view returns (Doctor[] memory) {
        Doctor[] memory _doctors = new Doctor[](doctorAddresses.length);
        for (uint256 i = 0; i < doctorAddresses.length; i++) {
            _doctors[i] = doctors[doctorAddresses[i]];
        }
        return _doctors;
    }

    function fetchDoctorAddresses() public view returns (address[] memory) {
        return doctorAddresses;
    }

    // -----------------------------------------------------------------------------------------

    // doctor structure
    struct Doctor {
        string name;
        string specialization;
        // string contact;
        address institution;
    }
    mapping(address => Doctor) public doctors;
    address[] public doctorAddresses;

    // doctor functions
    // function to check if an address is a doctor
    function checkDoctor(address pubkey) public view returns (bool) {
        return bytes(doctors[pubkey].name).length > 0;
    }

    function fetchDoctor(address pubkey) public view returns (Doctor memory) {
        return doctors[pubkey];
    }

    function addPatient(
        string calldata name,
        uint256 age,
        string calldata gender,
        string calldata addr,
        string calldata contact,
        address institution,
        address pubkey
    ) public returns (bool) {
        // check if a patient with the pubkey already exists
        if (checkPatient(pubkey)) {
            return false;
        }
        address[] memory nominees;
        patients[pubkey] = Patient({
            name: name,
            age: age,
            gender: gender,
            addr: addr,
            contact: contact,
            institution: institution,
            nominees: nominees
        });
        patientAddresses.push(pubkey);
        return true;
    }

    // function to delete a patient
    function deletePatient(address pubkey) public returns (bool) {
        // delete the address in the patientAddresses array
        // check if the address exists in the patientAddresses array
        if (!checkAdmin(pubkey)) {
            return false;
        }
        for (uint256 i = 0; i < patientAddresses.length; i++) {
            if (patientAddresses[i] == pubkey) {
                patientAddresses[i] = patientAddresses[
                    patientAddresses.length - 1
                ];
                patientAddresses.pop();
                break;
            }
        }
        // delete main patient structure
        delete patients[pubkey];
        return true;
    }

    // function to create a record
    function createRecord(
        address patient,
        string calldata record_title,
        string calldata record_desc,
        string calldata record_data
    ) public returns (bool) {
        bytes32 record_hash = keccak256(
            abi.encodePacked(
                msg.sender,
                patient,
                record_title,
                record_desc,
                record_data
            )
        );
        address[] memory read_allowed_doctors = new address[](1);
        address[] memory write_allowed_doctors = new address[](1);

        read_allowed_doctors[0] = msg.sender;

        write_allowed_doctors[0] = msg.sender;

        records[record_hash] = Record({
            doctor: msg.sender,
            patient: patient,
            read_allowed_doctors: read_allowed_doctors,
            write_allowed_doctors: write_allowed_doctors,
            record_title: record_title,
            record_desc: record_desc,
            record_data: record_data
        });
        recordHashes.push(record_hash);
        return true;
    }

    // function to fetch a record
    function getRecord(bytes32 record_hash)
        public
        view
        returns (Record memory)
    {
        // check if the record exists
        return records[record_hash];
    }

    // function to check if the doctor has read access
    function checkReadAccess(bytes32 record_hash) public view returns (bool) {
        Record memory record = records[record_hash];
        for (uint256 i = 0; i < record.read_allowed_doctors.length; i++) {
            if (record.read_allowed_doctors[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    //function to check if the doctor has write access
    function checkWriteAccess(bytes32 record_hash) public view returns (bool) {
        Record memory record = records[record_hash];
        for (uint256 i = 0; i < record.write_allowed_doctors.length; i++) {
            if (record.write_allowed_doctors[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    // function to edit record data by doctor
    function editRecord(
        bytes32 record_hash,
        string calldata record_title,
        string calldata record_desc,
        string calldata record_data
    ) public returns (bool) {
        Record memory record = records[record_hash];
        if (checkDoctor(record.doctor) == false) {
            return false;
        }
        record.record_title = record_title;
        record.record_desc = record_desc;
        record.record_data = record_data;
        records[record_hash] = record;
        return true;
    }

    // -----------------------------------------------------------------------------------------

    // patient structure
    struct Patient {
        string name;
        uint256 age;
        string gender;
        string addr;
        string contact;
        address institution;
        address[] nominees;
    }
    mapping(address => Patient) public patients;
    address[] public patientAddresses;

    // patient functions
    // function to check if an address is a patient
    function checkPatient(address pubkey) public view returns (bool) {
        return bytes(patients[pubkey].name).length > 0;
    }

    //function to fetch a patient by address
    function getPatient(address pubkey) public view returns (Patient memory) {
        return patients[pubkey];
    }

    // -----------------------------------------------------------------------------------------
    // Patient Record Structure
    struct Record {
        address doctor;
        address patient;
        address[] read_allowed_doctors;
        address[] write_allowed_doctors;
        string record_title;
        string record_desc;
        string record_data;
    }
    mapping(bytes32 => Record) public records;
    bytes32[] public recordHashes;

    // patient record functions
    // function to check if a record exists or not
    function checkRecord(bytes32 record_hash) public view returns (bool) {
        return bytes(records[record_hash].record_title).length > 0;
    }

    function addReadAllowedDoctor(bytes32 record_hash, address doctor) public {
        records[record_hash].read_allowed_doctors.push(doctor);
    }

    function addWriteAllowedDoctor(bytes32 record_hash, address doctor) public {
        records[record_hash].write_allowed_doctors.push(doctor);
    }

    // manually adding super admin for testing purposes
    // functions of super admin
    // function to check if an address is a super admin

    // // // function to add a super admin
    // // function addSuperAdmin(address pubkey, string calldata name) public {
    // //     require(
    // //         checkSuperAdmin(msg.sender) == true,
    // //         "You are not a super admin"
    // //     );
    // //     require(checkSuperAdmin(pubkey) == false, "Super admin already exists");
    // //     superAdmins[pubkey] = SuperAdmin({name: name});
    // // }

    // // function to add a admin
    // function addAdmin(
    //     string calldata institution_name,
    //     string calldata institution_addr,
    //     string calldata institution_contact,
    //     address pubkey
    // ) public {
    //     require(
    //         checkSuperAdmin(msg.sender) == true,
    //         "You are not a allowed to add an admin"
    //     );
    //     require(checkAdmin(pubkey) == false, "Admin already exists");
    //     admins[pubkey] = Admin({
    //         institution_name: institution_name,
    //         institution_addr: institution_addr,
    //         institution_contact: institution_contact
    //     });
    // }

    // // function to edit an admin
    // function editAdmin(
    //     string calldata institution_name,
    //     string calldata institution_addr,
    //     string calldata institution_contact,
    //     address pubkey
    // ) public {
    //     require(
    //         checkSuperAdmin(msg.sender) == true,
    //         "You are not a allowed to edit an admin"
    //     );
    //     require(checkAdmin(pubkey) == true, "Admin does not exist");
    //     admins[pubkey] = Admin({
    //         institution_name: institution_name,
    //         institution_addr: institution_addr,
    //         institution_contact: institution_contact
    //     });
    // }

    // // -------------------------------------------------------------------------------------------
}

// contract Medivault {
//

//     // function to delete an admin
//     function deleteAdmin(address pubkey) public {
//         require(
//             checkSuperAdmin(msg.sender) == true,
//             "You are not a allowed to delete an admin"
//         );
//         require(checkAdmin(pubkey) == true, "Admin does not exist");
//         delete admins[pubkey];
//     }

//     // function to fetch a single admin
//     function getAdmin(address pubkey) public view returns (Admin memory) {
//         require(
//             checkSuperAdmin(msg.sender) == true,
//             "You are not a allowed to fetch an admin"
//         );
//         require(checkAdmin(pubkey) == true, "Admin does not exist");
//         return admins[pubkey];
//     }

//     // function to fetch all admins
//     // function getAdmins() public view returns (Admin[] memory) {
//     //     require(
//     //         checkSuperAdmin(msg.sender) == true,
//     //         "You are not a allowed to perform this opertation"
//     //     );q
//     //     return admins;
//     // }

//     // -------------------------------------------------------------------------------------------

//     // Admin structure
//     struct Admin {
//         string institution_name;
//         string institution_addr;
//         string institution_contact;
//     }
//     mapping(address => Admin) public admins;

//     // admin functions
//     // function to check if an address is an admin
//     function checkAdmin(address pubkey) public view returns (bool) {
//         return bytes(admins[pubkey].institution_name).length > 0;
//     }

//     // function to add a doctor
//     function addDoctor(
//         string calldata name,
//         string calldata specialization,
//         string calldata contact,
//         address pubkey
//     ) public {
//         require(checkAdmin(msg.sender) == true, "You are not an admin");
//         require(checkDoctor(pubkey) == false, "Doctor already exists");
//         require(bytes(name).length > 0, "Name cannot be empty");
//         require(
//             bytes(specialization).length > 0,
//             "Specialization cannot be empty"
//         );
//         require(bytes(contact).length > 0, "Contact cannot be empty");
//         doctors[pubkey] = Doctor({
//             name: name,
//             specialization: specialization,
//             contact: contact,
//             institution_name: msg.sender
//         });
//     }

//     // function to edit a doctor
//     function editDoctor(
//         string calldata name,
//         string calldata specialization,
//         string calldata contact,
//         address pubkey
//     ) public {
//         require(checkAdmin(msg.sender) == true, "You are not an admin");
//         require(checkDoctor(pubkey) == true, "Doctor does not exist");
//         require(
//             msg.sender != doctors[pubkey].institution_name,
//             "You do not have the permission to edit this doctor"
//         );
//         require(bytes(name).length > 0, "Name cannot be empty");
//         require(
//             bytes(specialization).length > 0,
//             "Specialization cannot be empty"
//         );
//         require(bytes(contact).length > 0, "Contact cannot be empty");
//         doctors[pubkey] = Doctor({
//             name: name,
//             specialization: specialization,
//             contact: contact,
//             institution_name: msg.sender
//         });
//     }

//     // function  to delete a doctor
//     function deleteDoctor(address pubkey) public {
//         require(checkAdmin(msg.sender) == true, "You are not an admin");
//         require(checkDoctor(pubkey) == true, "Doctor does not exist");
//         require(
//             keccak256(abi.encodePacked(msg.sender))!= keccak256(abi.encodePacked(admins[pubkey].institution_name)),
//             "You do not have the permission to delete this doctor"
//         );
//         delete doctors[pubkey];
//     }

//     // function to fetch a single doctor under the admin
//     function getDoctor(address pubkey) public view returns (Doctor memory) {
//         require(checkAdmin(msg.sender) == true, "You are not an admin");
//         require(checkDoctor(pubkey) == true, "Doctor does not exist");
//         require(
//             msg.sender == doctors[pubkey].institution_name,
//             "You do not have the permission to fetch this doctor"
//         );
//         return doctors[pubkey];
//     }

//     // function to fetch a all doctors under the admin's instiution name
//     // function getDoctors() public view returns (Doctor[] memory) {
//     //     require(checkAdmin(msg.sender), "You are not an admin");
//     //     Doctor[] memory _doctors;
//     //     for (uint256 i = 0; i < doctors.length; i++) {
//     //         address pubkey = doctors[i];
//     //         // Check if the admin associated with the doctor's address matches the caller's institution
//     //         if (
//     //             keccak256(abi.encodePacked(admins[pubkey])) ==
//     //             keccak256(abi.encodePacked(admins[msg.sender]))
//     //         ) {
//     //             // Add the doctor to the array
//     //             _doctors.push(doctors[pubkey]);
//     //         }
//     //     }
//     //     return _doctors;
//     // }

//     // -------------------------------------------------------------------------------------------

//     // Doctor structure
//     struct Doctor {
//         string name;
//         string specialization;
//         string contact;
//         address institution_name;
//     }
//     mapping(address => Doctor) public doctors;

//     // doctor functions
//     // function to check if an address is a doctor
//     function checkDoctor(address pubkey) public view returns (bool) {
//         return bytes(doctors[pubkey].name).length > 0;
//     }

//     // function to add a patient
//     function addPatient(
//         string calldata name,
//         uint256 age,
//         string calldata gender,
//         string calldata addr,
//         string calldata contact,
//         address pubkey
//     ) public {
//         require(checkDoctor(msg.sender) == true, "Doctor does not exist");
//         require(bytes(name).length > 0, "Name cannot be empty");
//         require(age > 0, "Age cannot be zero");
//         require(bytes(gender).length > 0, "Gender cannot be empty");
//         require(bytes(addr).length > 0, "Address cannot be empty");
//         require(bytes(contact).length > 0, "Contact cannot be empty");
//         address[] calldata nominees;
//         nominees.push();
//         patients[pubkey] = Patient({
//             name: name,
//             age: age,
//             gender: gender,
//             addr: addr,
//             contact: contact,
//             nominees : nominees
//         });
//     }

//     // function to fetch a patient
//     function getPatient(address pubkey) public view returns (Patient memory) {
//         require(checkDoctor(msg.sender) == true, "Doctor does not exist");
//         require(checkPatient(pubkey) == true, "Patient does not exist");
//         return patients[pubkey];
//     }

//     // function to check read access for a record
//     function checkReadAccess(bytes32 record_hash) public view returns (bool) {
//         require(checkDoctor(msg.sender), "Doctor does not exist");
//         require(checkRecord(record_hash), "Record does not exist");

//         if (records[record_hash].read_allowed_doctors.length > 0) {
//             // Iterate over the read allowed doctors array
//             for (
//                 uint256 i = 0;
//                 i < records[record_hash].read_allowed_doctors.length;
//                 i++
//             ) {
//                 // Check if the current doctor address matches the sender's address
//                 if (
//                     records[record_hash].read_allowed_doctors[i] == msg.sender
//                 ) {
//                     return true;
//                 }
//             }
//         }

//         return false;
//     }

//     // function to check write access for a record
//     function checkWriteAccess(bytes32 record_hash) public view returns (bool) {
//         require(checkDoctor(msg.sender), "Doctor does not exist");
//         require(checkRecord(record_hash), "Record does not exist");

//         if (records[record_hash].write_allowed_doctors.length > 0) {
//             // Iterate over the write allowed doctors array
//             for (
//                 uint256 i = 0;
//                 i < records[record_hash].write_allowed_doctors.length;
//                 i++
//             ) {
//                 // Check if the current doctor address matches the sender's address
//                 if (
//                     records[record_hash].write_allowed_doctors[i] == msg.sender
//                 ) {
//                     return true;
//                 }
//             }
//         }

//         return false;
//     }

//     // function to add a record
//     function addRecord(
//         bytes32 record_hash,
//         address doctor,
//         address patient,
//         string calldata record_title,
//         string calldata record_desc,
//         string calldata record_data
//     ) public {
//         require(checkDoctor(msg.sender) == true, "Doctor does not exist");
//         require(checkPatient(patient) == true, "Patient does not exist");
//         require(checkRecord(record_hash) == false, "Record already exists");
//         address[] memory read_allowed_doctors = [];
//         read_allowed_doctors.push(msg.sender);
//         address[] memory write_allowed_doctors = [];
//         write_allowed_doctors.push(msg.sender);
//         records[record_hash] = Record({
//             doctor: doctor,
//             patient: patient,
//             read_allowed_doctors: read_allowed_doctors,
//             write_allowed_doctors: write_allowed_doctors,
//             record_title: record_title,
//             record_desc: record_desc,
//             record_data: record_data
//         });
//     }

//     // function to fetch a record
//     function getRecord(bytes32 record_hash)
//         public
//         view
//         returns (Record memory)
//     {
//         require(checkDoctor(msg.sender) == true, "Doctor does not exist");
//         require(checkRecord(record_hash) == true, "Record does not exist");
//         require(
//             checkReadAccess(record_hash) == true,
//             "You do not have access to read this record"
//         );
//         return records[record_hash];
//     }

//     // function to edit a record
//     function editRecord(
//         bytes32 record_hash,
//         string calldata record_title,
//         string calldata record_desc,
//         string calldata record_data
//     ) public {
//         require(checkDoctor(msg.sender) == true, "Doctor does not exist");
//         require(checkRecord(record_hash) == true, "Record does not exist");
//         require(
//             checkWriteAccess(record_hash) == true,
//             "You do not have access to write this record"
//         );
//         records[record_hash].record_title = record_title;
//         records[record_hash].record_desc = record_desc;
//         records[record_hash].record_data = record_data;
//     }

//     // -------------------------------------------------------------------------------------------

//     // patient structure
//     struct Patient {
//         string name;
//         uint256 age;
//         string gender;
//         string addr;
//         string contact;
//         address[] nominees;
//     }
//     mapping(address => Patient) public patients;

//     // patient functions
//     // function to check if an address is a patient
//     function checkPatient(address pubkey) public view returns (bool) {
//         return bytes(patients[pubkey].name).length > 0;
//     }

//     // functio to edit patient
//     function editPatient(
//         string calldata name,
//         uint256 age,
//         string calldata gender,
//         string calldata addr,
//         string calldata contact
//     ) public {
//         require(checkPatient(msg.sender) == true, "Patient does not exist");
//         patients[msg.sender].name = name;
//         patients[msg.sender].age = age;
//         patients[msg.sender].gender = gender;
//         patients[msg.sender].addr = addr;
//         patients[msg.sender].contact = contact;
//     }

//     // function to fetch patient records
//     function fetchRecords() public view returns (Record[] memory) {
//         require(checkPatient(msg.sender) == true, "Patient does not exist");
//         Record[] memory _records = [];
//         uint256 count = 0;
//         for (uint256 i = 0; i < records.length; i++) {
//             if (records[i].patient == msg.sender) {
//                 _records[count] = records[i];
//                 count++;
//             }
//         }
//         return _records;
//     }

//     // fetch a single record
//     function fetchRecord(bytes32 record_hash)
//         public
//         view
//         returns (Record memory)
//     {
//         require(checkPatient(msg.sender) == true, "Patient does not exist");
//         require(checkRecord(record_hash) == true, "Record does not exist");
//         require(
//             records[record_hash].patient != msg.sender,
//             "You do not have access to this record"
//         );
//         return records[record_hash];
//     }

//     // function to add a nominee
//     function addNominee(address pubkey, string calldata name) public {
//         require(checkPatient(msg.sender) == true, "Patient does not exist");
//         require(checkPatient(pubkey) == true, "Nominee does not exist");
//         patients[msg.sender].nominees.push(pubkey);
//     }

//     // function to remove a nominee
//     function removeNominee(address pubkey) public {
//         require(checkPatient(msg.sender) == true, "Patient does not exist");
//         require(checkPatient(pubkey) == true, "Nominee does not exist");
//         require(patients[pubkey].nominees < 0, "Nominee does not exist");
//         patients[msg.sender].nominees.remove(pubkey);
//     }

//     // function to fetch nominee's records
//     function fetchNomineeRecords(address pubkey)
//         public
//         view
//         returns (Record[] memory)
//     {
//         require(checkPatient(msg.sender) == true, "Patient does not exist");
//         require(checkPatient(pubkey) == true, "Nominee does not exist");
//         Record[] memory _records = [];
//         uint256 count = 0;

//         for (uint256 i = 0; i < records.length; i++) {
//             if (records[i].patient == pubkey) {
//                 _records[count] = records[i];
//                 count++;
//             }
//         }
//         return _records;
//     }

//     // function to give read access to a doctor by patient
//     function giveReadAccess(bytes32 record_hash, address pubkey) public {
//         require(checkPatient(msg.sender) == true, "Patient does not exist");
//         require(checkDoctor(pubkey) == true, "Doctor does not exist");
//         require(checkRecord(record_hash) == true, "Record does not exist");
//         records[record_hash].read_allowed_doctors.push(pubkey);
//     }

//     // function to give write access to a doctor by patient
//     function giveWriteAccess(bytes32 record_hash, address pubkey) public {
//         require(checkPatient(msg.sender) == true, "Patient does not exist");
//         require(checkDoctor(pubkey) == true, "Doctor does not exist");
//         require(checkRecord(record_hash) == true, "Record does not exist");
//         records[record_hash].write_allowed_doctors.push(pubkey);
//     }

//     // function to remove read access to a doctor by patient
//     function removeReadAccess(bytes32 record_hash, address pubkey) public {
//         require(checkPatient(msg.sender) == true, "Patient does not exist");
//         require(checkDoctor(pubkey) == true, "Doctor does not exist");
//         require(checkRecord(record_hash) == true, "Record does not exist");
//         records[record_hash].read_allowed_doctors.remove(pubkey);
//     }

//     // function to remove write access to a doctor by patient
//     function removeWriteAccess(bytes32 record_hash, address pubkey) public {
//         require(checkPatient(msg.sender) == true, "Patient does not exist");
//         require(checkDoctor(pubkey) == true, "Doctor does not exist");
//         require(checkRecord(record_hash) == true, "Record does not exist");
//         records[record_hash].write_allowed_doctors.remove(pubkey);
//     }

//     // -------------------------------------------------------------------------------------------

//     // record structure
//     struct Record {
//         // hash bytes32 record_hash;
//         address doctor;
//         address patient;
//         address[] read_allowed_doctors;
//         address[] write_allowed_doctors;
//         string record_title;
//         string record_desc;
//         string record_data;
//     }
//     mapping(bytes32 => Record) public records;

//     // record functions
//     // function to check if the record exist or not
//     function checkRecord(bytes32 record_hash) public view returns (bool) {
//         return bytes(records[record_hash].record_title).length > 0;
//     }

//     // -------------------------------------------------------------------------------------------

//     // end of contract
// }
