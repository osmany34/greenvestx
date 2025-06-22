import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp, 
  Sun, 
  TreePine, 
  Wind, 
  Droplets,
  Leaf,
  X,
  Wallet,
  AlertCircle
} from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const { isConnected, balance, sendPayment } = useWallet();
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = {
    solar: { name: 'Güneş Enerjisi', icon: Sun, color: 'text-yellow-500' },
    wind: { name: 'Rüzgar Enerjisi', icon: Wind, color: 'text-blue-500' },
    forest: { name: 'Ağaçlandırma', icon: TreePine, color: 'text-green-600' },
    water: { name: 'Su Projeleri', icon: Droplets, color: 'text-blue-400' },
  };

  const project = {
    id: 1,
    title: 'Güneş Enerjisi Çiftliği',
    description: 'Antalya\'da 5MW güneş enerjisi santrali kurulumu. Bu proje ile yıllık 7.5GWh elektrik üretimi hedefleniyor. Proje tamamlandığında yaklaşık 2,000 haneye elektrik sağlanacak ve yıllık 3,500 ton CO₂ emisyonu azaltılacak.',
    category: 'solar',
    goal: 500000,
    raised: 320000,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    location: 'Antalya, Türkiye',
    duration: '18 ay',
    expectedReturn: '12%',
    investors: 156,
    tokenCode: 'SOLAR01',
    tokenPrice: 1.0, // 1 XLM = 1 token
    projectOwner: 'GCRX...ABCD',
    startDate: '2024-01-15',
    endDate: '2025-07-15',
    details: [
      '5MW güneş paneli kurulumu',
      'Yıllık 7.5GWh elektrik üretimi',
      '2,000 haneye elektrik sağlanması',
      'Yıllık 3,500 ton CO₂ tasarrufu',
      '25 yıl garanti süresi',
      'Akıllı şebeke entegrasyonu'
    ],
    timeline: [
      { date: '2024-01-15', title: 'Proje Başlangıcı', description: 'Arazi hazırlığı ve izin süreçleri' },
      { date: '2024-03-01', title: 'İnşaat Başlangıcı', description: 'Panel kurulumu ve altyapı çalışmaları' },
      { date: '2024-09-01', title: 'Test Süreci', description: 'Sistem testleri ve optimizasyon' },
      { date: '2024-12-01', title: 'Üretim Başlangıcı', description: 'Ticari elektrik üretimi' },
      { date: '2025-07-15', title: 'Proje Tamamlanması', description: 'Tam kapasite üretim' }
    ]
  };

  const category = categories[project.category];
  const progress = (project.raised / project.goal) * 100;
  const IconComponent = category.icon;

  const handleInvestment = async () => {
    if (!isConnected) {
      alert('Önce cüzdanınızı bağlayın');
      return;
    }

    const amount = parseFloat(investmentAmount);
    if (!amount || amount <= 0) {
      alert('Geçerli bir miktar girin');
      return;
    }

    if (amount > balance) {
      alert('Yetersiz bakiye');
      return;
    }

    setIsProcessing(true);
    try {
      // Gerçek uygulamada burada proje sahibinin cüzdan adresine ödeme yapılır
      await sendPayment(project.projectOwner, amount);
      
      // Token dağıtımı (gerçek uygulamada Stellar asset issuance yapılır)
      const tokensToReceive = amount * project.tokenPrice;
      
      alert(`Yatırım başarılı! ${tokensToReceive} ${project.tokenCode} token kazandınız.`);
      setShowInvestmentModal(false);
      setInvestmentAmount('');
    } catch (error) {
      alert('Yatırım işlemi başarısız: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        to="/projects"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Projelere Dön</span>
      </Link>

      {/* Project Header */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Project Image */}
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Project Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <IconComponent className={`h-5 w-5 ${category.color}`} />
              <span className="text-sm font-medium text-gray-600">{category.name}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">₺{project.goal.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Hedef</div>
            </div>
            <div className="bg-green-light p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-primary">₺{project.raised.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Toplanan</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-primary">%{project.expectedReturn}</div>
              <div className="text-sm text-gray-600">Beklenen Getiri</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-primary">{project.investors}</div>
              <div className="text-sm text-gray-600">Yatırımcı</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">İlerleme</span>
              <span className="font-semibold">%{Math.round(progress)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{project.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{project.duration}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{project.investors} yatırımcı</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">%{project.expectedReturn} yıllık getiri</span>
            </div>
          </div>

          {/* Investment Button */}
          <button
            onClick={() => setShowInvestmentModal(true)}
            className="btn-primary w-full py-4 text-lg font-semibold"
            disabled={progress >= 100}
          >
            {progress >= 100 ? 'Proje Tamamlandı' : 'Yatırım Yap'}
          </button>
        </div>
      </div>

      {/* Project Details Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Proje Detayları</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Proje Özellikleri</h3>
            <ul className="space-y-2">
              {project.details.map((detail, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Proje Zaman Çizelgesi</h3>
            <div className="space-y-4">
              {project.timeline.map((item, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-green-primary rounded-full"></div>
                    {index < project.timeline.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-300 mt-1"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Yatırım Yap</h3>
              <button
                onClick={() => setShowInvestmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yatırım Miktarı (XLM)
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Alacağınız Token:</span>
                  <span className="font-semibold">
                    {investmentAmount ? (parseFloat(investmentAmount) * project.tokenPrice).toFixed(2) : '0'} {project.tokenCode}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mevcut Bakiye:</span>
                  <span className="font-semibold">{balance ? balance.toFixed(2) : '0'} XLM</span>
                </div>
              </div>

              {!isConnected && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">
                      Yatırım yapmak için önce cüzdanınızı bağlayın
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowInvestmentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  onClick={handleInvestment}
                  disabled={!isConnected || isProcessing}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'İşleniyor...' : 'Yatırım Yap'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail; 