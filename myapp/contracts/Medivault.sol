// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Medivault {
    // Patient
    struct Patient {
        string name;
        uint age;
        string gender;
        string addr;
        string contact;
        Nominee nominee;
    }
    struct Nominee {
        string name;
        address pubkey;
    }
    struct Record {
        address patient;
        uint256 timestamp;
        string description;
        address doctor;
        string prescription;
        string remarks;
    }

    // doctor
    struct Doctor {
        string name;
        uint age;
        string gender;
        string addr;
        string contact;
    }

    // admin
    struct Admin {
        string institution_name;
        string institution_addr;
        string institution_contact;
    }

    // appointment
    struct Appointment {
        address patient;
        uint256 timestamp;
        uint256 time_of_appointment;
        string description;
        address doctor;
    }

    // mapping
    mapping(address => Patient) public patients;
    mapping(bytes32 => Record) public records;
    mapping(address => Doctor) public doctors;
    mapping(address => Admin) public admins;
    mapping(bytes32 => Appointment) public appointments;

    // function to check if an address is an admin
    function checkAdmin(address pubkey) public view returns (bool) {
        return bytes(admins[pubkey].institution_name).length > 0;
    }

    // function to check if an address is a doctor
    function checkDoctor(address pubkey) public view returns (bool) {
        return bytes(doctors[pubkey].name).length > 0;
    }

    // function to check if an address is a patient
    function checkPatient(address pubkey) public view returns (bool) {
        return bytes(patients[pubkey].name).length > 0;
    }

    // function to add an admin 
    function addAdmin(string calldata institution_name , string calldata institution_addr , string calldata institution_contact)external {
        require(checkAdmin(msg.sender) == false, "Admin already exists");
        require(bytes(institution_name).length > 0, "Institution name cannot be empty");
        require(bytes(institution_addr).length > 0, "Institution address cannot be empty");
        require(bytes(institution_contact).length > 0, "Institution contact cannot be empty");
        admins[msg.sender] = Admin({
            institution_name: institution_name,
            institution_addr: institution_addr ,
            institution_contact: institution_contact
        });

    }

    // function to add a doctor
    function addDoctor(string calldata name , uint256 age , string calldata gender , string calldata addr , string calldata contact)external {
        require(checkDoctor(msg.sender) == false, "Doctor already exists");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(age > 0, "Age cannot be zero");
        require(bytes(gender).length > 0, "Gender cannot be empty");
        require(bytes(addr).length > 0, "Address cannot be empty");
        require(bytes(contact).length > 0, "Contact cannot be empty");
        doctors[msg.sender] = Doctor({
            name: name,
            age: age,
            gender: gender,
            addr: addr,
            contact: contact
        });
    }

    // function to add a patient
    function addPatient(string calldata name , uint256 age , string calldata gender , string calldata addr , string calldata contact)external {
        require(checkPatient(msg.sender) == false, "Patient already exists");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(age > 0, "Age cannot be zero");
        require(bytes(gender).length > 0, "Gender cannot be empty");
        require(bytes(addr).length > 0, "Address cannot be empty");
        require(bytes(contact).length > 0, "Contact cannot be empty");
        patients[msg.sender] = Patient({
            name: name,
            age: age,
            gender: gender,
            addr: addr,
            contact: contact,
            nominee : Nominee({name: name, pubkey: msg.sender})
        });
    }

    // function to add a record
    function addRecord( address patient,string calldata description , string calldata prescription , string calldata remarks) external {
        require(checkDoctor(msg.sender) == false, "You are not a doctor");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(prescription).length > 0, "Prescription cannot be empty");
        require(bytes(remarks).length > 0, "Remarks cannot be empty");
        records[keccak256(abi.encodePacked(msg.sender, block.timestamp))] = Record({
            patient: address(patient),
            timestamp: block.timestamp,
            description: description,
            doctor: msg.sender,
            prescription: prescription,
            remarks: remarks
        });
    }  

    function addAppointment( address doctor , string calldata description , uint256 calldata time_of_appointment) external {
        require(checkPatient(msg.sender) == false, "You are not a patient");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(time_of_appointment > block.timestamp, "Time of appointment cannot be in the past");
        patients[patient].nominee.pubkey = msg.sender;
        patients[patient].nominee.name = patients[msg.sender].name;
        
        appointments[keccak256(abi.encodePacked(msg.sender, block.timestamp))] = Appointment({
            patient: msg.sender,
            timestamp: block.timestamp,
            description: description,
            doctor: address(doctor)
        });
    }
