# GreenVestX Backend API

GreenVestX platformunun backend API'si. Express.js ve PostgreSQL kullanarak yeşil projeler için tokenize yatırım platformu API'si sağlar.

## 🚀 Özellikler

- **Proje Yönetimi**: Yeşil projelerin CRUD işlemleri
- **Yatırım İşlemleri**: Kullanıcı yatırımlarının kaydedilmesi ve takibi
- **Portföy Yönetimi**: Kullanıcı portföy bilgilerinin sorgulanması
- **İstatistikler**: Platform geneli istatistikler
- **PostgreSQL Entegrasyonu**: Güvenilir veri depolama
- **CORS Desteği**: Frontend ile uyumlu çalışma

## 🛠️ Teknolojiler

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Native PostgreSQL client (pg)
- **Environment**: dotenv

## 📦 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment dosyasını oluşturun:
```bash
cp env.example .env
```

3. `.env` dosyasını düzenleyin:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=greenvestx
DB_USER=postgres
DB_PASSWORD=your_password_here
```

4. PostgreSQL veritabanını kurun:
```bash
# PostgreSQL'e bağlanın
psql -U postgres

# Veritabanını oluşturun
CREATE DATABASE greenvestx;

# Veritabanına bağlanın
\c greenvestx

# Şemayı çalıştırın (src/database.sql dosyasından)
```

5. Sunucuyu başlatın:
```bash
# Development modu
npm run dev

# Production modu
npm start
```

## 🗄️ Veritabanı Şeması

### Projects Tablosu
- `id`: Proje ID (Primary Key)
- `title`: Proje başlığı
- `description`: Proje açıklaması
- `category`: Proje kategorisi (solar, wind, forest, water)
- `location`: Proje konumu
- `goal_amount`: Hedef yatırım miktarı
- `raised_amount`: Toplanan miktar
- `token_code`: Proje token kodu
- `token_price`: Token fiyatı
- `duration`: Proje süresi
- `expected_return`: Beklenen getiri oranı
- `status`: Proje durumu

### Investments Tablosu
- `id`: Yatırım ID (Primary Key)
- `user_wallet`: Yatırımcı cüzdan adresi
- `project_id`: Proje ID (Foreign Key)
- `amount`: Yatırım miktarı
- `tokens_received`: Alınan token miktarı
- `transaction_hash`: Blockchain işlem hash'i
- `status`: İşlem durumu

## 📡 API Endpoints

### Projeler
- `GET /api/projects` - Tüm projeleri listele
- `GET /api/projects/:id` - Belirli projeyi getir

### Yatırımlar
- `POST /api/investments` - Yeni yatırım oluştur
- `GET /api/investments/user/:wallet` - Kullanıcı yatırımlarını getir

### Portföy
- `GET /api/portfolio/:wallet` - Kullanıcı portföy özeti

### İstatistikler
- `GET /api/stats` - Platform istatistikleri

## 🔧 Geliştirme

### Yeni Endpoint Ekleme
1. `src/index.js` dosyasında yeni route tanımlayın
2. Gerekli middleware'leri ekleyin
3. Database sorgularını yazın
4. Error handling ekleyin

### Veritabanı Değişiklikleri
1. `src/database.sql` dosyasını güncelleyin
2. Migration script'i oluşturun
3. Test verilerini güncelleyin

## 🧪 Test

API'yi test etmek için:

```bash
# Sunucunun çalıştığından emin olun
curl http://localhost:3001/

# Projeleri listele
curl http://localhost:3001/api/projects

# İstatistikleri getir
curl http://localhost:3001/api/stats
```

## 📊 Örnek Response'lar

### Proje Listesi
```json
[
  {
    "id": 1,
    "title": "Güneş Enerjisi Çiftliği",
    "description": "Antalya'da 5MW güneş enerjisi santrali",
    "category": "solar",
    "goal_amount": "500000.00",
    "raised_amount": "320000.00",
    "token_code": "SOLAR01"
  }
]
```

### Portföy Özeti
```json
{
  "totalInvested": 1000.00,
  "investments": [
    {
      "id": 1,
      "amount": "150.00",
      "project_title": "Güneş Enerjisi Çiftliği",
      "token_code": "SOLAR01"
    }
  ],
  "totalProjects": 1
}
```

## 🔒 Güvenlik

- CORS yapılandırması
- Input validation
- SQL injection koruması (parameterized queries)
- Error handling

## 🚀 Production

Production ortamı için:

1. Environment değişkenlerini ayarlayın
2. Database connection pooling'i optimize edin
3. Logging ekleyin
4. Rate limiting ekleyin
5. SSL/TLS sertifikası ekleyin

## 📞 İletişim

- Proje: [GreenVestX](https://github.com/osmany34/greenvestx)
- API Dokümantasyonu: `/api/docs` (gelecekte eklenecek)

---

**GreenVestX Backend** - Sürdürülebilir gelecek için API 🌱 