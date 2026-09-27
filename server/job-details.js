/* iP Bot — resilient job-details layer.
   This is intentionally separate from dashboard.js so cached/older dashboard.js
   cannot break the job-details interaction. */
(function () {
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  function ownerKey() {
    try {
      if (typeof key !== 'undefined' && key) return key;
    } catch (_) {}
    return document.getElementById('key')?.value?.trim() || '';
  }

  async function getJob(id) {
    const r = await fetch('/api/jobs', {
      cache: 'no-store',
      headers: { 'x-owner-key': ownerKey(), 'Accept': 'application/json' }
    });
    const data = await r.json().catch(() => []);
    if (!r.ok) throw new Error(data?.error || `HTTP ${r.status}`);
    return (Array.isArray(data) ? data : []).find((x) => String(x.id) === String(id));
  }

  function show(job) {
    if (!job) return;
    document.getElementById('ipbotJobDetails')?.remove();
    let payload = job.payload;
    let payloadText;
    try {
      payloadText = JSON.stringify(typeof payload === 'string' ? JSON.parse(payload) : (payload ?? {}), null, 2);
    } catch (_) {
      payloadText = String(payload ?? '{}');
    }

    const modal = document.createElement('div');
    modal.id = 'ipbotJobDetails';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box';
    modal.innerHTML = `<div style="width:min(720px,100%);max-height:88vh;overflow:auto;background:#0d1b1f;color:#edf7f5;border:1px solid #29454b;border-radius:18px;padding:20px;box-sizing:border-box;box-shadow:0 20px 80px rgba(0,0,0,.5)">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
        <div><div style="font-size:11px;color:#91aaa5;letter-spacing:.12em">AGENT JOB</div><h2 style="margin:5px 0 0">Job Details</h2></div>
        <button id="ipbotCloseJob" type="button" style="padding:10px 14px;border:1px solid #29454b;border-radius:10px;background:#21c77a;color:#03100b;font-weight:800">Close</button>
      </div>
      <div style="margin-top:18px;line-height:1.7"><b>Type:</b> ${esc(job.type)}<br><b>Status:</b> ${esc(job.status)}<br><b>Created:</b> ${esc(job.created_at ? new Date(job.created_at).toLocaleString() : '—')}<br><b>ID:</b> ${esc(job.id)}</div>
      <h3 style="margin:18px 0 8px">Payload JSON</h3>
      <pre style="white-space:pre-wrap;overflow:auto;background:#081519;border:1px solid #1b3338;border-radius:12px;padding:14px;margin:0;font-size:13px">${esc(payloadText)}</pre>
    </div>`;
    document.body.appendChild(modal);
    document.getElementById('ipbotCloseJob').onclick = () => modal.remove();
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  }

  async function open(id) {
    try {
      const job = await getJob(id);
      if (!job) throw new Error('Job not found');
      show(job);
    } catch (e) {
      alert('Job details load nahi ho paaye: ' + e.message);
    }
  }

  function bind() {
    const jobs = document.getElementById('jobs');
    if (!jobs || jobs.dataset.detailsBound === '1') return;
    jobs.dataset.detailsBound = '1';
    jobs.addEventListener('click', (e) => {
      const item = e.target.closest('.jobItem,[data-job-id]');
      if (!item || !jobs.contains(item)) return;
      const id = item.getAttribute('data-job-id');
      if (id) { e.preventDefault(); e.stopPropagation(); open(id); }
    }, true);
  }

  const observer = new MutationObserver(bind);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
