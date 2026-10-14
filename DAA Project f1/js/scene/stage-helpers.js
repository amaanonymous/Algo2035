// js/scene/stage-helpers.js
/* ---------- premium 3D stages (drag to rotate) ---------- */
const STG=[],TX={};
const stdM=(c,e=0)=>{const m=new THREE.MeshStandardMaterial({color:c,emissive:e,roughness:.35,metalness:.25});return m};
function clr(g){while(g.children.length){const k=g.children[0];g.remove(k);k.traverse(x=>{x.geometry&&x.geometry.dispose();x.material&&x.material.dispose&&x.material.dispose()})}}
function tex(t,col){const k=t+col;if(TX[k])return TX[k];const c=document.createElement('canvas');c.width=160;c.height=80;const x=c.getContext('2d');x.fillStyle=col;x.font='600 46px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(t,80,42);return TX[k]=new THREE.CanvasTexture(c)}
function lab(t,w,col){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex(t,col),transparent:true,depthTest:false}));s.scale.set(w,w/2,1);return s}
function cylE(a,b,r,col){const d=new THREE.Vector3().subVectors(b,a),L=d.length(),m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L,8),stdM(col,col));m.material.emissiveIntensity=.35;m.position.copy(a).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return m}
function stage(id,pg,dist){const cv=$(id),r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
 const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(40,1,.1,500),g=new THREE.Group();s.add(g);
 s.add(new THREE.AmbientLight(0xffffff,.65));const dl=new THREE.DirectionalLight(0xffffff,.95);dl.position.set(8,16,10);s.add(dl);const pl=new THREE.PointLight(0xFBBC04,.8,70);pl.position.set(-10,9,-6);s.add(pl);
 const gr=new THREE.GridHelper(46,23,0x2f4c7a,0x1a2c4a);gr.position.y=-.9;s.add(gr);
 const o={cv,r,s,c,g,pg,ry:.7,rx:.75,d:dist,dr:null,ly:0,grid:gr,upd:()=>{},amb:new THREE.Group(),pk:[],rp:[]};s.add(o.amb);
 cv.addEventListener('pointerdown',e=>{o.moved=true;o.dr=[e.clientX,e.clientY];cv.setPointerCapture(e.pointerId)});
 cv.addEventListener('pointermove',e=>{if(!o.dr)return;o.ry+=(e.clientX-o.dr[0])*.008;o.rx=cl(o.rx+(e.clientY-o.dr[1])*.006,.2,1.45);o.dr=[e.clientX,e.clientY]});
 cv.addEventListener('pointerup',()=>o.dr=null);STG.push(o);return o}
/* ambient animation: data packets along links + radar ripples at sites */
function ambSet(S,curves,sites,key){if(S.ak===key)return;S.ak=key;clr(S.amb);S.pk=[];S.rp=[];
 curves.slice(0,40).forEach((c,i)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.2,12,12),new THREE.MeshBasicMaterial({color:i%2?0xFBBC04:0x8AB4F8}));S.amb.add(m);S.pk.push({c,t:Math.random(),s:.004+Math.random()*.006,m})});
 sites.slice(0,20).forEach((p,i,a)=>{const m=new THREE.Mesh(new THREE.RingGeometry(.9,1,40),new THREE.MeshBasicMaterial({color:i%2?0x34A853:0x2997ff,transparent:true,side:2}));m.rotation.x=-Math.PI/2;m.position.set(p.x,.2,p.z);S.amb.add(m);S.rp.push({m,t:i/a.length})})}
function ambTick(S){if(!motion)return;const k=S.rs||1;S.pk.forEach(q=>{q.t=(q.t+q.s)%1;q.m.position.copy(q.c.getPoint(q.t))});S.rp.forEach(r=>{r.t=(r.t+.006)%1;r.m.scale.setScalar((.4+r.t*3.2)*k);r.m.material.opacity=(1-r.t)*.75})}
function stTick(){STG.forEach(o=>{if(page!=o.pg)return;const w=o.cv.clientWidth,h=o.cv.clientHeight;if(!w)return;if(o.w!=w||o.h!=h){o.w=w;o.h=h;o.r.setSize(w,h,false);o.c.aspect=w/h;o.c.updateProjectionMatrix()}
 if(o.sway&&!o.moved){if(motion)o.ry=Math.sin(Date.now()*.0004)*o.sway}else if(!o.dr&&motion&&o.auto!==false)o.ry+=.002;ambTick(o);o.upd(o);const d=o.d;o.c.position.set(Math.sin(o.ry)*Math.cos(o.rx)*d,Math.sin(o.rx)*d,Math.cos(o.ry)*Math.cos(o.rx)*d);o.c.lookAt(0,o.ly,0);o.r.render(o.s,o.c)});requestAnimationFrame(stTick)}
