1. 安裝 sqlite3 並新增到 package.json 
2. 在 db.js 中，使用 sqlite3 來操作資料庫，並開啟位置在 db/sqlite.db 的資料庫，需要確認是否成功打開資料庫，若資料庫不存在，就新增資料庫
3. 在 db.js 中，若movie_quotes table 不存在，則會自動建立一個新的table 
4. table scheme 如下
   - CREATE TABLE movie_quotes (
       id INTEGER PRIMARY KEY AUTOINCREMENT, 
       provider TEXT NOT NULL, 
       movie_name TEXT NOT NULL, 
       quote TEXT NOT NULL, 
       votes INTEGER DEFAULT 0
       );

5. 在 db.js 中，用 SQLite 在 movie_quotes table 新增以下資料，欄位名稱：
    - CREATE TABLE movie_quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider TEXT NOT NULL,
      movie_name TEXT NOT NULL,
      quote TEXT NOT NULL,
      votes INTEGER DEFAULT 0
      );

6. 使用雙引號來表達字串，資料如下：
    - 廖旼謙	花束般的戀愛	我們一路走來的風景很美，就只差了一步
      李振維	王牌冤家	Blessed are the forgetful, for they get the better even of their blunders。
      陳俊諳	鐵達尼號	You jump ,I jump
      陶子中	愛在午夜希臘時	不要在愛情上浪費太多時間，友誼與工作會給你帶來更多快樂。
      廖卿秀	喜劇之王	我養你啊
      簡鍵帆	大話西游	如果非要在這份愛上加上一個期限，我希望是一萬年。
      蕭方雯	真愛挑日子	無論明天發生什麼事，至少我們擁有當下。
      周彥廷	殭屍先生	人鬼殊途，人和鬼是不能在一起的．你和他在一起只會害了他
      游程鈞	戀夏500日	Some people are meant to fall in love with each other, but not meant to be together.
      林政佑	樂來樂愛你	你為什麼把『浪漫』說得像是個骯髒的詞？
      謝依晴	霍爾的移動城堡	無論你變成什麼樣子，我都愛你。
      陳亭瑜	After	Whatever our souls are made of, his and mine are the same
      陳韋翰	刻在你心底的名字	你喜歡女生就可以,我喜歡男生就不行。你有多愛一點,我有少愛一點嗎?
      廖卿如	新娘不是我	如果你愛上某人你就說出來，你立刻說出來，大聲地說出來。不然你就會錯過時機了。
      周說	蜘蛛人	能力越大，責任越大！
      張郁眉	鬼怪	跟你在一起的時間全部都很耀眼。因為天氣好，因為天氣不好，因為天氣剛剛好，每一天，都是美好的。

7. 在 app.js 中，使用 sqlite3 來操作資料庫，並開啟位置在 db/sqlite.db 的資料庫，需要確認是否成功打開資料庫。不要用匯入 db.js的方式。
    - // 新增 sqlite3 連線
   const sqlite3 = require('sqlite3').verbose();
   const dbPath = path.join(__dirname, 'db', 'sqlite.db');
   const db = new sqlite3.Database(dbPath, (err) => {
   if (err) {
   console.error('無法開啟資料庫:', err.message);
   } else {
   console.log('成功連接到資料庫:', dbPath);
   }
   });