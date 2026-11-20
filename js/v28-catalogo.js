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
  // V47: unir el catálogo histórico con las novedades de Black Friday.
  // Se mantiene la representación original y se añaden los productos nuevos.
  const fresh=(window.FELER_CATALOGO_CENTRAL?.nuevos||[]).filter(p=>
    filter===null || (p.categorias||[]).includes(filter) ||
    (filter==='aspiradoras' && (p.categorias||[]).includes('hogar'))
  ).sort((a,b)=>b.numero-a.numero);
  const legacyAsins=new Set([...host.querySelectorAll('a[href]')].map(a=>
    (a.href.match(/\/dp\/([A-Z0-9]{10})/i)||[])[1]
  ).filter(Boolean));
  const freshSection=document.createElement('section');
  freshSection.className='feler-v47-new-products';
  const freshGrid=document.createElement('div');
  freshGrid.className='v28-grid feler-v37-grid feler-v43-products';
  const illustrations={
    ninos:'🧸',juguetes:'🧩',belleza:'✨',tecnologia:'💻',
    hogar:'🏠',cocina:'🍳',oficina:'🗂️',auto:'🚗',mascotas:'🐾',fiesta:'🎉'
  };
  let added=0;
  for(const item of fresh){
    if(legacyAsins.has(item.asin))continue;
    legacyAsins.add(item.asin);
    const card=document.createElement('article');
    card.className='v28-tile feler-product-card feler-v37-card feler-v43-card';
    const num=document.createElement('span');num.className='feler-v41-number';num.textContent=String(item.numero);
    const visual=document.createElement('div');visual.className='feler-v37-visual';
    visual.setAttribute('role','img');visual.setAttribute('aria-label','Ilustración orientativa');
    visual.textContent=illustrations[item.categorias[0]]||'📦';
    visual.style.fontSize='3rem';
    const title=document.createElement('h3');title.className='feler-v37-name';
    const link=document.createElement('a');link.href=item.url;link.target='_blank';
    link.rel='sponsored noopener noreferrer';link.textContent=item.nombre;title.append(link);
    const note=document.createElement('p');note.className='feler-v37-note';
    note.textContent='Enlace de afiliado. Comprueba precio, variante y disponibilidad en Amazon.ca.';
    card.append(num,visual,title,note);
    if(window.FelerFavoritos?.button){
      try{card.append(window.FelerFavoritos.button({categoria:item.categorias[0],id:item.asin,nombre:item.nombre,etiqueta:'Catálogo FELER'}));}catch(e){console.warn(e)}
    }
    freshGrid.append(card);added++;
  }
  if(added){
    const heading=document.createElement('h3');heading.className='feler-v43-section-title';
    heading.textContent='Nuevos productos FELER ('+added+')';
    freshSection.append(heading,freshGrid);
    host.parentNode.insertBefore(freshSection,host);
  }
  if(!count && !added && filter===null){host.textContent='No hay modelos documentados para mostrar.';}

  const legacyHeading=document.querySelector('.feler-v44-legacy-title');
  if(legacyHeading)legacyHeading.hidden=count===0;
});