requestAnimationFrame(stTick);
/* M1: Prim and Kruskal in 3D */
/* ---- India map scenes: Modules 1, 2 and 5 ---- */
const PAL=[0x4285F4,0xEA4335,0xFBBC04,0x34A853,0x4285F4,0xEA4335,0xFBBC04,0x34A853];
const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
function tag(t,h,col){const k='tg'+t+col;let tx=TX[k];if(!tx){const f=44,c=document.createElement('canvas'),x=c.getContext('2d');x.font='600 '+f+'px system-ui';const w=Math.ceil(x.measureText(t).width)+44;c.width=w;c.height=72;x.font='600 '+f+'px system-ui';x.fillStyle='rgba(15,23,42,.84)';rr(x,0,4,w,64,32);x.fill();x.fillStyle=col||'#fff';x.textAlign='center';x.textBaseline='middle';x.fillText(t,w/2,37);tx=TX[k]=new THREE.CanvasTexture(c);tx.userData={w}}
 const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,depthTest:false}));sp.scale.set(tx.userData.w/72*h,h,1);sp.renderOrder=10;return sp}
function indiaBase(o){o.grid.position.y=-1.4;const D=.9,geo=new THREE.ExtrudeGeometry(indiaShape(),{depth:D,bevelEnabled:true,bevelThickness:.06,bevelSize:.06,bevelSegments:1,curveSegments:1});geo.rotateX(-Math.PI/2);geo.translate(0,-D,0);
 const top=new THREE.MeshStandardMaterial({color:0x1b4aa8,emissive:0x0a2260,roughness:.5,metalness:.15}),side=new THREE.MeshStandardMaterial({color:0x0c2760,roughness:.7});
 o.s.add(new THREE.Mesh(geo,[top,side]));
 o.s.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo,25),new THREE.LineBasicMaterial({color:0x8AB4F8})));
 o.s.add(new THREE.Points(indiaDots(.1),new THREE.PointsMaterial({color:0x8AB4F8,size:.15,transparent:true,opacity:.55})));
 const gl=new THREE.Mesh(new THREE.CircleGeometry(23,48),new THREE.MeshBasicMaterial({color:0x4285F4,transparent:true,opacity:.07}));gl.rotation.x=-Math.PI/2;gl.position.y=-1.35;o.s.add(gl)}
function site(g,p,col,on,name,h){const hh=h||1.2,ring=new THREE.Mesh(new THREE.TorusGeometry(.6,.07,8,28),new THREE.MeshBasicMaterial({color:on?0x34A853:col,transparent:true,opacity:.9}));ring.rotation.x=Math.PI/2;ring.position.set(p.x,.14,p.z);g.add(ring);
 const m=new THREE.Mesh(new THREE.CylinderGeometry(.14,.26,hh,12),stdM(col,0x0b1030));m.position.set(p.x,hh/2,p.z);g.add(m);
 const o=new THREE.Mesh(new THREE.SphereGeometry(.36,18,18),stdM(on?0x34A853:0xffffff,on?0x1e6b34:0x555a70));o.position.set(p.x,hh+.25,p.z);g.add(o);
 const l=tag(name,.8,'#ffffff');l.position.set(p.x,hh+1.3,p.z);g.add(l)}
const tube=(c,r,col)=>{const m=new THREE.Mesh(new THREE.TubeGeometry(c,32,r,8),stdM(col,col));m.material.emissiveIntensity=.35;return m};
function arc(a,b,up,side){const m=a.clone().add(b).multiplyScalar(.5),d=b.clone().sub(a),L=d.length();m.add(V3(-d.z,0,d.x).normalize().multiplyScalar(side*Math.min(1.4,L*.1)));m.y=up+L*.28;return new THREE.QuadraticBezierCurve3(V3(a.x,1.3,a.z),m,V3(b.x,1.3,b.z))}
function curveLines(g,cs,col,op){const p=[];cs.forEach(c=>{const q=c.getPoints(18);for(let i=0;i<q.length-1;i++)p.push(q[i].x,q[i].y,q[i].z,q[i+1].x,q[i+1].y,q[i+1].z)});const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.add(new THREE.LineSegments(bg,new THREE.LineBasicMaterial({color:col,transparent:true,opacity:op})))}
