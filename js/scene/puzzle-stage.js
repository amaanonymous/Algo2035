// js/scene/puzzle-stage.js
/* M5: N-Queens as 5G sensor towers on a city-zone board */
const S5=stage('#q3','m5',27),q3g=new THREE.Group();S5.s.add(q3g);S5.grid.visible=false;S5.sway=.45;S5.rx=.9;S5.ry=.15;S5.ly=0;let q3n=0;
const q3p=()=>false;
function q3Build(n){clr(q3g);q3n=n;const s=12/n,B=n*s;
 const bs=new THREE.Mesh(new THREE.BoxGeometry(B+2.4,.8,B+2.4),stdM(0x14213d,0x070d1c));bs.position.y=-.95;q3g.add(bs);
 const fr=new THREE.Mesh(new THREE.BoxGeometry(B+1.1,.36,B+1.1),stdM(0x2b3a5c,0x0b1226));fr.position.y=-.4;q3g.add(fr);q3g.add(new THREE.LineSegments(new THREE.EdgesGeometry(fr.geometry),new THREE.LineBasicMaterial({color:0x8AB4F8})).translateY(-.4));
 for(let r=0;r<n;r++)for(let c=0;c<n;c++){const m=new THREE.Mesh(new THREE.BoxGeometry(s*.92,.22,s*.92),stdM(q3p(r,c,n)?0x1f6b45:(r+c)%2?0x2a4a8c:0x1a3166,q3p(r,c,n)?0x0a2a1a:0x07122c));m.position.set((c-(n-1)/2)*s,-.12,(r-(n-1)/2)*s);q3g.add(m)}
 const gw=new THREE.Mesh(new THREE.PlaneGeometry(B+4,B+4),new THREE.MeshBasicMaterial({color:0x4285F4,transparent:true,opacity:.1}));gw.rotation.x=-Math.PI/2;gw.position.y=-1.4;q3g.add(gw);
 const lh=Math.min(.8,s*.62);
 for(let r=0;r<n;r++){const t=tag(CS[r],lh,'#E8EAED');t.position.set(-B/2-.8-t.scale.x/2,.1,(r-(n-1)/2)*s);q3g.add(t)}
 for(let c=0;c<n;c++){const t=tag(String.fromCharCode(65+c),lh,'#FBBC04');t.position.set((c-(n-1)/2)*s,.1,B/2+1);q3g.add(t)}}
function q3Update(){const n=+$('#qn').value;if(q3n!=n)q3Build(n);clr(S5.g);const cs=qe?qe.c:[],s=12/n,px=c=>(c-(n-1)/2)*s,pz=r=>(r-(n-1)/2)*s,M=THREE.Mesh,sol=qe&&qe.t=='sol';S5.rs=s*.5;ambSet(S5,[],cs.map((c,r)=>V3(px(c),0,pz(r))),n+':'+cs.join());
 cs.forEach((c,r)=>{const col=sol?0xFBBC04:PAL[r%PAL.length],t=new THREE.Group();
  const base=new M(new THREE.CylinderGeometry(s*.3,s*.34,.12,32),stdM(0x0d1426,0x05070f));base.position.y=.06;
  const mast=new M(new THREE.CylinderGeometry(s*.03,s*.08,s*1.2,16),stdM(0xE8EAED,0x2a2d34));mast.position.y=s*.6+.1;
  const arm=new M(new THREE.TorusGeometry(s*.12,s*.018,8,28),stdM(col,col));arm.rotation.x=Math.PI/2;arm.position.y=s*.55;
  const orb=new M(new THREE.SphereGeometry(s*.17,28,28),stdM(col,col));orb.material.emissiveIntensity=.9;orb.position.y=s*1.35;
  const halo=new M(new THREE.SphereGeometry(s*.3,20,20),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.14}));halo.position.y=s*1.35;
  const wave=new M(new THREE.TorusGeometry(s*.34,s*.02,8,48),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.75}));wave.rotation.x=Math.PI/2;wave.position.y=s*1.35;
  const disc=new M(new THREE.CircleGeometry(s*.42,40),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.22,side:2}));disc.rotation.x=-Math.PI/2;disc.position.y=.025;
  const pad=new M(new THREE.RingGeometry(s*.4,s*.45,48),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.9,side:2}));pad.rotation.x=-Math.PI/2;pad.position.y=.03;
  t.add(base,mast,arm,orb,halo,wave,disc,pad);t.userData.pulse=wave;t.position.set(px(c),0,pz(r));S5.g.add(t);
  const y=.05,L=[px(c),y,pz(0),px(c),y,pz(n-1)],a1=Math.min(r,c),b1=Math.min(n-1-r,n-1-c),a2=Math.min(r,n-1-c),b2=Math.min(n-1-r,c);
  L.push(px(c-a1),y,pz(r-a1),px(c+b1),y,pz(r+b1),px(c+a2),y,pz(r-a2),px(c-b2),y,pz(r+b2));
  const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.Float32BufferAttribute(L,3));S5.g.add(new THREE.LineSegments(bg,new THREE.LineBasicMaterial({color:col,transparent:true,opacity:.45})))});
 if(qe&&qe.t=='conflict'){const d=new M(new THREE.BoxGeometry(s*.9,.12,s*.9),new THREE.MeshBasicMaterial({color:0xEA4335,transparent:true,opacity:.65}));d.position.set(px(qe.col),.06,pz(qe.r));S5.g.add(d);
  const q=new M(new THREE.TorusGeometry(s*.3,s*.04,8,32),new THREE.MeshBasicMaterial({color:0xEA4335}));q.rotation.x=Math.PI/2;q.position.set(px(qe.col),.2,pz(qe.r));S5.g.add(q);
  S5.g.add(cylE(V3(px(cs[qe.w]),s*1.45,pz(qe.w)),V3(px(qe.col),.2,pz(qe.r)),.04,0xEA4335))}}
S5.upd=()=>{const f=1+.12*Math.sin(Date.now()*.006);S5.g.children.forEach(t=>{const p=t.userData&&t.userData.pulse;if(p)p.scale.setScalar(f)})};
