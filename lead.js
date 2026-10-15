/* Pixels Dream – "Request a call back" popup.
   Opens once per visit after 12 seconds or half-way down the page, and from any
   element with data-callback. Submits to lead.php (runs on Hostinger). */
(function(){
  var SHOOTS=["Maternity","Newborn","Baby shoot / cake smash","Family","Birthday party","Other event"];
  var page=location.pathname;
  var guess=/maternity/.test(page)?0:/newborn/.test(page)?1:/baby/.test(page)?2:/family/.test(page)?3:/birthday/.test(page)?4:/events/.test(page)?5:-1;

  var css=document.createElement('style');
  css.textContent=
  '.cb-wrap{position:fixed;inset:0;z-index:200;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(36,16,30,.55)}'+
  '.cb-wrap.open{display:flex}'+
  '.cb{position:relative;width:100%;max-width:440px;background:var(--rose,#f9ece9);color:var(--ink,#24101e);border-radius:24px;padding:28px 24px 24px;box-shadow:0 20px 60px rgba(36,16,30,.35);max-height:calc(100vh - 32px);overflow:auto}'+
  '.cb h2{font-family:"Rozha One",serif;font-weight:400;font-size:32px;line-height:1.05;color:var(--plum,#3b1530);padding-right:28px}'+
  '.cb p.s{color:var(--muted,#6e5466);margin:8px 0 18px;font-size:16px}'+
  '.cb label{display:block;font-weight:600;font-size:15px;margin:12px 0 6px}'+
  '.cb input,.cb select{width:100%;font:inherit;font-size:17px;padding:12px 14px;border-radius:12px;border:1.5px solid var(--rose2,#f1dcd8);background:#fff;color:inherit}'+
  '.cb input:focus,.cb select:focus{outline:none;border-color:var(--plum,#3b1530)}'+
  '.cb .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}@media (max-width:440px){.cb .row{grid-template-columns:1fr;gap:0}}'+
  '.cb .err{color:#a1262f;font-size:14px;margin-top:6px;min-height:1em}'+
  '.cb button[type=submit]{width:100%;margin-top:18px;min-height:52px;border:0;border-radius:999px;background:var(--plum,#3b1530);color:#fff;font:600 17px "Hind",sans-serif;cursor:pointer}'+
  '.cb button[type=submit][disabled]{opacity:.6}'+
  '.cb .x{position:absolute;top:10px;right:12px;background:none;border:0;font-size:34px;line-height:1;color:var(--plum,#3b1530);cursor:pointer;padding:4px 8px}'+
  '.cb .alt{text-align:center;margin-top:14px;font-size:15px;color:var(--muted,#6e5466)}'+
  '.cb .alt a{color:var(--wa,#1a9e55);font-weight:600}'+
  '.cb .hp{position:absolute;left:-9999px}'+
  '.cb .done{text-align:center;padding:10px 0}'+
  '.cb .done b{display:block;font-family:"Rozha One",serif;font-weight:400;font-size:30px;color:var(--plum,#3b1530);margin-bottom:6px}';
  document.head.appendChild(css);

  var wrap=document.createElement('div');wrap.className='cb-wrap';wrap.setAttribute('role','dialog');wrap.setAttribute('aria-modal','true');wrap.setAttribute('aria-labelledby','cbTitle');
  wrap.innerHTML=
   '<div class="cb"><button class="x" type="button" aria-label="Close">×</button>'+
   '<form novalidate>'+
   '<h2 id="cbTitle">Get a call back</h2><p class="s">Leave your number and we\'ll call you with prices and free dates.</p>'+
   '<label for="cbName">Your name</label><input id="cbName" name="name" autocomplete="name" required>'+
   '<label for="cbPhone">Mobile number</label><input id="cbPhone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="10-digit number" required>'+
   '<div class="row"><div><label for="cbShoot">Shoot</label><select id="cbShoot" name="shoot">'+SHOOTS.map(function(s,i){return '<option'+(i===guess?' selected':'')+'>'+s+'</option>';}).join('')+'</select></div>'+
   '<div><label for="cbDate">Preferred date</label><input id="cbDate" name="date" type="date"></div></div>'+
   '<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'+
   '<p class="err" id="cbErr" role="alert"></p>'+
   '<button type="submit">Call me back</button>'+
   '<p class="alt">In a hurry? <a href="https://wa.me/919035454533" target="_blank" rel="noopener">WhatsApp us now</a></p>'+
   '</form></div>';
  document.body.appendChild(wrap);

  var form=wrap.querySelector('form'),err=wrap.querySelector('#cbErr'),btn=form.querySelector('button[type=submit]'),last=null;
  function seen(){try{return sessionStorage.getItem('pdCb')==='1';}catch(e){return false;}}
  function open(){last=document.activeElement;wrap.classList.add('open');try{sessionStorage.setItem('pdCb','1');}catch(e){}setTimeout(function(){wrap.querySelector('#cbName').focus();},50);}
  function close(){wrap.classList.remove('open');if(last&&last.focus)last.focus();}
  wrap.querySelector('.x').onclick=close;
  wrap.addEventListener('click',function(e){if(e.target===wrap)close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&wrap.classList.contains('open'))close();});
  document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-callback]');if(t){e.preventDefault();open();}});

  /* automatic opening: once per visit, after 12s or half-way scroll */
  var timer;
  function auto(){if(seen()||wrap.classList.contains('open'))return;open();cleanup();}
  function onScroll(){var h=document.documentElement;if((h.scrollTop+innerHeight)/h.scrollHeight>.5)auto();}
  function cleanup(){clearTimeout(timer);removeEventListener('scroll',onScroll);}
  if(!seen()){timer=setTimeout(auto,12000);addEventListener('scroll',onScroll,{passive:true});}

  form.addEventListener('submit',function(e){
    e.preventDefault();err.textContent='';
    var name=form.name.value.trim(),phone=form.phone.value.replace(/\D/g,'').replace(/^(91|0)(?=\d{10}$)/,'');
    if(!name){err.textContent='Please enter your name.';form.name.focus();return;}
    if(!/^[6-9]\d{9}$/.test(phone)){err.textContent='Please enter a valid 10-digit mobile number.';form.phone.focus();return;}
    var shoot=form.shoot.value;btn.disabled=true;btn.textContent='Sending…';
    var data=new FormData(form);data.set('phone',phone);data.append('page',location.pathname);
    fetch('lead.php',{method:'POST',body:data}).then(function(r){return r.json();}).then(function(j){
      if(!j||!j.ok)throw 0;
      form.innerHTML='<div class="done"><b>Thank you, '+name.replace(/[<>&"]/g,'')+'!</b><p class="s">We\'ll call you on '+phone+' soon. Want to chat now? <a href="https://wa.me/919035454533" target="_blank" rel="noopener" style="color:var(--wa,#1a9e55);font-weight:600">WhatsApp us</a></p></div>';
      if(typeof gtag==='function')gtag('event','generate_lead',{shoot:shoot});
    }).catch(function(){
      btn.disabled=false;btn.textContent='Call me back';
      err.innerHTML='Couldn\'t send right now. Please <a href="https://wa.me/919035454533?text='+encodeURIComponent('Hi Pixels Dream, please call me back. Name: '+name+', Phone: '+phone)+'" target="_blank" rel="noopener">send it on WhatsApp</a> instead.';
    });
  });
})();
