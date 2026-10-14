// js/core/intro.js
/* ---- intro: pressure title + dot grid + splash ---- */
const T='Algorithm 2035';{let ci=0;$('#it').innerHTML=T.split(' ').map(w=>{const s=[...w].map(c=>{const i=ci++;return `<span class="ch${i>8?' d':''}" style="animation-delay:${.1+i*.05}s">${c}</span>`}).join('');ci++;return `<span style="display:inline-block;white-space:nowrap">${s}</span>`}).join(' ')}
$('#igrid').innerHTML='<i></i>'.repeat(32*14);anime({targets:'#igrid i',scale:[1,.25],opacity:[1,.3],delay:anime.stagger(55,{grid:[32,14],from:'center'}),duration:1000,easing:'easeInOutSine',loop:true,direction:'alternate'});
const ch=$$('#it .ch'),cur=ch.map(()=>({w:600,d:100}));let px=-1e4,py=-1e4,raf=0;
function pf(){raf=0;let mv=false;ch.forEach((c,k)=>{const r=c.getBoundingClientRect(),d=Math.hypot(px-r.left-r.width/2,py-r.top-r.height/2),f=cl(1-d/260),e=f*f*(3-2*f),tw=600+e*350,td=100+e*25;
 cur[k].w+=(tw-cur[k].w)*.25;cur[k].d+=(td-cur[k].d)*.25;if(Math.abs(tw-cur[k].w)>.5)mv=true;c.style.fontVariationSettings=`"wght" ${cur[k].w|0},"wdth" ${cur[k].d.toFixed(1)},"opsz" 144`});if(mv)raf=requestAnimationFrame(pf)}
addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;if(motion&&!raf)raf=requestAnimationFrame(pf)});
function enter(){const i=$('#intro');if(i.classList.contains('leaving'))return;const b=$('#enter').getBoundingClientRect(),r=document.createElement('div');r.className='rip';r.style.left=b.left+b.width/2+'px';r.style.top=b.top+b.height/2+'px';document.body.appendChild(r);i.classList.add('leaving');setTimeout(()=>{i.style.display='none';r.remove()},800)}
$('#enter').onclick=enter;addEventListener('keydown',e=>e.key=='Enter'&&$('#intro').style.display!='none'&&enter());
if(location.hash&&location.hash!='#/home')$('#intro').style.display='none';
$('#mt').onclick=()=>{motion=!motion;document.body.classList.toggle('nomo',!motion)};
