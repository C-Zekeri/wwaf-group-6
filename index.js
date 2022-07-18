// initialize crypto-js library
const SHA256 = require('crypto-js/sha256');

// creating cryptoBlock Classes
class Block {
    constructor(index, timestamp, data, precedingHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
        this.nonce = 0;
    }
    // updating hash block
    computeHash() {
        return SHA256(this.index + this.timestamp + this.precedingHash + JSON.stringify(this.data) + this.nonce).toString();
    }
    // adding proof of work to the blockchain
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.computeHash();
        }

        console.log(`Block mined: ${this.hash}`);
    }
}

class Blockchain {
    constructor() {
        this.blockchain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "17/01/2022", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.precedingHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.blockchain.push(newBlock);
    }
    checkValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const previousBlock = this.blockchain[i - 1];

            if (currentBlock.precedingHash !== previousBlock.hash || currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }

            return true;
        }
    }
}

//TESTS
let patientData = new Blockchain;
patientData.addNewBlock(new Block(1, "16/07/2022", { name: "Ade Okin", weight: "75 kg", sex: "male", genotype: "AA" }));
patientData.addNewBlock(new Block(2, "17/07/2022", { name: "Esther Obi", weight: "65 kg", sex: "female", genotype: "AS" }));
console.log(JSON.stringify(patientData, null, 4));

console.log("Is Blockchain valid?" + patientData.checkValidity());


