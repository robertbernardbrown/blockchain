const { Blockchain, Transaction } = require('./blockchain');

let blockchain = new Blockchain();

console.log(blockchain);

// blockchain.createTransaction(new Transaction('address1', 'address2', 200));
// blockchain.createTransaction(new Transaction('address2', 'address1', 50));

// console.log('\n Starting the miner');

// blockchain.minePendingTransactions('bob_address');

// console.log('\n Balance of Bob is: ', blockchain.getBalanceOfAddress('bob_address'));

// blockchain.minePendingTransactions('bob_address');

// console.log('\n Balance of Bob is: ', blockchain.getBalanceOfAddress('bob_address'));

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
