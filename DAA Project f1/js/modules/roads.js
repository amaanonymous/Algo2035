// js/modules/roads.js
/* ---------- Module 1: Prim vs Kruskal ---------- */
const PC_P=['seen = {0}  # site 0 starts the tree','while len(seen) &lt; n:','    # scan cables between tree and outside','    w, u, v = min(cables with one end in seen)','    seen.add(new_site)  # site joins the tree'];
const PC_K=['edges.sort()  # cheapest cable first','for w, u, v in edges:','    if find(u) == find(v):','        continue  # would close a loop','    union(u, v); total += w  # add it','    if chosen == n - 1: break'];
function pcR(id,L,on){$(id).innerHTML=L.map((l,i)=>`<div class="${on.includes(i)?'on':''}">${l}</div>`).join('')}
function pcDraw(){pcR('#pcP',PC_P,idx==0?[0]:[2,3,4]);pcR('#pcK',PC_K,idx==0?[0]:idx>sK.length?[5]:(sK[idx-1].ok?[1,4]:[1,2,3]))}
let mode='sparse',seed=7,g,sP,sK,idx=0,timer;
const rng=s=>()=>(s=s*16807%2147483647)/2147483647;
function gen(n,dense){const r=rng(seed);const idx=[...Array(CITY.length).keys()];
 if(seed!=7)for(let i=idx.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[idx[i],idx[j]]=[idx[j],idx[i]]}
 const nd=idx.slice(0,n).map(c=>({c,x:ix(CITY[c][1])*18+280,y:iz(CITY[c][2])*18+170}));const M=new Map();
 const km=(p,q)=>Math.hypot((CITY[p.c][1]-CITY[q.c][1])*104,(CITY[p.c][2]-CITY[q.c][2])*111);
 const add=(a,b)=>{if(a==b)return;const x=Math.min(a,b),y=Math.max(a,b),k=x+'-'+y;if(!M.has(k))M.set(k,{a:x,b:y,w:Math.max(1,Math.round(km(nd[x],nd[y])/10))})};
 const near=i=>[...Array(n).keys()].filter(j=>j!=i).sort((p,q)=>km(nd[i],nd[p])-km(nd[i],nd[q]));
 for(let i=1;i<n;i++){let b=0,d=1e9;for(let j=0;j<i;j++){const e=km(nd[i],nd[j])*(.85+r()*.3);if(e<d){d=e;b=j}}add(i,b)}
 if(dense){for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(r()<.7)add(i,j)}else for(let k=0;k<Math.floor(n*.5);k++){const i=Math.floor(r()*n),nb=near(i);add(i,nb[Math.floor(r()*Math.min(3,nb.length))])}
 return{nd,E:[...M.values()]}}
function prim(n,E){const inT=Array(n).fill(false);inT[0]=true;const st=[];let cnt=0;
 for(let k=1;k<n;k++){let b=null;for(const e of E)if(inT[e.a]!=inT[e.b]){if(!b||e.w<b.w)b=e}cnt+=2*(n-k);
  st.push({e:b,ok:true,cnt});inT[inT[b.a]?b.b:b.a]=true}return st}
function kruskal(n,E){const s=[...E].sort((x,y)=>x.w-y.w),p=[...Array(n).keys()],f=x=>p[x]==x?x:p[x]=f(p[x]);const st=[];let t=0,cnt=Math.ceil(E.length*Math.log2(Math.max(E.length,2)));
 for(const e of s){cnt++;const a=f(e.a),b=f(e.b);if(a!=b){p[a]=b;t++;st.push({e,ok:true,cnt})}else st.push({e,ok:false,cnt});if(t==n-1)break}return st}
function paint(cv,st,i,out){const x=cv.getContext('2d'),k=Math.min(i,st.length);x.clearRect(0,0,560,340);x.lineCap='round';
 g.E.forEach(e=>{x.strokeStyle='#0b131f22';x.lineWidth=1;x.beginPath();x.moveTo(g.nd[e.a].x,g.nd[e.a].y);x.lineTo(g.nd[e.b].x,g.nd[e.b].y);x.stroke()});
 let cost=0;st.slice(0,k).forEach((s,j)=>{const e=s.e,last=j==k-1&&i<=st.length&&i>0&&i<=st.length&&!out.done;
  x.strokeStyle=last?'#FBBC04':s.ok?'#0f459d':'#d9302688';x.lineWidth=s.ok?3.5:1.5;x.setLineDash(s.ok?[]:[4,4]);
  x.beginPath();x.moveTo(g.nd[e.a].x,g.nd[e.a].y);x.lineTo(g.nd[e.b].x,g.nd[e.b].y);x.stroke();x.setLineDash([]);
  if(s.ok){cost+=e.w;x.fillStyle='#0b131f';x.font='11px system-ui';x.fillText(e.w,(g.nd[e.a].x+g.nd[e.b].x)/2+4,(g.nd[e.a].y+g.nd[e.b].y)/2-4)}});
 g.nd.forEach((p,j)=>{x.fillStyle='#0b1e3d';x.beginPath();x.arc(p.x,p.y,8,0,7);x.fill();x.fillStyle='#fff';x.font='10px system-ui';x.textAlign='center';x.fillText(j,p.x,p.y+3.5);x.textAlign='left'});
 return{cost,cnt:k?st[k-1].cnt:0,steps:k}}
function draw(){c1Chart();pcDraw();const a=paint3($('#cP'),sP,idx,{}),b=paint3($('#cK'),sK,idx,{});
 $('#sP').innerHTML=`Cost <b>${a.cost}</b> · operations <b>${a.cnt}</b> · steps ${a.steps}/${sP.length}`;
 $('#sK').innerHTML=`Cost <b>${b.cost}</b> · operations <b>${b.cnt}</b> (sort + checks) · steps ${b.steps}/${sK.length}`;
 if(idx>=Math.max(sP.length,sK.length)){const p=sP[sP.length-1].cnt,k=sK[sK.length-1].cnt;
  $('#vd').innerHTML=`Both reach total cost <b>${a.cost}</b> (${g.E.length} edges, ${g.nd.length} sites, ${mode}). Prim did about ${p} operations (scanning outside sites each step); Kruskal did about ${k} (sorting all ${g.E.length} edges first, then checking them). `+(mode=='dense'?'On a dense graph Kruskal must sort many edges, so Prim with a heap is the better fit.':'On a sparse graph there are few edges to sort, so Kruskal is simple and fast.')}}
function build(){clearInterval(timer);window.GID=(window.GID||0)+1;const n=+$('#n').value;g=gen(n,mode=='dense');sP=prim(n,g.E);sK=kruskal(n,g.E);idx=0;$('#vd').textContent='Press Run. Green = accepted, red dashed = rejected (cycle), yellow = latest step.';draw()}
$('#run').onclick=()=>{build();timer=setInterval(()=>{idx++;draw();if(idx>=Math.max(sP.length,sK.length))clearInterval(timer)},+$('#sp').value)};
$('#n').oninput=e=>{$('#nv').textContent=e.target.value;build()};
$('#rg').onclick=()=>{seed=seed*31%9973+7;build()};
$('#bs').onclick=()=>{mode='sparse';$('#bs').className='on';$('#bd').className='';build()};
$('#bd').onclick=()=>{mode='dense';$('#bd').className='on';$('#bs').className='';build()};
build();

