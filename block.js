const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(transactions, previousHash = '') {
    this.timestamp = new Date();
    this.previousHash = previousHash;
    this.transactions = transactions;
    this.hash = '';
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined:", this.hash);
  }

  hasValidTransaction() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
      return true;
    }
  }
}

module.exports.Block = Block;