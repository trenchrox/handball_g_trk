/* =====================================================================
   TEAMBUILDER v0.2 — fristående lagindelningsapp för handbollstrupp
   Syskonapp till Handboll Tracker. Allt lokalt, IndexedDB, ingen server.
   ===================================================================== */

/* ---------- SVG-ikoner ---------- */
const SVG = {
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="17" cy="9.5" r="2.4"/><path d="M16 15.2c2.3.2 4 1.7 4.5 4.3"/></svg>',
  whistle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 9h7v3.5A6.5 6.5 0 1 1 8.5 7H13z"/><circle cx="9.5" cy="13.5" r="1"/><path d="M9 3v2M13 3.5l-1 2M5 3.5l1 2"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3"/><path d="M17 6h3v1a3 3 0 0 1-3 3"/><path d="M10 15h4l1 5H9z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"/></svg>',
  lockClosed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  lockOpen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-1.8"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13M10 11v6M14 11v6"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h4l10 10h4"/><path d="M3 17h4l3-3M14 10l3-3h4"/><path d="M18 4l3 3-3 3M18 14l3 3-3 3"/></svg>',
  print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8V4h10v4"/><rect x="4" y="8" width="16" height="8" rx="1"/><path d="M7 13h10v7H7z"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4 19h16"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5"/><path d="M4 19h16"/></svg>',
  gridIc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.4 10.8 15.6 6.4M8.4 13.2l7.2 4.4"/></svg>',
  pitch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 10h2a2.4 2.4 0 0 1 0 4H3M21 10h-2a2.4 2.4 0 0 0 0 4h2M12 5v14"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 1 8-8c3 0 5.6 1.7 7 4.2"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-8 8c-3 0-5.6-1.7-7-4.2"/><path d="M4 20v-5h5"/></svg>',
  paste: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9.5 10h5M9.5 14h5"/></svg>',
  listIc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></svg>'
};
function fillSvg(scope){
  (scope||document).querySelectorAll('[data-svg]').forEach(el=>{
    const k=el.dataset.svg; if(SVG[k]) el.innerHTML=SVG[k];
  });
}

/* ---------- Konstanter ---------- */
const POS_FULL=[['MV','Målvakt'],['M6','Mittsexa'],['V6','Vänstersexa'],['H6','Högersexa'],
  ['M9','Mittnia'],['V9','Vänsternia'],['H9','Högernia']];
const POS_SIMPLE=[['MV','Målvakt'],['BAK','Bak'],['MITT','Mitt'],['KANT','Kant']];
const POS_NAMES={}; POS_FULL.concat(POS_SIMPLE).forEach(([c,n])=>POS_NAMES[c]=n);
// Kantpositionerna är borttagna – sidan behålls via sexan. Kvar som alias så
// att äldre data och inklistrade listor med kantbenämningar hamnar rätt.
const POS_RETIRED={KV:'V6',KH:'H6'};
function migratePos(p){ return p?(POS_RETIRED[p]||p):null; }
const VESTS=[
  {id:'svart',  name:'Svart',  bg:'#141416', ink:'#ffffff'},
  {id:'vit',    name:'Vit',    bg:'#f2f2f7', ink:'#1c1c1e'},
  {id:'vinrod', name:'Vinröd', bg:'#8e1537', ink:'#ffffff'},
  {id:'gul',    name:'Gul',    bg:'#ffd60a', ink:'#1a1205'},
  {id:'bla',    name:'Blå',    bg:'#0a84ff', ink:'#ffffff'},
  {id:'gron',   name:'Grön',   bg:'#30d158', ink:'#04231b'},
  {id:'rod',    name:'Röd',    bg:'#ff453a', ink:'#ffffff'}
];
// Utgångna västfärger pekas om så gamla lag inte tystnar i fel färg.
const VEST_RETIRED={orange:'gul',lila:'bla'};
// Träning delar in i grupper, cup i lag – samma mekanik, olika ord.
const TRAIN_PREFIX='Grupp ', CUP_PREFIX='Lag ';
const PLAYER_COLORS=['#0a84ff','#30d158','#ff453a','#ffd60a','#ff9f0a','#bf5af2','#64d2ff','#ff6482','#98989f'];
const PARAM_DEFS=[
  ['balance','Jämna nivåer','Av = ren slump'],
  ['gk','Minst en målvakt per {N}',''],
  ['pos','Sprid positioner',''],
  ['rel','Ta hänsyn till relationer',''],
  ['defbal','Jämna försvar','Kräver försvarssiffror'],
  ['left','Sprid vänsterhänta',''],
  ['vary','Variera mot förra gången','Kräver historik']
];
const DEFAULT_PARAMS={balance:true,gk:true,pos:true,rel:true,defbal:true,left:false,vary:false};
// Serienivå: vilken nivå i seriesystemet spelaren tillhör. Neutral fakta,
// inte en bedömning – visas öppet och följer med i truppdelning.
const SERIES=[1,2,3];
// Urval av serienivåer. Flera kan vara valda samtidigt (t.ex. [2,3]);
// tom lista = hela truppen. 'none' = spelare utan satt serienivå.
function normSel(v){
  if(Array.isArray(v)) return v.filter(x=>SERIES.includes(x)||x==='none');
  if(v==null||v==='all'||v==='even') return [];
  if(v==='none') return ['none'];
  return SERIES.includes(v)?[v]:[];
}
function inSel(p,sel){
  const s=normSel(sel);
  if(!s.length) return true;
  return p.serie?s.includes(p.serie):s.includes('none');
}
function toggleSel(sel,val){
  const s=normSel(sel);
  if(val==='all') return [];
  const i=s.indexOf(val);
  if(i>=0){ s.splice(i,1); return s; }
  s.push(val);
  return s.sort((a,b)=>(a==='none')-(b==='none')||a-b);
}
function serieLabel(sel){
  const s=normSel(sel);
  if(!s.length) return 'Jämna';
  const tiers=s.filter(x=>x!=='none');
  const parts=[];
  if(tiers.length) parts.push('Nivå '+tiers.join('+'));
  if(s.includes('none')) parts.push(tiers.length?'utan nivå':'Utan nivå');
  return parts.join(' + ');
}
// Gradering: en enda dold siffra 1–10. Osatt gradering räknas som mitten.
const LEVELS=[1,2,3,4,5,6,7,8,9,10];
const LEVEL_MID=5.5;
// Försvar: egen dold siffra 1–5, samma PIN-skydd som graderingen.
const DEF_LEVELS=[1,2,3,4,5];
const DEF_MID=3;
const DATA_VERSION=3;   // 1 = gradering 1–5, 2 = gradering 1–10, 3 = kantpositioner borttagna

/* ---------- IndexedDB storage layer ---------- */
const IDB_NAME='teambuilder', IDB_STORE='kv', IDB_KEY='root';
let _idb=null;
function idbOpen(){
  return new Promise((resolve,reject)=>{
    if(_idb){ resolve(_idb); return; }
    let req;
    try { req=indexedDB.open(IDB_NAME,1); } catch(e){ reject(e); return; }
    req.onupgradeneeded=()=>{ const d=req.result; if(!d.objectStoreNames.contains(IDB_STORE)) d.createObjectStore(IDB_STORE); };
    req.onsuccess=()=>{ _idb=req.result; resolve(_idb); };
    req.onerror=()=>reject(req.error);
  });
}
function idbGet(key){
  return idbOpen().then(d=>new Promise((resolve,reject)=>{
    const tx=d.transaction(IDB_STORE,'readonly');
    const r=tx.objectStore(IDB_STORE).get(key);
    r.onsuccess=()=>resolve(r.result);
    r.onerror=()=>reject(r.error);
  }));
}
function idbSet(key,val){
  return idbOpen().then(d=>new Promise((resolve,reject)=>{
    const tx=d.transaction(IDB_STORE,'readwrite');
    tx.objectStore(IDB_STORE).put(val,key);
    tx.oncomplete=()=>resolve(true);
    tx.onerror=()=>reject(tx.error);
    tx.onabort=()=>reject(tx.error||new Error('aborted'));
  }));
}
function idbClear(){
  return idbOpen().then(d=>new Promise((resolve,reject)=>{
    const tx=d.transaction(IDB_STORE,'readwrite');
    tx.objectStore(IDB_STORE).clear();
    tx.oncomplete=()=>resolve(true);
    tx.onerror=()=>reject(tx.error);
  }));
}

/* ---------- Datamodell ---------- */
function freshRoot(){
  return {
    version:DATA_VERSION, onboarded:false, squadName:'',
    players:[],      // {id,name,pos,pos2,serie,hand,color,photo,active,level,levelUpdated,def,defUpdated,note}
    relations:[],    // {id,a,b,type:'good'|'vary'|'lock'}
    history:[],      // {id,ts,type,label,teams:[{name,vestId,players:[{id,name}]}]}
    cups:[],         // {id,name,date,numTeams,params,presentIds,teams}
    settings:{ pinHash:null, posMode:'full', staleMonths:3, theme:'dark',
      truppView:'grid', truppFilter:[], truppPos:[], pitchColor:'bla',
      defaults:Object.assign({},DEFAULT_PARAMS), lastTraining:null }
  };
}
function normalizeRoot(d){
  if(!d) return freshRoot();
  const f=freshRoot();
  for(const k of ['players','relations','history','cups']) if(!Array.isArray(d[k])) d[k]=f[k];
  d.settings=Object.assign({},f.settings,d.settings||{});
  d.settings.defaults=Object.assign({},DEFAULT_PARAMS,d.settings.defaults||{});
  // Graderingen gick från 1–5 till 1–10: skala om så gamla bedömningar
  // behåller sin inbördes spridning i stället för att bli genomgående låga.
  if((d.version||1)<2){
    d.players.forEach(p=>{ if(typeof p.level==='number') p.level=Math.min(10,Math.max(1,p.level*2)); });
  }
  // Kant vänster/höger togs bort ur positionslistan: flytta spelarna till
  // sexan på samma sida i stället för att tappa positionen.
  d.players.forEach(p=>{
    p.pos=migratePos(p.pos); p.pos2=migratePos(p.pos2);
    if(p.pos2&&p.pos2===p.pos) p.pos2=null;   // undvik dubbel efter flytten
  });
  // Urval sparades tidigare som ett enda värde ('even'/1/2/3) – normalisera
  // till listform så flera nivåer kan väljas samtidigt.
  d.settings.truppFilter=normSel(d.settings.truppFilter);
  d.settings.truppPos=Array.isArray(d.settings.truppPos)?d.settings.truppPos.filter(x=>typeof x==='string'):[];
  if(d.settings.lastTraining) d.settings.lastTraining.serie=normSel(d.settings.lastTraining.serie);
  d.cups.forEach(c=>{ c.serie=normSel(c.serie); });
  d.history.forEach(h=>{ if('serie' in h) h.serie=normSel(h.serie); });
  d.version=DATA_VERSION;
  return d;
}
let root=freshRoot();
const S=()=>root.settings;
function save(){ idbSet(IDB_KEY,root).catch(e=>console.warn('save failed',e)); }

/* ---------- Hjälpare ---------- */
const $=id=>document.getElementById(id);
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,6); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function pById(id){ return root.players.find(p=>p.id===id)||null; }
function isGK(p){ return p.pos==='MV'||p.pos2==='MV'; }
function posList(){ return S().posMode==='simple'?POS_SIMPLE:POS_FULL; }
function posName(c){ return POS_NAMES[c]||c||''; }
function monthsSince(ts){ if(!ts) return Infinity; return (Date.now()-ts)/(1000*60*60*24*30.44); }
function fmtDate(ts){ return new Date(ts).toLocaleDateString('sv-SE',{weekday:'short',day:'numeric',month:'short'}); }
function fmtDateShort(ts){ const d=new Date(ts); return d.getDate()+'/'+(d.getMonth()+1); }
function pairKey(a,b){ return a<b?a+'|'+b:b+'|'+a; }
function initials(name){ return name.trim().split(/\s+/).map(w=>w[0]||'').join('').slice(0,2).toUpperCase(); }
function vestById(id){ return VESTS.find(v=>v.id===(VEST_RETIRED[id]||id))||VESTS[0]; }
function toast(msg){
  let t=$('toastEl');
  if(!t){ t=document.createElement('div'); t.id='toastEl';
    t.style.cssText='position:fixed;bottom:26px;left:50%;transform:translateX(-50%);z-index:500;background:var(--panel-2);color:var(--ink);border:1px solid var(--line-2);padding:13px 22px;font-size:14px;font-weight:600;box-shadow:var(--shadow);transition:opacity .3s ease;pointer-events:none';
    document.body.appendChild(t); }
  t.textContent=msg; t.style.opacity='1';
  clearTimeout(t._h); t._h=setTimeout(()=>{ t.style.opacity='0'; },2200);
}

/* ---------- Modal ---------- */
// Modaler staplas: en dialog som öppnas ovanpå en annan döljer den tillfälligt
// i stället för att ersätta den, så inmatning i den undre dialogen bevaras.
function modal(html,opts){
  const host=$('modalHost');
  const prev=host.lastElementChild;
  if(prev) prev.style.display='none';
  const wrap=document.createElement('div');
  wrap.className='modal-wrap';
  wrap.innerHTML='<div class="modal">'+html+'</div>';
  host.appendChild(wrap);
  wrap.addEventListener('pointerdown',e=>{ if(e.target===wrap && !(opts&&opts.sticky)) closeModal(); });
  fillSvg(wrap);
  return wrap;
}
function closeModal(){
  const host=$('modalHost');
  const top=host.lastElementChild;
  if(top) top.remove();
  const prev=host.lastElementChild;
  if(prev) prev.style.display='';
}
function confirmModal(title,text,okLabel,cb,danger){
  const w=modal('<h2>'+esc(title)+'</h2><p class="sub" style="margin-bottom:20px">'+esc(text)+'</p>'+
    '<div class="btnrow"><button class="ghost" id="cmNo">Avbryt</button>'+
    '<button class="primary'+(danger?' danger-btn':'')+'" id="cmYes">'+esc(okLabel)+'</button></div>');
  w.querySelector('#cmNo').onclick=closeModal;
  w.querySelector('#cmYes').onclick=()=>{ closeModal(); cb(); };
}

