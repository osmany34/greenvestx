const stellarSdk = require('@stellar/stellar-sdk');

const Server = stellarSdk.Horizon?.Server || stellarSdk.rpc?.Server;
const Keypair = stellarSdk.Keypair;
const Networks = stellarSdk.Networks;
const TransactionBuilder = stellarSdk.TransactionBuilder;
const Operation = stellarSdk.Operation;
const Asset = stellarSdk.Asset;

if (!Server) {
  throw new Error('Server constructor bulunamadı!');
}

const senderSecret = 'SB3HCKKMQNJY6DNCTYPLTRV7WPNYSHDFICFLJ74GKSUSUQJL5IFSECRE';
const receiverPublic = 'GC3HCKKMQNJY6DNCTYPLTRV7WPNYSHDFICFLJ74GKSUSUQJL5IFH5BVU';

const server = new Server('https://horizon-testnet.stellar.org');
const sourceKeypair = Keypair.fromSecret(senderSecret);

async function sendPayment() {
  try {
    const account = await server.loadAccount(sourceKeypair.publicKey());
    const fee = await server.fetchBaseFee();

    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.TESTNET
    })
      .addOperation(Operation.payment({
        destination: receiverPublic,
        asset: Asset.native(),
        amount: '10'
      }))
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);

    const result = await server.submitTransaction(transaction);
    console.log('Transfer başarılı! İşlem hash:', result.hash);
  } catch (err) {
    console.error('Transfer hatası:', err.response?.data || err.message);
  }
}

sendPayment();
