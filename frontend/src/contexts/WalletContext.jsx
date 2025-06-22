import { createContext, useContext, useState, useEffect } from 'react';
import { StellarSdk } from '@stellar/stellar-sdk';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(null);

  // Test ağı için StellarSdk yapılandırması
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

  const connectWallet = async () => {
    try {
      // Gerçek uygulamada burada Freighter veya diğer Stellar cüzdanları ile bağlantı kurulur
      // Şimdilik test için rastgele bir anahtar oluşturalım
      const keypair = StellarSdk.Keypair.random();
      setWallet(keypair);
      setPublicKey(keypair.publicKey());
      setIsConnected(true);
      
      // Test hesabı oluştur (gerçek uygulamada bu adım atlanır)
      await createTestAccount(keypair.publicKey());
      
      // Bakiye sorgula
      await fetchBalance(keypair.publicKey());
      
      return keypair;
    } catch (error) {
      console.error('Cüzdan bağlantı hatası:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setPublicKey(null);
    setIsConnected(false);
    setBalance(null);
  };

  const createTestAccount = async (publicKey) => {
    try {
      const response = await fetch(
        `https://horizon-testnet.stellar.org/friendbot?addr=${publicKey}`
      );
      const data = await response.json();
      console.log('Test hesabı oluşturuldu:', data);
    } catch (error) {
      console.error('Test hesabı oluşturma hatası:', error);
    }
  };

  const fetchBalance = async (publicKey) => {
    try {
      const account = await server.loadAccount(publicKey);
      const xlmBalance = account.balances.find(b => b.asset_type === 'native');
      setBalance(xlmBalance ? parseFloat(xlmBalance.balance) : 0);
    } catch (error) {
      console.error('Bakiye sorgulama hatası:', error);
      setBalance(0);
    }
  };

  const sendPayment = async (destination, amount, asset = 'XLM') => {
    if (!wallet || !isConnected) {
      throw new Error('Cüzdan bağlı değil');
    }

    try {
      const account = await server.loadAccount(wallet.publicKey());
      
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destination,
            asset: StellarSdk.Asset.native(),
            amount: amount.toString(),
          })
        )
        .setTimeout(30)
        .build();

      transaction.sign(wallet);
      
      const result = await server.submitTransaction(transaction);
      console.log('Ödeme başarılı:', result);
      
      // Bakiye güncelle
      await fetchBalance(wallet.publicKey());
      
      return result;
    } catch (error) {
      console.error('Ödeme hatası:', error);
      throw error;
    }
  };

  const value = {
    wallet,
    publicKey,
    isConnected,
    balance,
    connectWallet,
    disconnectWallet,
    sendPayment,
    fetchBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 