// Importando as dependências necessárias para a geração de carteiras Bitcoin HD
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Definir a rede
// Bitcoin - rede principal (mainnet)
// Testnet - rede de teste (testnet)
const network = bitcoin.networks.testnet; // Usando a rede de teste para fins de desenvolvimento

// Definindo o caminho de derivação para carteiras HD (Hierarchical Deterministic)
// Neste caso, estamos utilizando o caminho m/49'/1'/0'/0, padrão para endereços P2PKH na Testnet
const derivationPath = `m/49'/1'/0'/0`;

// Gerando o mnemonic (frase de recuperação) para criar a seed (semente)
let mnemonic = bip39.generateMnemonic(); // Gerando 12 palavras aleatórias
const seed = bip39.mnemonicToSeedSync(mnemonic); // Convertendo o mnemonic em uma seed

// Criando a raiz da carteira HD (Hierarchical Deterministic Wallet)
let root = bip32.fromSeed(seed, network); // Gerando a raiz da carteira a partir da seed e da rede escolhida

// Criando uma conta derivada - par de chaves privada/pública
let account = root.derivePath(derivationPath); // Derivando a conta a partir do caminho de derivação
let node = account.derive(0).derive(0); // Derivando a primeira chave da conta

// Gerando o endereço Bitcoin a partir da chave pública
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

// Exibindo as informações geradas
console.log("Carteira gerada com sucesso");
console.log("Endereço BTC:", btcAddress);
console.log("Chave privada (WIF):", node.toWIF());
console.log("Seed (Mnemonic):", mnemonic);
