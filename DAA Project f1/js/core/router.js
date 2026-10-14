// js/core/router.js
/* ---- router + reveal ---- */
const PG=['home','m1','m2','m3','m4','m5','m6'];let kLit=0,qLit=0;
function split(el){if(el.dataset.s)return;el.dataset.s=1;let n=0;el.innerHTML=el.innerHTML.replace(/(<[^>]+>)|([^<\s]+)/g,(m,t,w)=>t||`<span class="sw"><i style="--i:${n++}">${w}</i></span>`)}
$$('h1.sp,h2').forEach(split);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);el.classList.add('in');setTimeout(()=>{el.style.transitionDelay='0ms';el.classList.add('done')},1500);
 if(el.dataset.n){const o={v:0};anime({targets:o,v:+el.dataset.n,round:1,duration:1600,easing:'easeOutExpo',update:()=>el.textContent=o.v})}}),{threshold:0,rootMargin:'20% 0px 20% 0px'});
const obs=()=>{$$('.reveal:not(.in)').forEach((el,i)=>{if(!el.style.transitionDelay)el.style.transitionDelay=(i%4)*75+'ms'});$$('.reveal:not(.in),h1.sp:not(.in),h2:not(.in),[data-n],canvas.st3:not(.in)').forEach(el=>io.observe(el))};
let fly=null,PXL=[];
function setPX(){const q=s=>'#p-'+page+' '+s;PXL=$$([q('.stat2'),q('.tile'),q('.cols4>.card'),q('.ph .display'),q('.ph .lede'),q('canvas.st3')].join(',')).map((el,i)=>({el,d:[.05,.09,.13,-.05][i%4]*(el.matches('canvas.st3')?.5:1),l:0}))}
function pxTick(){PXL.forEach(q=>{if(!motion){if(q.l){q.el.style.translate='';q.l=0}return}const r=q.el.getBoundingClientRect();if(r.bottom<-250||r.top>innerHeight+250||!r.height)return;const base=r.top+r.height/2-q.l,ty=(base-innerHeight/2)*q.d;q.el.style.translate='0 '+ty.toFixed(1)+'px';q.l=ty})}
/* camera fly-in between modules */
function route(){const h0=(location.hash||'#/home').slice(2),h=PG.includes(h0)?h0:'home';
 if(!motion||$('#intro').style.display!='none'||(h==page&&!fly)){doRoute();return}
 const ci={home:0,m1:0,m2:1,m3:5,m4:4,m5:3,m6:2}[h],c=cityPos(ci);
 fly={t0:performance.now(),sw:false,from:C.position.clone(),l0:new THREE.Vector3(W.position.x*.4,page=='home'?2:0,0),look:new THREE.Vector3(),cv:new THREE.Vector3(c.x,1.4,c.z),close:new THREE.Vector3(),end:null};
 const b=$('#bg');b.classList.add('flying');b.style.opacity='0'}
function doRoute(){let h=(location.hash||'#/home').slice(2);if(!PG.includes(h))h='home';page=h;PG.forEach(k=>$('#p-'+k).style.display=k==h?'block':'none');
 $$('.dest').forEach(d=>d.setAttribute('aria-current',d.dataset.go==h?'page':'false'));$('#bg').classList.toggle('off',h!='home');document.body.classList.toggle('mod',h!='home');scrollTo(0,0);setTimeout(()=>{obs();setPX()},40)}
addEventListener('hashchange',route);doRoute();
$('#dots').innerHTML='<i></i>'.repeat(120);anime({targets:'#dots i',scale:[1,.3],opacity:[1,.25],delay:anime.stagger(70,{grid:[24,5],from:'center'}),duration:900,easing:'easeInOutSine',loop:true,direction:'alternate'});
const FL=$('#fl'),FLEN=FL.getTotalLength();FL.style.strokeDasharray=FLEN;FL.style.strokeDashoffset=FLEN;
