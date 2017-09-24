const SHA256 = require('crypto-js/sha256');

/** class representing a Block of the Blockchain */
class Block{

	/**
	 * 
	 * @param { Number } index 
	 * @param { String } timestamp 
	 * @param { Object } data 
	 * @param { String } previousHash 
	 */
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash(); 
	}

	// returns a hashed string of all information of this block
	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

/** class representing the Blockchain */
class BlockChain {

	constructor() {
		this.chain = [this.createGenesisBlock()]; 
	}

	// create the first block of the chain
	createGenesisBlock() {
		return new Block(0, "01/01/2017", "Genesis Block", 0);
	}

	// returns the latest block
	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

let johnCoin = new BlockChain();

johnCoin.addBlock(new Block(1, "9/21/2017", {amount: 4}));
johnCoin.addBlock(new Block(2, "9/22/2017", {amount: 10}));

console.log(JSON.stringify(johnCoin, null, 4));