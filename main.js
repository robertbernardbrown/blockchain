const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('f21a2ea3bd9844eca40dda81907ca699486093e8b2e72b56c3e22b6e84f64876');
const myWalletAddress = myKey.getPublic('hex');

let blockchain = new Blockchain();

// testing signatures

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
blockchain.addTransaction(tx1);

console.log('Starting the miner: ')
blockchain.minePendingTransactions(myWalletAddress);

console.log('\n Balance of Bob is: ', blockchain.getBalanceOfAddress(myWalletAddress));

console.log('Starting the miner: ')
blockchain.minePendingTransactions(myWalletAddress);

console.log('\n Balance of Bob is: ', blockchain.getBalanceOfAddress(myWalletAddress));
console.log('Is chain valid: ', blockchain.isChainValid());

// below was testing mining code

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
