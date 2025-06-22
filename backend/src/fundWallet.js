const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const publicKey = 'GC3HCKKMQNJY6DNCTYPLTRV7WPNYSHDFICFLJ74GKSUSUQJL5IFH5BVU'; // Örn: 'GB...'

async function fundWallet() {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${publicKey}`
    );
    if (response.ok) {
      console.log('Cüzdan testnet üzerinde aktive edildi!');
    } else {
      console.log('Aktivasyon başarısız:', await response.text());
    }
  } catch (err) {
    console.error('Hata:', err);
  }
}


fundWallet();