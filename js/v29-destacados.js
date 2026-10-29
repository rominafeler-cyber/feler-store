document.addEventListener('DOMContentLoaded',()=>{
 const host=document.getElementById('feler-weekly-products');if(!host)return;
 const items=Array.isArray(window.FELER_DESTACADOS_SEMANA)?window.FELER_DESTACADOS_SEMANA:[];
 const valid=items.filter(p=>p&&p.activo!==false&&(/^[A-Z0-9]{10}$/i.test(p.asin||'')||(typeof p.busquedaAmazon==='string'&&p.busquedaAmazon.trim().length>3))&&typeof p.nombre==='string'&&p.nombre.trim());
 if(!valid.length){const el=document.createElement('p');el.className='feler-weekly-empty';el.textContent='Estamos preparando nuestra próxima selección de productos. Mientras tanto, explora el catálogo por categoría.';host.append(el);return;}
 for(const p of valid){
  const card=document.createElement('article');card.className='v28-tile feler-product-card';
  const visual=document.createElement('div');visual.className='catalog-visual';visual.setAttribute('role','img');visual.setAttribute('aria-label','Foto pendiente de autorización');
  const label=document.createElement('p');label.className='feler-weekly-label';label.textContent=p.motivo||'Selección de Feler';
  const h=document.createElement('h3');const a=document.createElement('a');a.href=p.asin?'https://www.amazon.ca/dp/'+encodeURIComponent(p.asin.toUpperCase())+'?tag=felerstore-20':'https://www.amazon.ca/s?k='+encodeURIComponent(p.busquedaAmazon)+'&tag=felerstore-20';a.target='_blank';a.rel='sponsored noopener noreferrer';a.textContent=p.nombre;h.append(a);
  const note=document.createElement('p');note.className='v28-quiet';note.textContent='Enlace de afiliado. Consulta la disponibilidad, el precio y la variante en Amazon.ca.';
  card.append(visual,label,h,note);
  if(p.asin&&window.FelerFavoritos&&['ninos','belleza','aspiradoras'].includes(p.categoria)){const fav=window.FelerFavoritos.button({categoria:p.categoria,id:p.asin,nombre:p.nombre,etiqueta:p.motivo||'Selección de Feler'});if(fav)card.append(fav);}
  host.append(card);
 }
});
