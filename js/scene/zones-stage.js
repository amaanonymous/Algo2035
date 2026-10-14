// js/scene/zones-stage.js
/* M2: Floyd-Warshall on a 3D map of Indian metro hubs */
const S2=stage('#f3','m2',30),f2s=new THREE.Group();indiaBase(S2);S2.s.add(f2s);S2.ly=0;S2.sway=.4;S2.rx=.95;S2.ry=0;let f3b=null,f3t=[],FC=[],FID=0;
function f3Build(n){clr(f2s);f3t=[];FC=[];FID++;f3b=fb;const P=[...Array(n)].map((_,i)=>cityPos(i));
 P.forEach((p,i)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.42,.55,1,6),stdM(PAL[i%PAL.length],0x0b1030));m.position.set(p.x,0,p.z);m.userData={h:1,th:2};f2s.add(m);f3t.push(m);
  const rg=new THREE.Mesh(new THREE.TorusGeometry(.85,.06,8,32),new THREE.MeshBasicMaterial({color:PAL[i%PAL.length],transparent:true,opacity:.8}));rg.rotation.x=Math.PI/2;rg.position.set(p.x,.12,p.z);f2s.add(rg);
  const l=tag(CS[i],.62,'#fff');l.position.set(p.x,5.4,p.z);f2s.add(l)});
 for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(i!=j&&fb[i][j]<INF){const c=arc(P[i],P[j],.9,1);FC.push(c);f2s.add(tube(c,.04,0x9AA0A6));const h=new THREE.Mesh(new THREE.ConeGeometry(.17,.5,8),stdM(0xBDC1C6));h.position.copy(c.getPoint(.82));h.quaternion.setFromUnitVectors(V3(0,1,0),c.getTangent(.82));f2s.add(h);
  if(n<=8){const l=tag(''+fb[i][j],.6,'#E8EAED');l.position.copy(c.getPoint(.5)).add(V3(0,.6,0));f2s.add(l)}}}
function f3Update(){const n=fd.length;if(f3b!==fb||f3t.length!=n)f3Build(n);if(S2.fk!==FID){S2.fk=FID;ambSet(S2,FC.filter((_,i)=>i%Math.max(1,Math.ceil(FC.length/30))==0),f3t.map(m=>m.position),'f'+FID)}clr(S2.g);const P=f3t.map(m=>m.position),kk=fcur?fcur.k:Math.min(fk,n-1);
 f3t.forEach((m,i)=>{let r=0;for(let j=0;j<n;j++)if(fd[i][j]<INF)r++;m.userData.th=1.8+2.4*r/n;const hub=fk<n&&i==kk,pr=fcur&&(i==fcur.i||i==fcur.j);m.material.color.setHex(hub?0xFBBC04:PAL[i%PAL.length]);m.material.emissive.setHex(hub?0x8a6a10:pr?0x1a6a8a:0x0b1030)});
 if(fcur){const col=fupd?0x34A853:0xFBBC04,I=P[fcur.i],K=P[fcur.k],J=P[fcur.j];S2.g.add(tube(arc(I,K,1.8,-1),.14,col));S2.g.add(tube(arc(K,J,1.8,-1),.14,col))}
 if(fk<n){const b=new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,9,20,1,true),new THREE.MeshBasicMaterial({color:0xFBBC04,transparent:true,opacity:.16,side:2}));b.position.set(P[kk].x,4,P[kk].z);S2.g.add(b)}}
S2.upd=()=>f3t.forEach(m=>{const u=m.userData;u.h+=(u.th-u.h)*.14;m.scale.y=u.h;m.position.y=u.h/2});
