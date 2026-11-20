/* FELER V43 — render de novedades con el mismo lenguaje visual de V41. */
document.addEventListener('DOMContentLoaded',()=>{
 const host=document.getElementById('feler-black-friday-products')||document.getElementById('v28-catalog');
 if(!host||!Array.isArray(window.FELER_BLACK_FRIDAY))return;
 const isBF=host.id==='feler-black-friday-products';
 const category=new URLSearchParams(location.search).get('categoria');
 const all=window.FELER_BLACK_FRIDAY.slice().sort((a,b)=>b.numero-a.numero);
 const selected=isBF?all:all.filter(p=>p.categorias.includes(category));
 if(!isBF&&!selected.length){if(!host.children.length){const msg=document.createElement('p');msg.className='v28-quiet';msg.textContent='Todavía no hay productos seleccionados en esta categoría.';host.append(msg);}return;}
 const existing=new Set([...host.querySelectorAll('a[href]')].map(a=>(a.href.match(/\/dp\/([A-Z0-9]{10})/i)||[])[1]).filter(Boolean));
 const section=document.createElement('div');section.className='feler-v43-products feler-v37-grid';
 if(!isBF){
  const heading=document.createElement('h2');heading.className='feler-v43-section-title';heading.textContent='Nuevos productos de esta categoría';
  const intro=document.createElement('p');intro.className='v28-quiet';intro.textContent='Incorporaciones recientes de FELER. Comprueba siempre las características, el precio y la disponibilidad en Amazon.ca.';
  if(host.textContent.trim()==='No hay modelos documentados para mostrar.'||host.textContent.includes('Todavía no hay modelos documentados disponibles en esta categoría.'))host.textContent='';
  host.parentNode.append(heading,intro,section);
 }else{host.classList.add('feler-v43-products');}
 const target=isBF?host:section;
 const drawings={
 juguetes:'<rect x="18" y="34" width="27" height="27" rx="4"/><rect x="55" y="34" width="27" height="27" rx="4"/><rect x="36" y="12" width="28" height="22" rx="4"/><path d="M31 61v18h38V61M29 45h6m30 0h6"/>',
 belleza:'<path d="M37 20h26v15H37zM33 35h34v48H33zM43 13h14M40 55h20M40 64h20"/>',
 cocina:'<rect x="18" y="34" width="64" height="48" rx="10"/><path d="M25 34V24h50v10M34 20h32M18 48h64"/><circle cx="50" cy="65" r="9"/>',
 tecnologia:'<rect x="24" y="13" width="52" height="74" rx="10"/><rect x="30" y="22" width="40" height="52" rx="3"/><circle cx="50" cy="80" r="2"/>',
 hogar:'<path d="M16 49 50 19l34 30v35H16zM38 84V58h24v26M26 47h10m28 0h10"/>',
 ninos:'<circle cx="50" cy="31" r="14"/><path d="M25 84V65q0-19 25-19t25 19v19M30 63h40"/>',
 oficina:'<rect x="19" y="30" width="62" height="48" rx="5"/><path d="M27 40h46M32 78v10m36-10v10M37 21h26v9"/>',
 default:'<rect x="24" y="18" width="52" height="64" rx="12"/><circle cx="50" cy="45" r="13"/><path d="M37 70h26"/>'
 };
 const ns='http://www.w3.org/2000/svg';
 for(const p of selected){
  if(existing.has(p.asin))continue;existing.add(p.asin);
  const card=document.createElement('article');card.className='v28-tile feler-product-card feler-v37-card feler-v43-card';
  const number=document.createElement('span');number.className='feler-v41-number';number.textContent=String(p.numero);number.setAttribute('aria-label','Producto '+p.numero);
  const visual=document.createElement('div');visual.className='feler-v37-visual';visual.setAttribute('role','img');visual.setAttribute('aria-label','Ilustración orientativa de '+p.nombre);
  const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('aria-hidden','true');svg.innerHTML=drawings[p.categorias[0]]||drawings.default;visual.append(svg);
  const heading=document.createElement('h3');heading.className='feler-v37-name';const link=document.createElement('a');link.href=p.url;link.target='_blank';link.rel='sponsored noopener noreferrer';link.textContent=p.nombre;heading.append(link);
  const note=document.createElement('p');note.className='feler-v37-note';note.textContent='Enlace de afiliado. Comprueba precio, variante y disponibilidad en Amazon.ca.';
  card.append(number,visual,heading,note);
  if(window.FelerFavoritos?.button){
   try{card.append(window.FelerFavoritos.button({categoria:p.categorias[0],id:p.asin,nombre:p.nombre,etiqueta:'Selección Black Friday de FELER'}));}catch(e){console.warn('No se pudo activar favorito',p.asin,e);}
  }
  target.append(card);
 }
 if(isBF){const counter=document.getElementById('feler-bf-count');if(counter)counter.textContent=target.children.length+' productos';}
})();