# GreenVestX - Yeşil Projeler için Tokenize Yatırım Platformu

GreenVestX, bireylerin ve kurumların küçük yeşil projelere mikro yatırım yapabilmesini sağlayan blockchain tabanlı bir platformdur. Yatırımcılar XLM ile yatırım yaparak proje tokenları kazanır ve gelecekte gelir paylaşımı yapabilirler.

## 🚀 Özellikler

- **Yeşil Proje Keşfi**: Güneş enerjisi, rüzgar enerjisi, ağaçlandırma ve su projeleri
- **Stellar Blockchain Entegrasyonu**: Güvenli ve hızlı işlemler
- **Token Tabanlı Yatırım**: Her proje için özel tokenlar
- **Portföy Yönetimi**: Token varlıklarınızı takip edin
- **Gerçek Zamanlı İstatistikler**: Platform performansını izleyin
- **Mobil Uyumlu Tasarım**: Her cihazda mükemmel deneyim

## 🛠️ Teknolojiler

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Blockchain**: Stellar SDK
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd greenvestx/frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda `http://localhost:5173` adresini açın.

## 🔧 Geliştirme

### Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   └── Navbar.jsx      # Navigasyon çubuğu
├── contexts/           # React Context'ler
│   └── WalletContext.jsx # Stellar cüzdan yönetimi
├── pages/              # Sayfa bileşenleri
│   ├── Home.jsx        # Ana sayfa
│   ├── Projects.jsx    # Projeler listesi
│   ├── ProjectDetail.jsx # Proje detay sayfası
│   └── Portfolio.jsx   # Kullanıcı portföyü
├── utils/              # Yardımcı fonksiyonlar
├── App.jsx             # Ana uygulama bileşeni
└── index.css           # Global stiller
```

### Stellar Entegrasyonu

Proje Stellar test ağını kullanır. Gerçek uygulamada:

1. **Cüzdan Bağlantısı**: Freighter veya diğer Stellar cüzdanları ile entegrasyon
2. **Asset Issuance**: Her proje için özel token oluşturma
3. **Payment Processing**: XLM ödemeleri ve token dağıtımı
4. **Trustline Management**: Token güven hattı yönetimi

### Özelleştirme

#### Renkler
Tailwind config dosyasında özel renkler tanımlanmıştır:
- `green-primary`: #10B981
- `green-secondary`: #059669
- `blue-primary`: #3B82F6
- `blue-secondary`: #1D4ED8

#### Bileşenler
Yeni bileşenler eklemek için `src/components/` klasörünü kullanın.

## 🌐 Demo

Demo için test verileri kullanılmaktadır:
- 6 örnek yeşil proje
- Mock portföy verileri
- Test Stellar hesapları

## 📱 Kullanım

1. **Cüzdan Bağlama**: Sağ üst köşedeki "Cüzdan Bağla" butonuna tıklayın
2. **Proje Keşfi**: Ana sayfada öne çıkan projeleri inceleyin
3. **Yatırım Yapma**: Proje detay sayfasında "Yatırım Yap" butonuna tıklayın
4. **Portföy Takibi**: "Portföyüm" sayfasından token varlıklarınızı görüntüleyin

## 🔮 Gelecek Özellikler

- [ ] Gerçek Stellar cüzdan entegrasyonu
- [ ] Token alım-satım pazarı
- [ ] Proje oylama sistemi
- [ ] NFT sertifikaları
- [ ] IPFS belge depolama
- [ ] Gelişmiş grafikler ve analitikler
- [ ] Mobil uygulama

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- Proje Linki: [GreenVestX](https://github.com/osmany34/greenvestx)
- Sorularınız için: [Issues](https://github.com/osmany34/greenvestx/issues)

---

**GreenVestX** - Sürdürülebilir gelecek için tokenize yatırım platformu 🌱