import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  TrendingUp, 
  Coins, 
  Calendar, 
  ArrowRight,
  Sun,
  TreePine,
  Wind,
  Droplets,
  Leaf,
  BarChart3
} from 'lucide-react';

const Portfolio = () => {
  const { isConnected, publicKey, balance } = useWallet();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  const timeframes = [
    { id: '1W', label: '1 Hafta' },
    { id: '1M', label: '1 Ay' },
    { id: '3M', label: '3 Ay' },
    { id: '1Y', label: '1 Yıl' },
  ];

  const categories = {
    solar: { name: 'Güneş Enerjisi', icon: Sun, color: 'text-yellow-500' },
    wind: { name: 'Rüzgar Enerjisi', icon: Wind, color: 'text-blue-500' },
    forest: { name: 'Ağaçlandırma', icon: TreePine, color: 'text-green-600' },
    water: { name: 'Su Projeleri', icon: Droplets, color: 'text-blue-400' },
  };

  // Mock portfolio data
  const portfolio = {
    totalValue: 1250.50,
    totalInvested: 1000.00,
    totalReturn: 250.50,
    returnPercentage: 25.05,
    tokens: [
      {
        id: 1,
        projectId: 1,
        projectTitle: 'Güneş Enerjisi Çiftliği',
        tokenCode: 'SOLAR01',
        category: 'solar',
        amount: 150.0,
        currentValue: 180.0,
        investedAmount: 150.0,
        returnAmount: 30.0,
        returnPercentage: 20.0,
        purchaseDate: '2024-01-15',
        lastTransaction: '2024-01-15',
      },
      {
        id: 2,
        projectId: 2,
        projectTitle: 'Ağaçlandırma Projesi',
        tokenCode: 'FOREST01',
        category: 'forest',
        amount: 200.0,
        currentValue: 220.0,
        investedAmount: 200.0,
        returnAmount: 20.0,
        returnPercentage: 10.0,
        purchaseDate: '2024-02-01',
        lastTransaction: '2024-02-01',
      },
      {
        id: 3,
        projectId: 3,
        projectTitle: 'Rüzgar Türbini',
        tokenCode: 'WIND01',
        category: 'wind',
        amount: 300.0,
        currentValue: 375.0,
        investedAmount: 300.0,
        returnAmount: 75.0,
        returnPercentage: 25.0,
        purchaseDate: '2024-01-20',
        lastTransaction: '2024-01-20',
      },
      {
        id: 4,
        projectId: 4,
        projectTitle: 'Su Arıtma Tesisi',
        tokenCode: 'WATER01',
        category: 'water',
        amount: 350.0,
        currentValue: 475.5,
        investedAmount: 350.0,
        returnAmount: 125.5,
        returnPercentage: 35.86,
        purchaseDate: '2024-02-10',
        lastTransaction: '2024-02-10',
      },
    ],
    recentTransactions: [
      {
        id: 1,
        type: 'buy',
        projectTitle: 'Su Arıtma Tesisi',
        tokenCode: 'WATER01',
        amount: 350.0,
        date: '2024-02-10',
        status: 'completed',
      },
      {
        id: 2,
        type: 'buy',
        projectTitle: 'Ağaçlandırma Projesi',
        tokenCode: 'FOREST01',
        amount: 200.0,
        date: '2024-02-01',
        status: 'completed',
      },
      {
        id: 3,
        type: 'buy',
        projectTitle: 'Rüzgar Türbini',
        tokenCode: 'WIND01',
        amount: 300.0,
        date: '2024-01-20',
        status: 'completed',
      },
      {
        id: 4,
        type: 'buy',
        projectTitle: 'Güneş Enerjisi Çiftliği',
        tokenCode: 'SOLAR01',
        amount: 150.0,
        date: '2024-01-15',
        status: 'completed',
      },
    ],
  };

  const formatPublicKey = (key) => {
    if (!key) return '';
    return `${key.slice(0, 6)}...${key.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="text-center py-16">
        <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cüzdan Bağlı Değil</h2>
        <p className="text-gray-600 mb-6">
          Portföyünüzü görüntülemek için önce cüzdanınızı bağlayın.
        </p>
        <Link to="/" className="btn-primary">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Portföyüm</h1>
        <p className="text-gray-600">
          Cüzdan: {formatPublicKey(publicKey)} • Bakiye: {balance ? balance.toFixed(2) : '0'} XLM
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3 mb-2">
            <Coins className="h-6 w-6 text-green-primary" />
            <span className="text-sm text-gray-600">Toplam Değer</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₺{portfolio.totalValue.toLocaleString()}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-2">
            <Wallet className="h-6 w-6 text-blue-primary" />
            <span className="text-sm text-gray-600">Toplam Yatırım</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₺{portfolio.totalInvested.toLocaleString()}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="h-6 w-6 text-green-primary" />
            <span className="text-sm text-gray-600">Toplam Getiri</span>
          </div>
          <div className="text-2xl font-bold text-green-primary">
            +₺{portfolio.totalReturn.toLocaleString()}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="h-6 w-6 text-purple-primary" />
            <span className="text-sm text-gray-600">Getiri Oranı</span>
          </div>
          <div className="text-2xl font-bold text-green-primary">
            +%{portfolio.returnPercentage}
          </div>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Portföy Performansı</h2>
          <div className="flex space-x-2">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe.id
                    ? 'bg-green-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Grafik yakında eklenecek</p>
          </div>
        </div>
      </div>

      {/* Token Holdings */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Token Varlıklarım</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Proje</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Token</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Miktar</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Güncel Değer</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Getiri</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.tokens.map((token) => {
                const category = categories[token.category];
                const IconComponent = category.icon;
                
                return (
                  <tr key={token.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`h-5 w-5 ${category.color}`} />
                        <div>
                          <div className="font-medium text-gray-900">{token.projectTitle}</div>
                          <div className="text-sm text-gray-600">{token.tokenCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-gray-900">{token.tokenCode}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="font-medium text-gray-900">{token.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">₺{token.investedAmount.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="font-medium text-gray-900">₺{token.currentValue.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className={`font-medium ${token.returnAmount >= 0 ? 'text-green-primary' : 'text-red-500'}`}>
                        {token.returnAmount >= 0 ? '+' : ''}₺{token.returnAmount.toLocaleString()}
                      </div>
                      <div className={`text-sm ${token.returnPercentage >= 0 ? 'text-green-primary' : 'text-red-500'}`}>
                        {token.returnPercentage >= 0 ? '+' : ''}%{token.returnPercentage.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to={`/projects/${token.projectId}`}
                        className="inline-flex items-center space-x-1 text-green-primary hover:text-green-secondary font-medium"
                      >
                        <span>Görüntüle</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Son İşlemler</h2>
        
        <div className="space-y-4">
          {portfolio.recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'buy' ? (
                    <TrendingUp className="h-5 w-5 text-green-primary" />
                  ) : (
                    <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {transaction.type === 'buy' ? 'Token Satın Alındı' : 'Token Satıldı'}
                  </div>
                  <div className="text-sm text-gray-600">{transaction.projectTitle}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-gray-900">
                  {transaction.type === 'buy' ? '-' : '+'}₺{transaction.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{transaction.tokenCode}</div>
                <div className="text-xs text-gray-500">{transaction.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 