document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('v28-catalog');
  if(!host)return;
  const data=window.FELER_CATALOGO_NUEVO||{};
  const labels={ninos:'Ropa interior infantil',belleza:'Belleza · Uñas',aspiradoras:'Hogar · Aspiradoras'};
  const filter=new URLSearchParams(location.search).get('categoria');
  const selected=Object.prototype.hasOwnProperty.call(labels,filter)?filter:null;
  const status=document.getElementById('v28-filter-status');
  const all=document.getElementById('v28-show-all');
  if(selected){
    status.textContent='Mostrando únicamente el catálogo de '+labels[selected]+'.';
    all.style.display='inline';
  }
  const keys=selected?[selected]:['ninos','belleza','aspiradoras'];
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
  if(!count){host.textContent=selected?'Todavía no hay modelos documentados disponibles en esta categoría.':'No hay modelos documentados para mostrar.';}
});
