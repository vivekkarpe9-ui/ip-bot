const rooms=[['☀️','Solar Business','Projects, customers & P&L'],['✈️','Travel','Trips, hotels & groups'],['👕','Shopping','Products, orders & sellers'],['📞','Call Centre','Leads, support & tickets'],['👥','HR','People, hiring & payroll'],['📣','Marketing','Campaigns & content'],['💼','General Business','CRM, tasks & finance'],['＋','Custom Work Room','Create anything you need']];
const el=document.getElementById('rooms');
function render(){el.innerHTML=rooms.map((r,i)=>`<article class="room card" onclick="openRoom(${i})"><div class="room-icon">${r[0]}</div><h3>${r[1]}</h3><p>${r[2]}</p></article>`).join('')}
function openRoom(i){const name=rooms[i][1];alert(`${name}\n\nRoom workspace is ready for Agent Teams, tasks, workflows, files, analytics and approvals.`)}
function createRoom(){const name=prompt('Work Room name');if(name&&name.trim()){rooms.push(['◈',name.trim(),'Custom Agent workspace']);document.getElementById('roomCount').textContent=rooms.length;render()}}
render();