/* ---------- PIN ---------- */
let pinUnlocked=false;
// All ändring av låsstatus går via setUnlocked, så menyknappen och den öppna
// vyn alltid speglar verkligheten.
function setUnlocked(v){ pinUnlocked=!!v; renderNavLock(); }
function renderNavLock(){
  const btn=$('navLock'); if(!btn) return;
  const has=!!S().pinHash;
  const state=!has?'set':(pinUnlocked?'unlocked':'locked');
  btn.classList.toggle('unlocked',state==='unlocked');
  $('navLockIc').innerHTML=SVG[state==='locked'?'lockClosed':'lockOpen'];
  $('navLockLabel').textContent=state==='set'?'Sätt PIN':(state==='unlocked'?'Lås':'Lås upp');
  btn.title=state==='unlocked'?'Bedömningar är upplåsta':'';
}
async function hashPin(pin){
  const s='tb:'+pin;
  try{
    if(window.crypto&&crypto.subtle){
      const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));
      return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('');
    }
  }catch(e){}
  let h=5381; for(let i=0;i<s.length;i++){ h=((h*33)^s.charCodeAt(i))>>>0; }
  return 'x'+h.toString(16);
}
function validPinFormat(p){ return /^\d{4,6}$/.test(p); }
async function verifyPin(pin){
  const stored=S().pinHash; if(!stored) return false;
  if(stored.charAt(0)==='x'){
    let h=5381; const s='tb:'+pin; for(let i=0;i<s.length;i++){ h=((h*33)^s.charCodeAt(i))>>>0; }
    return ('x'+h.toString(16))===stored;
  }
  return (await hashPin(pin))===stored;
}
function requirePin(cb){
  if(pinUnlocked){ cb(); return; }
  if(!S().pinHash){
    const w=modal('<h2>Skapa PIN</h2><p class="sub" style="margin-bottom:18px">Nivåfliken och balansindikatorn skyddas med PIN. Välj 4–6 siffror.</p>'+
      '<input id="pinNew" type="password" inputmode="numeric" maxlength="6" placeholder="Ny PIN" autocomplete="off">'+
      '<input id="pinNew2" type="password" inputmode="numeric" maxlength="6" placeholder="Upprepa PIN" autocomplete="off">'+
      '<div class="btnrow"><button class="ghost" id="pinCancel">Avbryt</button><button class="primary" id="pinOk">Skapa</button></div>');
    w.querySelector('#pinCancel').onclick=closeModal;
    w.querySelector('#pinOk').onclick=async()=>{
      const a=w.querySelector('#pinNew').value, b=w.querySelector('#pinNew2').value;
      if(!validPinFormat(a)){ toast('PIN måste vara 4–6 siffror'); return; }
      if(a!==b){ toast('PIN-koderna matchar inte'); return; }
      S().pinHash=await hashPin(a); save(); setUnlocked(true); closeModal(); cb();
    };
    return;
  }
  const w=modal('<h2>Ange PIN</h2>'+
    '<input id="pinIn" type="password" inputmode="numeric" maxlength="6" placeholder="PIN" autocomplete="off">'+
    '<div class="btnrow"><button class="ghost" id="pinCancel">Avbryt</button><button class="primary" id="pinOk">Lås upp</button></div>');
  const inp=w.querySelector('#pinIn'); inp.focus();
  w.querySelector('#pinCancel').onclick=closeModal;
  const go=async()=>{
    if(await verifyPin(inp.value)){ setUnlocked(true); closeModal(); cb(); }
    else { toast('Fel PIN'); inp.value=''; inp.focus(); }
  };
  w.querySelector('#pinOk').onclick=go;
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter') go(); });
}

/* ---------- Navigation & tema ---------- */
const VIEWS=['vTrupp','vTraining','vCup','vHistory','vSettings'];
let curView='vTrupp';
function refreshView(){ show(curView); }
function show(id){
  curView=id;
  VIEWS.forEach(v=>$(v).classList.toggle('hidden',v!==id));
  document.querySelectorAll('.navlink[data-nav]').forEach(n=>n.classList.toggle('active',n.dataset.nav===id));
  if(id==='vTrupp') renderTrupp();
  else if(id==='vTraining') renderTraining();
  else if(id==='vCup') renderCup();
  else if(id==='vHistory') renderHistory();
  else if(id==='vSettings') renderSettings();
}
document.querySelectorAll('.navlink[data-nav]').forEach(n=>n.onclick=()=>show(n.dataset.nav));
function applyTheme(){
  const light=S().theme==='light';
  document.body.classList.toggle('light',light);
  $('themeIcon').textContent=light?'☀':'☾';
  $('themeLabel').textContent=light?'Ljust läge':'Mörkt läge';
}
$('themeToggle').onclick=()=>{ S().theme=(S().theme==='light'?'dark':'light'); save(); applyTheme(); };
// Låset i menyn: alltid nåbart, oavsett vilken vy man står i.
$('navLock').onclick=()=>{
  if(!S().pinHash){                       // ingen PIN satt än – skapa en
    requirePin(()=>{ renderNavLock(); refreshView(); });
    return;
  }
  if(pinUnlocked){ setUnlocked(false); refreshView(); toast('Låst'); }
  else requirePin(()=>{ refreshView(); });
};
function renderNavCtx(){
  const act=root.players.filter(p=>p.active).length;
  const inact=root.players.length-act;
  $('navCtx').innerHTML=(root.squadName?'<b>'+esc(root.squadName)+'</b><br>':'')+
    act+' spelare'+(inact?' ('+inact+' inaktiva)':'');
}

/* ---------- Switchkomponent ---------- */
function switchRow(label,hint,on,onToggle,disabled){
  const row=document.createElement('div');
  row.className='switchrow'+(disabled?' disabled':'');
  row.innerHTML='<div><div class="sw-label">'+esc(label)+'</div>'+(hint?'<div class="sw-hint">'+esc(hint)+'</div>':'')+'</div>'+
    '<button class="switch'+(on?' on':'')+'" aria-pressed="'+on+'"></button>';
  const sw=row.querySelector('.switch');
  sw.onclick=()=>{ const now=!sw.classList.contains('on'); sw.classList.toggle('on',now); sw.setAttribute('aria-pressed',now); onToggle(now); };
  return row;
}

/* =====================================================================
   ALGORITM — snake draft + optimering med slumpade byten
   ===================================================================== */
/*ALGO-START*/
function computeDivision(players,T,opts){
  // players: array av spelarobjekt. T: antal lag.
  // opts: { params:{balance,gk,pos,rel,left,vary}, relations:[], tempLocks:[[a,b]], lastPairs:Set }
  const P=opts.params||{}, relations=opts.relations||[], tempLocks=opts.tempLocks||[];
  const lastPairs=opts.lastPairs||new Set();
  const n=players.length;
  T=Math.max(2,Math.min(T,n));
  const cap=[]; const base=Math.floor(n/T), extra=n%T;
  for(let i=0;i<T;i++) cap.push(base+(i<extra?1:0));

  // Låsta par -> grupper (union-find)
  const present=new Set(players.map(p=>p.id));
  const parent={}; players.forEach(p=>parent[p.id]=p.id);
  const find=x=>{ while(parent[x]!==x){ parent[x]=parent[parent[x]]; x=parent[x]; } return x; };
  const union=(a,b)=>{ const ra=find(a),rb=find(b); if(ra!==rb) parent[ra]=rb; };
  if(P.rel) relations.forEach(r=>{ if(r.type==='lock'&&present.has(r.a)&&present.has(r.b)) union(r.a,r.b); });
  tempLocks.forEach(pr=>{ if(present.has(pr[0])&&present.has(pr[1])) union(pr[0],pr[1]); });
  const gm={}; players.forEach(p=>{ const r=find(p.id); (gm[r]=gm[r]||[]).push(p); });
  let groups=Object.values(gm);

  // Steg A — snake draft: sortera på nivå (eller slumpa), dela ut i ormmönster
  const lvl=p=>p.level||LEVEL_MID;
  const dlvl=p=>p.def||DEF_MID;
  const gAvg=g=>g.reduce((s,p)=>s+lvl(p),0)/g.length;
  if(P.balance){ groups.sort((a,b)=> b.length-a.length || (gAvg(b)+Math.random()*0.05)-(gAvg(a)+Math.random()*0.05)); }
  else { shuffle(groups); groups.sort((a,b)=>b.length-a.length); }
  const teams=[]; for(let i=0;i<T;i++) teams.push([]);
  let ti=0, dir=1;
  for(const g of groups){
    let placed=false;
    for(let step=0; step<T*3 && !placed; step++){
      if(teams[ti].length+g.length<=cap[ti]){ teams[ti].push(...g); placed=true; }
      ti+=dir;
      if(ti>=T){ ti=T-1; dir=-1; } else if(ti<0){ ti=0; dir=1; }
    }
    if(!placed){
      let best=0; for(let i=1;i<T;i++) if(cap[i]-teams[i].length>cap[best]-teams[best].length) best=i;
      teams[best].push(...g);
    }
  }

  // Kostnadsfunktion — hårda krav dominerar, mjuka vikter därunder
  const lockRoot={}; players.forEach(p=>lockRoot[p.id]=find(p.id));
  const relGood=[],relVary=[];
  if(P.rel) relations.forEach(r=>{
    if(!present.has(r.a)||!present.has(r.b)) return;
    if(r.type==='good') relGood.push([r.a,r.b]);
    else if(r.type==='vary') relVary.push([r.a,r.b]);
  });
  const totalGK=players.filter(p=>p.pos==='MV'||p.pos2==='MV').length;
  const posTot={}; players.forEach(p=>{ if(p.pos) posTot[p.pos]=(posTot[p.pos]||0)+1; });
  const totLeft=players.filter(p=>p.hand==='V').length;
  const anyDef=players.some(p=>typeof p.def==='number');

  function costOf(tms){
    let c=0;
    const at={}; tms.forEach((t,i)=>t.forEach(p=>{ at[p.id]=i; }));
    // hårt: låsta grupper i samma lag
    const rt={};
    for(const p of players){ const r=lockRoot[p.id];
      if(rt[r]===undefined) rt[r]=at[p.id];
      else if(rt[r]!==at[p.id]) c+=1e6;
    }
    // hårt: MV-täckning
    if(P.gk&&totalGK>0){
      const withGK=tms.filter(t=>t.some(p=>p.pos==='MV'||p.pos2==='MV')).length;
      c+=20000*(Math.min(T,totalGK)-withGK);
    }
    // jämna nivåer
    if(P.balance){
      const avgs=tms.map(t=>t.length?t.reduce((s,p)=>s+lvl(p),0)/t.length:0);
      const g=avgs.reduce((a,b)=>a+b,0)/T;
      c+=avgs.reduce((s,a)=>s+(a-g)*(a-g),0)*800;
    }
    // jämna försvar – egen skala 1–5, därför lättare vikt än graderingen
    if(P.defbal&&anyDef){
      const davg=tms.map(t=>t.length?t.reduce((s,p)=>s+dlvl(p),0)/t.length:0);
      const g=davg.reduce((a,b)=>a+b,0)/T;
      c+=davg.reduce((s,a)=>s+(a-g)*(a-g),0)*800;
    }
    // positionsspridning
    if(P.pos){
      for(const t of tms){
        const cnt={};
        t.forEach(p=>{ if(p.pos) cnt[p.pos]=(cnt[p.pos]||0)+1; });
        for(const k in cnt){ const fair=Math.ceil(posTot[k]/T); if(cnt[k]>fair) c+=250*(cnt[k]-fair); }
      }
    }
    // relationer (mjuka)
    for(const pr of relGood) if(at[pr[0]]!==undefined&&at[pr[0]]===at[pr[1]]) c-=150;
    for(const pr of relVary) if(at[pr[0]]!==undefined&&at[pr[0]]===at[pr[1]]) c+=400;
    // vänsterhänta
    if(P.left&&totLeft>0){
      const fair=totLeft/T;
      c+=tms.reduce((s,t)=>s+Math.abs(t.filter(p=>p.hand==='V').length-fair),0)*180;
    }
    // variera mot historik
    if(P.vary&&lastPairs.size){
      for(const t of tms) for(let i=0;i<t.length;i++) for(let j=i+1;j<t.length;j++)
        if(lastPairs.has(pairKey(t[i].id,t[j].id))) c+=60;
    }
    return c;
  }

  // Steg B — optimering: slumpade byten, behåll förbättringar
  let cur=costOf(teams);
  const ITER=4000;
  for(let k=0;k<ITER;k++){
    const a=Math.floor(Math.random()*T), b=Math.floor(Math.random()*T);
    if(a===b) continue;
    const ta=teams[a], tb=teams[b];
    if(!ta.length||!tb.length) continue;
    const i=Math.floor(Math.random()*ta.length), j=Math.floor(Math.random()*tb.length);
    const t1=ta[i]; ta[i]=tb[j]; tb[j]=t1;
    const nc=costOf(teams);
    if(nc<cur||(nc===cur&&Math.random()<0.25)) cur=nc;
    else { const t2=ta[i]; ta[i]=tb[j]; tb[j]=t2; }
  }
  const avgs=teams.map(t=>t.length?t.reduce((s,p)=>s+lvl(p),0)/t.length:0);
  const davgs=anyDef?teams.map(t=>t.length?t.reduce((s,p)=>s+dlvl(p),0)/t.length:0):null;
  return { teams:teams.map(t=>t.map(p=>p.id)), cost:cur, avgs, davgs };
}
/*ALGO-END*/

function lastHistoryPairs(){
  const h=root.history[0]; if(!h) return new Set();
  const s=new Set();
  h.teams.forEach(t=>{
    const ids=t.players.map(p=>p.id).filter(Boolean);
    for(let i=0;i<ids.length;i++) for(let j=i+1;j<ids.length;j++) s.add(pairKey(ids[i],ids[j]));
  });
  return s;
}
function makeTeams(ids,T,params,tempLocks){
  const players=ids.map(pById).filter(Boolean);
  const res=computeDivision(players,T,{
    params, relations:root.relations, tempLocks:tempLocks||[],
    lastPairs:params.vary?lastHistoryPairs():new Set()
  });
  return res;
}

/* =====================================================================
   1. TRUPP
   ===================================================================== */
