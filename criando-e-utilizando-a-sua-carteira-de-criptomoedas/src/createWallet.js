const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

const network = bitcoin.networks.testnet;

const derivationPath = `m/49'/1'/0'/0`;


let mnemonic = bip39.generateMnemonic(); 
const seed = bip39.mnemonicToSeedSync(mnemonic); 


let root = bip32.fromSeed(seed, network); 


let account = root.derivePath(derivationPath); 
let node = account.derive(0).derive(0); 

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Carteira gerada com sucesso");
console.log("Endereço BTC:", btcAddress);
console.log("Chave privada (WIF):", node.toWIF());
console.log("Seed (Mnemonic):", mnemonic);