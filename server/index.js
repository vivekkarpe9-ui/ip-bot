import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const isVercel = Boolean(process.env.VERCEL);
const supabaseUrl = String(process.env.SUPABASE_URL || '').replace(/\/$/, '');
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const hasSupabase = Boolean(supabaseUrl && supabaseKey);

app.use(helmet());
app.use(cors({ origin: process.env.APP_ORIGIN || true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

const now = () => new Date().toISOString();

function requireOwner(req, res, next) {
  if (req.headers['x-owner-key'] !== process.env.OWNER_API_KEY) return res.status(401).json({ error: 'owner authorization required' });
  next();
}

async function sb(pathname, options = {}) {
  if (!hasSupabase) throw new Error('Supabase environment is not configured');
  const response = await fetch(`${supabaseUrl}/rest/v1/${pathname}`, {
    ...options,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: options.prefer || 'return=representation',
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) {
    const error = new Error(typeof data === 'string' ? data : (data?.message || data?.hint || 'Supabase request failed'));
    error.status = response.status;
    throw error;
  }
  return data;
}

function handleError(res, error) {
  console.error(error);
  return res.status(error?.status || 500).json({ error: error?.message || 'internal server error' });
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/dashboard.js', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.js'), { headers: { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'no-store' } }));

app.get('/api/health', async (req, res) => {
  try {
    if (hasSupabase) await sb('agents?select=id&limit=1', { prefer: 'return=minimal' });
    res.json({ ok: true, service: 'ip-bot', storage: hasSupabase ? 'supabase-postgres' : 'unconfigured', time: now() });
  } catch (error) { handleError(res, error); }
});

app.get('/api/system', requireOwner, (req, res) => res.json({
  ok: true,
  platform: isVercel ? 'vercel' : 'node',
  storage: hasSupabase ? 'supabase-postgres' : 'unconfigured',
  persistent: hasSupabase,
  databaseProject: hasSupabase ? 'iP Bot' : null,
  warning: hasSupabase ? null : 'Supabase environment variables are missing.'
}));

app.get('/api/me', requireOwner, (req, res) => res.json({ role: 'owner', authenticated: true }));

app.post('/api/agents', requireOwner, async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!name || !email) return res.status(400).json({ error: 'name and email required' });
    const rows = await sb('agents', { method: 'POST', body: JSON.stringify({ name, email, status: 'pending' }) });
    res.status(201).json(rows[0]);
  } catch (error) { handleError(res, error); }
});

app.get('/api/agents', requireOwner, async (req, res) => {
  try { res.json(await sb('agents?select=*&order=created_at.desc&limit=200')); }
  catch (error) { handleError(res, error); }
});

app.post('/api/agents/:id/:decision', requireOwner, async (req, res) => {
  try {
    const decision = req.params.decision;
    if (!['active', 'suspended', 'rejected'].includes(decision)) return res.status(400).json({ error: 'invalid agent decision' });
    const rows = await sb(`agents?id=eq.${encodeURIComponent(req.params.id)}`, { method: 'PATCH', body: JSON.stringify({ status: decision, updated_at: now() }) });
    if (!rows?.length) return res.status(404).json({ error: 'agent not found' });
    res.json({ ok: true, status: decision });
  } catch (error) { handleError(res, error); }
});

app.post('/api/jobs', requireOwner, async (req, res) => {
  try {
    const rows = await sb('jobs', { method: 'POST', body: JSON.stringify({ type: String(req.body.type || 'general'), status: 'queued', payload: req.body.payload || {} }) });
    res.status(202).json(rows[0]);
  } catch (error) { handleError(res, error); }
});

app.get('/api/jobs', requireOwner, async (req, res) => {
  try { res.json(await sb('jobs?select=*&order=created_at.desc&limit=100')); }
  catch (error) { handleError(res, error); }
});

app.post('/api/approvals', requireOwner, async (req, res) => {
  try {
    const amount = Number(req.body.amount || 0);
    const rows = await sb('approvals', { method: 'POST', body: JSON.stringify({ owner_id: null, agent_id: req.body.agentId || null, type: String(req.body.type || 'general'), amount: Number.isFinite(amount) ? amount : 0, status: 'pending', payload: req.body.payload || {} }) });
    res.status(201).json(rows[0]);
  } catch (error) { handleError(res, error); }
});

app.post('/api/approvals/:id/:decision', requireOwner, async (req, res) => {
  try {
    const decision = req.params.decision;
    if (!['approved', 'rejected'].includes(decision)) return res.status(400).json({ error: 'invalid decision' });
    const rows = await sb(`approvals?id=eq.${encodeURIComponent(req.params.id)}`, { method: 'PATCH', body: JSON.stringify({ status: decision, updated_at: now() }) });
    if (!rows?.length) return res.status(404).json({ error: 'approval not found' });
    res.json({ ok: true, status: decision });
  } catch (error) { handleError(res, error); }
});

app.get('/api/approvals', requireOwner, async (req, res) => {
  try { res.json(await sb('approvals?select=*&order=created_at.desc&limit=100')); }
  catch (error) { handleError(res, error); }
});

app.post('/api/ledger', requireOwner, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount <= 0) return res.status(400).json({ error: 'positive amount required' });
    const rows = await sb('ledger', { method: 'POST', body: JSON.stringify({ owner_id: null, type: String(req.body.type || 'adjustment'), amount, currency: String(req.body.currency || 'INR'), reference: req.body.reference || null }) });
    res.status(201).json(rows[0]);
  } catch (error) { handleError(res, error); }
});

app.get('/api/ledger', requireOwner, async (req, res) => {
  try { res.json(await sb('ledger?select=*&order=created_at.desc&limit=200')); }
  catch (error) { handleError(res, error); }
});

app.use(express.static(__dirname));
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`iP Bot server listening on ${port}; storage=${hasSupabase ? 'supabase-postgres' : 'unconfigured'}`));