let truppTab='players';
document.querySelectorAll('#vTrupp .tab').forEach(t=>t.onclick=()=>{
  const tab=t.dataset.tab;
  if(tab==='levels'){ requirePin(()=>{ truppTab='levels'; renderTrupp(); }); return; }
  truppTab=tab; renderTrupp();
});
function renderTrupp(){
  renderNavCtx();
  document.querySelectorAll('#vTrupp .tab').forEach(t=>t.classList.toggle('sel',t.dataset.tab===truppTab));
  $('truppViewSeg').classList.toggle('hidden',truppTab!=='players');
  // Nivåfiltret styr även planvyn, så det ska vara synligt och ändringsbart där.
  // Positionsfiltret hör bara till listan – på planen vore det cirkelresonemang.
  $('truppFilter').classList.toggle('hidden',truppTab!=='players'&&truppTab!=='pitch');
  $('truppPosFilter').classList.toggle('hidden',truppTab!=='players');
  $('truppPlayers').classList.toggle('hidden',truppTab!=='players');
  $('truppRelations').classList.toggle('hidden',truppTab!=='relations');
  $('truppLevels').classList.toggle('hidden',truppTab!=='levels');
  $('truppPitch').classList.toggle('hidden',truppTab!=='pitch');
  const act=root.players.filter(p=>p.active).length;
  const sel=normSel(S().truppFilter), posSel=S().truppPos||[];
  if(!root.players.length) $('truppSub').textContent='Spelarregister, relationer och nivåer.';
  else if(truppTab==='pitch') $('truppSub').textContent='Så många spelare du har på varje position'+
    (sel.length?' i '+serieLabel(sel).toLowerCase():'');
  else if(truppTab==='players'&&(sel.length||posSel.length)){
    const shown=root.players.filter(p=>inSel(p,sel)&&inPosSel(p,posSel)).length;
    $('truppSub').textContent='Visar '+filterLabel(sel,posSel)+
      ' · '+shown+' av '+root.players.length+' i truppen';
  }
  else $('truppSub').textContent=act+' aktiva spelare'+(root.players.length-act?' · '+(root.players.length-act)+' inaktiva':'');
  if(truppTab==='players') renderPlayers();
  else if(truppTab==='relations') renderRelations();
  else if(truppTab==='pitch') renderPitch();
  else renderLevels();
}
/* ---------- Positionsöversikt: tränartavla med tröjor ---------- */
// Riktiga mått (IHF/SHF): planen är 40x20 m, så en halvplan är kvadratisk.
// Vi beskär på 12,5 m djup i stället för att platta till den – alla positioner
// ligger inom nio meter från mållinjen. 6- och 9-meterslinjen är kvartscirklar
// från vardera målstolpe med en rak bit på 3 m emellan (målets bredd).
const PITCH={M:19,PAD:10,WIDTH:20,DEPTH:11.5,LP:8.5,RP:11.5};
const JERSEY_PATH='M11 3 L3 9 L1 15 L8 19 L11 16 L11 41 L29 41 L29 16 L32 19 L39 15 L37 9 L29 3 C26 9 14 9 11 3 Z';
// Sexorna står ytterst, niorna mer centralt. Meter från vänster sidlinje/mållinje.
const PITCH_SPOTS={
  full:[['MV',10,1.6],['V6',3.6,3.4],['M6',10,6.0],['H6',16.4,3.4],
        ['V9',5.6,8.6],['M9',10,9.4],['H9',14.4,8.6]],
  simple:[['MV',10,1.6],['KANT',3.6,3.4],['MITT',10,6.0],['KANT',16.4,3.4],['BAK',10,9.4]]
};
// Färgväljaren återanvänder västpaletten, så tröjfärg och västfärg är samma sak.
const PITCH_COLORS=['vit','vinrod','gul','gron','bla'];
function pitchColor(){
  const id=S().pitchColor;
  return vestById(PITCH_COLORS.indexOf(id)>=0?id:'bla');
}
function pitchPx(m){ return PITCH.PAD+m*PITCH.M; }
// Målområdeslinje på radie r: bågen bugar bort från stolpen och möter
// mållinjen, eller sidlinjen när radien är bredare än avståndet dit.
function pitchAreaLine(r,cls){
  const {LP,RP,WIDTH,M}=PITCH;
  const s=LP-r>=0?[LP-r,0]:[0,Math.sqrt(r*r-LP*LP)];
  const e=RP+r<=WIDTH?[RP+r,0]:[WIDTH,Math.sqrt(r*r-(WIDTH-RP)*(WIDTH-RP))];
  const rp=(r*M).toFixed(1);
  return '<path class="'+cls+'" d="M '+pitchPx(s[0]).toFixed(1)+' '+pitchPx(s[1]).toFixed(1)+
    ' A '+rp+' '+rp+' 0 0 0 '+pitchPx(LP).toFixed(1)+' '+pitchPx(r).toFixed(1)+
    ' L '+pitchPx(RP).toFixed(1)+' '+pitchPx(r).toFixed(1)+
    ' A '+rp+' '+rp+' 0 0 0 '+pitchPx(e[0]).toFixed(1)+' '+pitchPx(e[1]).toFixed(1)+'"/>';
}
function renderPitch(){
  const box=$('truppPitch');
  const sel=normSel(S().truppFilter);
  const pool=root.players.filter(p=>p.active&&inSel(p,sel));
  if(!pool.length){
    box.innerHTML='<div class="empty">'+(root.players.length
      ?'Inga aktiva spelare i urvalet '+esc(serieLabel(sel))+'.'
      :'Inga spelare ännu. Tryck ”+ Lägg till spelare”.')+'</div>';
    return;
  }
  const count={};
  pool.forEach(p=>{ if(p.pos) count[p.pos]=(count[p.pos]||0)+1; });
  const noPos=pool.filter(p=>!p.pos).length;
  const spots=PITCH_SPOTS[S().posMode==='simple'?'simple':'full'];
  const col=pitchColor(), sc=0.84;

  const shirts=spots.map(([code,mx,my])=>{
    const n=count[code]||0;
    const x=pitchPx(mx), y=pitchPx(my);
    const fill=n?col.bg:'var(--panel-2)';
    const ink=n?col.ink:'var(--ink-faint)';
    return '<g class="pshirt'+(n?'':' empty')+'" data-pos="'+code+'" tabindex="0" role="button" '+
      'aria-label="'+esc(code)+': '+n+' spelare">'+
      '<g transform="translate('+(x-20*sc).toFixed(1)+','+(y-22*sc).toFixed(1)+') scale('+sc+')">'+
      '<path class="jb" style="fill:'+fill+'" d="'+JERSEY_PATH+'"/>'+
      '<text class="jn" style="fill:'+ink+'" x="20" y="26">'+n+'</text></g>'+
      '<text class="jl" x="'+x.toFixed(0)+'" y="'+(y+22*sc+14).toFixed(0)+'">'+esc(code)+'</text></g>';
  }).join('');

  const vb=(PITCH.WIDTH*PITCH.M+2*PITCH.PAD).toFixed(0)+' '+(PITCH.DEPTH*PITCH.M+2*PITCH.PAD).toFixed(0);
  box.innerHTML='<div class="pitchwrap"><svg viewBox="0 0 '+vb+'" class="pitch" '+
    'role="img" aria-label="Antal spelare per position">'+
    '<rect class="pf" x="'+PITCH.PAD+'" y="'+PITCH.PAD+'" width="'+(PITCH.WIDTH*PITCH.M).toFixed(0)+
      '" height="'+(PITCH.DEPTH*PITCH.M).toFixed(0)+'" rx="2"/>'+
    pitchAreaLine(6,'pl6')+pitchAreaLine(9,'pl9')+
    shirts+'</svg></div>'+
    '<div class="pitchlegend">'+
      '<span class="pl-item"><b>'+pool.length+'</b> spelare i urvalet</span>'+
      '<span class="pl-item pl-colors">'+PITCH_COLORS.map(id=>{
        const v=vestById(id);
        return '<button class="swatch'+(v.id===col.id?' sel':'')+'" data-col="'+v.id+
          '" title="'+esc(v.name)+'" aria-label="'+esc(v.name)+'" style="background:'+v.bg+'"></button>';
      }).join('')+'</span>'+
      (noPos?'<button class="fchip" id="pitchNoPos">Utan position<span class="n">'+noPos+'</span></button>':'')+
    '</div>'+
    '<p class="hint">Tryck på en position för att se spelarna i truppen.</p>';

  // Ett tryck filtrerar trupplistan på positionen – tavlan blir en väg in.
  box.querySelectorAll('[data-pos]').forEach(g=>{
    const go=()=>{ S().truppPos=[g.dataset.pos]; save(); truppTab='players'; renderTrupp(); };
    g.onclick=go;
    g.onkeydown=e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); go(); } };
  });
  box.querySelectorAll('[data-col]').forEach(b=>b.onclick=()=>{
    S().pitchColor=b.dataset.col; save(); renderPitch();
  });
  const np=box.querySelector('#pitchNoPos');
  if(np) np.onclick=()=>{ S().truppPos=['none']; save(); truppTab='players'; renderTrupp(); };
}

function playerAvatar(p,cls){
  if(p.photo) return '<img class="avatar '+(cls||'')+'" src="'+p.photo+'" alt="">';
  return '<span class="avatar ph '+(cls||'')+'" style="color:'+esc(p.color||'#98989f')+'">'+esc(initials(p.name))+'</span>';
}
document.querySelectorAll('#truppViewSeg .segbtn').forEach(b=>b.onclick=()=>{
  S().truppView=b.dataset.view; save(); renderPlayers();
});
// Filterknappar för serienivå. Flera nivåer kan vara markerade samtidigt;
// "Alla" nollställer urvalet.
function selChipRow(sel,counts){
  const s=normSel(sel);
  const opts=[['all','Alla']].concat(SERIES.map(n=>[n,'Nivå '+n]),[['none','Utan nivå']]);
  return opts.map(([val,label])=>{
    const on=val==='all'?!s.length:s.includes(val);
    const n=counts?counts(val):null;
    return '<button class="fchip'+(on?' sel':'')+'" data-f="'+val+'">'+esc(label)+
      (n===null?'':'<span class="n">'+n+'</span>')+'</button>';
  }).join('');
}
// Positionsfilter. Bara positioner som faktiskt finns i truppen får en knapp,
// så raden aldrig fylls av nollor. 'none' = spelare utan position.
// Läsbar beskrivning av det aktiva filtret, t.ex. "nivå 2 · MV, M6".
function filterLabel(tier,pos){
  const parts=[];
  if(normSel(tier).length) parts.push(serieLabel(tier).toLowerCase());
  if(pos&&pos.length) parts.push(pos.map(c=>c==='none'?'utan position':c).join(', '));
  return parts.join(' · ')||'hela truppen';
}
function inPosSel(p,sel){
  if(!sel||!sel.length) return true;
  return p.pos?sel.indexOf(p.pos)>=0:sel.indexOf('none')>=0;
}
function posChipOptions(){
  const present={}; root.players.forEach(p=>{ if(p.pos) present[p.pos]=true; });
  const order=POS_FULL.concat(POS_SIMPLE).map(x=>x[0]);
  const codes=[];
  order.forEach(c=>{ if(present[c]&&codes.indexOf(c)<0) codes.push(c); });
  Object.keys(present).forEach(c=>{ if(codes.indexOf(c)<0) codes.push(c); });
  const opts=[['all','Alla']].concat(codes.map(c=>[c,c]));
  if(root.players.some(p=>!p.pos)) opts.push(['none','Utan pos']);
  return opts;
}
function renderTruppFilter(){
  const tier=normSel(S().truppFilter), pos=S().truppPos||[];
  // Antalen i varje grupp räknas med det andra filtret aktivt, så de stämmer.
  const bar=$('truppFilter');
  bar.innerHTML='<span class="fb-lbl">Nivå</span>'+
    selChipRow(tier,val=>root.players.filter(p=>
      inSel(p,val==='all'?[]:[val])&&inPosSel(p,pos)).length);
  const posBar=$('truppPosFilter');
  const opts=posChipOptions();
  posBar.innerHTML=opts.length>1?('<span class="fb-lbl">Position</span>'+opts.map(([val,label])=>{
    const on=val==='all'?!pos.length:pos.indexOf(val)>=0;
    const n=root.players.filter(p=>
      inPosSel(p,val==='all'?[]:[val])&&inSel(p,tier)).length;
    return '<button class="fchip'+(on?' sel':'')+'" data-p="'+esc(val)+'">'+esc(label)+
      '<span class="n">'+n+'</span></button>';
  }).join('')):'';
  bar.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{
    const v=b.dataset.f;
    S().truppFilter=toggleSel(S().truppFilter,v==='all'?'all':(v==='none'?'none':parseInt(v,10)));
    save(); renderTrupp();
  });
  posBar.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{
    const v=b.dataset.p;
    const cur=(S().truppPos||[]).slice();
    if(v==='all') S().truppPos=[];
    else {
      const i=cur.indexOf(v);
      if(i>=0) cur.splice(i,1); else cur.push(v);
      S().truppPos=cur;
    }
    save(); renderTrupp();
  });
}
function renderPlayers(){
  const g=$('truppPlayers');
  const listMode=S().truppView==='list';
  g.className=listMode?'plist':'grid';
  document.querySelectorAll('#truppViewSeg .segbtn').forEach(b=>
    b.classList.toggle('sel',b.dataset.view===(listMode?'list':'grid')));
  renderTruppFilter();
  const sel=normSel(S().truppFilter), posSel=S().truppPos||[];
  const ps=root.players.filter(p=>inSel(p,sel)&&inPosSel(p,posSel))
    .sort((a,b)=>(b.active-a.active)||a.name.localeCompare(b.name,'sv'));
  if(!ps.length){
    let msg;
    if(!root.players.length) msg='Inga spelare ännu. Tryck ”+ Lägg till spelare”.';
    // Kvitto när högen med osatta är avbetad.
    else if(!posSel.length&&sel.length===1&&sel[0]==='none') msg='Alla spelare har en serienivå.';
    else if(!sel.length&&posSel.length===1&&posSel[0]==='none') msg='Alla spelare har en position.';
    else msg='Ingen spelare matchar '+filterLabel(sel,posSel)+'.';
    g.innerHTML='<div class="empty">'+esc(msg)+'</div>';
    return;
  }
  g.innerHTML=ps.map(p=>{
    const tags=[];
    if(p.serie) tags.push('<span class="postag serie">Nivå '+p.serie+'</span>');
    if(p.pos) tags.push('<span class="postag'+(p.pos==='MV'?' mv':'')+'">'+esc(posName(p.pos))+'</span>');
    if(p.pos2) tags.push('<span class="postag">'+esc(posName(p.pos2))+'</span>');
    if(p.hand==='V') tags.push('<span class="postag hand">Vänsterhänt</span>');
    if(!p.active) tags.push('<span class="postag">Inaktiv</span>');
    if(listMode) return '<div class="card click plistrow'+(p.active?'':' inactive')+'" data-pid="'+p.id+'">'+
      playerAvatar(p)+
      '<div class="pname">'+esc(p.name)+'</div>'+
      '<div class="pmeta">'+tags.join('')+'</div>'+
      '<span class="dot" style="background:'+esc(p.color||'#98989f')+'"></span></div>';
    return '<div class="card click pcard'+(p.active?'':' inactive')+'" data-pid="'+p.id+'">'+
      playerAvatar(p)+
      '<div class="pinfo"><div class="pname">'+esc(p.name)+'</div>'+
      '<div class="pmeta">'+tags.join('')+'</div></div>'+
      '<span class="dot" style="background:'+esc(p.color||'#98989f')+'"></span></div>';
  }).join('');
  g.querySelectorAll('[data-pid]').forEach(el=>el.onclick=()=>openPlayerEditor(el.dataset.pid));
}
$('addPlayerBtn').onclick=()=>openPlayerEditor(null);

