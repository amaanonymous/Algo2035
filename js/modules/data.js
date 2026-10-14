// js/modules/data.js
/* ---------- Module 4 UI ---------- */
const S4B=stage('#b3','m4',18),S4R=stage('#r3','m4',18),S4H=stage('#h3b','m4',18),S4F=stage('#h3f','m4',18);
[S4B,S4R,S4H,S4F].forEach(s=>{s.auto=false;s.rx=.5;s.ry=0;s.sway=.2;s.upd=bornTick;s.grid.visible=false});
const PC_BT=['def insert(key):  # descend to the leaf','    leaf.keys.insert(pos, key)','    if len(node.keys) &gt; max_keys:','        split(node)  # middle key moves up','def delete(key):  # swap with predecessor','    if len(node.keys) &lt; min_keys:','        borrow(node) or merge(node)'];
const PC_RB=['def insert(key):  # BST insert, new node red','    if uncle.red: recolour(); z = grandparent','    else: rotate(); recolour()','def delete(key):  # BST delete','    if removed_node_was_black:','        fix_delete()  # recolour + rotations'];
const PC_BH=['def insert(key):  # one-node tree, merge','    link(a, b)  # equal degree, smaller on top','def extract_min():  # remove smallest root','    merge(roots, min_root.children)','def decrease_key(x, k):','    while x.parent and x.key &lt; x.parent.key: swap'];
const PC_FH=['def insert(key):  # root list, update min','def extract_min():  # children join roots','    consolidate()  # link equal-degree roots','def decrease_key(x, k):','    if x.key &lt; x.parent.key: cut(x)','    cascading_cut(x.parent)  # marked parent'];
function lab2(t,col,hgt){const k='w'+t+col;let tx=TX[k];if(!tx){const c=document.createElement('canvas');c.width=Math.max(80,t.length*30);c.height=64;const x=c.getContext('2d');x.fillStyle=col;x.font='600 40px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(t,c.width/2,34);tx=TX[k]=new THREE.CanvasTexture(c);tx.userData={w:c.width}}
 const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,depthTest:false}));s.scale.set(tx.userData.w/64*hgt,hgt,1);return s}
const R4=n=>Math.floor(Math.random()*n);
let bt,rb,KEYS=[],hl=null,bAct=[],rAct=[];
const PV={};
function bornTick(o){const now=Date.now();o.g.children.forEach(c=>{const u=c.userData||{};if(u.born){const t=Math.min(1,(now-u.born)/600),e=1-Math.pow(1-t,3);c.scale.setScalar(Math.max(.001,e*(1+.22*Math.sin(t*Math.PI))))}if(u.spin)c.rotation.y+=.0007})}
const band=k=>k<100?[0xEA4335,0x4a0a08]:k<200?[0xF28B00,0x4a2a00]:[0x34A853,0x0a3a18];
function glossy(c,e){return new THREE.MeshPhysicalMaterial({color:c,emissive:e||0,roughness:.28,metalness:.1,clearcoat:1,clearcoatRoughness:.2})}
function edge3(a,b,col,r){const m=(a.y+b.y)/2;return tube(new THREE.CubicBezierCurve3(a,V3(a.x,m,a.z),V3(b.x,m,b.z),b),r,col)}
function deck(g,w,y){const gr=new THREE.GridHelper(w,Math.max(4,Math.round(w/1.6)),0x3b6fd1,0x1f3a6e);gr.position.y=y;g.add(gr);const p=new THREE.Mesh(new THREE.PlaneGeometry(w,w),new THREE.MeshBasicMaterial({color:0x4285F4,transparent:true,opacity:.07}));p.rotation.x=-Math.PI/2;p.position.y=y-.01;g.add(p);
 let sd=11;const rn=()=>(sd=sd*16807%2147483647)/2147483647,pt=[];for(let i=0;i<160;i++)pt.push((rn()-.5)*w*1.1,y+rn()*w*.55,(rn()-.5)*w*.7);const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.Float32BufferAttribute(pt,3));const sp=new THREE.Points(bg,new THREE.PointsMaterial({color:0x8AB4F8,size:.11,transparent:true,opacity:.55}));sp.userData.spin=1;g.add(sp)}
