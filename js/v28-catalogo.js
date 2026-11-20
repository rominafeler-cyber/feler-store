document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('v28-catalog');
  if(!host)return;
  const data=window.FELER_CATALOGO_NUEVO||{};
  const labels={ninos:'Ropa interior infantil',belleza:'Belleza · Uñas',aspiradoras:'Hogar · Aspiradoras'};
  const filter=new URLSearchParams(location.search).get('categoria');
  const selected=filter==='hogar'?'aspiradoras':(Object.prototype.hasOwnProperty.call(labels,filter)?filter:null);
  const status=document.getElementById('v28-filter-status');
  const all=document.getElementById('v28-show-all');
  if(selected){
    if(status)status.textContent='Mostrando productos originales de '+labels[selected]+'.';
    if(all)all.style.display='inline';
  }
  const keys=selected?[selected]:(filter===null?['ninos','belleza','aspiradoras']:[]);
  let count=0;
  for(const key of keys){
    const seen=new Set();
    const entries=key==='aspiradoras'?(window.FELER_PRODUCTOS_CA||window.PRODUCTOS_CA||[]):(data[key]||[]);
    for(const p of entries){
      const id=p.familia||p.asin||p.amazonCa?.asin||p.id||p.nombre||p.titulo||p.modelo;
      if(!id||seen.has(id))continue;
      seen.add(id);
      const card=document.createElement('article');card.className='v28-tile feler-product-card';
      const h=document.createElement('h2');
      const productName=p.nombre||p.titulo||([p.marca,p.modelo].filter(Boolean).join(' · '))||p.modelo||id;
      const asin=p.amazonCa?.asin||p.asin;
      // Enlaces de Amazon.ca con la etiqueta de asociado de Feler. No enlazar sin ASIN válido.
      if(typeof asin==='string' && /^[A-Z0-9]{10}$/i.test(asin)){
        const productLink=document.createElement('a');
        productLink.href='https://www.amazon.ca/dp/'+encodeURIComponent(asin)+'?tag=felerstore-20';
        productLink.textContent=productName;
        productLink.target='_blank';
        productLink.rel='sponsored noopener noreferrer';
        productLink.className='feler-product-title-link';
        productLink.setAttribute('aria-label',productName+' — Ver en Amazon.ca (enlace de afiliado)');
        h.append(productLink);
      }else{
        h.textContent=productName;
      }
      const t=document.createElement('p');t.textContent=key==='aspiradoras' ? labels[key]+' · '+(p.estado==='pendiente_verificacion_amazon_ca'?'Ficha Amazon.ca pendiente de verificación':'Comprueba características y disponibilidad en Amazon.ca') : labels[key]+' · Modelo del catálogo (comprueba talla, variante y disponibilidad)';
      const a=document.createElement('a');a.className='v28-btn';a.href='buscar-v28.html?categoria='+key;a.textContent='Personalizar recomendación →';
      const visual=document.createElement('div');visual.className='catalog-visual';visual.setAttribute('role','img');visual.setAttribute('aria-label','Espacio reservado para fotografía verificada del producto');
      const fav=window.FelerFavoritos?.button({categoria:key,id:String(id),nombre:h.textContent,etiqueta:t.textContent});
      card.append(visual,h,t,a);if(fav)card.append(fav);host.append(card);count++;
    }
  }
  // V48: catálogo visual único; novedades primero, originales después.
  const fresh=(window.FELER_CATALOGO_CENTRAL?.nuevos||[]).filter(p=>
    filter===null || (p.categorias||[]).includes(filter) ||
    (filter==='aspiradoras' && (p.categorias||[]).includes('hogar'))
  ).sort((a,b)=>b.numero-a.numero);
  const legacyAsins=new Set([...host.querySelectorAll('a[href]')].map(a=>
    (a.href.match(/\/dp\/([A-Z0-9]{10})/i)||[])[1]
  ).filter(Boolean));
  const originals=Array.from(host.children);
  host.classList.add('feler-v43-products');
  host.classList.remove('v28-grid');
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
  let added=0;
  for(const item of fresh){
    if(legacyAsins.has(item.asin))continue;
    legacyAsins.add(item.asin);
    const card=document.createElement('article');
    card.className='v28-tile feler-product-card feler-v37-card feler-v43-card';
    const num=document.createElement('span');num.className='feler-v41-number';num.textContent=String(item.numero);
    const visual=document.createElement('div');visual.className='feler-v37-visual';
    visual.setAttribute('role','img');visual.setAttribute('aria-label','Ilustración de líneas orientativa de '+item.nombre);
    const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 100 100');
    svg.setAttribute('aria-hidden','true');svg.innerHTML=drawings[item.categorias[0]]||drawings.default;
    visual.append(svg);
    const title=document.createElement('h3');title.className='feler-v37-name';
    const link=document.createElement('a');link.href=item.url;link.target='_blank';
    link.rel='sponsored noopener noreferrer';link.textContent=item.nombre;title.append(link);
    const note=document.createElement('p');note.className='feler-v37-note';
    note.textContent='Enlace de afiliado. Comprueba precio, variante y disponibilidad en Amazon.ca.';
    card.append(num,visual,title,note);
    if(window.FelerFavoritos?.button){
      try{card.append(window.FelerFavoritos.button({categoria:item.categorias[0],id:item.asin,nombre:item.nombre,etiqueta:'Catálogo FELER'}));}
      catch(e){console.warn('Favorito no disponible',e)}
    }
    host.append(card);added++;
  }
  // Reinsertar productos históricos sin alterar sus enlaces, fichas ni favoritos.
  for(const card of originals)host.append(card);
  if(!count && !added && filter===null)host.textContent='No hay modelos documentados para mostrar.';
  const legacyHeading=document.querySelector('.feler-v44-legacy-title');
  if(legacyHeading){legacyHeading.textContent='Catálogo FELER ('+(count+added)+')';legacyHeading.hidden=(count+added)===0;}

});
