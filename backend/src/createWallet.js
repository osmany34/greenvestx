const StellarSdk = require('@stellar/stellar-sdk');

// Yeni bir anahtar çifti (cüzdan) oluştur
const pair = StellarSdk.Keypair.random();

console.log('Public Key (Cüzdan Adresi):', pair.publicKey());
console.log('Secret Key (Gizli Anahtar):', pair.secret());