function chips(a){const cl=['#4285F4','#EA4335','#F29900','#34A853','#4285F4','#34A853'];return '<div class="mchips">'+a.map((q,i)=>`<div><b style="color:${cl[i%6]}">${q[1]}</b><small>${q[0]}</small></div>`).join('')+'</div>'}
function gbars(id,groups,names,cols){const c=$(id);if(!c)return;const x=hdc(c),W=c._w,H=c._h;x.clearRect(0,0,W,H);
 const mx=Math.max(1,...groups.flatMap(g=>g.v)),L=160,R=64,top=42,rowH=(H-top-8)/groups.length,bh=Math.min(15,rowH/2-5),f=v=>Number.isInteger(v)?v:v.toFixed(1);x.textBaseline='middle';
 names.forEach((n,j)=>{const lx=8+j*128;x.fillStyle=cols[j]+'22';rr(x,lx,8,118,24,12);x.fill();x.fillStyle=cols[j];x.beginPath();x.arc(lx+13,20,4.5,0,7);x.fill();x.fillStyle='#202124';x.font='600 12px system-ui';x.textAlign='left';x.fillText(n,lx+24,20)});
 groups.forEach((g,i)=>{const y=top+i*rowH;x.fillStyle='#3C4043';x.font='600 12px system-ui';x.textAlign='left';x.fillText(g.l,8,y+rowH/2);
  g.v.forEach((v,j)=>{const yy=y+rowH/2+(j?2:-bh-2),w=(W-L-R)*v/mx;x.fillStyle='#F1F3F4';rr(x,L,yy,W-L-R,bh,bh/2);x.fill();
   const gr=x.createLinearGradient(L,0,L+Math.max(bh,w),0);gr.addColorStop(0,cols[j]+'88');gr.addColorStop(1,cols[j]);x.fillStyle=gr;rr(x,L,yy,Math.max(bh,w),bh,bh/2);x.fill();
   x.fillStyle='#202124';x.font='600 11px system-ui';x.fillText(f(v),L+Math.max(bh,w)+8,yy+bh/2)})})}
