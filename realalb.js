/* Plays album videos only while they are on screen. */
(function(){
  var vids=[].slice.call(document.querySelectorAll('.ra-vids video'));
  if(!vids.length)return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function load(v){if(!v.src&&v.dataset.src){v.src=v.dataset.src;}}
  if(!('IntersectionObserver' in window)){vids.forEach(function(v){load(v);v.controls=true;});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;
    if(e.isIntersecting){load(v);if(!reduce){var p=v.play();if(p&&p.catch)p.catch(function(){v.controls=true;});}else v.controls=true;}
    else if(!v.paused)v.pause();});},{threshold:.35});
  vids.forEach(function(v){io.observe(v);});
})();
