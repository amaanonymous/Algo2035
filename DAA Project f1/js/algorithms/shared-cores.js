// js/algorithms/shared-cores.js
/* ---------- shared algorithm cores (also unit-tested) ---------- */
const INF=1e9;
function fwRun(d0){const n=d0.length,d=d0.map(r=>[...r]);for(let k=0;k<n;k++)for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(d[i][k]+d[k][j]<d[i][j])d[i][j]=d[i][k]+d[k][j];return d}
function* nqGen(n){const c=[];function* rec(r){if(r==n){yield{t:'sol',c:[...c]};return}
 for(let col=0;col<n;col++){const bad=c.findIndex((cc,rr)=>cc==col||Math.abs(cc-col)==r-rr);
  if(bad>=0){yield{t:'conflict',r,col,w:bad,c:[...c]};continue}
  c.push(col);yield{t:'place',r,col,c:[...c]};yield*rec(r+1);c.pop();yield{t:'back',r,col,c:[...c]}}}
 yield*rec(0)}

function spd(id){const v=+$(id).value;return[2000*Math.pow(.025,(v-1)/99),1+Math.floor(Math.pow(v/100,4)*30)]}