function cmpB(){gbars('#bcmp',[{l:'Node accesses',v:[bt.acc,rb.acc]},{l:'Tree height',v:[bt.size?bt.height():0,rb.height()]},{l:'Restructuring steps',v:[bt.splits+bt.merges+bt.borrows,rb.rot]}],['B-Tree','Red-Black'],['#4285F4','#EA4335'])}
function cmpH(){const av=a=>a[0]?a[1]/a[0]:0;gbars('#hcmp',[{l:'Insert call',v:[av(HA.b.ins),av(HA.f.ins)]},{l:'Extract-min',v:[av(HA.b.ext),av(HA.f.ext)]},{l:'Decrease-key',v:[av(HA.b.dec),av(HA.f.dec)]}],['Binomial','Fibonacci'],['#4285F4','#34A853'])}
function drawB(){const g=S4B.g;clr(g);let x=0,maxD=0;const CW=1.1,old=PV.b||new Set(),cur=new Set();
 const rec=(n,d)=>{maxD=Math.max(maxD,d);const w=Math.max(2,n.k.length*CW+.7);let o;if(n.leaf){o={n,x:x+w/2,d,w,kids:[]};x+=w+.8}else{const ks=n.c.map(c=>rec(c,d+1));o={n,x:(ks[0].x+ks[ks.length-1].x)/2,d,w,kids:ks}}return o};
 const root=rec(bt.root,0),off=x/2-.4,Y=d=>-d*3;
 const go=o=>{const X=o.x-off,y=Y(o.d),col=[0x4285F4,0x34A853,0xEA4335,0xFBBC04][o.d%4],k=o.n.k,x0=X-k.length*CW/2;
  const plate=new THREE.Mesh(new THREE.BoxGeometry(o.w,.22,1.2),stdM(0x1a2a4c,0x0a1226));plate.position.set(X,y-.5,0);g.add(plate);
  const base=new THREE.Mesh(new THREE.BoxGeometry(o.w,.1,1.25),stdM(0x0b1226,0x050912));base.position.set(X,y-.62,0);g.add(base);
  const fw=Math.max(.25,o.w*Math.min(1,k.length/bt.maxK)),fl=new THREE.Mesh(new THREE.BoxGeometry(fw,.12,1.27),new THREE.MeshBasicMaterial({color:col}));fl.position.set(X-o.w/2+fw/2,y-.62,0);g.add(fl);
  k.forEach((v,i)=>{const hit=hl===v,cx=x0+i*CW+CW/2,gp=new THREE.Group();gp.position.set(cx,y,0);cur.add(v);if(!old.has(v))gp.userData.born=Date.now();
   const cell=new THREE.Mesh(new THREE.BoxGeometry(CW*.9,.8,.95),stdM(hit?0xFBBC04:0xF1F3F4,hit?0x7a5a00:0x1d2e4a));gp.add(cell);const l=lab2(''+v,hit?'#3a2a00':'#174EA6',.62);l.position.z=.55;gp.add(l);g.add(gp)});
  o.kids.forEach((c,i)=>{const pxx=x0+i*CW;g.add(edge3(V3(pxx,y-.55,0),V3(c.x-off,Y(c.d)+.45,0),0x8AB4F8,.045));const dot=new THREE.Mesh(new THREE.SphereGeometry(.1,10,10),stdM(0xFBBC04,0x7a5a00));dot.position.set(pxx,y-.5,.1);g.add(dot);go(c)})};
 go(root);for(let d=0;d<=maxD;d++){const t=tag(d?'Level '+d:'Root level',.8,'#9AA0A6');t.position.set(-x/2-3.2,Y(d),0);g.add(t)}
 PV.b=cur;deck(g,Math.max(x+6,16),Y(maxD)-1.3);S4B.ly=Y(maxD)/2;S4B.d=Math.max(12,x*.78+8)}
function drawR(){const g=S4R.g;clr(g);const N=rb.N,old=PV.r||new Set(),cur=new Set();let i=0,maxD=0;const L=[];const rec=(n,d)=>{if(n===N)return null;maxD=Math.max(maxD,d);const l=rec(n.l,d+1),o={n,d,x:i++*1.5,l,r:null};o.r=rec(n.r,d+1);L.push(o);return o};rec(rb.root,0);const off=(i-1)*.75,Y=d=>-d*2.4;
 L.forEach(o=>{const red=o.n.c==1,hit=hl!=null&&o.n.k===hl,P=V3(o.x-off,Y(o.d),0),gp=new THREE.Group();gp.position.copy(P);cur.add(o.n.k);if(!old.has(o.n.k))gp.userData.born=Date.now();
  const m=new THREE.Mesh(new THREE.SphereGeometry(.64,28,28),glossy(red?0xe0372f:0x23252b,red?0x4a0a08:0x05070c));gp.add(m);
  const l=lab(''+o.n.k,1.6,'#ffffff');l.position.set(0,0,.85);gp.add(l);
  if(hit){const r=new THREE.Mesh(new THREE.TorusGeometry(.95,.07,8,32),stdM(0xFBBC04,0x8a6a10));gp.add(r);const h=new THREE.Mesh(new THREE.SphereGeometry(.92,20,20),new THREE.MeshBasicMaterial({color:0xFBBC04,transparent:true,opacity:.22}));gp.add(h)}
  g.add(gp);[o.l,o.r].forEach(c=>{if(c)g.add(edge3(P,V3(c.x-off,Y(c.d),0),0x8AB4F8,.045))})});
 if(rb.root!==N){const ro=L.find(o=>o.n===rb.root),t=tag('root',.6,'#FBBC04');t.position.set(ro.x-off,1.5,0);g.add(t)}
 for(let d=0;d<=maxD;d++){const t=tag('h = '+d,.75,'#9AA0A6');t.position.set(-(i*1.5)/2-2.4,Y(d),0);g.add(t)}
 PV.r=cur;deck(g,Math.max(i*1.5+6,16),Y(maxD)-1.3);S4R.ly=-maxD*1.2;S4R.d=Math.max(12,i*.9+8)}
