var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 新增：引入 sqlite3 並連接資料庫
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, 'db', 'sqlite.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('無法開啟資料庫:', err.message);
  } else {
    console.log('成功連接到 SQLite 資料庫');
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// GET /api/quotes：查詢所有電影台詞
app.get('/api/quotes', (req, res) => {
  db.all('SELECT * FROM movie_quotes', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// GET /api?provider=：查詢指定 provider 的電影台詞
app.get('/api', (req, res) => {
  const provider = req.query.provider;
  if (!provider) {
    return res.status(400).json({ error: '缺少 provider 參數' });
  }
  db.all('SELECT * FROM movie_quotes WHERE provider = ?', [provider], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// POST /api：查詢指定 provider 的電影台詞
app.post('/api', (req, res) => {
  const provider = req.body.provider;
  if (!provider) {
    return res.status(400).json({ error: '缺少 provider 參數' });
  }
  db.all('SELECT * FROM movie_quotes WHERE provider = ?', [provider], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// GET /api/insert：新增一筆電影台詞資料 (query string)
app.get('/api/insert', (req, res) => {
  const { provider, movie_name, quote } = req.query;
  if (!provider || !movie_name || !quote) {
    return res.status(400).json({ error: '缺少必要參數' });
  }
  db.run(
    'INSERT INTO movie_quotes (provider, movie_name, quote) VALUES (?, ?, ?)',
    [provider, movie_name, quote],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, message: '新增成功' });
      }
    }
  );
});

// POST /api/insert：新增一筆電影台詞資料 (body)，回傳文字訊息
app.post('/api/insert', (req, res) => {
  const { provider, movie_name, quote } = req.body;
  if (!provider || !movie_name || !quote) {
    return res.status(400).send('缺少必要參數');
  }
  db.run(
    'INSERT INTO movie_quotes (provider, movie_name, quote) VALUES (?, ?, ?)',
    [provider, movie_name, quote],
    function (err) {
      if (err) {
        res.status(500).send('新增失敗: ' + err.message);
      } else {
        res.send('新增成功，ID: ' + this.lastID);
      }
    }
  );
});

module.exports = app;
