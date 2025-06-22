import { Horizon } from '@stellar/stellar-sdk';
//const { Horizon } = require('@stellar/stellar-sdk');

const publicKey = 'GC3HCKKMQNJY6DNCTYPLTRV7WPNYSHDFICFLJ74GKSUSUQJL5IFH5BVU';

const server = new Horizon.Server('https://horizon-testnet.stellar.org');

async function checkBalance() {
  try {
    const account = await server.loadAccount(publicKey);
    account.balances.forEach(balance => {
      console.log(`Varlık: ${balance.asset_type}, Miktar: ${balance.balance}`);
    });
  } catch (err) {
    console.error('Hata:', err);
  }
}

checkBalance();
