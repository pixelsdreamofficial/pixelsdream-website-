/* Style / theme card with a swipeable photo strip.
   PDCard(container, item, opts) -> {el, setOn(bool), setBadge(text)}
   item: {name, photos:[...]}; opts: {src(p), meta, onToggle(), onOpen(index)} */
window.PDCard=function(container,item,o){
  var tick='<svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
  var el=document.createElement('div');el.className='st';el.setAttribute('role','group');el.setAttribute('aria-label',item.name);
  var photos=item.photos.slice();if(item.cover&&photos.indexOf(item.cover)>0){photos.splice(photos.indexOf(item.cover),1);photos.unshift(item.cover);}
  var n=photos.length;
  el.innerHTML=
    '<div class="st-media"><div class="st-pics"></div>'+
    '<span class="badge"></span>'+
    '<button type="button" class="tick" aria-label="Add '+item.name+'" aria-pressed="false">'+tick+'</button>'+
    (n>1?'<button type="button" class="st-arw st-prev" aria-label="Previous photo">‹</button><button type="button" class="st-arw st-next" aria-label="Next photo">›</button>':'')+
    '<span class="st-count">1 / '+n+'</span></div>'+
    '<div class="st-body"><div><h3>'+item.name+'</h3><p>'+o.meta+'</p></div>'+
    '<button type="button" class="st-add" aria-pressed="false">Add</button></div>'+
    '<button type="button" class="st-all">See all '+n+' photos</button>';
  var strip=el.querySelector('.st-pics'),count=el.querySelector('.st-count');
  photos.forEach(function(p,i){
    var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','View '+item.name+' photo '+(i+1)+' of '+n);
    var im=document.createElement('img');im.src=o.src(p);im.alt='';im.loading=i<2?'eager':'lazy';im.decoding='async';b.appendChild(im);
    b.onclick=function(){o.onOpen(item.photos.indexOf(p));};strip.appendChild(b);
  });
  function at(){return Math.round(strip.scrollLeft/strip.clientWidth);}
  strip.addEventListener('scroll',function(){count.textContent=(at()+1)+' / '+n;},{passive:true});
  function go(d){var i=Math.max(0,Math.min(n-1,at()+d));strip.scrollTo({left:i*strip.clientWidth,behavior:'smooth'});}
  if(n>1){el.querySelector('.st-prev').onclick=function(){go(-1);};el.querySelector('.st-next').onclick=function(){go(1);};}
  el.querySelector('.tick').onclick=o.onToggle;
  el.querySelector('.st-add').onclick=o.onToggle;
  el.querySelector('.st-all').onclick=function(){o.onOpen(item.photos.indexOf(photos[at()]));};
  container.appendChild(el);
  return {el:el,
    setOn:function(on){el.classList.toggle('on',on);el.querySelector('.tick').setAttribute('aria-pressed',on);var a=el.querySelector('.st-add');a.setAttribute('aria-pressed',on);a.textContent=on?'Added ✓':'Add';},
    setBadge:function(t){el.querySelector('.badge').textContent=t||'';}};
};
