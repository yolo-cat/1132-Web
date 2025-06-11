const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.resolve(__dirname, 'db');
const dbPath = path.join(dbDir, 'sqlite.db');

// 確保資料庫目錄存在
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log("Created database directory:", dbDir);
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Failed to open database:", err.message);
    } else {
        console.log("Database opened successfully:", dbPath);

        // Create table if not exists
        db.run(`CREATE TABLE IF NOT EXISTS movie_quotes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            provider TEXT NOT NULL,
            movie_name TEXT NOT NULL,
            quote TEXT NOT NULL,
            votes INTEGER DEFAULT 0
        )`, (err) => {
            if (err) {
                console.error("Failed to create table:", err.message);
            } else {
                console.log("Table 'movie_quotes' ensured.");
                
                // Insert initial data
                const insertQuery = `INSERT INTO movie_quotes (provider, movie_name, quote, votes) VALUES 
                    ("廖旼謙", "花束般的戀愛", "我們一路走來的風景很美，就只差了一步", 0),
                    ("李振維", "王牌冤家", "Blessed are the forgetful, for they get the better even of their blunders。", 0),
                    ("陳俊諳", "鐵達尼號", "You jump ,I jump", 0),
                    ("陶子中", "愛在午夜希臘時", "不要在愛情上浪費太多時間，友誼與工作會給你帶來更多快樂。", 0),
                    ("廖卿秀", "喜劇之王", "我養你啊", 0),
                    ("簡鍵帆", "大話西游", "如果非要在這份愛上加上一個期限，我希望是一萬年。", 0),
                    ("蕭方雯", "真愛挑日子", "無論明天發生什麼事，至少我們擁有當下。", 0),
                    ("周彥廷", "殭屍先生", "人鬼殊途，人和鬼是不能在一起的．你和他在一起只會害了他", 0),
                    ("游程鈞", "戀夏500日", "Some people are meant to fall in love with each other, but not meant to be together.", 0),
                    ("林政佑", "樂來樂愛你", "你為什麼把『浪漫』說得像是個骯髒的詞？", 0),
                    ("謝依晴", "霍爾的移動城堡", "無論你變成什麼樣子，我都愛你。", 0),
                    ("陳亭瑜", "After", "Whatever our souls are made of, his and mine are the same", 0),
                    ("陳韋翰", "刻在你心底的名字", "你喜歡女生就可以,我喜歡男生就不行。你有多愛一點,我有少愛一點嗎?", 0),
                    ("廖卿如", "新娘不是我", "如果你愛上某人你就說出來，你立刻說出來，大聲地說出來。不然你就會錯過時機了。", 0),
                    ("周說", "蜘蛛人", "能力越大，責任越大！", 0),
                    ("張郁眉", "鬼怪", "跟你在一起的時間全部都很耀眼。因為天氣好，因為天氣不好，因為天氣剛剛好，每一天，都是美好的。", 0)
                `;
                db.run(insertQuery, (err) => {
                    if (err) {
                        console.error("Failed to insert initial data:", err.message);
                    } else {
                        console.log("Initial data inserted into 'movie_quotes'.");
                    }
                });
            }
        });
    }
});

module.exports = db;
