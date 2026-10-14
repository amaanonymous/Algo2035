// js/scene/world.js
/* ---- 3D world: a new object for every page ---- */
const R=new THREE.WebGLRenderer({canvas:$('#bg'),alpha:true,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(50,1,.1,300),W=new THREE.Group();S.add(W);
const wire=c=>new THREE.MeshBasicMaterial({color:c,wireframe:true,transparent:true}),solid=c=>new THREE.MeshBasicMaterial({color:c,transparent:true});
function mk(){const g=new THREE.Group();g.visible=false;W.add(g);return g}
function fade(g,v,b){g.visible=v>.01;g.traverse(o=>{if(o.material)o.material.opacity=v*(o.userData.b??b)})}
const H=mk();(function(){const geo=new THREE.ExtrudeGeometry(indiaShape(),{depth:1.4,bevelEnabled:false,curveSegments:1});geo.rotateX(-Math.PI/2);
 const e=new THREE.LineSegments(new THREE.EdgesGeometry(geo,20),new THREE.LineBasicMaterial({color:0x4285F4,transparent:true}));e.userData.b=.95;H.add(e);
 const dm=new THREE.Points(indiaDots(1.4),new THREE.PointsMaterial({color:0x4285F4,size:.17,transparent:true}));dm.userData.b=.7;H.add(dm);
 const cp=[...Array(14)].map((_,i)=>{const p=cityPos(i);return new THREE.Vector3(p.x,1.4,p.z)}),seg=[],seen=new Set(),gc=[0x4285F4,0xEA4335,0xFBBC04,0x34A853];
 cp.forEach((a,i)=>{cp.map((b,j)=>[a.distanceTo(b),j]).filter(q=>q[1]!=i).sort((u,v)=>u[0]-v[0]).slice(0,2).forEach(([d,j])=>{const k=Math.min(i,j)+'-'+Math.max(i,j);if(seen.has(k))return;seen.add(k);const b=cp[j],m=a.clone().add(b).multiplyScalar(.5);m.y=1.4+d*.24;const q=new THREE.QuadraticBezierCurve3(a,m,b).getPoints(20);for(let t=0;t<20;t++)seg.push(q[t].x,q[t].y,q[t].z,q[t+1].x,q[t+1].y,q[t+1].z)})});
 const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(seg,3));const sl=new THREE.LineSegments(sg,new THREE.LineBasicMaterial({color:0x174EA6,transparent:true}));sl.userData.b=.6;H.add(sl);
 cp.forEach((p,i)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.36,16,16),solid(gc[i%4]));m.position.copy(p);m.userData.b=.95;H.add(m);const r=new THREE.Mesh(new THREE.TorusGeometry(.7,.05,8,28),solid(gc[i%4]));r.rotation.x=Math.PI/2;r.position.copy(p);r.userData.b=.5;H.add(r)})})();
/* home: scroll-driven data packets + radar pulses over India */
const HP=[],HR=[];
(function(){const HC=[],cp=[...Array(14)].map((_,i)=>{const p=cityPos(i);return new THREE.Vector3(p.x,1.4,p.z)}),seen=new Set();
 cp.forEach((a,i)=>{cp.map((b,j)=>[a.distanceTo(b),j]).filter(q=>q[1]!=i).sort((u,v)=>u[0]-v[0]).slice(0,3).forEach(([d,j])=>{const k=Math.min(i,j)+'-'+Math.max(i,j);if(seen.has(k))return;seen.add(k);const b=cp[j],m=a.clone().add(b).multiplyScalar(.5);m.y=1.4+d*.24;HC.push(new THREE.QuadraticBezierCurve3(a,m,b))})});
 HC.forEach((c,i)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.24,12,12),solid(i%3?0xFBBC04:0xEA4335));m.userData.b=1;H.add(m);HP.push({c,t:Math.random(),s:.002+Math.random()*.004,m})});
 cp.forEach((p,i)=>{for(let q=0;q<2;q++){const m=new THREE.Mesh(new THREE.RingGeometry(.9,1,48),new THREE.MeshBasicMaterial({color:i%2?0x34A853:0x2997ff,transparent:true,side:2}));m.rotation.x=-Math.PI/2;m.position.set(p.x,1.45,p.z);m.userData.b=0;H.add(m);HR.push({m,t:(q*.5+i*.13)%1})}})})();