/* =====================================================================
   Klistra in trupp — en spelare per rad, tabb/semikolon/komma-separerat
   ===================================================================== */
const PASTE_ROLES=[['name','Namn'],['first','Förnamn'],['last','Efternamn'],
  ['pos','Position'],['hand','Hänthet'],['serie','Serienivå'],['skip','Hoppa över']];
const HEADER_HINTS={
  name:['namn','name','spelare','fullständigt namn','fullstandigt namn'],
  first:['förnamn','fornamn','first','first name','tilltalsnamn'],
  last:['efternamn','last','last name','surname'],
  pos:['position','pos','plats'],
  hand:['hänthet','hanthet','hand','handedness'],
  serie:['serienivå','serieniva','nivå','niva','serie','level']
};
// Dela upp inklistrad text i rader och kolumner. Separator väljs bara om den
// finns på varje rad, annars är hela raden ett enda namn.
function splitPasted(text){
  const lines=String(text||'').split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  if(!lines.length) return {rows:[],sep:null};
  let sep=null;
  for(const ch of ['\t',';',',']){
    if(lines.every(l=>l.indexOf(ch)>=0)){ sep=ch; break; }
  }
  let rows=lines.map(l=>sep?l.split(sep).map(c=>c.trim()):[l]);
  const width=Math.max.apply(null,rows.map(r=>r.length));
  rows=rows.map(r=>{ while(r.length<width) r.push(''); return r; });
  return {rows,sep};
}
const POS_PASTE_ALIASES={
  'kv':'V6','kh':'H6',
  'kant vänster':'V6','kant vanster':'V6','vänsterkant':'V6','vansterkant':'V6','vk':'V6',
  'kant höger':'H6','kant hoger':'H6','högerkant':'H6','hogerkant':'H6','hk':'H6',
  'linje':'M6','linjespelare':'M6','mittsex':'M6'
};
function parsePastedPos(v){
  const s=String(v||'').trim().toLowerCase();
  if(!s) return null;
  for(const [c,n] of POS_FULL.concat(POS_SIMPLE))
    if(s===c.toLowerCase()||s===n.toLowerCase()) return c;
  return POS_PASTE_ALIASES[s]||null;
}
function parsePastedHand(v){
  const s=String(v||'').trim().toLowerCase();
  return (s.charAt(0)==='v'||s.charAt(0)==='l')?'V':'H';
}
function parsePastedSerie(v){
  const m=String(v||'').trim().match(/^(?:niv[åa]\s*)?([123])$/i);
  return m?parseInt(m[1],10):null;
}
function cleanPastedName(v){
  let s=String(v||'').replace(/\s+/g,' ').trim();
  s=s.replace(/^\d+[.)]\s*/,'');                      // "1. Anna" → "Anna"
  if((s.match(/,/g)||[]).length===1){                 // "Andersson, Anna" → "Anna Andersson"
    const parts=s.split(',').map(x=>x.trim());
    if(parts[0]&&parts[1]) s=parts[1]+' '+parts[0];
  }
  return s;
}
// Gissa en kolumns roll utifrån innehållet, när rubrikrad saknas.
function sniffPasteRole(vals){
  const v=vals.filter(x=>String(x||'').trim());
  if(!v.length) return 'skip';
  if(v.every(x=>parsePastedPos(x))) return 'pos';
  if(v.every(x=>/^(v|h|l|r|vänster|vanster|höger|hoger|left|right|vänsterhänt|högerhänt)$/i.test(String(x).trim()))) return 'hand';
  if(v.every(x=>parsePastedSerie(x)!==null)) return 'serie';
  return 'skip';
}
// Gissa kolumnroller. Känns första raden igen som rubrikrad används den.
function guessPasteMap(rows,sep){
  const head=rows[0]||[];
  const roles=head.map(cell=>{
    const s=String(cell||'').trim().toLowerCase().replace(/[:*]+$/,'');
    for(const r in HEADER_HINTS) if(HEADER_HINTS[r].indexOf(s)>=0) return r;
    return null;
  });
  const named=roles.some(r=>r==='name'||r==='first'||r==='last');
  if(named) return {map:roles.map(r=>r||'skip'),hasHeader:true};
  const cols=head.map((_,i)=>rows.map(r=>r[i]));
  // Två kommaseparerade kolumner utan rubrik är nästan alltid
  // "Efternamn, Förnamn" – om inte andra kolumnen känns igen som något annat.
  if(sep===','&&head.length===2&&sniffPasteRole(cols[1])==='skip')
    return {map:['last','first'],hasHeader:false};
  return {map:head.map((_,i)=>i===0?'name':sniffPasteRole(cols[i])),hasHeader:false};
}
function buildPastedPlayers(rows,map){
  const out=[];
  rows.forEach(cells=>{
    let name='',first='',last='',pos=null,hand='H',serie=null;
    map.forEach((role,i)=>{
      const v=cells[i]||'';
      if(role==='name') name=v;
      else if(role==='first') first=v;
      else if(role==='last') last=v;
      else if(role==='pos') pos=parsePastedPos(v);
      else if(role==='hand') hand=parsePastedHand(v);
      else if(role==='serie') serie=parsePastedSerie(v);
    });
    const joined=name||[first,last].filter(Boolean).join(' ');
    const n=cleanPastedName(joined);
    if(n) out.push({name:n,pos,serie,hand});
  });
  return out;
}
$('pasteSquadBtn').onclick=()=>{
  const w=modal('<h2>Klistra in trupp</h2>'+
    '<p class="sub" style="margin-bottom:16px">En spelare per rad. Kopierar du flera kolumner från Excel '+
    'känner appen igen dem – kontrollera bara att de hamnat rätt.</p>'+
    '<textarea id="pasteIn" class="pastearea" rows="8" placeholder="Anna Andersson&#10;Bea Berg&#10;Cleo Carlsson"></textarea>'+
    '<div id="pasteMap"></div>'+
    '<div id="pasteSum"></div>'+
    '<div class="btnrow"><button class="ghost" id="pasteCancel">Avbryt</button>'+
      '<button class="primary" id="pasteOk" disabled>Lägg till</button></div>',{sticky:true});
  let map=null, mapDirty=false, rows=[], freshList=[];
  const ta=w.querySelector('#pasteIn');
  function analyse(){
    const parsed=splitPasted(ta.value);
    const all=parsed.rows;
    const g=guessPasteMap(all,parsed.sep);
    rows=g.hasHeader?all.slice(1):all;
    // Behåll en egen mappning så länge antalet kolumner är oförändrat.
    if(!mapDirty||!map||map.length!==g.map.length) map=g.map;
    return buildPastedPlayers(rows,map);
  }
  function paint(){
    const cands=analyse();
    // kolumnmappning visas bara när det finns mer än en kolumn
    const mapBox=w.querySelector('#pasteMap');
    if(map&&map.length>1){
      mapBox.innerHTML='<label class="fld" style="margin-top:4px">Kolumner</label>'+
        map.map((role,i)=>{
          const ex=(rows[0]&&rows[0][i])?rows[0][i]:'';
          return '<div class="maprow"><span class="mr-lbl">'+(i+1)+'</span>'+
            '<select data-col="'+i+'">'+PASTE_ROLES.map(([v,l])=>
              '<option value="'+v+'"'+(role===v?' selected':'')+'>'+l+'</option>').join('')+'</select>'+
            '<span class="mr-ex">'+esc(ex)+'</span></div>';
        }).join('');
      mapBox.querySelectorAll('[data-col]').forEach(sel=>sel.onchange=()=>{
        map[parseInt(sel.dataset.col,10)]=sel.value; mapDirty=true; paint();
      });
    } else mapBox.innerHTML='';
    // dubbletter mot truppen och inom listan
    const existing={}; root.players.forEach(p=>{ existing[p.name.toLowerCase().trim()]=true; });
    const seen={}, fresh=[], dupes=[];
    cands.forEach(c=>{
      const k=c.name.toLowerCase();
      if(existing[k]||seen[k]){ dupes.push(c.name); return; }
      seen[k]=true; fresh.push(c);
    });
    const sum=w.querySelector('#pasteSum');
    if(!cands.length) sum.innerHTML='';
    else {
      const withPos=fresh.filter(c=>c.pos).length, withSerie=fresh.filter(c=>c.serie).length;
      const extra=[];
      if(withPos) extra.push(withPos+' med position');
      if(withSerie) extra.push(withSerie+' med serienivå');
      sum.innerHTML='<div class="pastesum"><span class="ok">'+fresh.length+' nya spelare</span>'+
        (dupes.length?' · <span class="dup">'+dupes.length+' finns redan</span> (hoppas över)':'')+
        (extra.length?'<br>'+esc(extra.join(' · ')):'')+
        (fresh.length?'<div class="names">'+esc(fresh.slice(0,8).map(c=>c.name).join(', '))+
          (fresh.length>8?' … +'+(fresh.length-8)+' fler':'')+'</div>':'')+
        (dupes.length?'<div class="names">Hoppas över: '+esc(dupes.slice(0,6).join(', '))+
          (dupes.length>6?' …':'')+'</div>':'')+'</div>';
    }
    freshList=fresh;
    const ok=w.querySelector('#pasteOk');
    ok.disabled=!fresh.length;
    ok.textContent=fresh.length?('Lägg till '+fresh.length+' spelare'):'Lägg till';
  }
  ta.oninput=paint;
  ta.focus();
  w.querySelector('#pasteCancel').onclick=closeModal;
  w.querySelector('#pasteOk').onclick=()=>{
    const fresh=freshList;
    if(!fresh.length) return;
    fresh.forEach((c,i)=>root.players.push({
      id:uid(),name:c.name,pos:c.pos||null,pos2:null,serie:c.serie||null,
      hand:c.hand||'H',color:PLAYER_COLORS[(root.players.length+i)%PLAYER_COLORS.length],
      photo:null,active:true,level:null,levelUpdated:null,def:null,defUpdated:null,note:''
    }));
    S().truppFilter=[]; S().truppPos=[];   // visa hela truppen så de nya syns
    save(); closeModal(); renderTrupp();
    toast(fresh.length+' spelare tillagda');
  };
  paint();
};

