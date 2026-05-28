// ── PRODUCTS ──────────────────────────────────────────────
const DEFAULT = [
  {id:1, name:"Oversized Cargo Jacket",   cat:"Apparel",     price:28500, stock:18, badge:"Hot",
   img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=70"},
  {id:2, name:"Leather Bifold Wallet",     cat:"Accessories", price:7200,  stock:42, badge:null,
   img:"https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=70"},
  {id:3, name:"Low-Top Canvas Sneakers",   cat:"Footwear",    price:22000, stock:9,  badge:"Low",
   img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=70"},
  {id:4, name:"Wide-Leg Linen Trousers",   cat:"Apparel",     price:18500, stock:25, badge:null,
   img:"https://images.unsplash.com/photo-1594938298603-c8148c4b4937?w=600&auto=format&fit=crop&q=70"},
  {id:5, name:"Wireless ANC Earbuds",      cat:"Electronics", price:39000, stock:14, badge:"New",
   img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=70"},
  {id:6, name:"Ceramic Pour-Over Set",     cat:"Home",        price:22000, stock:20, badge:"New",
   img:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=70"},
  {id:7, name:"Essential Crewneck Tee",    cat:"Apparel",     price:8900,  stock:80, badge:null,
   img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=70"},
  {id:8, name:"Chelsea Leather Boots",     cat:"Footwear",    price:67000, stock:11, badge:"Premium",
   img:"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=70"},
  {id:9, name:"Slim Analog Watch",         cat:"Accessories", price:95000, stock:6,  badge:"Limited",
   img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=70"},
  {id:10,name:"Ribbed Merino Beanie",      cat:"Accessories", price:4200,  stock:55, badge:null,
   img:"https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&auto=format&fit=crop&q=70"},
  {id:11,name:"Structured Canvas Tote",   cat:"Accessories", price:6800,  stock:38, badge:null,
   img:"https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=70"},
  {id:12,name:"Smart LED Desk Lamp",       cat:"Electronics", price:18500, stock:22, badge:"New",
   img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=70"},
  {id:13,name:"Suede Slip-On Loafers",     cat:"Footwear",    price:44000, stock:15, badge:null,
   img:"https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=70"},
  {id:14,name:"Linen Duvet Cover Set",     cat:"Home",        price:35000, stock:12, badge:null,
   img:"https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=70"},
  {id:15,name:"Slim USB-C Hub 7-in-1",     cat:"Electronics", price:28000, stock:30, badge:"New",
   img:"https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=600&auto=format&fit=crop&q=70"},
];

// ── STATE ─────────────────────────────────────────────────
let products = JSON.parse(localStorage.getItem('kv_prods') || 'null') || DEFAULT;
let cart     = JSON.parse(localStorage.getItem('kv_cart')  || '[]');
let authed   = false;
let formOpen = false;
let activeFilter = 'All';
const PIN = '1234';
const WA  = '2348100000000'; // ← change to real number

function save(){
  localStorage.setItem('kv_prods', JSON.stringify(products));
  localStorage.setItem('kv_cart',  JSON.stringify(cart));
}

// ── NAVIGATION ────────────────────────────────────────────
function go(p){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.nb').forEach(x=>x.classList.remove('on'));
  document.getElementById('page-'+p).classList.add('active');
  document.getElementById('nb-'+p).classList.add('on');
  if(p==='home')  renderHome();
  if(p==='cart')  renderCart();
  if(p==='admin') renderAdmin();
}

// ── HELPERS ───────────────────────────────────────────────
const fmt = n => '₦'+n.toLocaleString('en-NG');
const inCart = id => cart.find(c=>c.id===id);

// ── HOME ──────────────────────────────────────────────────
function renderHome(){
  const cats = ['All', ...new Set(products.map(p=>p.cat))];
  document.getElementById('h-count').textContent = products.length;

  // filter bar
  document.getElementById('filter-bar').innerHTML = cats.map(c=>`
    <button class="filter-btn ${c===activeFilter?'on':''}" onclick="setFilter('${c}')">${c}</button>
  `).join('');

  // grid
  const list = activeFilter==='All' ? products : products.filter(p=>p.cat===activeFilter);
  document.getElementById('grid').innerHTML = list.map(p=>`
    <div class="pcard">
      ${p.badge?`<div class="pbadge ${p.badge==='Low'?'sale':''}">${p.badge}</div>`:''}
      <div class="pcard-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=70'">
      </div>
      <div class="pcard-body">
        <div class="pcat">${p.cat}</div>
        <div class="pname">${p.name}</div>
        <div class="pcard-foot">
          <span class="pprice">${fmt(p.price)}</span>
          <button class="add-btn ${inCart(p.id)?'added':''}" id="ab-${p.id}" onclick="addToCart(${p.id})">
            ${inCart(p.id)
              ? `<svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Added`
              : `<svg class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add`
            }
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function setFilter(c){ activeFilter=c; renderHome(); }

function addToCart(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  const ex = inCart(id);
  if(ex){ ex.qty++; } else { cart.push({...p, qty:1}); }
  save();
  updateBadge();

  // update just this button in place (no full re-render = no flicker)
  const btn = document.getElementById('ab-'+id);
  if(btn){
    btn.classList.add('added');
    btn.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Added`;
  }
  toast(`${p.name} added to cart`);
}

// ── CART ──────────────────────────────────────────────────
function updateBadge(){
  const t = cart.reduce((s,c)=>s+c.qty,0);
  document.getElementById('cart-badge').textContent = t;
  const el = document.getElementById('cart-title-count');
  if(el) el.textContent = t ? t+' item'+(t>1?'s':'') : '';
}

function renderCart(){
  updateBadge();
  const el = document.getElementById('cart-body');
  if(!cart.length){
    el.innerHTML=`
      <div class="cart-empty">
        <svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6"/>
        </svg>
        <p>Your cart is empty</p>
        <button class="btn" onclick="go('home')">Continue Shopping</button>
      </div>`;
    return;
  }
  const sub = cart.reduce((s,c)=>s+c.price*c.qty,0);
  const del = 2500;
  el.innerHTML = cart.map(c=>`
    <div class="ci">
      <div class="ci-img"><img src="${c.img}" alt="${c.name}" loading="lazy"></div>
      <div>
        <div class="ci-name">${c.name}</div>
        <div class="ci-price">${fmt(c.price)}</div>
      </div>
      <div class="qty-wrap">
        <button class="qb" onclick="chQty(${c.id},-1)">−</button>
        <span class="qv">${c.qty}</span>
        <button class="qb" onclick="chQty(${c.id},1)">+</button>
      </div>
      <button class="rm-btn" onclick="rmItem(${c.id})">
        <svg class="icon" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
      </button>
    </div>`).join('')+`
  <div class="cart-summary">
    <div class="sum-row"><span>Subtotal</span><span>${fmt(sub)}</span></div>
    <div class="sum-row"><span>Delivery</span><span>${fmt(del)}</span></div>
    <div class="sum-total"><span>TOTAL</span><span>${fmt(sub+del)}</span></div>
    <button class="wa-btn" onclick="orderWA()">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Order via WhatsApp
    </button>
  </div>`;
}

function chQty(id,d){
  const it=cart.find(c=>c.id===id);
  if(!it) return;
  it.qty+=d;
  if(it.qty<=0) cart=cart.filter(c=>c.id!==id);
  save(); updateBadge(); renderCart();
}
function rmItem(id){ cart=cart.filter(c=>c.id!==id); save(); updateBadge(); renderCart(); }

function orderWA(){
  if(!cart.length) return;
  const sub=cart.reduce((s,c)=>s+c.price*c.qty,0);
  let m='🛍️ *New Order — KOVA Store*\n\n';
  cart.forEach(c=>{ m+=`• ${c.name} x${c.qty} — ${fmt(c.price*c.qty)}\n`; });
  m+=`\n💰 *Subtotal:* ${fmt(sub)}\n🚚 *Delivery:* ${fmt(2500)}\n✅ *Total:* ${fmt(sub+2500)}`;
  m+='\n\nPlease confirm my order. Thank you!';
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(m)}`,'_blank');
}

// ── ADMIN ─────────────────────────────────────────────────
function renderAdmin(){
  if(authed){ showPanel(); } else { showLock(); }
}
function showLock(){
  document.getElementById('lock-wrap').style.display='flex';
  document.getElementById('apanel').style.display='none';
  document.querySelectorAll('.pd').forEach(d=>d.value='');
  document.getElementById('pin-err').textContent='';
}
function showPanel(){
  document.getElementById('lock-wrap').style.display='none';
  document.getElementById('apanel').style.display='block';
  const inv=products.reduce((s,p)=>s+p.price*p.stock,0);
  const low=products.filter(p=>p.stock<12).length;
  document.getElementById('stats').innerHTML=`
    <div class="sc"><div class="sc-lbl">Products</div><div class="sc-val">${products.length}</div></div>
    <div class="sc"><div class="sc-lbl">Cart Items</div><div class="sc-val">${cart.reduce((s,c)=>s+c.qty,0)}</div></div>
    <div class="sc"><div class="sc-lbl">Low Stock</div><div class="sc-val" style="color:var(--red)">${low}</div></div>
    <div class="sc"><div class="sc-lbl">Inv. Value</div><div class="sc-val" style="font-size:1.1rem">${fmt(inv)}</div></div>
  `;
  document.getElementById('admin-rows').innerHTML=products.map(p=>`
    <div class="tr">
      <span class="tr-name">
        <img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'">
        ${p.name}
      </span>
      <span class="tr-cat">${p.cat}</span>
      <span class="tr-price">${fmt(p.price)}</span>
      <span class="stk ${p.stock<12?'lo':'ok'}">${p.stock} ${p.stock<12?'▼':'✓'}</span>
    </div>`).join('');
}

// pin
const pds=document.querySelectorAll('.pd');
pds.forEach((d,i)=>{
  d.addEventListener('input',()=>{
    if(d.value && i<pds.length-1) pds[i+1].focus();
    if(i===pds.length-1 && d.value) checkPin();
  });
  d.addEventListener('keydown',e=>{ if(e.key==='Backspace'&&!d.value&&i>0) pds[i-1].focus(); });
});
function checkPin(){
  const pin=[...pds].map(d=>d.value).join('');
  if(pin===PIN){ authed=true; showPanel(); }
  else{
    document.getElementById('pin-err').textContent='Incorrect PIN — try again.';
    pds.forEach(d=>d.value=''); pds[0].focus();
    setTimeout(()=>document.getElementById('pin-err').textContent='',2200);
  }
}
function logout(){ authed=false; showLock(); }

function toggleForm(){
  formOpen=!formOpen;
  document.getElementById('af').style.display=formOpen?'block':'none';
  document.getElementById('tog').innerHTML=formOpen
    ?`<svg class="icon" style="width:13px;height:13px" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Close`
    :`<svg class="icon" style="width:13px;height:13px" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add New Product`;
}
function saveProduct(){
  const name=document.getElementById('fn').value.trim();
  const cat=document.getElementById('fc').value;
  const price=parseInt(document.getElementById('fp').value);
  const stock=parseInt(document.getElementById('fs').value);
  const img=document.getElementById('fi').value.trim()||'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=70';
  if(!name||!price||!stock){ toast('Fill all required fields',true); return; }
  products.push({id:Date.now(),name,cat,price,stock,img,badge:'New'});
  save(); showPanel(); toggleForm();
  ['fn','fp','fs','fi'].forEach(id=>document.getElementById(id).value='');
  toast('Product added!');
}

// ── TOAST ─────────────────────────────────────────────────
let tt;
function toast(msg,err=false){
  const t=document.getElementById('toast');
  document.getElementById('toast-msg').textContent=msg;
  t.style.background=err?'var(--red)':'var(--accent)';
  t.style.color=err?'#fff':'#000';
  t.querySelectorAll('.icon').forEach(i=>i.style.stroke=err?'#fff':'#000');
  t.classList.add('show');
  clearTimeout(tt);
  tt=setTimeout(()=>t.classList.remove('show'),2600);
}

// ── INIT ──────────────────────────────────────────────────
updateBadge();
renderHome();