const SHA256 = require('crypto-js/sha256');

/** class representing a Block of the Blockchain */
class Block{

	/**
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

	/**
	 * returns hashed string representing all information of the block
	 */
	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

/** class representing the Blockchain */
class BlockChain {

	constructor() {
		this.chain = [this.createGenesisBlock()]; 
	}

	/**
	 * crest the first block of the chain
	 */
	createGenesisBlock() {
		return new Block(0, "01/01/2017", "Genesis Block", 0);
	}

	/**
	 * returns the last block of the chain
	 */
	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	/**
	 * adds the previousHash and hash properties - then adds block to chain
	 * @param { Block } newBlock 
	 */
	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	/**
	 * returns true if chain is valid
	 */
	isChainValid() {
		for(let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i -1];

			if(currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if(currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}
}

/** create new instance */
let johnCoin = new BlockChain();
/** add some blocks */
johnCoin.addBlock(new Block(1, "9/21/2017", {amount: 4}));
johnCoin.addBlock(new Block(2, "9/22/2017", {amount: 10}));

console.log(`is blockchain valid? ${johnCoin.isChainValid()}`)

/** try to f with the chain */
johnCoin.chain[1].data = { amount: 100 };
johnCoin.chain[1].hash = johnCoin.chain[1].calculateHash();

console.log(`is blockchain valid? ${johnCoin.isChainValid()}`)


// console.log(JSON.stringify(johnCoin, null, 4));