function upd4(){drawB();drawR();
 $('#bst').innerHTML=chips([['node accesses',bt.acc],['splits',bt.splits],['merges',bt.merges],['borrows',bt.borrows],['height',bt.size?bt.height():0],['keys',bt.size]]);
 $('#rst').innerHTML=chips([['node accesses',rb.acc],['rotations',rb.rot],['recolours',rb.rec],['height',rb.height()],['keys',rb.size]]);
 pcR('#pcB',PC_BT,bAct);pcR('#pcR',PC_RB,rAct);cmpB()}
function rebuild4(){bt=new BT(+$('#bo').value);rb=new RB();KEYS.forEach(k=>{bt.insert(k);rb.insert(k)});[bt,rb].forEach(t=>{t.acc=0;t.splits=t.merges=t.borrows=t.rot=t.rec=0});hl=null;bAct=[];rAct=[];upd4()}
function snap(){return{a:bt.acc,s:bt.splits,m:bt.merges,b:bt.borrows,ra:rb.acc,ro:rb.rot,rc:rb.rec}}
function bop(type){const kv=$('#kin').value;let k=kv===''?null:+kv;if(k==null){if(type=='ins'){do k=1+R4(99);while(KEYS.includes(k)&&KEYS.length<99)}else{if(!KEYS.length){$('#bvd').textContent='The index is empty. Insert some keys first.';return}k=KEYS[R4(KEYS.length)]}}
 const a=snap();let ok;
 if(type=='ins'){ok=bt.insert(k);if(ok){rb.insert(k);KEYS.push(k)}}else if(type=='del'){ok=bt.remove(k);if(ok){rb.remove(k);KEYS.splice(KEYS.indexOf(k),1)}}else{ok=!!bt.find(k);rb.find(k)}
 const d=snap(),dB=d.a-a.a,dR=d.ra-a.ra;hl=ok?k:null;
 bAct=type=='ins'?[0,1].concat(d.s>a.s?[2,3]:[]):type=='del'?[4].concat(d.m>a.m||d.b>a.b?[5,6]:[]):[0];rAct=type=='ins'?[0].concat(d.rc>a.rc?[1]:[]).concat(d.ro>a.ro?[2]:[]):type=='del'?[3].concat(d.ro>a.ro||d.rc>a.rc?[4,5]:[]):[0];
 const nm={ins:'Insert',del:'Delete',fnd:'Search'}[type];
 $('#bvd').innerHTML=ok?`${nm} <b>${k}</b>: the B-Tree touched <b>${dB}</b> nodes (height ${bt.height()}), the Red-Black Tree touched <b>${dR}</b> nodes (height ${rb.height()}). `+(d.s>a.s?`B-Tree split ${d.s-a.s} node(s). `:'')+(d.m>a.m?`B-Tree merged ${d.m-a.m}. `:'')+(d.ro>a.ro?`Red-Black rotated ${d.ro-a.ro} time(s). `:'')+(d.rc>a.rc?`Red-Black recoloured ${d.rc-a.rc} node(s).`:''):`${nm} ${k}: ${type=='ins'?'key already present':'key not found'}.`;
 $('#kin').value='';upd4()}
$('#bins').onclick=()=>bop('ins');$('#bdel').onclick=()=>bop('del');$('#bfnd').onclick=()=>bop('fnd');
$('#bblk').onclick=()=>{const a=snap();let c=0;while(c<20&&KEYS.length<99){const k=1+R4(99);if(KEYS.includes(k))continue;bt.insert(k);rb.insert(k);KEYS.push(k);c++}const d=snap();hl=null;bAct=[0,1,2,3];rAct=[0,1,2];
 $('#bvd').innerHTML=`Inserted ${c} keys. B-Tree: <b>${d.a-a.a}</b> accesses, <b>${d.s-a.s}</b> splits. Red-Black: <b>${d.ra-a.ra}</b> accesses, <b>${d.ro-a.ro}</b> rotations, <b>${d.rc-a.rc}</b> recolours.`;upd4()};
