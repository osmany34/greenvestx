import { Link } from 'react-router-dom';
import { Leaf, TrendingUp, Users, Globe, ArrowRight, Sun, TreePine, Wind } from 'lucide-react';

const Home = () => {
  const stats = [
    { label: 'Toplam Yatırım', value: '₺2.5M', icon: TrendingUp },
    { label: 'Aktif Proje', value: '24', icon: Leaf },
    { label: 'Yatırımcı', value: '1,247', icon: Users },
    { label: 'CO₂ Tasarrufu', value: '45.2T', icon: Globe },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'Güneş Enerjisi Çiftliği',
      description: 'Antalya\'da 5MW güneş enerjisi santrali kurulumu',
      category: 'Güneş Enerjisi',
      goal: 500000,
      raised: 320000,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
      icon: Sun,
    },
    {
      id: 2,
      title: 'Ağaçlandırma Projesi',
      description: 'İstanbul\'da 10,000 ağaç dikimi ve bakımı',
      category: 'Ağaçlandırma',
      goal: 150000,
      raised: 89000,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      icon: TreePine,
    },
    {
      id: 3,
      title: 'Rüzgar Türbini',
      description: 'Çanakkale\'de 2MW rüzgar enerjisi projesi',
      category: 'Rüzgar Enerjisi',
      goal: 800000,
      raised: 450000,
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400',
      icon: Wind,
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Yeşil Gelecek İçin
            <span className="text-green-primary block">Tokenize Yatırım</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Küçük yatırımlarla büyük değişim yaratın. Yeşil projelere yatırım yapın, 
            token kazanın ve sürdürülebilir geleceğe katkıda bulunun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
            >
              <span>Projeleri Keşfet</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="btn-secondary text-lg px-8 py-4">
              Nasıl Çalışır?
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white rounded-2xl shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Platform İstatistikleri
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-green-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Öne Çıkan Projeler</h2>
          <Link
            to="/projects"
            className="text-green-primary hover:text-green-secondary font-semibold flex items-center space-x-2"
          >
            <span>Tümünü Gör</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => {
            const progress = (project.raised / project.goal) * 100;
            const IconComponent = project.icon;
            
            return (
              <div key={project.id} className="card hover:shadow-xl transition-shadow">
                <div className="relative mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="bg-green-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hedef:</span>
                    <span className="font-semibold">₺{project.goal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Toplanan:</span>
                    <span className="font-semibold text-green-primary">
                      ₺{project.raised.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    %{Math.round(progress)} tamamlandı
                  </div>
                </div>
                
                <Link
                  to={`/projects/${project.id}`}
                  className="btn-primary w-full mt-4 flex items-center justify-center space-x-2"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>Yatırım Yap</span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white rounded-2xl shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nasıl Çalışır?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-primary">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cüzdanınızı Bağlayın</h3>
              <p className="text-gray-600">
                Stellar cüzdanınızı bağlayarak platforma güvenli bir şekilde giriş yapın.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-primary">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Proje Seçin</h3>
              <p className="text-gray-600">
                İlginizi çeken yeşil projeleri inceleyin ve yatırım yapmak istediğinizi seçin.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-primary">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Token Kazanın</h3>
              <p className="text-gray-600">
                XLM ile yatırım yapın ve proje tokenlarını kazanın. Gelecekte gelir paylaşımı yapabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 