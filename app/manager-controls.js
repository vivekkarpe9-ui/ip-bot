const MANAGER_POLICY_KEY='ipbot.managerPolicies.v1';

function managerPolicies(){
  try { const v=JSON.parse(localStorage.getItem(MANAGER_POLICY_KEY)); return Array.isArray(v)?v:[]; }
  catch { return []; }
}
function saveManagerPolicies(v){ localStorage.setItem(MANAGER_POLICY_KEY,JSON.stringify(v)); }
function managerControlPanel(){
  const policies=managerPolicies();
  const wrap=document.createElement('section');
  wrap.className='card builder';
  wrap.style.cssText='position:fixed;inset:7vh 5vw auto;z-index:50;max-height:86vh;overflow:auto';
  wrap.innerHTML=`<div class="section-head"><div><p class="eyebrow">MANAGER COVERAGE</p><h2>Finance Permissions</h2><p class="muted">Configure exactly what a manager may handle while you are unavailable.</p></div><button class="secondary" id="mcClose">Close</button></div>
  <form id="mcForm">
    <label>Manager name<input name="name" required maxlength="60" placeholder="Manager 1"></label>
    <div class="form-grid">
      <label>Per transaction limit (₹)<input name="tx" type="number" min="0" value="50000"></label>
      <label>Daily limit (₹)<input name="daily" type="number" min="0" value="100000"></label>
    </div>
    <div class="form-grid">
      <label><input name="sales" type="checkbox" checked> Approve agent sales</label>
      <label><input name="refunds" type="checkbox"> Approve refunds</label>
      <label><input name="transfers" type="checkbox" checked> Internal transfers</label>
      <label><input name="withdrawals" type="checkbox"> Review withdrawals</label>
    </div>
    <button class="primary">Save Manager Policy</button>
  </form>
  <div class="section-head"><h3>Configured Managers</h3></div>
  <div id="mcList">${policies.length?policies.map(p=>`<div class="agent-row"><div><b>${escapeManager(p.name)}</b><p class="muted">₹${Number(p.tx).toLocaleString('en-IN')} / transaction · ₹${Number(p.daily).toLocaleString('en-IN')} / day</p><small>${p.sales?'Sales ':''}${p.refunds?'Refunds ':''}${p.transfers?'Transfers ':''}${p.withdrawals?'Withdrawals':''}</small></div><button class="secondary" data-remove="${escapeManager(p.id)}">Remove</button></div>`).join(''):'<p class="muted">No manager policies configured.</p>'}</div>`;
  document.body.appendChild(wrap);
  wrap.querySelector('#mcClose').onclick=()=>wrap.remove();
  wrap.querySelector('#mcForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const p={id:crypto.randomUUID?.()||String(Date.now()),name:String(f.get('name')).trim(),tx:Number(f.get('tx')),daily:Number(f.get('daily')),sales:f.has('sales'),refunds:f.has('refunds'),transfers:f.has('transfers'),withdrawals:f.has('withdrawals'),createdAt:Date.now()};if(!p.name||p.tx<0||p.daily<0)return;const all=managerPolicies();all.push(p);saveManagerPolicies(all);wrap.remove();managerControlPanel();};
  wrap.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{saveManagerPolicies(managerPolicies().filter(p=>p.id!==b.dataset.remove));wrap.remove();managerControlPanel();});
}
function escapeManager(v){return String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));}
(function installManagerControl(){
  const add=()=>{if(document.getElementById('managerControlButton'))return;const top=document.querySelector('.topbar');if(!top)return;const b=document.createElement('button');b.id='managerControlButton';b.className='secondary';b.textContent='👨‍💼 Manager';b.onclick=managerControlPanel;top.appendChild(b);};
  add(); new MutationObserver(add).observe(document.body,{childList:true,subtree:true});
})();