$('#bclr').onclick=()=>{KEYS=[];rebuild4();$('#bvd').textContent='Cleared.'};
$('#bo').oninput=e=>{$('#bov').textContent=e.target.value;rebuild4();$('#bvd').textContent='Order changed: the B-Tree was rebuilt from the same keys and counters were reset.'};
KEYS=[];for(let i=0;i<14;i++){let k;do k=1+R4(99);while(KEYS.includes(k));KEYS.push(k)}rebuild4();

/* heaps */
let bh,fh,nid,used,HA,hAct=[[],[]];
function hReset(){bh=new BH();fh=new FH();nid=1;used=new Set();HA={b:{ins:[0,0],ext:[0,0],dec:[0,0]},f:{ins:[0,0],ext:[0,0],dec:[0,0]}};hAct=[[],[]];hDraw()}
function drawH(S,h,fib){const g=S.g,key=fib?'f':'bh',old=PV[key]||new Set(),cur=new Set();clr(g);let x=0,maxD=0;const P=[];const rec=(n,d)=>{maxD=Math.max(maxD,d);let o;if(!n.ch.length)o={n,d,x:x++,k:[]};else{const ks=n.ch.map(c=>rec(c,d+1));o={n,d,x:(ks[0].x+ks[ks.length-1].x)/2,k:ks}}P.push(o);return o};
 h.roots.forEach(r=>{rec(r,0);x+=.6});const mn=fib?h.min:h.roots.reduce((a,r)=>!a||r.key<a.key?r:a,null),W=x*1.7,Y=d=>-d*2.4,RP=[];
 P.forEach(o=>{const isMin=o.n===mn,root=!o.n.p,pos=V3(o.x*1.7-W/2,Y(o.d),0),bd=band(o.n.key),gp=new THREE.Group();gp.position.copy(pos);cur.add(o.n.id);if(!old.has(o.n.id))gp.userData.born=Date.now();
  gp.add(new THREE.Mesh(new THREE.SphereGeometry(isMin?.68:.58,26,26),glossy(bd[0],isMin?0x806020:bd[1])));
  if(isMin){gp.add(new THREE.Mesh(new THREE.SphereGeometry(1.0,20,20),new THREE.MeshBasicMaterial({color:0xFBBC04,transparent:true,opacity:.24})));const t=tag('min',.55,'#FBBC04');t.position.y=1.95;gp.add(t)}
  const l=lab(''+o.n.key,1.4,'#ffffff');l.position.z=.8;gp.add(l);
  if(root){const r=new THREE.Mesh(new THREE.TorusGeometry(.86,.035,8,36),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.75}));gp.add(r)}
  if(fib&&o.n.mark){const r=new THREE.Mesh(new THREE.TorusGeometry(.98,.06,8,28),stdM(0xEA4335,0x6a1510));gp.add(r)}
  if(!fib&&root){const t=lab2('B'+o.n.deg,'#FBBC04',.7);t.position.y=1.1;gp.add(t)}
  g.add(gp);if(root)RP.push(pos);
  o.k.forEach(c=>g.add(edge3(pos,V3(c.x*1.7-W/2,Y(c.d),0),0x8AB4F8,.045)))});
 RP.sort((a,b)=>a.x-b.x);for(let i=0;i<RP.length-1;i++)g.add(cylE(RP[i],RP[i+1],.035,0x34A853));
 if(RP.length){const t=tag(fib?'root list':'forest',.5,'#81C995');t.position.set(RP[0].x-1.8,0,0);g.add(t)}
 PV[key]=cur;deck(g,Math.max(W+6,16),Y(maxD)-1.3);S.ly=-maxD*1.2;S.d=Math.max(12,W*.66+9)}