function openPlayerEditor(pid){
  const p=pid?pById(pid):null;
  const list=posList();
  const posOpts=sel=>'<option value="">–</option>'+list.map(([c,n])=>'<option value="'+c+'"'+(sel===c?' selected':'')+'>'+esc(n)+'</option>').join('');
  const w=modal('<h2>'+(p?'Redigera spelare':'Ny spelare')+'</h2>'+
    '<label class="fld">Namn</label><input id="peName" value="'+esc(p?p.name:'')+'" autocomplete="off">'+
    '<label class="fld">Position</label><select id="pePos">'+posOpts(p?p.pos:'')+'</select>'+
    '<label class="fld">Sekundär position (frivilligt)</label><select id="pePos2">'+posOpts(p?p.pos2:'')+'</select>'+
    '<label class="fld">Serienivå</label><div class="seg block" id="peSerie">'+
      '<button class="segbtn'+(!p||!p.serie?' sel':'')+'" data-s="">Ingen</button>'+
      SERIES.map(n=>'<button class="segbtn'+(p&&p.serie===n?' sel':'')+'" data-s="'+n+'">Nivå '+n+'</button>').join('')+
    '</div>'+
    '<label class="fld">Hänthet</label><div class="seg block" id="peHand">'+
      '<button class="segbtn'+(!p||p.hand!=='V'?' sel':'')+'" data-h="H">Högerhänt</button>'+
      '<button class="segbtn'+(p&&p.hand==='V'?' sel':'')+'" data-h="V">Vänsterhänt</button></div>'+
    '<label class="fld">Bedömning</label><div id="peLevelBox" style="margin-bottom:13px"></div>'+
    '<label class="fld">Färgprick</label><div class="swatches" id="peColors">'+
      PLAYER_COLORS.map(c=>'<button class="swatch'+((p?p.color:PLAYER_COLORS[0])===c?' sel':'')+'" data-c="'+c+'" style="background:'+c+'"></button>').join('')+'</div>'+
    '<label class="fld">Foto (frivilligt)</label>'+
    '<div style="display:flex;gap:10px;align-items:center;margin-bottom:13px">'+
      '<span id="pePhotoPrev">'+(p&&p.photo?'<img class="avatar" src="'+p.photo+'" alt="">':'')+'</span>'+
      '<label class="minibtn upload">Välj bild<input id="pePhoto" type="file" accept="image/*" style="display:none"></label>'+
      (p&&p.photo?'<button class="minibtn" id="pePhotoDel">Ta bort bild</button>':'')+'</div>'+
    '<label class="fld">Anteckning (endast för tränaren, exporteras ej)</label>'+
    '<textarea id="peNote" rows="2">'+esc(p?p.note:'')+'</textarea>'+
    '<div class="switchrow" style="border:none;padding-top:0"><div><div class="sw-label">Aktiv i truppen</div>'+
      '<div class="sw-hint">Inaktiv = skadad/slutat. Historiken bevaras.</div></div>'+
      '<button class="switch'+(!p||p.active?' on':'')+'" id="peActive"></button></div>'+
    '<div class="btnrow"><button class="ghost" id="peCancel">Avbryt</button>'+
      '<button class="primary" id="peSave">Spara</button></div>'+
    (p?'<button class="ghost block danger" id="peDelete">Ta bort permanent</button>':''),{sticky:true});
  let photo=p?p.photo:null;
  let color=p?p.color:PLAYER_COLORS[0];
  let hand=p?(p.hand||'H'):'H';
  let serie=p?(p.serie||null):null;
  let level=p?(p.level||null):null;
  let def=p?(p.def||null):null;
  w.querySelectorAll('#peSerie .segbtn').forEach(b=>b.onclick=()=>{
    serie=b.dataset.s?parseInt(b.dataset.s,10):null;
    w.querySelectorAll('#peSerie .segbtn').forEach(x=>x.classList.toggle('sel',x===b));
  });
  // Både gradering och försvar följer samma PIN-skydd som nivåfliken.
  function paintLevel(){
    const box=w.querySelector('#peLevelBox');
    if(S().pinHash&&!pinUnlocked){
      box.innerHTML='<div class="lvl-locked"><span data-svg="lockClosed"></span>'+
        '<span class="lvl-lbl">Gradering och försvar är PIN-skyddat.</span>'+
        '<button class="minibtn" id="peLvlUnlock">Lås upp</button></div>';
      fillSvg(box);
      box.querySelector('#peLvlUnlock').onclick=()=>requirePin(()=>paintLevel());
      return;
    }
    box.innerHTML='<div class="lvl-sub">Gradering 1–10</div>'+
      '<div class="lvlpick">'+LEVELS.map(n=>'<button class="lvlbtn'+(level===n?' sel':'')+
      '" data-lvl="'+n+'">'+n+'</button>').join('')+'</div>'+
      '<div class="lvl-scale"><span>1 · utvecklas</span><span>10 · bärande</span></div>'+
      '<div class="lvl-sub" style="margin-top:12px">Försvar 1–5</div>'+
      '<div class="lvlpick def">'+DEF_LEVELS.map(n=>'<button class="lvlbtn'+(def===n?' sel':'')+
      '" data-def="'+n+'">'+n+'</button>').join('')+'</div>'+
      '<div class="lvl-scale"><span>1 · utvecklas</span><span>5 · bärande</span></div>'+
      '<p class="hint" style="margin-top:8px">Grova helhetsbedömningar. Används bara av algoritmen och visas aldrig i resultat, utskrifter eller exporter. Tryck på samma siffra igen för att rensa.</p>';
    box.querySelectorAll('[data-lvl]').forEach(b=>b.onclick=()=>{
      const n=parseInt(b.dataset.lvl,10);
      level=(level===n)?null:n;
      paintLevel();
    });
    box.querySelectorAll('[data-def]').forEach(b=>b.onclick=()=>{
      const n=parseInt(b.dataset.def,10);
      def=(def===n)?null:n;
      paintLevel();
    });
  }
  paintLevel();
  w.querySelectorAll('#peHand .segbtn').forEach(b=>b.onclick=()=>{
    hand=b.dataset.h;
    w.querySelectorAll('#peHand .segbtn').forEach(x=>x.classList.toggle('sel',x===b));
  });
  w.querySelectorAll('#peColors .swatch').forEach(b=>b.onclick=()=>{
    color=b.dataset.c;
    w.querySelectorAll('#peColors .swatch').forEach(x=>x.classList.toggle('sel',x===b));
  });
  w.querySelector('#peActive').onclick=e=>e.currentTarget.classList.toggle('on');
  w.querySelector('#pePhoto').onchange=e=>{
    const f=e.target.files[0]; if(!f) return;
    const img=new Image();
    img.onload=()=>{
      const c=document.createElement('canvas'); const s=128;
      c.width=s; c.height=s;
      const k=Math.max(s/img.width,s/img.height);
      const ctx=c.getContext('2d');
      ctx.drawImage(img,(s-img.width*k)/2,(s-img.height*k)/2,img.width*k,img.height*k);
      photo=c.toDataURL('image/jpeg',0.82);
      w.querySelector('#pePhotoPrev').innerHTML='<img class="avatar" src="'+photo+'" alt="">';
      URL.revokeObjectURL(img.src);
    };
    img.src=URL.createObjectURL(f);
  };
  const delBtn=w.querySelector('#pePhotoDel');
  if(delBtn) delBtn.onclick=()=>{ photo=null; w.querySelector('#pePhotoPrev').innerHTML=''; };
  w.querySelector('#peCancel').onclick=closeModal;
  w.querySelector('#peSave').onclick=()=>{
    const name=w.querySelector('#peName').value.trim();
    if(!name){ toast('Ange ett namn'); return; }
    const data={
      name, pos:w.querySelector('#pePos').value||null, pos2:w.querySelector('#pePos2').value||null,
      serie, hand, color, photo, note:w.querySelector('#peNote').value,
      active:w.querySelector('#peActive').classList.contains('on')
    };
    if(p){
      Object.assign(p,data);
      if(level!==(p.level||null)){ p.level=level; p.levelUpdated=level==null?null:Date.now(); }
      if(def!==(p.def||null)){ p.def=def; p.defUpdated=def==null?null:Date.now(); }
    } else {
      const np=Object.assign({id:uid(),level,levelUpdated:level==null?null:Date.now(),
        def,defUpdated:def==null?null:Date.now()},data);
      root.players.push(np);
      // Ett aktivt filter får inte gömma spelaren som just lades till.
      if(!inSel(np,S().truppFilter)) S().truppFilter=[];
      if(!inPosSel(np,S().truppPos)) S().truppPos=[];
    }
    save(); closeModal(); renderTrupp();
  };
  const del=w.querySelector('#peDelete');
  if(del) del.onclick=()=>confirmModal('Ta bort '+p.name+'?',
    'Spelaren och dess relationer raderas. Sparade indelningar i historiken påverkas inte. Överväg att inaktivera i stället.',
    'Ta bort',()=>{
      root.players=root.players.filter(x=>x.id!==p.id);
      root.relations=root.relations.filter(r=>r.a!==p.id&&r.b!==p.id);
      save(); renderTrupp();
    },true);
}

/* ---------- Relationer ---------- */
let relType='good';
document.querySelectorAll('#relTypeSeg .segbtn').forEach(b=>b.onclick=()=>{
  relType=b.dataset.rel;
  document.querySelectorAll('#relTypeSeg .segbtn').forEach(x=>x.classList.toggle('sel',x===b));
});
function renderRelations(){
  const ps=root.players.filter(p=>p.active).sort((a,b)=>a.name.localeCompare(b.name,'sv'));
  const opts='<option value="">Välj spelare…</option>'+ps.map(p=>'<option value="'+p.id+'">'+esc(p.name)+'</option>').join('');
  $('relA').innerHTML=opts; $('relB').innerHTML=opts;
  const L=$('relList');
  if(!root.relations.length){ L.innerHTML='<div class="empty">Inga relationer ännu.</div>'; return; }
  const typeName={good:'Spelar bra ihop',vary:'Variera',lock:'Lås ihop'};
  L.innerHTML=root.relations.map(r=>{
    const a=pById(r.a),b=pById(r.b);
    if(!a||!b) return '';
    return '<div class="relrow"><div class="who">'+esc(a.name)+' &amp; '+esc(b.name)+'</div>'+
      '<span class="reltag '+r.type+'">'+typeName[r.type]+'</span>'+
      '<button class="cardDel" data-rid="'+r.id+'">✕</button></div>';
  }).join('');
  L.querySelectorAll('[data-rid]').forEach(el=>el.onclick=()=>{
    root.relations=root.relations.filter(r=>r.id!==el.dataset.rid);
    save(); renderRelations();
  });
}
$('relAdd').onclick=()=>{
  const a=$('relA').value,b=$('relB').value;
  if(!a||!b||a===b){ toast('Välj två olika spelare'); return; }
  if(root.relations.some(r=>r.type===relType&&pairKey(r.a,r.b)===pairKey(a,b))){ toast('Relationen finns redan'); return; }
  root.relations.push({id:uid(),a,b,type:relType});
  save(); renderRelations(); toast('Relation tillagd');
};

/* ---------- Nivåer (PIN-skyddad) ---------- */
function renderLevels(){
  const box=$('truppLevels');
  if(!pinUnlocked){
    box.innerHTML='<div class="lockedbox"><div class="big-ic" data-svg="lockClosed"></div>'+
      '<p>Nivåfliken är PIN-skyddad. Gradering (1–10) och försvar (1–5) är grova helhetsbedömningar som bara används av algoritmen – de visas aldrig i resultat, utskrifter eller exporter.</p>'+
      '<button class="primary" id="lvlUnlock">Lås upp</button></div>';
    fillSvg(box);
    $('lvlUnlock').onclick=()=>requirePin(()=>renderTrupp());
    return;
  }
  const ps=root.players.filter(p=>p.active).sort((a,b)=>a.name.localeCompare(b.name,'sv'));
  const staleM=S().staleMonths||3;
  // Färskvara: osatt gradering, eller någon av siffrorna för gammal.
  const isStale=p=>!p.level||monthsSince(p.levelUpdated)>=staleM||
    (p.def&&monthsSince(p.defUpdated)>=staleM);
  const staleCnt=ps.filter(isStale).length;
  let html='<div class="result-bar"><div class="left">'+
    (staleCnt?'<span class="pill warn">'+staleCnt+' behöver uppdateras</span>':'<span class="pill good">Alla nivåer aktuella</span>')+
    '</div><div class="right"><button class="topbtn" id="lvlLock"><span data-svg="lockOpen"></span> Lås</button></div></div>';
  html+=ps.map(p=>{
    let stale='';
    if(!p.level) stale='<span class="stale">Ej satt</span>';
    else if(monthsSince(p.levelUpdated)>=staleM) stale='<span class="stale">'+Math.floor(monthsSince(p.levelUpdated))+' mån sedan</span>';
    return '<div class="lvlrow2">'+
      '<div class="lvl-head"><span class="who">'+esc(p.name)+'</span>'+stale+'</div>'+
      '<div class="lvl-line"><span class="lvl-lbl2">Gradering</span><div class="lvlbtns">'+
        LEVELS.map(n=>'<button class="lvlbtn'+(p.level===n?' sel':'')+'" data-pid="'+p.id+'" data-lvl="'+n+'">'+n+'</button>').join('')+
      '</div></div>'+
      '<div class="lvl-line"><span class="lvl-lbl2">Försvar</span><div class="lvlbtns">'+
        DEF_LEVELS.map(n=>'<button class="lvlbtn'+(p.def===n?' sel':'')+'" data-pid="'+p.id+'" data-def="'+n+'">'+n+'</button>').join('')+
      '</div></div></div>';
  }).join('');
  if(!ps.length) html+='<div class="empty">Inga aktiva spelare.</div>';
  box.innerHTML=html;
  fillSvg(box);
  $('lvlLock').onclick=()=>{ setUnlocked(false); truppTab='players'; renderTrupp(); };
  box.querySelectorAll('[data-lvl]').forEach(b=>b.onclick=()=>{
    const p=pById(b.dataset.pid); if(!p) return;
    const n=parseInt(b.dataset.lvl,10);
    if(p.level===n){ p.level=null; p.levelUpdated=null; }   // tryck igen för att rensa
    else { p.level=n; p.levelUpdated=Date.now(); }
    save(); renderLevels();
  });
  box.querySelectorAll('[data-def]').forEach(b=>b.onclick=()=>{
    const p=pById(b.dataset.pid); if(!p) return;
    const n=parseInt(b.dataset.def,10);
    if(p.def===n){ p.def=null; p.defUpdated=null; }
    else { p.def=n; p.defUpdated=Date.now(); }
    save(); renderLevels();
  });
}

/* =====================================================================
   2. TRÄNING
   ===================================================================== */
const training={
  phase:'setup', present:new Set(), serie:[], countMode:'2', customCount:5, teamSize:6,
  params:null, result:null, historyId:null, tempLocks:[], lockSel:null, showBalance:false
};
// Urvalet avgör vilka spelare som alls är valbara: tomt = hela truppen,
// annars bara spelarna i de valda serienivåerna.
function eligiblePlayers(sel){
  return root.players.filter(p=>p.active&&inSel(p,sel))
    .sort((a,b)=>a.name.localeCompare(b.name,'sv'));
}
// Närvarande spelare inom urvalet – det algoritmen faktiskt delar in.
function presentEligibleIds(){
  return eligiblePlayers(training.serie).filter(p=>training.present.has(p.id)).map(p=>p.id);
}
function trainingParams(){
  if(!training.params){
    const last=S().lastTraining;
    training.params=Object.assign({},S().defaults,(last&&last.params)||{});
    if(last){ training.countMode=last.countMode||'2'; training.customCount=last.customCount||5;
      training.teamSize=last.teamSize||6; training.serie=normSel(last.serie); }
  }
  return training.params;
}
function trainingT(){
  const n=presentEligibleIds().length;
  if(training.countMode==='size') return Math.max(2,Math.round(n/Math.max(1,training.teamSize)));
  if(training.countMode==='custom') return Math.max(2,training.customCount);
  return parseInt(training.countMode,10);
}
function renderTraining(){
  $('trainSetup').classList.toggle('hidden',training.phase!=='setup');
  $('trainResult').classList.toggle('hidden',training.phase!=='result');
  if(training.phase==='setup') renderTrainSetup();
  else renderTrainResult();
}
function renderTrainSetup(){
  trainingParams();
  const all=root.players.filter(p=>p.active);
  // rensa närvaro för borttagna spelare
  [...training.present].forEach(id=>{ if(!all.some(p=>p.id===id)) training.present.delete(id); });
  // urval – flera nivåer kan kombineras
  $('serieSeg').innerHTML=selChipRow(training.serie,val=>
    root.players.filter(p=>p.active&&inSel(p,val==='all'?[]:[val])).length);
  $('serieSeg').querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{
    const v=b.dataset.f;
    training.serie=toggleSel(training.serie,v==='all'?'all':(v==='none'?'none':parseInt(v,10)));
    renderTrainSetup();
  });
  const ps=eligiblePlayers(training.serie);
  $('attCount').innerHTML='<b>'+presentEligibleIds().length+'</b> / '+ps.length+' på plats';
  const g=$('attGrid');
  if(!all.length) g.innerHTML='<div class="empty">Lägg till spelare i Truppen först.</div>';
  else if(!ps.length) g.innerHTML='<div class="empty">Ingen spelare i urvalet '+serieLabel(training.serie)+
    '. Sätt serienivå på spelarna i Truppen.</div>';
  else g.innerHTML=ps.map(p=>'<button class="tile'+(training.present.has(p.id)?' on':'')+'" data-pid="'+p.id+'">'+
    '<span class="dot" style="background:'+esc(p.color||'#98989f')+'"></span>'+
    '<span class="nm">'+esc(p.name)+'</span>'+(p.pos?'<span class="pos">'+esc(p.pos)+'</span>':'')+'</button>').join('');
  g.querySelectorAll('[data-pid]').forEach(el=>el.onclick=()=>{
    const id=el.dataset.pid;
    if(training.present.has(id)) training.present.delete(id); else training.present.add(id);
    renderTrainSetup();
  });
  $('openGroupSetup').disabled=presentEligibleIds().length<2;
}
// "Alla"/"Ingen" gäller det aktuella urvalet, inte hela truppen.
$('attAll').onclick=()=>{ eligiblePlayers(training.serie).forEach(p=>training.present.add(p.id)); renderTrainSetup(); };
$('attNone').onclick=()=>{ eligiblePlayers(training.serie).forEach(p=>training.present.delete(p.id)); renderTrainSetup(); };

