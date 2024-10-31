const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8002;
const allowedOrigins = [
  'http://localhost:3000',
  'http://222.112.27.120:3000' // 외부 IP
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// 나머지 코드
app.get('/books', (req, res) => {
  // 데이터베이스에서 책 정보 가져오기
  res.json([
    { book_id: 1, book_title: "예제 책", book_author: "저자", isbn: "1234567890", book_genre: "소설", book_price: 15000, book_link: "#" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
