const { Client } = require('pg');

test('PostgreSQL bağlantısı başarılı', async () => {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'greenvestx',
  });

  try {
    await client.connect();
    const res = await client.query('SELECT 1+1 AS result');
    expect(res.rows[0].result).toBe(2);
  } finally {
    await client.end();
  }
});