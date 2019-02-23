const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, data) {
    this.index = index;
    this.timestamp = new Date();
    this.data = data;
    this.hash = ''
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, 'Genesis Block')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
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
blockchain.addBlock(new Block(1, { amount: 7 }))
console.log(blockchain.chain[1].hash);
blockchain.addBlock(new Block(2, { amount: 10 }))
console.log('Is it valid: ', blockchain.isChainValid());
blockchain.addBlock(new Block(3, { amount: 10 }))
blockchain.addBlock(new Block(4, { amount: 10 }))
blockchain.addBlock(new Block(4, { amount: 10 }))
let goodHash = blockchain.chain[1].hash;
console.log(goodHash);
blockchain.chain[1].data = 300;
blockchain.chain[1].hash = goodHash;
console.log('Is it valid: ', blockchain.isChainValid());


// console.log(JSON.stringify(blockchain, null, 4));
// console.log(blockchain)
