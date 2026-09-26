import Database from 'better-sqlite3';
const db=new Database(process.env.DB_PATH||'./ipbot.sqlite');
db.pragma('journal_mode=WAL');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function run(){while(true){const job=db.prepare("SELECT * FROM jobs WHERE status='queued' ORDER BY created_at LIMIT 1").get();if(!job){await sleep(1500);continue}db.prepare("UPDATE jobs SET status='running',updated_at=datetime('now') WHERE id=?").run(job.id);try{const payload=JSON.parse(job.payload||'{}');const supported=['general','research','approval','build'];if(!supported.includes(job.type))throw new Error('unsupported job type');db.prepare("UPDATE jobs SET status='completed',payload=?,updated_at=datetime('now') WHERE id=?").run(JSON.stringify({...payload,result:'worker accepted job; external tools require configured integrations'}),job.id)}catch(error){db.prepare("UPDATE jobs SET status='failed',payload=?,updated_at=datetime('now') WHERE id=?").run(JSON.stringify({error:error.message}),job.id)}}}
run().catch(e=>{console.error(e);process.exit(1)});