/* Popup: antal grupper + parametrar, öppnas från "Skapa träningsgrupper". */
$('openGroupSetup').onclick=()=>{
  const P=trainingParams();
  const w=modal('<h2>Skapa träningsgrupper</h2>'+
    '<p class="sub" id="gsPresent" style="margin-bottom:20px"></p>'+
    '<label class="fld">Antal grupper</label>'+
    '<div class="seg block" id="teamCountSeg">'+
      '<button class="segbtn" data-n="2">2</button>'+
      '<button class="segbtn" data-n="3">3</button>'+
      '<button class="segbtn" data-n="4">4</button>'+
      '<button class="segbtn" data-n="custom">Eget</button>'+
      '<button class="segbtn" data-n="size">Grupper om …</button>'+
    '</div>'+
    '<div id="customCountBox" class="hidden">'+
      '<label class="fld" id="customCountLbl">Antal grupper</label>'+
      '<input id="customCountInput" type="number" inputmode="numeric" min="2" max="12" value="5">'+
    '</div>'+
    '<label class="fld" style="margin-top:18px">Parametrar</label>'+
    '<div id="paramSwitches"></div>'+
    '<div class="btnrow" style="margin-top:18px"><button class="ghost" id="gsCancel">Avbryt</button>'+
      '<button class="primary" id="divideBtn">Dela in</button></div>',{sticky:true});
  function refresh(){
    const n=presentEligibleIds().length, T=trainingT();
    w.querySelectorAll('#teamCountSeg .segbtn').forEach(b=>
      b.classList.toggle('sel',b.dataset.n===training.countMode));
    const cb=w.querySelector('#customCountBox');
    if(training.countMode==='custom'){
      cb.classList.remove('hidden'); w.querySelector('#customCountLbl').textContent='Antal grupper';
      if(document.activeElement!==w.querySelector('#customCountInput')) w.querySelector('#customCountInput').value=training.customCount;
    } else if(training.countMode==='size'){
      cb.classList.remove('hidden'); w.querySelector('#customCountLbl').textContent='Spelare per grupp';
      if(document.activeElement!==w.querySelector('#customCountInput')) w.querySelector('#customCountInput').value=training.teamSize;
    } else cb.classList.add('hidden');
    w.querySelector('#gsPresent').textContent=serieLabel(training.serie)+' · '+n+' spelare på plats';
    const btn=w.querySelector('#divideBtn');
    btn.disabled=!(n>=2&&T>=2&&n>=T);
    btn.textContent=(n>=T&&n>=2)?'Dela in i '+T+' grupper':'Dela in';
  }
  w.querySelectorAll('#teamCountSeg .segbtn').forEach(b=>b.onclick=()=>{
    training.countMode=b.dataset.n; refresh();
  });
  w.querySelector('#customCountInput').oninput=e=>{
    const v=parseInt(e.target.value,10);
    if(training.countMode==='size') training.teamSize=v||4; else training.customCount=v||2;
    refresh();
  };
  const box=w.querySelector('#paramSwitches');
  const anyDef=root.players.some(p=>typeof p.def==='number');
  PARAM_DEFS.forEach(([key,label,hint])=>{
    const disabled=(key==='vary'&&!root.history.length)||(key==='defbal'&&!anyDef);
    box.appendChild(switchRow(label.replace('{N}','grupp'),hint,!!P[key]&&!disabled,v=>{ P[key]=v; },disabled));
  });
  w.querySelector('#gsCancel').onclick=closeModal;
  w.querySelector('#divideBtn').onclick=()=>{
    const n=presentEligibleIds().length, T=trainingT();
    if(n<2||n<T) return;
    S().lastTraining={params:Object.assign({},P),countMode:training.countMode,customCount:training.customCount,
      teamSize:training.teamSize,serie:normSel(training.serie)};
    training.tempLocks=[]; training.lockSel=null; training.showBalance=false;
    runTrainingDivision(true);
    training.phase='result';
    save(); closeModal(); renderTraining();
  };
  refresh();
};
function runTrainingDivision(fresh){
  const T=trainingT();
  const res=makeTeams(presentEligibleIds(),T,trainingParams(),training.tempLocks);
  const prev=training.result;
  training.result={
    teams:res.teams.map((ids,i)=>({
      name:(!fresh&&prev&&prev.teams[i])?prev.teams[i].name:TRAIN_PREFIX+VESTS[i%VESTS.length].name,
      vestId:(!fresh&&prev&&prev.teams[i])?prev.teams[i].vestId:VESTS[i%VESTS.length].id,
      playerIds:ids
    })),
    avgs:res.avgs, davgs:res.davgs
  };
  if(fresh) training.historyId=null;
  saveTrainingHistory();
}
function saveTrainingHistory(){
  const r=training.result; if(!r) return;
  const entry={
    id:training.historyId||uid(), ts:Date.now(), type:'Träning', serie:normSel(training.serie),
    label:r.teams.length+' grupper · '+r.teams.reduce((s,t)=>s+t.playerIds.length,0)+' spelare',
    teams:r.teams.map(t=>({name:t.name,vestId:t.vestId,
      players:t.playerIds.map(id=>{ const p=pById(id); return {id,name:p?p.name:'?'}; })}))
  };
  const idx=root.history.findIndex(h=>h.id===entry.id);
  if(idx>=0) root.history[idx]=entry; else root.history.unshift(entry);
  training.historyId=entry.id;
  if(root.history.length>100) root.history.length=100;
  save();
}
function renderTrainResult(){
  const r=training.result; if(!r){ training.phase='setup'; renderTraining(); return; }
  const n=r.teams.reduce((s,t)=>s+t.playerIds.length,0);
  $('trainResultSub').textContent=serieLabel(training.serie)+' · '+n+' spelare · '+r.teams.length+' grupper · '+fmtDate(Date.now());
  renderTeamCards($('trainTeams'),r.teams,{
    onMove:(pid,from,to)=>{
      const src=r.teams[from], dst=r.teams[to];
      src.playerIds=src.playerIds.filter(x=>x!==pid);
      dst.playerIds.push(pid);
      recomputeAvgs(r); saveTrainingHistory(); renderTrainResult();
    },
    onLockPair:(a,b)=>{
      if(!training.tempLocks.some(pr=>pairKey(pr[0],pr[1])===pairKey(a,b))){
        training.tempLocks.push([a,b]); renderTrainResult();
        toast('Låsta ihop inför nästa omslumpning');
      }
    },
    lockSelRef:training,
    onRename:(i)=>renameTeam(r.teams[i],()=>{ saveTrainingHistory(); renderTrainResult(); },'grupp'),
    onVest:(i)=>{ cycleVest(r.teams[i]); saveTrainingHistory(); renderTrainResult(); }
  });
  // balans (PIN-skyddad, diskret) – visas intill knappen på översta raden
  const note=$('balanceNote');
  if(training.showBalance&&pinUnlocked){
    note.classList.remove('hidden');
    note.innerHTML=balanceLine(r.teams);
  } else note.classList.add('hidden');
  // temporära lås
  const bar=$('templockBar');
  bar.innerHTML=training.tempLocks.map((pr,i)=>{
    const a=pById(pr[0]),b=pById(pr[1]);
    return '<span class="templock">🔒 '+esc(a?a.name:'?')+' + '+esc(b?b.name:'?')+
      '<button data-tl="'+i+'">✕</button></span>';
  }).join('');
  bar.querySelectorAll('[data-tl]').forEach(el=>el.onclick=()=>{
    training.tempLocks.splice(parseInt(el.dataset.tl,10),1); renderTrainResult();
  });
}
// Kompakt balansutfall för en uppsättning grupper/lag. Räknas fram vid varje
// rendering, så raden stämmer direkt efter en manuell flytt.
function fmt1(n){ return n.toFixed(1).replace('.',','); }
function balanceLine(teams){
  const r={teams}; recomputeAvgs(r);
  const part=(label,vals,limit)=>{
    const d=Math.max.apply(null,vals)-Math.min.apply(null,vals);
    return '<span><span class="bl-lbl">'+label+'</span>'+vals.map(fmt1).join(' · ')+
      ' — <b class="'+(d<=limit?'ok':'meh')+'">'+(d<=limit?'OK':'skillnad '+fmt1(d))+'</b></span>';
  };
  let html=part('Nivå',r.avgs,1);
  if(r.davgs) html+=part('Försvar',r.davgs,0.5);
  return html;
}
function recomputeAvgs(r){
  const mean=(ids,pick)=>{
    const v=ids.map(id=>{ const p=pById(id); return p?pick(p):null; }).filter(x=>x!==null);
    return v.length?v.reduce((a,b)=>a+b,0)/v.length:0;
  };
  r.avgs=r.teams.map(t=>mean(t.playerIds,p=>p.level||LEVEL_MID));
  const anyDef=root.players.some(p=>typeof p.def==='number');
  r.davgs=anyDef?r.teams.map(t=>mean(t.playerIds,p=>p.def||DEF_MID)):null;
}
$('trainBack').onclick=()=>{ training.phase='setup'; renderTraining(); };
$('reshuffleBtn').onclick=()=>{ runTrainingDivision(false); renderTrainResult(); };
$('balancePeek').onclick=()=>requirePin(()=>{ training.showBalance=!training.showBalance; renderTrainResult(); });
$('trainPrint').onclick=()=>{
  if(training.result) printTeams((root.squadName||'Träning')+' – '+serieLabel(training.serie),training.result.teams);
};

/* ---------- Gemensam lagkortsrendering + drag-och-släpp ---------- */
function renderTeamCards(grid,teams,handlers){
  grid.innerHTML=teams.map((t,i)=>{
    const v=vestById(t.vestId);
    return '<div class="teamcard" data-team="'+i+'">'+
      '<div class="team-head"><span class="vest" data-vest="'+i+'" style="background:'+v.bg+'" title="Byt tröjfärg"></span>'+
      '<span class="team-name" data-rename="'+i+'">'+esc(t.name)+'</span>'+
      '<span class="team-n">'+t.playerIds.length+'</span></div>'+
      '<div class="team-body">'+t.playerIds.map(id=>{
        const p=pById(id); if(!p) return '';
        const sel=handlers.lockSelRef&&handlers.lockSelRef.lockSel===id;
        return '<div class="chip'+(isGK(p)?' mv':'')+(sel?' locksel':'')+'" data-chip="'+id+'" data-from="'+i+'">'+
          '<span class="dot" style="background:'+esc(p.color||'#98989f')+'"></span>'+
          '<span class="nm">'+esc(p.name)+'</span>'+
          (p.pos?'<span class="pos">'+esc(p.pos)+'</span>':'')+'</div>';
      }).join('')+'</div></div>';
  }).join('');
  grid.querySelectorAll('[data-rename]').forEach(el=>el.onclick=()=>handlers.onRename&&handlers.onRename(parseInt(el.dataset.rename,10)));
  grid.querySelectorAll('[data-vest]').forEach(el=>el.onclick=()=>handlers.onVest&&handlers.onVest(parseInt(el.dataset.vest,10)));
  grid.querySelectorAll('[data-chip]').forEach(el=>bindChipPointer(el,grid,handlers));
}
function bindChipPointer(chip,grid,handlers){
  chip.addEventListener('pointerdown',e=>{
    if(e.button&&e.button!==0) return;
    const pid=chip.dataset.chip, from=parseInt(chip.dataset.from,10);
    const startX=e.clientX,startY=e.clientY;
    let ghost=null,dragging=false,longFired=false,overTeam=null;
    const lp=setTimeout(()=>{
      longFired=true;
      const ref=handlers.lockSelRef;
      if(ref&&handlers.onLockPair){
        if(ref.lockSel&&ref.lockSel!==pid){ const a=ref.lockSel; ref.lockSel=null; handlers.onLockPair(a,pid); }
        else if(ref.lockSel===pid){ ref.lockSel=null; chip.classList.remove('locksel'); }
        else { ref.lockSel=pid; chip.classList.add('locksel'); toast('Långtryck på en spelare till för att låsa ihop'); }
      }
    },550);
    chip.setPointerCapture(e.pointerId);
    const move=ev=>{
      const dx=ev.clientX-startX,dy=ev.clientY-startY;
      if(!dragging&&Math.hypot(dx,dy)>10&&!longFired){
        clearTimeout(lp); dragging=true;
        ghost=chip.cloneNode(true); ghost.className='chip drag-ghost';
        ghost.style.width=chip.offsetWidth+'px';
        document.body.appendChild(ghost);
        chip.classList.add('dragging');
      }
      if(dragging){
        ghost.style.left=ev.clientX+'px'; ghost.style.top=ev.clientY+'px';
        const el=document.elementFromPoint(ev.clientX,ev.clientY);
        const tc=el?el.closest('.teamcard'):null;
        grid.querySelectorAll('.teamcard').forEach(c=>c.classList.toggle('dropover',c===tc&&parseInt(c.dataset.team,10)!==from));
        overTeam=tc?parseInt(tc.dataset.team,10):null;
      }
    };
    const up=()=>{
      clearTimeout(lp);
      chip.removeEventListener('pointermove',move);
      chip.removeEventListener('pointerup',up);
      chip.removeEventListener('pointercancel',up);
      if(ghost) ghost.remove();
      chip.classList.remove('dragging');
      grid.querySelectorAll('.teamcard').forEach(c=>c.classList.remove('dropover'));
      if(dragging&&overTeam!=null&&overTeam!==from) handlers.onMove(pid,from,overTeam);
    };
    chip.addEventListener('pointermove',move);
    chip.addEventListener('pointerup',up);
    chip.addEventListener('pointercancel',up);
  });
}
function renameTeam(team,done,noun){
  const w=modal('<h2>'+(noun==='grupp'?'Gruppnamn':'Lagnamn')+'</h2><input id="tnIn" value="'+esc(team.name)+'" autocomplete="off">'+
    '<div class="btnrow"><button class="ghost" id="tnCancel">Avbryt</button><button class="primary" id="tnOk">Spara</button></div>');
  const inp=w.querySelector('#tnIn'); inp.focus(); inp.select();
  w.querySelector('#tnCancel').onclick=closeModal;
  const go=()=>{ const v=inp.value.trim(); if(v) team.name=v; closeModal(); done(); };
  w.querySelector('#tnOk').onclick=go;
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter') go(); });
}
function cycleVest(team){
  const i=VESTS.findIndex(v=>v.id===team.vestId);
  const nv=VESTS[(i+1)%VESTS.length];
  const old=vestById(team.vestId).name;
  team.vestId=nv.id;
  // Följ med i färgbytet så länge namnet inte är egensatt.
  for(const pre of [TRAIN_PREFIX,CUP_PREFIX]) if(team.name===pre+old){ team.name=pre+nv.name; break; }
}

