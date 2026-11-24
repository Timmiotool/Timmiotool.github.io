(function(){
  var KEY='lumen-lang';
  function get(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function put(v){ try{ localStorage.setItem(KEY,v); }catch(e){} }
  var els=[].slice.call(document.querySelectorAll('[data-en]'));
  els.forEach(function(e){ e.setAttribute('data-de',e.innerHTML); });
  function setLang(l){
    document.documentElement.lang=l;
    els.forEach(function(e){ e.innerHTML=e.getAttribute('data-'+l); });
    [].forEach.call(document.querySelectorAll('.lang button'),function(b){ b.classList.toggle('on',b.dataset.l===l); });
    var t=document.querySelector('.tab.on'); if(t){ showTab(t); }
    var pt=document.body.getAttribute('data-title-'+l); document.title=pt||(l==='en'?'Lumen – the Kodi skin':'Lumen – der Skin für Kodi');
    put(l);
  }
  var start=get()||((navigator.language||'de').toLowerCase().indexOf('de')===0?'de':'en');
  [].forEach.call(document.querySelectorAll('.lang button'),function(b){ b.addEventListener('click',function(){ setLang(b.dataset.l); }); });
  /* tabs */
  function showTab(btn){
    var box=btn.closest('[data-tabs]'); if(!box) return;
    [].forEach.call(box.querySelectorAll('.tab'),function(x){ x.classList.remove('on'); }); btn.classList.add('on');
    var img=box.querySelector('.stage img'); img.src=btn.dataset.img; img.alt=btn.textContent;
    var l=document.documentElement.lang==='en'?'en':'de'; box.querySelector('.cap').textContent=(l==='en'?btn.dataset.cen:btn.dataset.cde)||'';
  }
  [].forEach.call(document.querySelectorAll('.tab'),function(b){ b.addEventListener('click',function(){ showTab(b); }); });
  /* lightbox */
  var lb=document.createElement('div'); lb.className='lb'; lb.innerHTML='<img alt="">'; document.body.appendChild(lb);
  lb.addEventListener('click',function(){ lb.classList.remove('on'); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') lb.classList.remove('on'); });
  document.addEventListener('click',function(e){ var i=e.target; if(i.tagName==='IMG'&&(i.closest('.gal')||i.closest('.stage'))){ lb.querySelector('img').src=i.src; lb.classList.add('on'); } });
  /* nav */
  var bg=document.querySelector('.burger'),links=document.querySelector('.links');
  if(bg){ bg.addEventListener('click',function(){ links.classList.toggle('open'); }); links.addEventListener('click',function(){ links.classList.remove('open'); }); }
  /* reveal */
  var rv=[].slice.call(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window && location.search.indexOf('static')<0){ var io=new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target); } }); },{threshold:.12}); rv.forEach(function(r){ io.observe(r); }); } else { rv.forEach(function(r){ r.classList.add('in'); }); }
  /* hero video: no autoplay with reduced motion; pause when not visible */
  var hv=document.querySelector('.herovid');
  if(hv){
    var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(rm){ hv.removeAttribute('autoplay'); hv.pause(); }
    else if('IntersectionObserver' in window){ new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ var p=hv.play(); if(p&&p.catch){ p.catch(function(){}); } } else { hv.pause(); } }); },{threshold:.15}).observe(hv); }
  }
  setLang(start);
})();
