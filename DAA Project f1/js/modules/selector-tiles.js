// js/modules/selector-tiles.js
/* Selector redesign: request tiles + animated pipeline */
SEL.forEach((s,i)=>{const b=document.createElement('button');b.className='qt';b.dataset.i=i;b.innerHTML=`<i>${s.go?s.go.replace(/\D/g,''):i+1}</i><span>${s.q}</span>`;b.onclick=()=>{$('#sq').value=i;$('#sq').onchange()};$('#selq').appendChild(b)});
const _sr=selR;selR=function(){_sr();$$('#selq .qt').forEach((b,i)=>b.classList.toggle('on',i==+$('#sq').value));['#ss1','#ss2','#ss3'].forEach(q=>{const e=$(q);e.style.animation='none';void e.offsetWidth;e.style.animation=''});const s=SEL[+$('#sq').value];$('#cndw').firstChild.dataset.l=s.o?'1':''};selR();
