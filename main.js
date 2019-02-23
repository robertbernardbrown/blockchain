const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, data) {
    this.index = index;
    this.timestamp = new Date();
    this.data = data;
    this.hash = '';
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: ", this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, 'Genesis Block');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    newBlock.index = this.chain.length;
    this.chain.push(newBlock);
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      return true;
    }
  }
}

let blockchain = new Blockchain();
console.log("Mining block 1...")
blockchain.addBlock(new Block(1, { amount: 7 }))
console.log("Mining block 2...")
blockchain.addBlock(new Block(2, { amount: 10 }))

// tampering with blockchain to create valid chain after tampering with a block
// let blockchain = new Blockchain();
// blockchain.addBlock(new Block(1, { amount: 7 }))
// blockchain.addBlock(new Block(2, { amount: 10 }))
// console.log('Is it valid: ', blockchain.isChainValid());
// blockchain.addBlock(new Block(3, { amount: 10 }))
// blockchain.addBlock(new Block(4, { amount: 10 }))
// blockchain.chain[1].data = 300;
// blockchain.chain[1].hash = blockchain.chain[1].calculateHash();
// blockchain.chain[2].hash = blockchain.chain[2].calculateHash();
// blockchain.chain[3].hash = blockchain.chain[3].calculateHash();
// blockchain.chain[4].hash = blockchain.chain[4].calculateHash();
// console.log('Is it valid: ', blockchain.isChainValid());


// console.log(JSON.stringify(blockchain, null, 4));
// console.log(blockchain)