function animHome(p){const act=Math.floor(6+cl(p)*(HP.length-6));HP.forEach((q,i)=>{const on=i<act;q.m.visible=on;if(!on)return;if(motion)q.t=(q.t+q.s*(1+p*3+Math.abs(vel)*.08))%1;q.m.position.copy(q.c.getPoint(q.t));q.m.userData.b=.95});
 HR.forEach(r=>{if(motion)r.t=(r.t+.004*(1+p*2))%1;r.m.scale.setScalar(.3+r.t*(2.6+p*2));r.m.userData.b=(1-r.t)*.8})}
const N=mk(),np=[...Array(14)].map(()=>new THREE.Vector3(rnd(-11,11),rnd(-6,6),rnd(-6,6)));
np.forEach(v=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.45,14,14),solid(0x184080));m.position.copy(v);N.add(m)});
const ml=[],fl=[];np.forEach((a,i)=>{if(i){let b=0,d=1e9;for(let j=0;j<i;j++){const e=a.distanceTo(np[j]);if(e<d){d=e;b=j}}ml.push(a.x,a.y,a.z,np[b].x,np[b].y,np[b].z)}np.forEach((c,j)=>{if(j>i&&a.distanceTo(c)<9)fl.push(a.x,a.y,a.z,c.x,c.y,c.z)})});
const g1=new THREE.BufferGeometry();g1.setAttribute('position',new THREE.Float32BufferAttribute(ml,3));const Mst=new THREE.LineSegments(g1,new THREE.LineBasicMaterial({color:0x0d1f3b,transparent:true}));Mst.userData.b=1;N.add(Mst);
const g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.Float32BufferAttribute(fl,3));const Fl=new THREE.LineSegments(g2,new THREE.LineBasicMaterial({color:0x3460a8,transparent:true}));Fl.userData.b=.25;N.add(Fl);
const K=mk(),kb=new THREE.Mesh(new THREE.BoxGeometry(8,8,8),wire(0x184080));kb.userData.b=.5;K.add(kb);
const kz=[2.6,1.8,2.2,1.4,2,1.2,1.6],kc=[0x184080,0x3460a8,0x0d1f3b,0x819dc9,0x1e498e,0xa8bbda,0x133873],kt=[[-2,-2.6,-2],[1.8,-2.8,-1.6],[-1.6,-2.9,1.8],[1.9,-3.1,1.9],[-1.8,-.7,-1.7],[1.5,-1.9,-1.5],[0,-1,.5]];
const kcb=kz.map((z,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(z,z,z),solid(kc[i]));m.userData.b=.85;K.add(m);return m});
const X=mk(),xb=[...Array(10)].map((_,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1.1,1,1.1),solid(i<6?0x3460a8:0x0d1f3b));m.userData.b=.85;X.add(m);return m});
const X6=mk(),xb6=[...Array(10)].map((_,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1.1,1,1.1),solid(i<6?0x3460a8:0x0d1f3b));m.userData.b=.85;X6.add(m);return m});
const F=mk(),fc=[];for(let r=0;r<8;r++)for(let c=0;c<8;c++){const m=new THREE.Mesh(new THREE.BoxGeometry(1.6,1.6,1.6),solid((r+c)%2?0x184080:0x3460a8));m.position.set((c-3.5)*2.2,0,(r-3.5)*2.2);m.userData.r=r;F.add(m);fc.push(m)}
const Q=mk(),qb=[];for(let r=0;r<8;r++)for(let c=0;c<8;c++){const m=new THREE.Mesh(new THREE.BoxGeometry(2,.4,2),solid((r+c)%2?0xccd8ea:0xf3f3f4));m.position.set((c-3.5)*2.1,-.2,(r-3.5)*2.1);m.userData.b=.9;Q.add(m)}
const qt=[...Array(8)].map((_,r)=>{const t=new THREE.Mesh(new THREE.CylinderGeometry(.35,.7,3,10),wire(0x0d1f3b));t.position.set(([1,3,5,7,2,0,6,4][r]-3.5)*2.1,1.5,(r-3.5)*2.1);t.userData.b=.9;Q.add(t);return t});
const T4=mk();(function(){const pts=[],rec=(x,y,d,sp)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.5,14,14),solid(d%2?0x184080:0x0d1f3b));m.position.set(x,y,0);m.userData.b=.85;T4.add(m);if(d<4)[-1,1].forEach(s=>{const nx=x+s*sp,ny=y-3;pts.push(x,y,0,nx,ny,0);rec(nx,ny,d+1,sp/2)})};rec(0,6,0,8);const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));const l=new THREE.LineSegments(bg,new THREE.LineBasicMaterial({color:0x3460a8,transparent:true}));l.userData.b=.6;T4.add(l)})();
const G={home:H,m1:N,m2:F,m3:K,m4:T4,m5:Q,m6:X6},vis={home:0,m1:0,m2:0,m3:0,m4:0,m5:0,m6:0};
let mx=0,my=0,lastY=scrollY,vel=0,mq=[0,0],T0=0;
function rs(){R.setSize(innerWidth,innerHeight);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()}rs();addEventListener('resize',rs);
addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
requestAnimationFrame(function loop(t){const vh=innerHeight,p=cl(scrollY/Math.max(1,document.documentElement.scrollHeight-vh));if(motion)T0+=16;
 $('#prog').style.width=p*100+'%';
 animHome(p);for(const k in vis){const tg=k==(fly?'home':page)?1:0;vis[k]+=(tg-vis[k])*(fly?.25:.08);fade(G[k],vis[k],.8)}
 W.position.x+=((innerWidth>900&&!fly&&page=='home'?7:0)-W.position.x)*.06;
 H.rotation.y=-.35+Math.sin(T0*.0004)*.22+p*.7;N.rotation.y=p*2.2-1+T0*.00003;Mst.geometry.setDrawRange(0,Math.floor(cl(p*1.9-.1)*13)*2);
 K.rotation.y=p*3.2+T0*.00003;kcb.forEach((m,i)=>{const e=ez(p*2.6-i*.18+.25);m.position.set(kt[i][0],kt[i][1]+(1-e)*18,kt[i][2]);m.rotation.y=(1-e)*3});
 X.rotation.y=p*1.5-.5;xb.forEach((m,i)=>{const h=.3*Math.pow(1.6,i)*ez(p*2.4-i*.06+.3);m.scale.y=Math.max(.01,h);m.position.set((i-4.5)*1.7,h/2-5,0)});
 F.rotation.y=p*1.6+T0*.00005;F.rotation.x=.5;fc.forEach(m=>{const lit=m.userData.r/8<kLit;m.userData.b=lit?.9:.15;m.scale.y=lit?1+.6*Math.sin(T0*.004+m.position.x):.4});
 Q.rotation.y=p*1.2+T0*.00004;Q.rotation.x=.45;qt.forEach((t,i)=>{t.userData.b=i/8<qLit?.95:.12;t.scale.y=i/8<qLit?1:.3});
 X6.rotation.y=p*1.5-.5;xb6.forEach((m,i)=>{const h=.3*Math.pow(1.6,i)*ez(p*2.4-i*.06+.3);m.scale.y=Math.max(.01,h);m.position.set((i-4.5)*1.7,h/2-5,0)});
 T4.rotation.y=p*1.8+T0*.00004;
 const ty=page=='home'?21-p*6:7,tz=page=='home'?36-p*8:24;
 C.position.x+=(mx*5-C.position.x)*.05;C.position.y+=(ty-my*3-C.position.y)*.06;C.position.z+=(tz-C.position.z)*.06;C.lookAt(W.position.x*.4,page=='home'?2:0,0);
 if(fly){const f=fly,t=cl((performance.now()-f.t0)/1250),tp=H.localToWorld(f.cv.clone());f.close.copy(tp).add(new THREE.Vector3(0,7,10));let op;
  if(t<.5){const e=ez(t/.5);C.position.lerpVectors(f.from,f.close,e);f.look.lerpVectors(f.l0,tp,e);op=Math.min(1,t/.15)}
  else{if(!f.sw){f.sw=true;doRoute();f.end=new THREE.Vector3(0,page=='home'?21:7,page=='home'?36:24)}const e=ez((t-.5)/.5);C.position.lerpVectors(f.close,f.end,e);f.look.lerpVectors(tp,new THREE.Vector3(0,page=='home'?2:0,0),e);op=1-cl((t-.5)/.5)}
  const bg=$('#bg');bg.style.opacity=op;C.lookAt(f.look);if(t>=1){fly=null;bg.classList.remove('flying');bg.style.opacity=''}}
 R.render(S,C);
 if(page=='home'){const dy=scrollY-lastY;vel+=(dy-vel)*.1;[$('#v0'),$('#v1')].forEach((r,i)=>{if(!r)return;if(motion)mq[i]+=(i?1:-1)*(.7+Math.abs(vel)*.6);const w=r.scrollWidth/3;let x=mq[i]%w;if(x>0)x-=w;r.style.transform=`translateX(${x}px)`});
  const fr=$('#flow').getBoundingClientRect();FL.style.strokeDashoffset=FLEN*(1-cl((vh*.85-fr.top)/(fr.height*.8)))}
 pxTick();lastY=scrollY;requestAnimationFrame(loop)});
