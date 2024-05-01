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

    function fetchSuperadmin(
        address _address
    ) public view returns (SuperAdmin memory) {
        require(checkSuperAdmin(msg.sender), "Sender is not a super admin");
        return superAdmins[_address];
    }

    function addAdmin(
        string calldata institution_name,
        address _address
    ) public {
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

    function editAdmin(
        address pubkey,
        string memory institution_name
    ) public returns (bool) {
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
    function getRecord(
        bytes32 record_hash
    ) public view returns (Record memory) {
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

    function editPatient(
        string calldata name,
        uint256 age,
        string calldata gender,
        string calldata addr,
        string calldata contact
    ) public {
        address[] memory nominees;
        address institution = patients[msg.sender].institution;
        patients[msg.sender] = Patient({
            name: name,
            age: age,
            gender: gender,
            addr: addr,
            contact: contact,
            institution: institution,
            nominees: nominees
        });
    }

    // function to fetch all records
    function getAllRecords() public view returns (Record[] memory) {
        Record[] memory _records = new Record[](recordHashes.length);
        for (uint256 i = 0; i < recordHashes.length; i++) {
            _records[i] = records[recordHashes[i]];
        }
        return _records;
    }

    // function to fetch all records of a particular patient
    struct RecordWithHash {
        bytes32 recordHash;
        Record recordData;
    }

    function getAllRecordsOfPatient(
        address patient
    ) public view returns (RecordWithHash[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < recordHashes.length; i++) {
            if (records[recordHashes[i]].patient == patient) {
                count++;
            }
        }

        RecordWithHash[] memory _records = new RecordWithHash[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < recordHashes.length; i++) {
            if (records[recordHashes[i]].patient == patient) {
                _records[index] = RecordWithHash({
                    recordHash: recordHashes[i],
                    recordData: records[recordHashes[i]]
                });
                index++;
            }
        }

        return _records;
    }

    //function to fetch all the  read access members
    function getReadAccessMembers(
        bytes32 record_hash
    ) public view returns (address[] memory) {
        Record memory record = records[record_hash];
        return record.read_allowed_doctors;
    }

    //function to fetch all the  write access members
    function getWriteAccessMembers(
        bytes32 record_hash
    ) public view returns (address[] memory) {
        Record memory record = records[record_hash];
        return record.write_allowed_doctors;
    }

    function addMemberToReadAccess(bytes32 record_hash, address member) public {
        Record storage record = records[record_hash]; // Use 'storage' instead of 'memory'
        record.read_allowed_doctors.push(member); // Use 'push' to add to dynamic array
        records[record_hash] = record; // Update the stored record
    }

    //function to add member to write access of the record
    function addMemberToWriteAccess(
        bytes32 record_hash,
        address member
    ) public {
        Record storage record = records[record_hash]; // Use 'storage' instead of 'memory'
        record.write_allowed_doctors.push(member); // Use 'push' to add to dynamic array
        records[record_hash] = record; // Update the stored record
    }

    // function to revoke read access of the record
    function revokeReadAccess(bytes32 record_hash, address member) public {
        Record storage record = records[record_hash];
        for (uint256 i = 0; i < record.read_allowed_doctors.length; i++) {
            if (record.read_allowed_doctors[i] == member) {
                record.read_allowed_doctors[i] = record.read_allowed_doctors[
                    record.read_allowed_doctors.length - 1
                ];
                record.read_allowed_doctors.pop();
                break;
            }
        }
        records[record_hash] = record;
    }

    // function to revoke write access of the record with bool returns
    function revokeWriteAccess(
        bytes32 record_hash,
        address member
    ) public returns (bool) {
        Record storage record = records[record_hash];
        for (uint256 i = 0; i < record.write_allowed_doctors.length; i++) {
            if (record.write_allowed_doctors[i] == member) {
                record.write_allowed_doctors[i] = record.write_allowed_doctors[
                    record.write_allowed_doctors.length - 1
                ];
                record.write_allowed_doctors.pop();
                break;
            }
        }
        records[record_hash] = record;
        return true;
    }

    // function to add a nominee to a patient and returns a boolean
    function addNominee(address nominee) public returns (bool) {
        // check if the nominee is a patient
        if (!checkPatient(nominee)) {
            return false;
        }
        patients[msg.sender].nominees.push(nominee);
        return true;
    }

    // function addNominee(address nominee) public {
    //     patients[msg.sender].nominees[
    //         patients[msg.sender].nominees.length
    //     ] = nominee;
    // }

    //function to fetch a patient's nominees
    function getNominees(
        address pubkey
    ) public view returns (address[] memory) {
        return patients[pubkey].nominees;
    }

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
}
