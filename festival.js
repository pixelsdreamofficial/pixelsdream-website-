/* Pixels Dream – festival greeting (Diwali 2026).
   Shows a slim banner on every page and a one-time greeting card on the home page.
   Switches itself off automatically after END. To remove early, delete the
   <script src="festival.js"> line or set ON=false. */
(function(){
  var ON=true, END=new Date("2026-11-17T00:00:00+05:30");
  if(!ON||new Date()>=END)return;
  var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  var css=document.createElement("style");
  css.textContent=
  ".fx-bar{position:relative;z-index:51;background:linear-gradient(90deg,#3b1530,#5a1d3f 50%,#3b1530);color:#fbe7c4;text-align:center;font:600 15px/1.35 var(--sans,'Figtree',sans-serif);padding:9px 44px 9px 14px;overflow:hidden}"+
  ".fx-bar b{color:#f6c46a;font-family:var(--serif,'Bodoni Moda',serif);font-weight:400;font-size:18px;letter-spacing:.01em}"+
  ".fx-bar .dy{display:inline-block;width:22px;height:16px;vertical-align:-2px;margin:0 6px}"+
  ".fx-bar button{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:0;color:#fbe7c4;font-size:22px;line-height:1;cursor:pointer;padding:10px 12px}"+
  ".fx-wrap{position:fixed;inset:0;z-index:210;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(20,8,16,.66);opacity:0;transition:opacity .4s}"+
  ".fx-wrap.on{opacity:1}"+
  ".fx-card{position:relative;width:100%;max-width:440px;border-radius:26px;overflow:hidden;text-align:center;color:#fbe7c4;background:radial-gradient(120% 80% at 50% 100%,#7a2a2a 0%,#3b1530 55%,#1e0b17 100%);box-shadow:0 30px 80px rgba(0,0,0,.5);padding:34px 26px 28px}"+
  ".fx-card h2{font-family:var(--serif,'Bodoni Moda',serif);font-weight:400;font-size:46px;line-height:1;color:#f6c46a;margin:6px 0 10px}"+
  ".fx-card p{font:400 16.5px/1.55 var(--sans,'Figtree',sans-serif);color:#f3d9c4;margin:0 auto;max-width:30em}"+
  ".fx-card .sig{margin-top:16px;font:600 14px var(--sans,'Figtree',sans-serif);letter-spacing:.14em;text-transform:uppercase;color:#d9a8a0}"+
  ".fx-card .x{position:absolute;top:8px;right:12px;background:none;border:0;color:#fbe7c4;font-size:32px;line-height:1;cursor:pointer;padding:10px 12px}"+
  ".fx-card .go{display:inline-block;margin-top:20px;background:#f6c46a;color:#3b1530;font:600 16px var(--sans,'Figtree',sans-serif);padding:13px 26px;border-radius:999px;text-decoration:none}"+
  ".fx-diyas{display:flex;justify-content:center;gap:18px;margin-bottom:6px}"+
  ".fx-diyas svg{width:62px;height:56px;overflow:visible}"+
  ".fx-diyas svg:nth-child(2){width:78px;height:70px;margin-top:-10px}"+
  ".fx-sp{position:absolute;width:4px;height:4px;border-radius:50%;background:#ffd98a;box-shadow:0 0 8px 2px rgba(255,200,110,.8);opacity:0;pointer-events:none}"+
  "@keyframes fxFl{0%,100%{transform:scale(1,1) skewX(0)}30%{transform:scale(.92,1.08) skewX(-3deg)}60%{transform:scale(1.05,.95) skewX(3deg)}}"+
  "@keyframes fxUp{0%{opacity:0;transform:translateY(0)}15%{opacity:1}100%{opacity:0;transform:translateY(-140px)}}"+
  ".fx-fl{transform-origin:50% 100%;animation:fxFl 1.4s ease-in-out infinite}"+
  "@media (prefers-reduced-motion:reduce){.fx-fl{animation:none}.fx-sp{display:none}}";
  document.head.appendChild(css);

  function diya(id){
    return '<svg viewBox="0 0 80 72" aria-hidden="true"><defs>'+
      '<radialGradient id="g'+id+'" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#fff6c8"/><stop offset=".45" stop-color="#ffc24a"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="b'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e98a3a"/><stop offset="1" stop-color="#9a3f1c"/></linearGradient></defs>'+
      '<ellipse cx="40" cy="30" rx="26" ry="26" fill="url(#g'+id+')" opacity=".55"/>'+
      '<g class="fx-fl"><path d="M40 8c6 10 9 16 9 22a9 9 0 0 1-18 0c0-6 3-12 9-22z" fill="#ffb02e"/><path d="M40 18c3 6 5 9 5 13a5 5 0 0 1-10 0c0-4 2-7 5-13z" fill="#fff3b0"/></g>'+
      '<path d="M6 44c8 14 60 14 68 0-4 18-64 18-68 0z" fill="url(#b'+id+')"/>'+
      '<path d="M6 44c10 6 58 6 68 0" fill="none" stroke="#f6c46a" stroke-width="2"/>'+
      '<path d="M18 52h44" stroke="#f6c46a" stroke-width="1.5" stroke-dasharray="2 4" opacity=".8"/></svg>';
  }
  var MSG="Hi Pixels Dream! Happy Diwali! I'd like to know about your shoots.";
  var WA="https://wa.me/919035454533?text="+encodeURIComponent(MSG);

  // banner on every page
  var shut=false;try{shut=sessionStorage.getItem("fx-bar")==="1";}catch(e){}
  if(!shut){
    var bar=document.createElement("div");bar.className="fx-bar";bar.setAttribute("role","note");
    bar.innerHTML='<span class="dy">'+diya("s").replace('viewBox','width="22" height="16" viewBox')+'</span><b>Happy Diwali!</b> Wishing your family light, love and beautiful memories. <span class="dy">'+diya("t").replace('viewBox','width="22" height="16" viewBox')+'</span><button type="button" aria-label="Close Diwali greeting">×</button>';
    bar.querySelector("button").onclick=function(){bar.remove();try{sessionStorage.setItem("fx-bar","1");}catch(e){}};
    document.body.insertBefore(bar,document.body.firstChild);
  }

  // greeting card, home page only, once per browser
  var home=/^\/(index\.html)?$/.test(location.pathname);
  var seen=false;try{seen=localStorage.getItem("fx-diwali-2026")==="1";}catch(e){}
  if(!home||seen)return;
  setTimeout(function(){
    var w=document.createElement("div");w.className="fx-wrap";w.setAttribute("role","dialog");w.setAttribute("aria-modal","true");w.setAttribute("aria-label","Happy Diwali");
    w.innerHTML='<div class="fx-card"><button class="x" type="button" aria-label="Close">×</button>'+
      '<div class="fx-diyas">'+diya("a")+diya("b")+diya("c")+'</div>'+
      '<h2>Happy Diwali</h2>'+
      '<p>May the glow of every diya fill your home with joy, health and togetherness. Thank you for letting us be a part of your family\'s most precious moments.</p>'+
      '<div class="sig">With love, Team Pixels Dream</div>'+
      '<a class="go" href="'+WA+'" target="_blank" rel="noopener">Send us your wishes</a></div>';
    document.body.appendChild(w);
    requestAnimationFrame(function(){w.classList.add("on");});
    function close(){w.classList.remove("on");setTimeout(function(){w.remove();},400);try{localStorage.setItem("fx-diwali-2026","1");}catch(e){}document.removeEventListener("keydown",esc);}
    function esc(e){if(e.key==="Escape")close();}
    w.querySelector(".x").onclick=close;w.addEventListener("click",function(e){if(e.target===w)close();});document.addEventListener("keydown",esc);
    if(!reduce){var card=w.querySelector(".fx-card");
      for(var i=0;i<18;i++){var s=document.createElement("span");s.className="fx-sp";s.style.left=(8+Math.random()*84)+"%";s.style.top=(55+Math.random()*40)+"%";
        s.style.animation="fxUp "+(2.4+Math.random()*2.4)+"s ease-out "+(Math.random()*3)+"s infinite";card.appendChild(s);}}
  },900);
})();
