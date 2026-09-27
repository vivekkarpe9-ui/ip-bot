import express from 'express';

export function mountWorkflowRoutes(app, { requireOwner, sb, ownerId, now }) {
  app.post('/api/jobs/:id/run', requireOwner, async (req, res) => {
    try {
      const rows = await sb(`jobs?id=eq.${encodeURIComponent(req.params.id)}`, { method: 'GET' });
      const job = rows?.[0];
      if (!job) return res.status(404).json({ error: 'job not found' });
      if (['completed', 'cancelled'].includes(job.status)) return res.json(job);
      const payload = typeof job.payload === 'string' ? JSON.parse(job.payload) : (job.payload || {});
      const isSaving = String(job.type).toLowerCase().includes('saving');
      const result = { ok: true, mode: isSaving ? 'saving-account-workflow-recorded' : 'workflow-completed', message: isSaving ? 'Saving Account workflow record completed. No real bank account was opened.' : 'Job workflow completed.', completed_at: now() };
      const updated = await sb(`jobs?id=eq.${encodeURIComponent(job.id)}`, { method: 'PATCH', body: JSON.stringify({ status: 'completed', payload: { ...payload, result }, updated_at: now() }) });
      res.json(updated?.[0] || { ...job, status: 'completed', payload: { ...payload, result } });
    } catch (error) { res.status(error?.status || 500).json({ error: error?.message || 'internal server error' }); }
  });

  app.post('/api/jobs/:id/retry', requireOwner, async (req, res) => {
    try {
      const rows = await sb(`jobs?id=eq.${encodeURIComponent(req.params.id)}`, { method: 'PATCH', body: JSON.stringify({ status: 'queued', updated_at: now() }) });
      if (!rows?.length) return res.status(404).json({ error: 'job not found' });
      res.json(rows[0]);
    } catch (error) { res.status(error?.status || 500).json({ error: error?.message || 'internal server error' }); }
  });

  app.post('/api/jobs/:id/cancel', requireOwner, async (req, res) => {
    try {
      const rows = await sb(`jobs?id=eq.${encodeURIComponent(req.params.id)}`, { method: 'PATCH', body: JSON.stringify({ status: 'cancelled', updated_at: now() }) });
      if (!rows?.length) return res.status(404).json({ error: 'job not found' });
      res.json(rows[0]);
    } catch (error) { res.status(error?.status || 500).json({ error: error?.message || 'internal server error' }); }
  });

  app.post('/api/saving-account', requireOwner, async (req, res) => {
    try {
      const customerName = String(req.body.customerName || '').trim();
      const mobile = String(req.body.mobile || '').trim();
      const accountType = String(req.body.accountType || 'Savings').trim();
      const amount = Number(req.body.amount || 0);
      const reference = String(req.body.reference || '').trim();
      if (!customerName || !mobile) return res.status(400).json({ error: 'customer name and mobile are required' });
      if (!Number.isFinite(amount) || amount < 0) return res.status(400).json({ error: 'valid amount is required' });
      const payload = { workflow: 'saving_account', customerName, mobile, accountType, amount, reference };
      const rows = await sb('jobs', { method: 'POST', body: JSON.stringify({ owner_id: ownerId(), type: 'Saving account', status: 'queued', payload }) });
      res.status(201).json(rows[0]);
    } catch (error) { res.status(error?.status || 500).json({ error: error?.message || 'internal server error' }); }
  });
}
