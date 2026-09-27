const products=[
{id:1,name:'Midnight Overshirt',cat:'Men',price:1499,old:1999,img:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85'},
{id:2,name:'Emerald Street Tee',cat:'Men',price:899,old:1199,img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85'},
{id:3,name:'Crimson Layer Jacket',cat:'Women',price:2499,old:3299,img:'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=85'},
{id:4,name:'Mystic Black Hoodie',cat:'Men',price:1799,old:2499,img:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85'},
{id:5,name:'Nova Smartphone',cat:'Electronics',price:24999,old:28999,img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85'},
{id:6,name:'Quantum Headphones',cat:'Electronics',price:4999,old:5999,img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85'},
{id:7,name:'Velocity Sneakers',cat:'Footwear',price:2999,old:3999,img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85'},
{id:8,name:'Orbit Smart Watch',cat:'Electronics',price:3999,old:5499,img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85'},
{id:9,name:'Satin Bloom Dress',cat:'Women',price:2199,old:2999,img:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85'},
{id:10,name:'Urban Carry Bag',cat:'Bags',price:1299,old:1799,img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85'}];
let cart=JSON.parse(localStorage.getItem('ipshop.cart')||'[]');let wish=JSON.parse(localStorage.getItem('ipshop.wish')||'[]');let active='All';
const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
const save=()=>{localStorage.setItem('ipshop.cart',JSON.stringify(cart));localStorage.setItem('ipshop.wish',JSON.stringify(wish));};
function render(){const q=(document.getElementById('search')?.value||'').toLowerCase();const list=products.filter(p=>(active==='All'||p.cat===active)&&(!q||p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q)));document.getElementById('products').innerHTML=list.map(p=>`<article class="product"><button class="heart" onclick="toggleWish(${p.id})">${wish.includes(p.id)?'♥':'♡'}</button><img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3><div class="meta">${p.cat}</div><div class="price">${money(p.price)} <span class="old">${money(p.old)}</span></div><button class="add" onclick="addCart(${p.id})">ADD TO CART</button></article>`).join('');document.getElementById('wishCount').textContent=wish.length;document.getElementById('cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0);document.querySelectorAll('.catBtn').forEach(b=>b.classList.toggle('active',b.dataset.cat===active));}
function addCart(id){const x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();render();openCart();}
function toggleWish(id){wish=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id];save();render();}
function setCat(c){active=c;render();}
function openCart(){document.getElementById('drawer').classList.add('open');renderCart();}
function closeCart(){document.getElementById('drawer').classList.remove('open');}
function renderCart(){const el=document.getElementById('cartItems');if(!cart.length){el.innerHTML='<p style="color:#7e979c">Your cart is empty.</p>';document.getElementById('cartTotal').textContent=money(0);return}el.innerHTML=cart.map(i=>{const p=products.find(x=>x.id===i.id);return `<div class="cartRow"><img src="${p.img}"><div><b>${p.name}</b><small style="display:block;color:#7e979c">${money(p.price)} × ${i.qty}</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button> <span>${i.qty}</span> <button onclick="changeQty(${p.id},1)">+</button></div></div><b>${money(p.price*i.qty)}</b></div>`}).join('');document.getElementById('cartTotal').textContent=money(cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0));}
function changeQty(id,d){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save();render();renderCart();}
function checkout(){if(!cart.length)return alert('Cart is empty');alert('Demo checkout ready — payment gateway can be connected next.');}
function navTo(label){document.getElementById('featured').scrollIntoView({behavior:'smooth'});if(label==='Shop')setCat('All');}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('search').addEventListener('input',render);render();});
