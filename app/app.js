const defaultRooms=[['☀️','Solar Business','Projects, customers & P&L'],['✈️','Travel','Trips, hotels & groups'],['👕','Shopping','Products, orders & sellers'],['📞','Call Centre','Leads, support & tickets'],['👥','HR','People, hiring & payroll'],['📣','Marketing','Campaigns & content'],['💼','General Business','CRM, tasks & finance']];
const STORAGE_KEY='ipbot.rooms.v1';
let rooms=loadRooms();
const el=document.getElementById('rooms');
function loadRooms(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));return Array.isArray(saved)&&saved.length?saved:defaultRooms.map(r=>[...r]);}catch{return defaultRooms.map(r=>[...r]);}}
function saveRooms(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(rooms));}catch{}}
function updateCount(){const counter=document.getElementById('roomCount');if(counter)counter.textContent=rooms.length;}
function render(){if(!el)return;el.innerHTML=rooms.map((r,i)=>`<article class="room card" tabindex="0" role="button" onclick="openRoom(${i})" onkeydown="if(event.key==='Enter')openRoom(${i})"><div class="room-icon">${escapeHtml(r[0])}</div><h3>${escapeHtml(r[1])}</h3><p>${escapeHtml(r[2])}</p></article>`).join('');updateCount();}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function openRoom(i){const room=rooms[i];if(!room)return;alert(`${room[1]}\n\nRoom workspace\n\nAgents • Teams • Tasks • Workflows • Research • Files • Analytics • Approvals`);}
function createRoom(){const name=prompt('Work Room name');if(!name||!name.trim())return;const clean=name.trim().slice(0,60);rooms.push(['◈',clean,'Custom Agent workspace']);saveRooms();render();}
render();