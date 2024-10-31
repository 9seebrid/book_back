const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const PORT = process.env.PORT || 8002;
const API_URL = process.env.API_URL || 'http://localhost:3000';

// CORS 설정
app.use(
    cors({
      origin: [process.env.API_URL, 'http://localhost:3000'], // 외부와 로컬 호스트 둘 다 허용
      credentials: true,
    })
  );

app.use(express.json());

// PostgreSQL 데이터베이스 연결 설정
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

app.get('/', (req, res) => {
    res.send('Hello World! movie-back!!');
  });
  

// 책 정보 조회 엔드포인트
app.get('/books', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT book_id, book_title, book_author, isbn FROM book LIMIT 5');
    res.status(200).json(rows);
  } catch (error) {
    console.error('DB 쿼리 오류:', error);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
