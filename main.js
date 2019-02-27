const SHA256 = require('crypto-js/sha256');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(transactions, previousHash = '') {
    this.timestamp = new Date();
    this.previousHash = previousHash
    this.transactions = transactions;
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
    console.log("Block mined:", this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block('Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(this.pendingTransactions, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);
    console.log('Block successfully mined');
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
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

blockchain.createTransaction(new Transaction('address1', 'address2', 200));
blockchain.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner');

blockchain.minePendingTransactions('bob_address');

console.log('\n Balance of Bob is: ', blockchain.getBalanceOfAddress('bob_address'));

blockchain.minePendingTransactions('bob_address');

console.log('\n Balance of Bob is: ', blockchain.getBalanceOfAddress('bob_address'));

// used to test blockchain with POW
// console.log("Mining block 1...")
// blockchain.addBlock(new Block(1, { amount: 7 }))
// console.log("Mining block 2...")
// blockchain.addBlock(new Block(2, { amount: 10 }))

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
