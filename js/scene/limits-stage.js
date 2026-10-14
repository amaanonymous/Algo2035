// js/scene/limits-stage.js
/* M6: growth bars in 3D */
const S6=stage('#e3','m6',22);S6.ly=3;const e3b=[],e3k=['n log n','n³','2ⁿ','n!'],e3c=[0x34A853,0x4285F4,0xFBBC04,0xEA4335];
e3k.forEach((k,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(2.2,1,2.2),stdM(e3c[i],0x0a162a));m.userData={h:.2,th:.2};m.position.x=(i-1.5)*3.6;S6.g.add(m);e3b.push(m);const l=lab(k,3.2,'#ffffff');l.position.set((i-1.5)*3.6,-1.4,3);S6.g.add(l)});
S6.upd=()=>e3b.forEach(m=>{const u=m.userData;u.h+=(u.th-u.h)*.12;m.scale.y=Math.max(.05,u.h);m.position.y=u.h/2-.4});
function e3Update(n,ymax){e3k.forEach((k,i)=>{e3b[i].userData.th=Math.max(.1,Math.min(lg[k](n),ymax)/ymax*11)})}

