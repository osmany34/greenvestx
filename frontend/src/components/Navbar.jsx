import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { isConnected, publicKey, balance, connectWallet, disconnectWallet } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Cüzdan bağlantı hatası:', error);
    }
  };

  const formatPublicKey = (key) => {
    if (!key) return '';
    return `${key.slice(0, 6)}...${key.slice(-4)}`;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-primary" />
            <span className="text-xl font-bold text-gray-900">GreenVestX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-primary transition-colors">
              Ana Sayfa
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-green-primary transition-colors">
              Projeler
            </Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-green-primary transition-colors">
              Portföyüm
            </Link>
          </div>

          {/* Wallet Connection */}
          <div className="hidden md:flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-600">
                  <div className="font-medium">{formatPublicKey(publicKey)}</div>
                  <div className="text-xs">{balance ? `${balance.toFixed(2)} XLM` : 'Yükleniyor...'}</div>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="btn-secondary text-sm px-3 py-1"
                >
                  Bağlantıyı Kes
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="btn-primary flex items-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Cüzdan Bağla</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-green-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                to="/projects"
                className="text-gray-700 hover:text-green-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projeler
              </Link>
              <Link
                to="/portfolio"
                className="text-gray-700 hover:text-green-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portföyüm
              </Link>
              
              {/* Mobile Wallet Connection */}
              <div className="pt-4 border-t border-gray-100">
                {isConnected ? (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">{formatPublicKey(publicKey)}</div>
                      <div className="text-xs">{balance ? `${balance.toFixed(2)} XLM` : 'Yükleniyor...'}</div>
                    </div>
                    <button
                      onClick={() => {
                        disconnectWallet();
                        setIsMenuOpen(false);
                      }}
                      className="btn-secondary w-full text-sm"
                    >
                      Bağlantıyı Kes
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleConnectWallet();
                      setIsMenuOpen(false);
                    }}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Cüzdan Bağla</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 