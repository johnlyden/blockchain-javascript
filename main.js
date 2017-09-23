const SHA256 = require('crypto-js/sha256');

/*
* class Block
*/
class Block {
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash(); 
	}
	/*
	* hashing function
	* returns hashed result of string of all info 
	*/
	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class BlockChain {
	constructor() {
		this.chain = [];
	}
}
