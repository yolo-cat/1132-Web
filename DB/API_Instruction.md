1. 在 app.js 中，使用 sqlite3 來操作資料庫，並開啟位置在 db/sqlite.db 的資料庫，需要確認是否成功打開資料庫。不要用匯入 db.js的方式。
2. 在 app.js 中，用 GET 方法，撰寫 /api/quotes 路由，使用 SQL 來查詢 movie_quotes table 所有的電影台詞資料，回傳 json 格式的資料。
3. 在 app.js 中，撰寫 get /api?provider= 路由，使用 SQLite 查詢 movie_quotes 中，某 provider 提供的所有資料。
4. 在 app.js 中，撰寫 post /api 路由，使用 SQLite 查詢 movie_quotes 中，某 provider 提供的所有資料。
5. 在 app.js 中，撰寫 get /api/insert 路由，使用 SQLite 新增一筆電影台詞資料 (provider, movie_name, quote)，到 movie_quotes 中。
6. 在 app.js 中，撰寫 post /api/insert 路由，使用 SQLite 新增一筆電影台詞資料 (provider, movie_name, quote)，movie_quotes 中，回傳文字的訊息，不要 json。