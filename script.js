(function(){
  var works=window.WORKS||[], lb=document.getElementById('lightbox');
  var img=document.getElementById('lb-img'), t=document.getElementById('lb-title'),
      cap=document.getElementById('lb-caption'), med=document.getElementById('lb-medium'),
      th=document.getElementById('lb-thumbs');
  var cur=0, sub=0, lastFocus=null;
  function show(i,s){
    cur=(i+works.length)%works.length; sub=s||0; var w=works[cur];
    img.src='images-large/'+w.images[sub]; img.alt=w.title+(w.images.length>1?' (image '+(sub+1)+' of '+w.images.length+')':'');
    t.textContent=w.title; cap.textContent=w.caption; med.textContent=w.medium;
    th.innerHTML='';
    if(w.images.length>1){w.images.forEach(function(f,k){
      var b=document.createElement('button'); b.setAttribute('aria-label','Show image '+(k+1));
      if(k===sub) b.setAttribute('aria-current','true');
      b.innerHTML='<img src="images-thumbs/'+f+'" alt="">'; b.onclick=function(){show(cur,k)}; th.appendChild(b);});}
    history.replaceState(null,'','#'+w.slug);
  }
  function open(i){lastFocus=document.activeElement; lb.hidden=false; document.body.classList.add('lb-open'); show(i); lb.querySelector('.lb-close').focus();}
  function close(){lb.hidden=true; document.body.classList.remove('lb-open'); history.replaceState(null,'',location.pathname); if(lastFocus) lastFocus.focus();}
  document.querySelectorAll('.work').forEach(function(b){b.addEventListener('click',function(){open(+b.dataset.index)})});
  lb.querySelector('.lb-close').onclick=close;
  lb.querySelector('.lb-prev').onclick=function(){show(cur-1)};
  lb.querySelector('.lb-next').onclick=function(){show(cur+1)};
  lb.addEventListener('click',function(e){if(e.target===lb) close();});
  document.addEventListener('keydown',function(e){ if(lb.hidden) return;
    if(e.key==='Escape') close(); else if(e.key==='ArrowRight') show(cur+1); else if(e.key==='ArrowLeft') show(cur-1);});
  var x0=null; lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){ if(x0===null) return; var dx=e.changedTouches[0].clientX-x0;
    if(Math.abs(dx)>50) show(dx<0?cur+1:cur-1); x0=null;},{passive:true});
  if(location.hash){var h=location.hash.slice(1); for(var i=0;i<works.length;i++){ if(works[i].slug===h){open(i);break;} }}
})();