function hDraw(){drawH(S4H,bh,false);drawH(S4F,fh,true);
 $('#bhst').innerHTML=chips([['total work',bh.w],['links',bh.links],['swaps',bh.sw],['trees',bh.roots.length],['calls',bh.n]]);
 $('#fhst').innerHTML=chips([['total work',fh.w],['links',fh.links],['cuts',fh.cuts],['trees',fh.roots.length],['calls',fh.n]]);
 pcR('#pcBH',PC_BH,hAct[0]);pcR('#pcFH',PC_FH,hAct[1]);
 const sel=$('#hid'),ids=Object.keys(bh.map).map(Number).sort((a,b)=>a-b),cur=sel.value;sel.innerHTML=ids.map(i=>`<option value="${i}">#${i} (urgency ${bh.map[i].key})</option>`).join('')||'<option value="">no calls</option>';if(ids.includes(+cur))sel.value=cur;
 const av=a=>a[0]?(a[1]/a[0]).toFixed(1):'–';let t='<tr><th>Average work per operation</th><th>Binomial</th><th>Fibonacci</th></tr>';
 [['ins','Insert call'],['ext','Extract-min'],['dec','Decrease-key']].forEach(([k,n])=>t+=`<tr><td>${n} <small>(${HA.b[k][0]} ops)</small></td><td>${av(HA.b[k])}</td><td>${av(HA.f[k])}</td></tr>`);$('#htab').innerHTML=t;cmpH()}
function hop(type,idArg){const b0=bh.w,f0=fh.w,bl=bh.links,bs=bh.sw,fc=fh.cuts,fl=fh.links;let msg='';
 if(type=='ins'){if(bh.n>=250)return'';let k;do k=1+R4(300);while(used.has(k));const id=nid++;used.add(k);bh.insert(k,id);fh.insert(k,id);msg=`Call #${id} (urgency ${k}) added.`}
 else if(type=='ext'){if(!bh.n)return'';const a=bh.extract(),b=fh.extract();used.delete(a.key);msg=`Most urgent call dispatched (urgency ${a.key}).`}
 else{const id=idArg??+$('#hid').value;if(!bh.map[id])return'';const k=bh.map[id].key,c=[];for(let v=0;v<k;v++)if(!used.has(v))c.push(v);if(!c.length){$('#hvd').textContent='That call is already the most urgent possible.';return''}const nk=c[R4(c.length)];used.delete(k);used.add(nk);bh.dec(id,nk);fh.dec(id,nk);msg=`Call #${id} became more urgent: ${k} → ${nk}.`}
 const db=bh.w-b0,df=fh.w-f0;HA.b[type][0]++;HA.b[type][1]+=db;HA.f[type][0]++;HA.f[type][1]+=df;
 hAct=type=='ins'?[[0].concat(bh.links>bl?[1]:[]),[0]]:type=='ext'?[[2,3].concat(bh.links>bl?[1]:[]),[1,2]]:[[4].concat(bh.sw>bs?[5]:[]),[3].concat(fh.cuts>fc?[4]:[]).concat(fh.cuts-fc>1?[5]:[])];
 return `${msg} Work this step: Binomial <b>${db}</b>, Fibonacci <b>${df}</b>.`}
$('#hins').onclick=()=>{const m=hop('ins');if(m)$('#hvd').innerHTML=m;hDraw()};
$('#hext').onclick=()=>{const m=hop('ext');if(m)$('#hvd').innerHTML=m;hDraw()};
$('#hdec').onclick=()=>{const m=hop('dec');if(m)$('#hvd').innerHTML=m;hDraw()};
$('#hbur').onclick=()=>{for(let i=0;i<15;i++){const r=Math.random(),ids=Object.keys(bh.map);if(r<.55||ids.length<3)hop('ins');else if(r<.75)hop('ext');else hop('dec',+ids[R4(ids.length)])}
 $('#hvd').innerHTML=`Burst done. Total work so far: Binomial <b>${bh.w}</b>, Fibonacci <b>${fh.w}</b>. Fibonacci is cheapest when inserts and decrease-keys dominate; the cost it postpones is paid at extract-min.`;hDraw()};
$('#hclr').onclick=()=>{hReset();$('#hvd').textContent='Cleared.'};
hReset();for(let i=0;i<8;i++)hop('ins');hDraw();
