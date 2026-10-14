// js/modules/budget.js
/* ---------- Module 3: Knapsack ---------- */
let items=[];
function newItems(){const names=['Metro line','Solar farm','Smart lights','Flood barrier','CCTV grid','EV chargers','Water plant','5G towers'];
 items=[...Array(6)].map((_,i)=>({n:names[(i*3+Math.floor(Math.random()*3))%8]+'',c:2+Math.floor(Math.random()*9),v:10+Math.floor(Math.random()*50)}));
 const seen={};items.forEach((it,i)=>{if(seen[it.n])it.n+=' '+(i+1);seen[it.n]=1});solveK()}
function solveK(){const W=+$('#bud').value;$('#bv').textContent=W;
 const s=[...items].sort((a,b)=>b.v/b.c-a.v/a.c);let rem=W,fv=0,fh='';
 s.forEach(it=>{const t=Math.max(0,Math.min(1,rem/it.c));rem-=it.c*t;fv+=it.v*t;
  fh+=`<div class="item"><span style="width:120px">${it.n} <small>(₹${it.c}, v${it.v}, r${(it.v/it.c).toFixed(1)})</small></span><div class="bar"><i style="width:${t*100}%"></i></div><span style="width:44px">${Math.round(t*100)}%</span></div>`});
 $('#fr').innerHTML=fh+`<div class="stat">Total value <b>${fv.toFixed(1)}</b> · greedy by ratio</div>`;
 const n=items.length,dp=[...Array(n+1)].map(()=>Array(W+1).fill(0));
 for(let i=1;i<=n;i++)for(let w=0;w<=W;w++){dp[i][w]=dp[i-1][w];const it=items[i-1];if(it.c<=w)dp[i][w]=Math.max(dp[i][w],dp[i-1][w-it.c]+it.v)}
 const pick=Array(n).fill(0),path=new Set();let w=W;
 for(let i=n;i>0;i--){path.add(i+','+w);if(dp[i][w]!=dp[i-1][w]){pick[i-1]=1;w-=items[i-1].c}}
 $('#zo').innerHTML=items.map((it,i)=>`<div class="item"><span style="width:120px">${it.n} <small>(₹${it.c}, v${it.v})</small></span><div class="bar"><i style="width:${pick[i]*100}%"></i></div><span style="width:44px">${pick[i]?'YES':'no'}</span></div>`).join('')+`<div class="stat">Total value <b>${dp[n][W]}</b> · spent ₹${pick.reduce((a,p,i)=>a+p*items[i].c,0)} of ${W}</div>`;
 $('#kv').innerHTML=`Fractional <b>${fv.toFixed(1)}</b> vs 0/1 <b>${dp[n][W]}</b>: the gap of <b>${(fv-dp[n][W]).toFixed(1)}</b> is the cost of not being able to split projects.`;
 let t='<tr><th></th>'+[...Array(W+1).keys()].map(x=>`<th>${x}</th>`).join('')+'</tr>';
 for(let i=0;i<=n;i++)t+=`<tr><th>${i?items[i-1].n.slice(0,9):'none'}</th>`+dp[i].map((v,x)=>`<td class="${path.has(i+','+x)?'p':''}">${v}</td>`).join('')+'</tr>';
 $('#dpt').innerHTML=t}
$('#bud').oninput=solveK;$('#kr').onclick=newItems;newItems();