/* ---------- Utskrift (endast namn och lag – aldrig nivådata) ---------- */
function printTeams(title,teams){
  const pa=$('printArea');
  pa.innerHTML='<h1>'+esc(title)+'</h1><div class="pdate">'+new Date().toLocaleDateString('sv-SE',{weekday:'long',day:'numeric',month:'long',year:'numeric'})+'</div>'+
    '<div class="pteams">'+teams.map(t=>'<div class="pteam"><h2>'+esc(t.name)+'</h2><ol>'+
      t.playerIds.map(id=>{ const p=pById(id); return '<li>'+esc(p?p.name:'?')+'</li>'; }).join('')+'</ol></div>').join('')+'</div>';
  window.print();
}

/* =====================================================================
   3. CUP
   ===================================================================== */
let openCupId=null;
let cupShowBalance=false;   // tillfälligt läge, sparas inte med eventet
// Uttagna till eventet, begränsat till eventets urval.
function cupEligibleIds(cup){
  const ids=new Set(cup.presentIds||[]);
  return eligiblePlayers(cup.serie).filter(p=>ids.has(p.id)).map(p=>p.id);
}
function renderCup(){
  const cup=openCupId?root.cups.find(c=>c.id===openCupId):null;
  $('cupList').classList.toggle('hidden',!!cup);
  $('cupDetail').classList.toggle('hidden',!cup);
  if(cup) renderCupDetail(cup); else renderCupList();
}
function renderCupList(){
  const g=$('cupGrid');
  if(!root.cups.length){ g.innerHTML='<div class="empty">Inga event ännu. Skapa ett för cup eller sammandrag – lagen består över hela dagen.</div>'; return; }
  g.innerHTML=root.cups.map(c=>'<div class="card click" data-cid="'+c.id+'"><div class="row">'+
    '<div><div class="title">'+esc(c.name)+'</div><div class="meta">'+esc(c.date||'')+
    (c.teams?' · '+c.teams.length+' lag':' · ej indelad')+'</div></div>'+
    (c.teams?'<span class="pill good">Klar</span>':'<span class="pill">Ny</span>')+'</div></div>').join('');
  g.querySelectorAll('[data-cid]').forEach(el=>el.onclick=()=>{ openCupId=el.dataset.cid; renderCup(); });
}
$('addCupBtn').onclick=()=>{
  const today=new Date().toISOString().slice(0,10);
  const w=modal('<h2>Nytt event</h2>'+
    '<label class="fld">Namn</label><input id="cuName" placeholder="t.ex. Vårcupen" autocomplete="off">'+
    '<label class="fld">Datum</label><input id="cuDate" type="date" value="'+today+'">'+
    '<div class="btnrow"><button class="ghost" id="cuCancel">Avbryt</button><button class="primary" id="cuOk">Skapa</button></div>');
  w.querySelector('#cuCancel').onclick=closeModal;
  w.querySelector('#cuOk').onclick=()=>{
    const name=w.querySelector('#cuName').value.trim();
    if(!name){ toast('Ange ett namn'); return; }
    const cup={id:uid(),name,date:w.querySelector('#cuDate').value,numTeams:2,serie:[],
      params:{balance:true,gk:true,pos:true,rel:true,left:false,vary:false},
      presentIds:[],teams:null,lockSel:null};
    root.cups.unshift(cup); save(); closeModal();
    openCupId=cup.id; renderCup();
  };
};
function renderCupDetail(cup){
  const box=$('cupDetail');
  let html='<div class="head-row"><div><h2><span class="h2-icon" data-svg="trophy"></span>'+esc(cup.name)+'</h2>'+
    '<p class="sub">'+esc(cup.date||'')+(normSel(cup.serie).length?' · '+esc(serieLabel(cup.serie)):'')+
    (cup.teams?' · Lagen består över hela eventet':'')+'</p></div>'+
    '<div class="head-actions"><button class="topbtn" id="cupBack">‹ Alla event</button>'+
    '<button class="topbtn danger" id="cupDelete"><span data-svg="trash"></span> Ta bort</button></div></div>';
  if(!cup.teams){
    const serie=normSel(cup.serie);
    const all=root.players.filter(p=>p.active);
    const ps=eligiblePlayers(serie);
    cup.presentIds=(cup.presentIds||[]).filter(id=>all.some(p=>p.id===id));
    const eligibleIds=cup.presentIds.filter(id=>ps.some(p=>p.id===id));
    const n=eligibleIds.length, T=Math.max(2,cup.numTeams||2);
    const base=Math.floor(n/Math.max(1,T)), extra=n%Math.max(1,T);
    const sizeInfo=n>=T?(extra?('lag om '+(base+1)+' och '+base+' spelare'):('exakt lagstorlek: '+base)):'för få spelare';
    html+='<div class="setup-grid"><div>'+
      '<label class="fld">Urval</label><div class="filterbar" id="cupSerieSeg">'+
        selChipRow(serie,val=>root.players.filter(p=>p.active&&inSel(p,val==='all'?[]:[val])).length)+
      '</div>'+
      '<div class="att-head"><div class="att-count"><b>'+n+'</b> / '+ps.length+' med på eventet</div>'+
      '<div style="display:flex;gap:8px"><button class="minibtn" id="cupAll">Alla</button><button class="minibtn" id="cupNone">Ingen</button></div></div>'+
      '<div class="tilegrid" id="cupAttGrid">'+(ps.length?ps.map(p=>'<button class="tile'+(cup.presentIds.includes(p.id)?' on':'')+'" data-pid="'+p.id+'">'+
        '<span class="dot" style="background:'+esc(p.color||'#98989f')+'"></span><span class="nm">'+esc(p.name)+'</span>'+
        (p.pos?'<span class="pos">'+esc(p.pos)+'</span>':'')+'</button>').join('')
        :'<div class="empty">Ingen spelare i urvalet '+serieLabel(serie)+'. Sätt serienivå på spelarna i Truppen.</div>')+'</div></div>'+
      '<div class="card"><h3>Antal lag</h3>'+
      '<input id="cupTeamsN" type="number" inputmode="numeric" min="2" max="8" value="'+T+'">'+
      '<p class="hint" style="margin:0 0 12px">'+n+' spelare → '+esc(sizeInfo)+'</p>'+
      '<h3>Krav</h3><div id="cupSwitches"></div>'+
      '<button class="primary block" id="cupGenerate"'+(n>=T&&n>=2?'':' disabled')+'>Skapa lag</button></div></div>';
  } else {
    html+='<div class="result-bar"><div class="left">'+
      '<button class="topbtn acc" id="cupReshuffle"><span data-svg="shuffle"></span> Slumpa om</button>'+
      '<button class="topbtn" id="cupReopen">Ändra närvaro</button></div>'+
      '<div class="right"><button class="topbtn" id="cupPrint"><span data-svg="print"></span> Skriv ut laglistor</button>'+
      '<button class="topbtn" id="cupBalance"><span data-svg="lockClosed"></span> Balans</button>'+
      '<span class="balance-inline'+(cupShowBalance&&pinUnlocked?'':' hidden')+'" id="cupBalanceNote">'+
        (cupShowBalance&&pinUnlocked?balanceLine(cup.teams):'')+'</span></div></div>'+
      '<div class="teams-grid" id="cupTeams"></div>'+
      '<p class="hint">Dra en spelare till ett annat lag för att justera. Tryck på färgpricken för att byta tröjfärg, på lagnamnet för att döpa om. Utskriften visar endast namn och lag – aldrig nivådata.</p>';
  }
  box.innerHTML=html; fillSvg(box);
  $('cupBack').onclick=()=>{ openCupId=null; renderCup(); };
  $('cupDelete').onclick=()=>confirmModal('Ta bort '+cup.name+'?','Eventet och dess lag raderas. Historiken påverkas inte.','Ta bort',()=>{
    root.cups=root.cups.filter(c=>c.id!==cup.id); save(); openCupId=null; renderCup();
  },true);
  if(!cup.teams){
    box.querySelectorAll('#cupAttGrid [data-pid]').forEach(el=>el.onclick=()=>{
      const id=el.dataset.pid;
      const i=cup.presentIds.indexOf(id);
      if(i>=0) cup.presentIds.splice(i,1); else cup.presentIds.push(id);
      save(); renderCupDetail(cup);
    });
    box.querySelectorAll('#cupSerieSeg [data-f]').forEach(b=>b.onclick=()=>{
      const v=b.dataset.f;
      cup.serie=toggleSel(cup.serie,v==='all'?'all':(v==='none'?'none':parseInt(v,10)));
      save(); renderCupDetail(cup);
    });
    // "Alla"/"Ingen" gäller det aktuella urvalet, inte hela truppen.
    $('cupAll').onclick=()=>{
      const add=eligiblePlayers(cup.serie).map(p=>p.id);
      cup.presentIds=[...new Set(cup.presentIds.concat(add))];
      save(); renderCupDetail(cup);
    };
    $('cupNone').onclick=()=>{
      const drop=new Set(eligiblePlayers(cup.serie).map(p=>p.id));
      cup.presentIds=cup.presentIds.filter(id=>!drop.has(id));
      save(); renderCupDetail(cup);
    };
    $('cupTeamsN').oninput=e=>{ cup.numTeams=Math.max(2,parseInt(e.target.value,10)||2); save(); renderCupDetail(cup); };
    const sw=$('cupSwitches');
    [['gk','Minst en målvakt per lag',''],['balance','Jämna nivåer',''],['pos','Sprid positioner',''],['rel','Ta hänsyn till relationer','']]
      .forEach(([key,label,hint])=>sw.appendChild(switchRow(label,hint,!!cup.params[key],v=>{ cup.params[key]=v; save(); })));
    $('cupGenerate').onclick=()=>{
      const res=makeTeams(cupEligibleIds(cup),cup.numTeams,cup.params,[]);
      cup.teams=res.teams.map((ids,i)=>({name:CUP_PREFIX+VESTS[i%VESTS.length].name,vestId:VESTS[i%VESTS.length].id,playerIds:ids}));
      cupHistory(cup); save(); renderCupDetail(cup);
    };
  } else {
    renderTeamCards($('cupTeams'),cup.teams,{
      onMove:(pid,from,to)=>{
        cup.teams[from].playerIds=cup.teams[from].playerIds.filter(x=>x!==pid);
        cup.teams[to].playerIds.push(pid);
        cupHistory(cup); save(); renderCupDetail(cup);
      },
      onRename:i=>renameTeam(cup.teams[i],()=>{ cupHistory(cup); save(); renderCupDetail(cup); }),
      onVest:i=>{ cycleVest(cup.teams[i]); cupHistory(cup); save(); renderCupDetail(cup); }
    });
    $('cupReshuffle').onclick=()=>confirmModal('Slumpa om lagen?','Nuvarande lag ersätts med en ny giltig indelning.','Slumpa om',()=>{
      const res=makeTeams(cupEligibleIds(cup),cup.teams.length,cup.params,[]);
      cup.teams=res.teams.map((ids,i)=>({name:cup.teams[i]?cup.teams[i].name:CUP_PREFIX+VESTS[i%VESTS.length].name,
        vestId:cup.teams[i]?cup.teams[i].vestId:VESTS[i%VESTS.length].id,playerIds:ids}));
      cupHistory(cup); save(); renderCupDetail(cup);
    });
    $('cupReopen').onclick=()=>confirmModal('Ändra närvaro?','Lagen behöver skapas om efter ändrad närvaro.','Fortsätt',()=>{
      cup.teams=null; save(); renderCupDetail(cup);
    });
    $('cupPrint').onclick=()=>printTeams(cup.name,cup.teams);
    $('cupBalance').onclick=()=>requirePin(()=>{ cupShowBalance=!cupShowBalance; renderCupDetail(cup); });
  }
}
function cupHistory(cup){
  const entry={
    id:'cup-'+cup.id, ts:Date.now(), type:'Cup', label:cup.name,
    teams:cup.teams.map(t=>({name:t.name,vestId:t.vestId,
      players:t.playerIds.map(id=>{ const p=pById(id); return {id,name:p?p.name:'?'}; })}))
  };
  const idx=root.history.findIndex(h=>h.id===entry.id);
  if(idx>=0) root.history[idx]=entry; else root.history.unshift(entry);
  root.history.sort((a,b)=>b.ts-a.ts);
}

