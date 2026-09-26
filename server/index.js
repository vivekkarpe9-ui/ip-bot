import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import Database from 'better-sqlite3';
import crypto from 'node:crypto';

const app=express();
const db=new Database(process.env.DB_PATH||'./ipbot.sqlite');
db.pragma('journal_mode=WAL');
db.exec(`CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,role TEXT NOT NULL DEFAULT 'customer',created_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS jobs(id TEXT PRIMARY KEY,owner_id TEXT NOT NULL,type TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'queued',payload TEXT NOT NULL,created_at TEXT NOT NULL,updated_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS approvals(id TEXT PRIMARY KEY,owner_id TEXT NOT NULL,agent_id TEXT,type TEXT NOT NULL,amount REAL DEFAULT 0,status TEXT NOT NULL DEFAULT 'pending',payload TEXT NOT NULL,created_at TEXT NOT NULL,updated_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS ledger(id TEXT PRIMARY KEY,owner_id TEXT NOT NULL,type TEXT NOT NULL,amount REAL NOT NULL,currency TEXT NOT NULL DEFAULT 'INR',reference TEXT,created_at TEXT NOT NULL);`);
app.use(helmet()); app.use(cors({origin:process.env.APP_ORIGIN||true,credentials:true})); app.use(express.json({limit:'1mb'})); app.use(cookieParser());
const now=()=>new Date().toISOString(); const id=()=>crypto.randomUUID();
function requireOwner(req,res,next){if(req.headers['x-owner-key']!==process.env.OWNER_API_KEY)return res.status(401).json({error:'owner authorization required'});next()}
app.get('/api/health',(req,res)=>res.json({ok:true,service:'ip-bot',time:now()}));
app.get('/api/me',requireOwner,(req,res)=>res.json({role:'owner',authenticated:true}));
app.post('/api/jobs',requireOwner,(req,res)=>{const job={id:id(),owner_id:'owner',type:String(req.body.type||'general'),status:'queued',payload:JSON.stringify(req.body.payload||{}),created_at:now(),updated_at:now()};db.prepare('INSERT INTO jobs VALUES(@id,@owner_id,@type,@status,@payload,@created_at,@updated_at)').run(job);res.status(202).json(job)});
app.get('/api/jobs',requireOwner,(req,res)=>res.json(db.prepare('SELECT * FROM jobs ORDER BY created_at DESC LIMIT 100').all().map(x=>({...x,payload:JSON.parse(x.payload)}))));
app.post('/api/approvals',requireOwner,(req,res)=>{const a={id:id(),owner_id:'owner',agent_id:req.body.agentId||null,type:String(req.body.type||'general'),amount:Number(req.body.amount||0),status:'pending',payload:JSON.stringify(req.body.payload||{}),created_at:now(),updated_at:now()};db.prepare('INSERT INTO approvals VALUES(@id,@owner_id,@agent_id,@type,@amount,@status,@payload,@created_at,@updated_at)').run(a);res.status(201).json(a)});
app.post('/api/approvals/:id/:decision',requireOwner,(req,res)=>{const decision=req.params.decision;if(!['approved','rejected'].includes(decision))return res.status(400).json({error:'invalid decision'});const r=db.prepare('UPDATE approvals SET status=?,updated_at=? WHERE id=?').run(decision,now(),req.params.id);if(!r.changes)return res.status(404).json({error:'approval not found'});res.json({ok:true,status:decision})});
app.get('/api/approvals',requireOwner,(req,res)=>res.json(db.prepare('SELECT * FROM approvals ORDER BY created_at DESC LIMIT 100').all()));
app.post('/api/ledger',requireOwner,(req,res)=>{const amount=Number(req.body.amount);if(!Number.isFinite(amount)||amount<=0)return res.status(400).json({error:'positive amount required'});const row={id:id(),owner_id:'owner',type:String(req.body.type||'adjustment'),amount,currency:String(req.body.currency||'INR'),reference:req.body.reference||null,created_at:now()};db.prepare('INSERT INTO ledger VALUES(@id,@owner_id,@type,@amount,@currency,@reference,@created_at)').run(row);res.status(201).json(row)});
app.get('/api/ledger',requireOwner,(req,res)=>res.json(db.prepare('SELECT * FROM ledger ORDER BY created_at DESC LIMIT 200').all()));
app.use(express.static('app'));
const port=Number(process.env.PORT||3000);app.listen(port,()=>console.log(`iP Bot server listening on ${port}`));
