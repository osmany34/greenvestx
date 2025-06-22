const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'greenvestx',
  password: process.env.DB_PASSWORD || 'admin',
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'GreenVestX API is running!' });
});

// Projects routes
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Investments routes
app.post('/api/investments', async (req, res) => {
  try {
    const { user_wallet, project_id, amount } = req.body;
    
    // Validate input
    if (!user_wallet || !project_id || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check if project exists
    const projectResult = await pool.query('SELECT * FROM projects WHERE id = $1', [project_id]);
    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const project = projectResult.rows[0];
    const tokensReceived = amount * project.token_price;
    
    // Create investment record
    const result = await pool.query(
      'INSERT INTO investments (user_wallet, project_id, amount, tokens_received) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_wallet, project_id, amount, tokensReceived]
    );
    
    // Update project raised amount
    await pool.query(
      'UPDATE projects SET raised_amount = raised_amount + $1 WHERE id = $2',
      [amount, project_id]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating investment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/investments/user/:wallet', async (req, res) => {
  try {
    const { wallet } = req.params;
    const result = await pool.query(
      `SELECT i.*, p.title as project_title, p.token_code 
       FROM investments i 
       JOIN projects p ON i.project_id = p.id 
       WHERE i.user_wallet = $1 
       ORDER BY i.created_at DESC`,
      [wallet]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching user investments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Portfolio summary
app.get('/api/portfolio/:wallet', async (req, res) => {
  try {
    const { wallet } = req.params;
    
    // Get total invested amount
    const totalInvestedResult = await pool.query(
      'SELECT COALESCE(SUM(amount), 0) as total_invested FROM investments WHERE user_wallet = $1',
      [wallet]
    );
    
    // Get investments with project details
    const investmentsResult = await pool.query(
      `SELECT i.*, p.title, p.token_code, p.raised_amount, p.goal_amount
       FROM investments i 
       JOIN projects p ON i.project_id = p.id 
       WHERE i.user_wallet = $1`,
      [wallet]
    );
    
    const portfolio = {
      totalInvested: parseFloat(totalInvestedResult.rows[0].total_invested),
      investments: investmentsResult.rows,
      totalProjects: investmentsResult.rows.length
    };
    
    res.json(portfolio);
  } catch (err) {
    console.error('Error fetching portfolio:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Statistics
app.get('/api/stats', async (req, res) => {
  try {
    const stats = {};
    
    // Total projects
    const projectsResult = await pool.query('SELECT COUNT(*) as count FROM projects');
    stats.totalProjects = parseInt(projectsResult.rows[0].count);
    
    // Total investments
    const investmentsResult = await pool.query('SELECT COALESCE(SUM(amount), 0) as total FROM investments');
    stats.totalInvestments = parseFloat(investmentsResult.rows[0].total);
    
    // Total investors
    const investorsResult = await pool.query('SELECT COUNT(DISTINCT user_wallet) as count FROM investments');
    stats.totalInvestors = parseInt(investorsResult.rows[0].count);
    
    // Active projects (not fully funded)
    const activeResult = await pool.query('SELECT COUNT(*) as count FROM projects WHERE raised_amount < goal_amount');
    stats.activeProjects = parseInt(activeResult.rows[0].count);
    
    res.json(stats);
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`GreenVestX API server running on port ${PORT}`);
}); 