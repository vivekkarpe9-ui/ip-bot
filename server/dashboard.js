let key = localStorage.getItem('ipbot.ownerKey') || '';
let currentJobs = [];
let activeConversationId = localStorage.getItem('ipbot.activeConversation') || '';
let typingTimer = null;
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

async function api(path, opt = {}) {
  const r = await fetch(path, {
    ...opt,
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', 'x-owner-key': key, ...(opt.headers || {}) }
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error(d.error || ('HTTP ' + r.status)); e.status = r.status; throw e; }
  return d;
}

function notify(id, text, cls = 'ok') {
  const n = $(id);
  if (n) { n.textContent = text; n.className = cls; }
}

async function login() {
  const input = $('key'), msg = $('auth'), btn = $('connect');
  key = input.value.trim();
  if (!key) return notify('auth', 'पहले OWNER_API_KEY डालें', 'warn');
  btn.disabled = true; btn.textContent = 'Connecting…';
  try {
    const me = await api('/api/me');
    msg.textContent = `Connected as ${me.role || 'Owner'}`;
    msg.className = 'ok';
    $('panel').classList.remove('hide');
    localStorage.setItem('ipbot.ownerKey', key);
    await load();
    await initChat();
  } catch (e) {
    msg.textContent = e.status === 401 ? 'Login failed: OWNER_API_KEY गलत है.' : 'Connection failed: ' + e.message;
    msg.className = 'bad';
  } finally { btn.disabled = false; btn.textContent = 'Connect'; }
}

function renderJobs() {
  const box = $('jobs');
  if (!currentJobs.length) { box.innerHTML = '<div class="empty">No jobs</div>'; return; }
  box.innerHTML = currentJobs.slice(0, 50).map(j => {
    const canRun = ['queued','failed'].includes(j.status);
    const canRetry = ['cancelled','failed'].includes(j.status);
    return `<div class="item jobItem" data-job-id="${esc(j.id)}">
      <div><b>${esc(j.type)}</b> • <span class="status status-${esc(j.status)}">${esc(j.status)}</span></div>
      <small>${esc(new Date(j.created_at).toLocaleString())}</small>
      <div class="row compact">
        <button data-action="details" data-id="${esc(j.id)}" type="button">Details</button>
        ${canRun ? `<button data-action="run" data-id="${esc(j.id)}" type="button">Run</button>` : ''}
        ${canRun ? `<button data-action="cancel" data-id="${esc(j.id)}" type="button">Cancel</button>` : ''}
        ${canRetry ? `<button data-action="retry" data-id="${esc(j.id)}" type="button">Retry</button>` : ''}
      </div>
    </div>`;
  }).join('');
}

function showJobDetails(id) {
  const j = currentJobs.find(x => String(x.id) === String(id));
  if (!j) return;
  let payload = {};
  try { payload = typeof j.payload === 'string' ? JSON.parse(j.payload) : (j.payload || {}); }
  catch { payload = { raw: String(j.payload || '') }; }
  const result = payload.result || null;
  $('modalRoot').innerHTML = `<div class="modal-backdrop" id="jobModal"><div class="modal">
    <div class="modal-head"><div><small>AGENT JOB</small><h2>Job Details</h2></div><button id="closeModal" type="button">Close</button></div>
    <div class="details"><b>Type:</b> ${esc(j.type)}<br><b>Status:</b> ${esc(j.status)}<br><b>Created:</b> ${esc(new Date(j.created_at).toLocaleString())}<br><b>ID:</b> ${esc(j.id)}</div>
    <h3>Payload</h3><pre>${esc(JSON.stringify(payload,null,2))}</pre>
    ${result ? `<div class="card"><b class="ok">Result</b><p>${esc(result.message || 'Completed')}</p></div>` : ''}
    <div class="row compact">
      ${!['completed','cancelled'].includes(j.status) ? '<button id="modalRun" type="button">Run</button>' : ''}
      ${['cancelled','failed'].includes(j.status) ? '<button id="modalRetry" type="button">Retry</button>' : ''}
      ${!['completed','cancelled'].includes(j.status) ? '<button id="modalCancel" type="button">Cancel</button>' : ''}
    </div>
  </div></div>`;
  $('closeModal').onclick = closeModal;
  $('jobModal').onclick = e => { if (e.target.id === 'jobModal') closeModal(); };
  if ($('modalRun')) $('modalRun').onclick = () => jobAction(j.id, 'run');
  if ($('modalRetry')) $('modalRetry').onclick = () => jobAction(j.id, 'retry');
  if ($('modalCancel')) $('modalCancel').onclick = () => jobAction(j.id, 'cancel');
}
function closeModal() { $('modalRoot').innerHTML = ''; }

async function jobAction(id, action) {
  try { const row = await api(`/api/jobs/${encodeURIComponent(id)}/${action}`, { method: 'POST' }); closeModal(); await load(); notify('jobMsg', `Job ${action} done: ${row.status || 'ok'}`); }
  catch (e) { notify('jobMsg', e.message, 'bad'); }
}

async function load() {
  try {
    const [agents, approvals, jobs, ledger] = await Promise.all([
      api('/api/agents'), api('/api/approvals'), api('/api/jobs'), api('/api/ledger')
    ]);
    const ag = agents || [], a = approvals || [], j = jobs || [], l = ledger || [];
    currentJobs = j;
    $('agentCount').textContent = ag.length;
    $('approvalCount').textContent = a.length;
    $('jobCount').textContent = j.length;
    $('balance').textContent = '₹' + l.reduce((s,x) => s + (String(x.type).toLowerCase() === 'credit' ? Number(x.amount) : -Number(x.amount)), 0).toFixed(2);
    $('agents').innerHTML = ag.length ? ag.map(x => `<div class="item"><b>${esc(x.name)}</b> • ${esc(x.email)} • <span class="status">${esc(x.status)}</span><div class="row compact"><button data-id="${esc(x.id)}" data-decision="active" class="agentDecision" type="button">Activate</button><button data-id="${esc(x.id)}" data-decision="suspended" class="agentDecision" type="button">Suspend</button></div></div>`).join('') : '<div class="empty">No agents</div>';
    $('approvals').innerHTML = a.length ? a.map(x => `<div class="item"><b>${esc(x.type)}</b> • ₹${esc(x.amount)} • <span class="status">${esc(x.status)}</span><div class="row compact"><button data-id="${esc(x.id)}" data-decision="approved" class="decision" type="button">Approve</button><button data-id="${esc(x.id)}" data-decision="rejected" class="decision" type="button">Reject</button></div></div>`).join('') : '<div class="empty">No approvals</div>';
    $('ledger').innerHTML = l.length ? l.slice(0,50).map(x => `<div class="item">${esc(x.type)} • ₹${esc(x.amount)} ${esc(x.currency)} • ${esc(x.reference || '')}</div>`).join('') : '<div class="empty">No ledger entries</div>';
    renderJobs();
  } catch (e) { notify('auth', 'Session error: ' + e.message, 'bad'); }
}

async function addAgent() {
  const name = $('agentName').value.trim(), email = $('agentEmail').value.trim().toLowerCase();
  if (!name || !email) return notify('agentMsg','Agent name और email दोनों भरें','warn');
  try { await api('/api/agents',{method:'POST',body:JSON.stringify({name,email})}); $('agentName').value=''; $('agentEmail').value=''; notify('agentMsg','Agent added'); await load(); }
  catch(e) { notify('agentMsg',e.message,'bad'); }
}

async function addJob() {
  const type = $('jobType').value.trim() || 'general';
  let payload = {};
  try { payload = JSON.parse($('jobPayload').value || '{}'); }
  catch { return notify('jobMsg','Payload JSON गलत है','warn'); }
  try { await api('/api/jobs',{method:'POST',body:JSON.stringify({type,payload})}); $('jobType').value=''; $('jobPayload').value=''; notify('jobMsg','Job created — Recent Agent Jobs में Run दबाएँ'); await load(); }
  catch(e) { notify('jobMsg',e.message,'bad'); }
}

async function addApproval() {
  const type = $('approvalType').value.trim() || 'general', amount = Number($('approvalAmount').value || 0);
  if (!Number.isFinite(amount) || amount < 0) return notify('approvalMsg','Valid amount डालें','warn');
  try { await api('/api/approvals',{method:'POST',body:JSON.stringify({type,amount})}); $('approvalType').value=''; $('approvalAmount').value=''; notify('approvalMsg','Approval created'); await load(); }
  catch(e) { notify('approvalMsg',e.message,'bad'); }
}

async function addLedger() {
  const type = $('ledgerType').value.trim() || 'adjustment', amount = Number($('ledgerAmount').value || 0), reference = $('ledgerRef').value.trim();
  if (!Number.isFinite(amount) || amount <= 0) return notify('ledgerMsg','Positive amount डालें','warn');
  try { await api('/api/ledger',{method:'POST',body:JSON.stringify({type,amount,reference})}); $('ledgerType').value=''; $('ledgerAmount').value=''; $('ledgerRef').value=''; notify('ledgerMsg','Ledger entry added'); await load(); }
  catch(e) { notify('ledgerMsg',e.message,'bad'); }
}

function savingModal() {
  $('modalRoot').innerHTML = `<div class="modal-backdrop" id="savingModal"><div class="modal"><div class="modal-head"><div><small>WORKFLOW</small><h2>Saving Account</h2></div><button id="closeSaving" type="button">Close</button></div><p class="muted">यह internal workflow record बनाएगा; यह किसी bank में वास्तविक account नहीं खोलता। Create दबाने पर job तुरंत execute होकर Completed दिखेगा।</p><div class="form-grid"><input id="saName" placeholder="Customer name"><input id="saMobile" placeholder="Mobile number"><select id="saType"><option>Savings</option><option>Salary Savings</option><option>Basic Savings</option></select><input id="saAmount" type="number" min="0" placeholder="Amount ₹"><input id="saRef" placeholder="Reference"></div><button id="saveAccount" type="button">Create & Run Saving Account</button><p id="saMsg" class="muted"></p></div></div>`;
  $('closeSaving').onclick = closeModal;
  $('savingModal').onclick = e => { if (e.target.id === 'savingModal') closeModal(); };
  $('saveAccount').onclick = async () => {
    const btn = $('saveAccount');
    btn.disabled = true; btn.textContent = 'Running…';
    try {
      const row = await api('/api/saving-account',{method:'POST',body:JSON.stringify({customerName:$('saName').value,mobile:$('saMobile').value,accountType:$('saType').value,amount:Number($('saAmount').value||0),reference:$('saRef').value})});
      $('saMsg').textContent = `Completed: ${row?.payload?.result?.message || 'Saving Account workflow completed.'}`;
      $('saMsg').className = 'ok';
      await load();
    } catch(e) { $('saMsg').textContent = e.message; $('saMsg').className='bad'; }
    finally { btn.disabled=false; btn.textContent='Create & Run Saving Account'; }
  };
}

function chats(){return JSON.parse(localStorage.getItem('ipbot.chats')||'[]');}
function saveChats(v){localStorage.setItem('ipbot.chats',JSON.stringify(v));}
function messages(id){return JSON.parse(localStorage.getItem('ipbot.messages.'+id)||'[]');}
function saveMessages(id,v){localStorage.setItem('ipbot.messages.'+id,JSON.stringify(v));}
function newLocalChat(){const id='local-'+Date.now();const list=chats();list.unshift({id,title:'New chat',createdAt:Date.now()});saveChats(list);activeConversationId=id;localStorage.setItem('ipbot.activeConversation',id);renderChatList();renderChatMessages();}
function renderChatList(){const list=chats();if(!activeConversationId&&list[0])activeConversationId=list[0].id;if(!list.length){newLocalChat();return;}const q=($('chatSearch')?.value||'').toLowerCase();$('chatList').innerHTML=list.filter(x=>x.title.toLowerCase().includes(q)).map(x=>`<button class="chat-item ${x.id===activeConversationId?'active':''}" data-chat-id="${esc(x.id)}" type="button">${esc(x.title)}</button>`).join('')||'<div class="empty">No chats</div>';}
function renderChatMessages(){const box=$('chatMessages');if(!box)return;const list=messages(activeConversationId);box.innerHTML=list.map((m,i)=>`<div class="msg ${m.role}"><div class="bubble">${formatText(m.content)}</div><div class="msg-actions"><button data-copy="${i}" type="button">Copy</button>${m.role==='assistant'?`<button data-regen="${i}" type="button">Regenerate</button>`:''}</div></div>`).join('');box.scrollTop=box.scrollHeight;}
function formatText(text){return esc(text).replace(/\*\*(.*?)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>');}
function pushMessage(role,content){const list=messages(activeConversationId);list.push({role,content,createdAt:Date.now()});saveMessages(activeConversationId,list);renderChatMessages();}
function localAssistant(text){const q=text.toLowerCase();if(q.includes('saving account'))return 'Saving Account workflow ready. Button दबाकर details भरें; अब Create & Run से job तुरंत Completed होगा।';if(q==='status')return 'iP Bot online. Dashboard, Agents, Approvals, Jobs, Ledger और Chat active हैं।';if(q.includes('jobs'))return currentJobs.slice(0,8).map(j=>`${j.type} — ${j.status}`).join('\n')||'No jobs.';if(q.includes('approval'))return 'Approvals में Approve/Reject buttons हैं।';if(q.includes('agent'))return 'Agent Management में Add Agent, Activate और Suspend controls हैं।';if(q.includes('ledger'))return `Wallet balance: ${$('balance').textContent}`;if(q.includes('help'))return 'Try: status, jobs, approvals, agents, ledger, saving account.';return `मैंने आपका message समझा: “${text}”\n\nमैं iP Bot का local workflow assistant हूँ।`}
function sendChat(){const input=$('chatInput'),text=input.value.trim();if(!text)return;pushMessage('user',text);input.value='';clearTimeout(typingTimer);$('typing').classList.remove('hide');typingTimer=setTimeout(()=>{pushMessage('assistant',localAssistant(text));$('typing').classList.add('hide');},350);}
function renameChat(){const list=chats(),item=list.find(x=>x.id===activeConversationId);if(!item)return;const title=prompt('Chat name',item.title);if(title?.trim()){item.title=title.trim().slice(0,80);saveChats(list);renderChatList();}}
function deleteChat(){const id=activeConversationId,list=chats().filter(x=>x.id!==id);localStorage.removeItem('ipbot.messages.'+id);saveChats(list);activeConversationId='';if(!list.length)newLocalChat();else{activeConversationId=list[0].id;localStorage.setItem('ipbot.activeConversation',activeConversationId);renderChatList();renderChatMessages();}}
function clearChat(){saveMessages(activeConversationId,[]);renderChatMessages();}
function initChat(){if(!chats().length)newLocalChat();else{renderChatList();renderChatMessages();}}

$('connect').addEventListener('click',login);
$('key').addEventListener('keydown',e=>{if(e.key==='Enter')login();});
$('addAgent').addEventListener('click',addAgent);$('addJob').addEventListener('click',addJob);$('addApproval').addEventListener('click',addApproval);$('addLedger').addEventListener('click',addLedger);$('savingAccountBtn').addEventListener('click',savingModal);
$('newChat').addEventListener('click',newLocalChat);$('renameChat').addEventListener('click',renameChat);$('deleteChat').addEventListener('click',deleteChat);$('clearChat').addEventListener('click',clearChat);$('sendChat').addEventListener('click',sendChat);
$('chatInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat();}});$('chatSearch').addEventListener('input',renderChatList);
$('chatList').addEventListener('click',e=>{const b=e.target.closest('[data-chat-id]');if(!b)return;activeConversationId=b.dataset.chatId;localStorage.setItem('ipbot.activeConversation',activeConversationId);renderChatList();renderChatMessages();});
$('jobs').addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b){e.stopPropagation();const a=b.dataset.action;a==='details'?showJobDetails(b.dataset.id):jobAction(b.dataset.id,a);return;}const item=e.target.closest('.jobItem');if(item)showJobDetails(item.dataset.jobId);});
$('approvals').addEventListener('click',async e=>{const b=e.target.closest('.decision');if(!b)return;try{await api('/api/approvals/'+encodeURIComponent(b.dataset.id)+'/'+b.dataset.decision,{method:'POST'});await load();}catch(err){notify('approvalMsg',err.message,'bad');}});
$('agents').addEventListener('click',async e=>{const b=e.target.closest('.agentDecision');if(!b)return;try{await api('/api/agents/'+encodeURIComponent(b.dataset.id)+'/'+b.dataset.decision,{method:'POST'});await load();}catch(err){notify('agentMsg',err.message,'bad');}});
$('chatMessages').addEventListener('click',e=>{const c=e.target.closest('[data-copy]');if(c){const m=messages(activeConversationId)[Number(c.dataset.copy)];navigator.clipboard?.writeText(m.content);return;}const r=e.target.closest('[data-regen]');if(r){const list=messages(activeConversationId),prev=list[Number(r.dataset.regen)-1];if(prev?.role==='user'){list.splice(Number(r.dataset.regen),1);saveMessages(activeConversationId,list);pushMessage('assistant',localAssistant(prev.content));}}});

(function boot(){const stored=localStorage.getItem('ipbot.ownerKey');if(stored){key=stored;$('key').value=stored;login();}})();
