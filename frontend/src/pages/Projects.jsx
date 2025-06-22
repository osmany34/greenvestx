import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Sun, TreePine, Wind, Droplets, Leaf, ArrowRight } from 'lucide-react';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tümü', icon: Leaf },
    { id: 'solar', name: 'Güneş Enerjisi', icon: Sun },
    { id: 'wind', name: 'Rüzgar Enerjisi', icon: Wind },
    { id: 'forest', name: 'Ağaçlandırma', icon: TreePine },
    { id: 'water', name: 'Su Projeleri', icon: Droplets },
  ];

  const projects = [
    {
      id: 1,
      title: 'Güneş Enerjisi Çiftliği',
      description: 'Antalya\'da 5MW güneş enerjisi santrali kurulumu. Yıllık 7.5GWh elektrik üretimi hedefleniyor.',
      category: 'solar',
      goal: 500000,
      raised: 320000,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
      location: 'Antalya, Türkiye',
      duration: '18 ay',
      expectedReturn: '12%',
      investors: 156,
    },
    {
      id: 2,
      title: 'Ağaçlandırma Projesi',
      description: 'İstanbul\'da 10,000 ağaç dikimi ve 5 yıl bakım projesi. Karbon emisyonu azaltma hedefi.',
      category: 'forest',
      goal: 150000,
      raised: 89000,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      location: 'İstanbul, Türkiye',
      duration: '5 yıl',
      expectedReturn: '8%',
      investors: 89,
    },
    {
      id: 3,
      title: 'Rüzgar Türbini',
      description: 'Çanakkale\'de 2MW rüzgar enerjisi projesi. Yıllık 4.2GWh elektrik üretimi.',
      category: 'wind',
      goal: 800000,
      raised: 450000,
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400',
      location: 'Çanakkale, Türkiye',
      duration: '24 ay',
      expectedReturn: '15%',
      investors: 234,
    },
    {
      id: 4,
      title: 'Su Arıtma Tesisi',
      description: 'Mersin\'de günlük 1000 ton kapasiteli su arıtma tesisi. Deniz suyu tuzdan arındırma.',
      category: 'water',
      goal: 1200000,
      raised: 780000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      location: 'Mersin, Türkiye',
      duration: '30 ay',
      expectedReturn: '18%',
      investors: 312,
    },
    {
      id: 5,
      title: 'Güneş Paneli Kurulumu',
      description: 'İzmir\'de 100 ev için güneş paneli kurulumu. Ev sahiplerine enerji tasarrufu.',
      category: 'solar',
      goal: 300000,
      raised: 180000,
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=400',
      location: 'İzmir, Türkiye',
      duration: '12 ay',
      expectedReturn: '10%',
      investors: 67,
    },
    {
      id: 6,
      title: 'Orman Koruma Projesi',
      description: 'Trabzon\'da 500 hektar orman alanının korunması ve sürdürülebilir yönetimi.',
      category: 'forest',
      goal: 250000,
      raised: 120000,
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400',
      location: 'Trabzon, Türkiye',
      duration: '10 yıl',
      expectedReturn: '6%',
      investors: 45,
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Yeşil Projeler</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Sürdürülebilir gelecek için yatırım yapabileceğiniz yeşil projeleri keşfedin
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Proje ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const progress = (project.raised / project.goal) * 100;
          const category = categories.find(cat => cat.id === project.category);
          const IconComponent = category?.icon || Leaf;
          
          return (
            <div key={project.id} className="card hover:shadow-xl transition-shadow">
              <div className="relative mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-3 left-3">
                  <div className="bg-green-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <IconComponent className="h-3 w-3" />
                    <span>{category?.name}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-white text-green-primary px-2 py-1 rounded-full text-xs font-bold">
                    %{Math.round(progress)}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Hedef:</span>
                    <div className="font-semibold">₺{project.goal.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Toplanan:</span>
                    <div className="font-semibold text-green-primary">
                      ₺{project.raised.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Konum:</span>
                    <div className="font-medium">{project.location}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Süre:</span>
                    <div className="font-medium">{project.duration}</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{project.investors} yatırımcı</span>
                  <span>%{project.expectedReturn} getiri</span>
                </div>
              </div>
              
              <Link
                to={`/projects/${project.id}`}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <span>Detayları Gör</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Leaf className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Proje Bulunamadı</h3>
          <p className="text-gray-600">
            Arama kriterlerinize uygun proje bulunamadı. Farklı arama terimleri deneyin.
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects; 