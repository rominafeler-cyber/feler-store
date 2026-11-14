/* FELER V41 — mejoras verificadas: favoritos para todas las categorías,
   ilustraciones asociadas al ASIN, orden estable y numeración. 
   Cargar después de v37-destacados.js y v28-favoritos.js. */
(() => {
 const shapes = {
    cushion: '<path d="M22 42q0-17 18-19h20q18 2 18 19v22q0 16-18 17H40q-18-1-18-17z"/><path d="M35 44q15-12 30 0M37 63q13 8 26 0"/><circle cx="50" cy="53" r="5"/>',
    protector: '<rect x="25" y="10" width="50" height="80" rx="10"/><rect x="31" y="17" width="38" height="66" rx="5"/><path d="M41 22h18M35 32l30 36"/>',
    dnaKit: '<rect x="19" y="34" width="62" height="48" rx="6"/><path d="M19 46h62M31 26h38M39 18h22"/><path d="M40 54c25 8-6 13 20 22M60 54c-25 8 6 13-20 22M43 60h14M43 69h14"/>',
    multicooker: '<rect x="16" y="37" width="68" height="46" rx="12"/><path d="M22 37v-8h56v8M36 24h28M16 51H9m75 0h7"/><rect x="36" y="54" width="28" height="17" rx="4"/><circle cx="50" cy="62" r="3"/>',
    robovac: '<circle cx="50" cy="50" r="32"/><circle cx="50" cy="50" r="15"/><circle cx="50" cy="50" r="5"/><path d="M29 72h42M39 18h22"/>',
    potty: '<path d="M20 61q-3-33 29-38 31-2 32 34v17H20z"/><ellipse cx="50" cy="58" rx="19" ry="11"/><path d="M30 74v9m40-9v9"/>',
    airfryer: '<rect x="22" y="18" width="56" height="65" rx="13"/><path d="M29 43h42v30H29zM40 61h20"/><circle cx="40" cy="32" r="3"/><circle cx="60" cy="32" r="3"/>',
    shower: '<path d="M28 32a22 22 0 0 1 44 0M22 37q28-20 56 0zM28 50l-5 9m19-9-5 9m19-9-5 9m19-9-5 9M28 69l-5 9m19-9-5 9m19-9-5 9m19-9-5 9"/>',
    wifi: '<rect x="18" y="42" width="64" height="39" rx="7"/><path d="M32 42V18m36 24V18M34 59q16-16 32 0M41 66q9-9 18 0"/><circle cx="50" cy="73" r="2"/>',
    locator: '<circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="11"/><path d="M50 20v9m0 42v9M20 50h9m42 0h9"/>',
    headphones: '<path d="M22 53V43a28 28 0 0 1 56 0v10"/><rect x="17" y="48" width="16" height="30" rx="7"/><rect x="67" y="48" width="16" height="30" rx="7"/>',
    mittens: '<path d="M25 75V46q-4-17 6-20 10-2 11 12V19q2-9 10-7 8 2 7 12v21q8-9 15-3 6 6 0 17L62 83H35z"/>',
    speaker: '<rect x="29" y="12" width="42" height="76" rx="9"/><circle cx="50" cy="57" r="17"/><circle cx="50" cy="27" r="5"/>',
    vacuum: '<path d="M20 70h40q17 0 17-15V30H60v25q0 6-8 6H20"/><circle cx="31" cy="78" r="7"/><circle cx="65" cy="78" r="7"/><path d="M65 30V13h13"/>',
    printer: '<rect x="23" y="32" width="54" height="40" rx="6"/><path d="M33 32V16h34v16M32 59h36v25H32z"/><circle cx="66" cy="43" r="2"/>',
    bottle: '<path d="M40 12h20v13l8 10v45q0 7-7 7H39q-7 0-7-7V35l8-10zM40 25h20M32 45h36"/>',
    camera: '<rect x="18" y="26" width="64" height="52" rx="13"/><circle cx="50" cy="52" r="17"/><circle cx="50" cy="52" r="6"/><path d="M37 26l6-10h14l6 10"/>',
    cleaner: '<rect x="25" y="23" width="50" height="62" rx="12"/><path d="M25 44h50M39 23v-9h22v9"/><circle cx="50" cy="63" r="11"/>',
    socks: '<path d="M30 14h23v32l22 16q7 7 0 15-6 8-17 3L24 66q-5-3-3-12zM30 25h23M26 56l20 12"/>',
    watch: '<rect x="32" y="29" width="36" height="43" rx="10"/><path d="M39 29V11h22v18M39 72v17h22V72"/><circle cx="50" cy="50" r="12"/><path d="M50 50l7-7m-7 7-6-4"/>',
    faucet: '<path d="M18 46h65V35q0-12-13-12H49v23M49 23V12M36 12h26M23 46v15h20V46M73 46v14M74 67v15"/>',
    gadget: '<rect x="28" y="16" width="44" height="69" rx="14"/><circle cx="50" cy="39" r="11"/><path d="M37 64h26M42 72h16"/>',
    pilates: '<circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="20"/><path d="M50 20v12m0 36v12M20 50h12m36 0h12"/>',
    heater: '<rect x="20" y="24" width="60" height="57" rx="10"/><path d="M31 38h38M31 48h38M31 58h38"/><circle cx="50" cy="70" r="4"/>',
    curtain: '<path d="M15 18h70M23 18v65q13-15 27 0 13-15 27 0V18M34 24v45M65 24v45"/>',
    car: '<path d="M17 59l10-24h46l10 24v19H17zM29 35l8-15h26l8 15"/><circle cx="32" cy="75" r="5"/><circle cx="68" cy="75" r="5"/>',
    analogWatch: '<path d="M37 12h26v18H37zM37 70h26v18H37z"/><circle cx="50" cy="50" r="22"/><path d="M50 50V35m0 15 11 7"/>',
    drink: '<path d="M29 28h42l-5 55H34zM24 28h52M40 19h20M50 19v-8"/><path d="M42 50q8-8 16 0"/>',
    generic: '<rect x="24" y="18" width="52" height="64" rx="12"/><circle cx="50" cy="45" r="13"/><path d="M37 70h26"/>'
  };
 const byAsin = {
    B074XCMJ7Z:'cushion', B0FDQLSR6Q:'protector', B01CUVPFZ6:'dnaKit', B0GGDQ2ZF8:'multicooker', B0DSP8J476:'robovac', B09NLQ7ZVG:'potty',
    B0DBN87GQJ:'airfryer', B0H49KMXBX:'wifi', B0H5QB3PJM:'locator', B0H6MD22YS:'headphones', B07WQX7QSL:'mittens', B0H9XL91GL:'speaker',
    B0H6LZ854Y:'vacuum', B0GMKRR64P:'printer', B0HHS7KZ4M:'headphones', B01NARPPT8:'bottle', B0HJZJT99J:'camera', B0GHNTRZP5:'cleaner',
    B0H7GL12N1:'generic', B0HHDYNZD5:'generic', B0D93D6PPK:'socks', B0HMZSFZGR:'speaker', B0HML6FMC2:'watch', B0H6JBF8YD:'faucet',
    B0H5574NRC:'gadget', B00AHR401G:'drink', B0H3YXWVQ9:'pilates', B0HMVQCJTK:'speaker', B0HKNBBB1V:'heater', B0CX3WMN1R:'socks',
    B0FPX7WGLL:'curtain', B0HKHV61X3:'car', B0H29N3RSC:'analogWatch', B0HMKXM5BT:'watch'
  };
 const init = () => {
   const host=document.getElementById('feler-weekly-products');
   const data=window.FELER_DESTACADOS_SEMANA;
   if(!host || !Array.isArray(data)) return;
   const valid=data.map((p,i)=>({p,i})).filter(({p})=>p&&p.activo!==false&&typeof p.nombre==='string'&&p.nombre.trim()&&(/^[A-Z0-9]{10}$/i.test(p.asin||'')||(typeof p.busquedaAmazon==='string'&&p.busquedaAmazon.trim().length>3)));
   const cards=[...host.querySelectorAll('.feler-product-card')];
   if(cards.length!==valid.length){console.warn('FELER V41: número de tarjetas inesperado; se cancela para evitar desajustes.');return;}
   const favorites=window.FelerFavoritos;
   if(!favorites || typeof favorites.button!=='function')console.warn('FELER V41: API de favoritos no disponible');
   const items=valid.map(({p,i},n)=>({p,i,card:cards[n]}));
   items.sort((a,b)=>(b.p.vigenteDesde||'').localeCompare(a.p.vigenteDesde||'')||a.i-b.i);
   items.forEach(({p,card},n)=>{
     const asin=/^[A-Z0-9]{10}$/i.test(p.asin||'')?p.asin.toUpperCase():null;
     const svg=card.querySelector('.feler-v37-visual svg');
     const kind=asin?byAsin[asin]:(p.busquedaAmazon||'').includes('AWP1775CH')?'shower':null;
     if(svg && kind)svg.innerHTML=shapes[kind]||shapes.generic;
     card.querySelectorAll('.feler-v40-number,.feler-v41-number').forEach(x=>x.remove());
     const number=document.createElement('span');number.className='feler-v41-number';number.textContent=String(n+1);number.setAttribute('aria-label','Producto '+(n+1));card.prepend(number);
     const existing=card.querySelector('.feler-card-favorite');
     if(!existing && favorites && typeof favorites.button==='function'){
       // Para el único artículo sin ASIN se utiliza un identificador estable de búsqueda.
       const id=asin||'search:'+p.busquedaAmazon;
       try{card.append(favorites.button({categoria:p.categoria,id,nombre:p.nombre,etiqueta:p.motivo||'Selección de Feler'}));}
       catch(err){console.warn('FELER V41: favorito no disponible para',p.nombre,err);}
     }
     host.append(card);
   });
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
