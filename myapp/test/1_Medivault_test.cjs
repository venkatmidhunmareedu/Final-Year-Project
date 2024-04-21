const Web3 = require('web3');
const { assert } = require('chai');

// Update the URL with the appropriate RPC endpoint
const web3 = new Web3('http://localhost:7545');

// Load the compiled contract artifacts
const contractJSON = require('./build/contracts/Medivault.json');

// Get contract ABI and bytecode
const abi = contractJSON.abi;
const bytecode = contractJSON.bytecode;

// Deployed contract instance
let medivault;

// Contract address (update with deployed contract address)
const contractAddress = '0x7c023095A7B3FE330d7Ea81918e3E2Ed858f632e';

// Initialize contract instance
before(async () => {
    medivault = new web3.eth.Contract(abi, contractAddress);
});

describe('Medivault Contract Tests', () => {
    it('should add a super admin', async () => {
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts:', accounts);
        const adminCountBefore = await medivault.methods.getAllSuperAdmins().call();
        console.log('Admin Count Before:', adminCountBefore);
        await medivault.methods.addSuperAdmin(accounts[1], "Super Admin 2").send({ from: accounts[0] });
        const adminCountAfter = await medivault.methods.getAllSuperAdmins().call();
        console.log('Admin Count After:', adminCountAfter);
        assert.equal(adminCountAfter.length, adminCountBefore.length + 1, 'Super admin not added successfully');
    });
    // Add more test cases as needed
});