/* =====================================================================
   4. HISTORIK
   ===================================================================== */
function renderHistory(){
  const L=$('histList');
  if(!root.history.length){ L.innerHTML='<div class="empty">Inga indelningar ännu. De sparas automatiskt när du delar in lag.</div>'; return; }
  L.innerHTML=root.history.map(h=>'<details class="card histcard" style="margin-bottom:10px">'+
    '<summary><span class="hist-date">'+fmtDateShort(h.ts)+'</span>'+
    '<div class="hist-meta"><div class="hist-title">'+esc(h.type)+
    (h.type==='Cup'?' · '+esc(h.label):(normSel(h.serie).length?' · '+esc(serieLabel(h.serie)):''))+'</div>'+
    '<div class="hist-sub">'+fmtDate(h.ts)+' · '+h.teams.length+(h.type==='Cup'?' lag · ':' grupper · ')+
    h.teams.reduce((s,t)=>s+t.players.length,0)+' spelare</div></div>'+
    '<button class="cardDel" data-hid="'+h.id+'">✕</button></summary>'+
    '<div class="hist-body">'+h.teams.map(t=>{
      const v=vestById(t.vestId);
      return '<div class="hist-team"><div class="ht-name"><span class="dot" style="background:'+v.bg+'"></span>'+esc(t.name)+'</div>'+
        '<ul>'+t.players.map(p=>'<li>'+esc(p.name)+'</li>').join('')+'</ul></div>';
    }).join('')+'</div>'+
    '<div class="hist-actions">'+
      '<p class="hint">Lägger in samma grupper som dagens träningsgrupper. Den här posten lämnas orörd.</p>'+
      '<button class="topbtn acc" data-reuse="'+h.id+'"><span data-svg="repeat"></span> Använd igen</button>'+
    '</div></details>').join('');
  fillSvg(L);
  L.querySelectorAll('[data-hid]').forEach(el=>el.onclick=e=>{
    e.preventDefault(); e.stopPropagation();
    confirmModal('Ta bort indelning?','Posten tas bort ur historiken.','Ta bort',()=>{
      root.history=root.history.filter(h=>h.id!==el.dataset.hid);
      save(); renderHistory();
    },true);
  });
  L.querySelectorAll('[data-reuse]').forEach(el=>el.onclick=e=>{
    e.preventDefault(); e.stopPropagation();
    const h=root.history.find(x=>x.id===el.dataset.reuse);
    if(h) reuseDivision(h);
  });
}
// Läs tillbaka en tidigare indelning som dagens träningsgrupper. Spelare som
// tagits bort eller inaktiverats sedan dess kan inte återskapas och utesluts.
function reuseDivision(h){
  const groups=h.teams.map(t=>({
    name:t.name, vestId:t.vestId,
    playerIds:t.players.map(pl=>pl.id).filter(id=>{ const p=pById(id); return p&&p.active; })
  })).filter(g=>g.playerIds.length);
  const kept=groups.reduce((s,g)=>s+g.playerIds.length,0);
  const total=h.teams.reduce((s,t)=>s+t.players.length,0);
  if(groups.length<2||kept<2){
    toast('För få spelare finns kvar för att återanvända indelningen');
    return;
  }
  training.serie=normSel(h.serie);
  training.present=new Set();
  groups.forEach(g=>g.playerIds.forEach(id=>training.present.add(id)));
  training.tempLocks=[]; training.lockSel=null; training.showBalance=false;
  // så popupen visar rätt antal om man slumpar om efteråt
  if(groups.length>=2&&groups.length<=4) training.countMode=String(groups.length);
  else { training.countMode='custom'; training.customCount=groups.length; }
  training.result={teams:groups};
  recomputeAvgs(training.result);
  training.historyId=null;      // sparas som en ny post – originalet rörs inte
  saveTrainingHistory();
  training.phase='result';
  show('vTraining');
  const dropped=total-kept;
  toast(dropped?('Grupper återanvända · '+dropped+' spelare finns inte kvar')
    :'Grupper återanvända');
}

/* =====================================================================
   5. INSTÄLLNINGAR
   ===================================================================== */
function renderSettings(){
  $('setSquadName').value=root.squadName||'';
  $('setSquadName').onchange=e=>{ root.squadName=e.target.value.trim(); save(); renderNavCtx(); };
  $('setPosMode').value=S().posMode;
  $('setPosMode').onchange=e=>{ S().posMode=e.target.value; save(); };
  $('setStale').value=String(S().staleMonths||3);
  $('setStale').onchange=e=>{ S().staleMonths=parseInt(e.target.value,10); save(); };
  $('setPinBtn').textContent=S().pinHash?'Ändra PIN':'Sätt PIN';
  const box=$('defaultSwitches'); box.innerHTML='';
  PARAM_DEFS.forEach(([key,label,hint])=>{
    box.appendChild(switchRow(label.replace('{N}','lag/grupp'),hint,!!S().defaults[key],v=>{ S().defaults[key]=v; save(); }));
  });
}
$('setPinBtn').onclick=()=>{
  const has=!!S().pinHash;
  const w=modal('<h2>'+(has?'Ändra PIN':'Sätt PIN')+'</h2>'+
    (has?'<input id="pinOld" type="password" inputmode="numeric" maxlength="6" placeholder="Nuvarande PIN" autocomplete="off">':'')+
    '<input id="pinN1" type="password" inputmode="numeric" maxlength="6" placeholder="Ny PIN (4–6 siffror)" autocomplete="off">'+
    '<input id="pinN2" type="password" inputmode="numeric" maxlength="6" placeholder="Upprepa ny PIN" autocomplete="off">'+
    '<div class="btnrow"><button class="ghost" id="pinCancel">Avbryt</button><button class="primary" id="pinOk">Spara</button></div>'+
    (has?'<button class="ghost block danger" id="pinRemove">Ta bort PIN</button>':''));
  w.querySelector('#pinCancel').onclick=closeModal;
  w.querySelector('#pinOk').onclick=async()=>{
    if(has&&!(await verifyPin(w.querySelector('#pinOld').value))){ toast('Fel nuvarande PIN'); return; }
    const a=w.querySelector('#pinN1').value,b=w.querySelector('#pinN2').value;
    if(!validPinFormat(a)){ toast('PIN måste vara 4–6 siffror'); return; }
    if(a!==b){ toast('PIN-koderna matchar inte'); return; }
    S().pinHash=await hashPin(a); setUnlocked(false); save(); closeModal(); renderSettings(); toast('PIN sparad');
  };
  const rm=w.querySelector('#pinRemove');
  if(rm) rm.onclick=async()=>{
    if(!(await verifyPin(w.querySelector('#pinOld').value))){ toast('Ange nuvarande PIN först'); return; }
    S().pinHash=null; setUnlocked(false); save(); closeModal(); renderSettings(); toast('PIN borttagen');
  };
};

/* ---------- Export / import ---------- */
// Sparar via värdmiljöns filhantering när appen körs som förhandsvisning,
// annars som vanlig nedladdning (lokal fil, GitHub Pages).
async function downloadJson(obj,filename,okMsg){
  const text=JSON.stringify(obj,null,2);
  let host=null;
  try{ if(window.claude&&typeof window.claude.use==='function') host=await window.claude.use('downloads'); }
  catch(e){ host=null; }
  if(host){
    try{ await host.save({filename,data:text}); toast(okMsg); }
    catch(err){ if(!err||err.code!=='declined') toast('Kunde inte spara filen'); }
    return;
  }
  const blob=new Blob([text],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download=filename;
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },400);
  toast(okMsg);
}
function today(){ return new Date().toISOString().slice(0,10); }
// Exporterna nås från sidomenyn, så de är en knapptryckning bort i varje vy.
$('navExportFull').onclick=()=>{
  downloadJson(Object.assign({exportType:'teambuilder-full',exportedAt:Date.now()},root),
    'teambuilder-backup-'+today()+'.json','Full backup exporterad');
};
$('navExportShare').onclick=()=>{
  downloadJson({exportType:'teambuilder-share',exportedAt:Date.now(),squadName:root.squadName,
    players:root.players.map(p=>({name:p.name,pos:p.pos,pos2:p.pos2,serie:p.serie,hand:p.hand,color:p.color,active:p.active}))},
    'teambuilder-trupp-'+today()+'.json','Trupp exporterad – utan graderingar och anteckningar');
};
$('importFile').onchange=e=>{
  const f=e.target.files[0]; e.target.value='';
  if(!f) return;
  const rd=new FileReader();
  rd.onload=()=>{
    let d; try{ d=JSON.parse(rd.result); }catch(err){ toast('Ogiltig JSON-fil'); return; }
    if(d&&d.exportType==='teambuilder-share'&&Array.isArray(d.players)) importShare(d);
    else if(d&&Array.isArray(d.players)&&d.settings) importFull(d);
    else toast('Filen känns inte igen som en Teambuilder-export');
  };
  rd.readAsText(f);
};
function importShare(d){
  const w=modal('<h2>Importera trupp</h2><p class="sub" style="margin-bottom:18px">'+d.players.length+' spelare i filen'+
    (d.squadName?' ('+esc(d.squadName)+')':'')+'. Nya spelare läggs till utan nivå – befintliga med samma namn behålls oförändrade.</p>'+
    '<div class="btnrow"><button class="ghost" id="imCancel">Avbryt</button><button class="primary" id="imMerge">Slå ihop</button></div>');
  w.querySelector('#imCancel').onclick=closeModal;
  w.querySelector('#imMerge').onclick=()=>{
    const names=new Set(root.players.map(p=>p.name.toLowerCase().trim()));
    let added=0;
    d.players.forEach(sp=>{
      if(!sp.name||names.has(String(sp.name).toLowerCase().trim())) return;
      root.players.push({id:uid(),name:String(sp.name),
        pos:migratePos(sp.pos),pos2:migratePos(sp.pos2),
        serie:SERIES.includes(sp.serie)?sp.serie:null,
        hand:sp.hand==='V'?'V':'H',color:sp.color||PLAYER_COLORS[0],photo:null,
        active:sp.active!==false,level:null,levelUpdated:null,note:''});
      added++;
    });
    save(); closeModal(); renderTrupp(); toast(added+' spelare tillagda');
  };
}
function importFull(d){
  const w=modal('<h2>Importera backup</h2><p class="sub" style="margin-bottom:18px">'+
    (d.players?d.players.length:0)+' spelare, '+(d.history?d.history.length:0)+' indelningar i filen.</p>'+
    '<div class="btnrow"><button class="ghost" id="imCancel">Avbryt</button>'+
    '<button class="ghost" id="imMerge">Slå ihop</button>'+
    '<button class="primary danger-btn" id="imReplace">Ersätt allt</button></div>');
  w.querySelector('#imCancel').onclick=closeModal;
  w.querySelector('#imReplace').onclick=()=>{
    root=normalizeRoot(d); root.onboarded=true;
    delete root.exportType; delete root.exportedAt;
    setUnlocked(false); save(); closeModal(); applyTheme(); show('vTrupp'); toast('Databas ersatt');
  };
  w.querySelector('#imMerge').onclick=()=>{
    const byId=new Set(root.players.map(p=>p.id));
    const byName=new Set(root.players.map(p=>p.name.toLowerCase().trim()));
    (d.players||[]).forEach(p=>{
      if(p&&p.id&&!byId.has(p.id)&&p.name&&!byName.has(String(p.name).toLowerCase().trim())){
        p.pos=migratePos(p.pos); p.pos2=migratePos(p.pos2);
        if(p.pos2&&p.pos2===p.pos) p.pos2=null;
        root.players.push(p);
      }
    });
    const relKeys=new Set(root.relations.map(r=>r.type+':'+pairKey(r.a,r.b)));
    (d.relations||[]).forEach(r=>{ if(r&&r.a&&r.b&&!relKeys.has(r.type+':'+pairKey(r.a,r.b))) root.relations.push(r); });
    const histIds=new Set(root.history.map(h=>h.id));
    (d.history||[]).forEach(h=>{ if(h&&h.id&&!histIds.has(h.id)) root.history.push(h); });
    root.history.sort((a,b)=>b.ts-a.ts);
    const cupIds=new Set(root.cups.map(c=>c.id));
    (d.cups||[]).forEach(c=>{ if(c&&c.id&&!cupIds.has(c.id)) root.cups.push(c); });
    save(); closeModal(); renderTrupp(); toast('Data ihopslagen');
  };
}
$('resetAllBtn').onclick=()=>confirmModal('Nollställa allt?','All data på den här enheten raderas permanent. Exportera en backup först om du är osäker.','Radera allt',()=>{
  idbClear().catch(()=>{});
  root=freshRoot(); setUnlocked(false); save();
  $('welcome').classList.remove('hidden');
  applyTheme(); renderNavCtx();
},true);

/* =====================================================================
   Onboarding & boot
   ===================================================================== */
$('wGo').onclick=async()=>{
  const pin=$('wPin').value;
  if(pin&&!validPinFormat(pin)){ toast('PIN måste vara 4–6 siffror'); return; }
  root.squadName=$('wName').value.trim();
  if(pin) S().pinHash=await hashPin(pin);
  root.onboarded=true; save();
  $('welcome').classList.add('hidden');
  renderNavLock(); show('vTrupp');
};
$('wImportFile').onchange=e=>{
  const f=e.target.files[0]; e.target.value='';
  if(!f) return;
  const rd=new FileReader();
  rd.onload=()=>{
    let d; try{ d=JSON.parse(rd.result); }catch(err){ toast('Ogiltig JSON-fil'); return; }
    if(d&&Array.isArray(d.players)&&d.settings){
      root=normalizeRoot(d); root.onboarded=true;
      delete root.exportType; delete root.exportedAt;
      save(); $('welcome').classList.add('hidden');
      applyTheme(); renderNavLock(); show('vTrupp'); toast('Databas återställd. Välkommen tillbaka!');
    } else toast('Filen känns inte igen som en Teambuilder-backup');
  };
  rd.readAsText(f);
};

fillSvg(document);
async function boot(){
  let data=null;
  try{ data=await idbGet(IDB_KEY); }catch(e){ data=null; }
  root=normalizeRoot(data);
  applyTheme();
  if(!root.onboarded) $('welcome').classList.remove('hidden');
  renderNavCtx(); renderNavLock();
  show('vTrupp');
}
boot();
