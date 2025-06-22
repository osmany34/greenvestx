# GreenVestX 🌱

**Tokenized Investment Platform for Green Projects**

GreenVestX is a blockchain-based platform that enables individuals and organizations to make micro-investments in small green projects. Investors earn project tokens by investing with XLM and can share future revenue.

## 🚀 Features

- **🌞  Discover Green Projects**: Solar energy, wind power, reforestation, and water projects
- **⭐ Stellar Blockchain Integration**: Secure and fast transactions
- **🪙 Token-Based Investment**: Unique tokens for each project
- **📊 Portfolio Management**: Track your token holdings
- **📈 Real-Time Statistics**: Monitor platform performance
- **📱 Mobile-Friendly Design**: Excellent experience on all devices

## 🛠️ Technologies

### Frontend
- **React 18** + **Vite** - Modern web framework
- **Tailwind CSS** - Utility-first CSS framework
- **Stellar SDK** - Blockchain integration
- **React Router** - Page routing
- **Lucide React** - Icon library

### Backend
- **Node.js** + **Express.js** - API server
- **PostgreSQL** - Database
- **pg** - PostgreSQL client
- **CORS** - Cross-origin resource sharing

### Blockchain
- **Stellar Network** - Fast and low-cost transactions
- **Stellar SDK** - JavaScript blockchain integration
- **Testnet** - For development and testing

## 📦 Installation

### Requirements
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### 1. Clone the Project
```bash
git clone <repository-url>
cd greenvestx
```

### 2. Backend Kurulumu
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file (enter your database info)
# PORT=3001
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=greenvestx
# DB_USER=postgres
# DB_PASSWORD=your_password_here

# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE greenvestx;"
psql -U postgres -d greenvestx -f src/database.sql

# Start backend
npm run dev

```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

### 4. Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🗄️ Database Schema

### Projects Table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    goal_amount DECIMAL(15,2) NOT NULL,
    raised_amount DECIMAL(15,2) DEFAULT 0,
    token_code VARCHAR(20) UNIQUE NOT NULL,
    token_price DECIMAL(10,2) DEFAULT 1.0,
    duration VARCHAR(100),
    expected_return DECIMAL(5,2),
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Investments Table
```sql
CREATE TABLE investments (
    id SERIAL PRIMARY KEY,
    user_wallet VARCHAR(255) NOT NULL,
    project_id INTEGER REFERENCES projects(id),
    amount DECIMAL(15,2) NOT NULL,
    tokens_received DECIMAL(15,2) NOT NULL,
    transaction_hash VARCHAR(255),
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📡 API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get specific project

### Investments
- `POST /api/investments` - Create new investment
- `GET /api/investments/user/:wallet` - Get user investments

### Portfolio
- `GET /api/portfolio/:wallet` - User portfolio summary

### Statistics
- `GET /api/stats` - Platform statistics

## 🎯 Use Cases

### 1. Investor Perspective
1. **Connect Wallet**: Connect your Stellar wallet
2. **Discover Projects**: Review green projects of interest
3. **Make Investment**: Invest with XLM
4. **Earn Tokens**: Receive project tokens
5. **Track Portfolio**: Monitor your assets

### 2. Project Owner Perspective
1. **Create Project**: Add your green project to the platform
2. **Issue Tokens**: Create unique tokens for the project
3. **Raise Funds**: Collect funds from investors
4. **Manage Project**: Track project progress

## 🔮 Future Features

- [ ] **Real Stellar Wallet Integration** (Freighter, etc.)
- [ ] **Token Marketplace**
- [ ] **Project Voting System**
- [ ] **NFT Certificates**
- [ ] **IPFS Document Storage**
- [ ] **Advanced Charts & Analytics**
- [ ] **Mobile Application**
- [ ] **Social Features** (comments, likes)
- [ ] **Automatic Revenue Distribution**
- [ ] **Multi-language Support**

## 🧪 Testing

### Backend Test
```bash
cd backend
npm run dev

# API test
curl http://localhost:3001/api/projects
curl http://localhost:3001/api/stats
```

### Frontend Test
```bash
cd frontend
npm run dev

# # Open http://localhost:5173 in your browser
```

## 📊 Demo Data

The platform includes sample projects like:
- **Solar Farm** (Antalya)
- **Reforestation Project** (İstanbul)
- **Wind Turbine** (Çanakkale)
- **Water Treatment Plant** (Mersin)
- **Solar Panel Installation** (İzmir)
- **Forest Conservation Project** (Trabzon)

## 🔒 Security

- **CORS** configuration
- **Input validation**
- **SQL injection** protection
- **Error handling**
- Use of **Stellar testnet** 

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- **Project Linki**: [GreenVestX](https://github.com/osmany34/greenvestx)
- **For Questions**: [Issues](https://github.com/osmany34/greenvestx/issues)
- **For Suggestions**: [Discussions](https://github.com/osmany34/greenvestx/discussions)

## 🙏 Thanks

- [Stellar Development Foundation](https://stellar.org/) - Blockchain infrastructure
- [React Team](https://reactjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Unsplash](https://unsplash.com/) - Images

---

**GreenVestX** - Tokenized investment platform for a sustainable future  🌱

*Create big change with small investments!* 
