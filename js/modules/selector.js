// js/modules/selector.js
/* ---------- Adaptive Algorithm Selector ---------- */
const SEL=[
{q:'Connect new sites at minimum cable cost',m:'Weighted undirected graph',o:['Sparse network','Dense network'],r:[['Kruskal','Few edges, so sorting them is cheap and the union-find loop is simple.','O(E log E) time, O(V) space'],['Prim (with heap)','Many edges: Prim grows one tree and never sorts all edges.','O(E log V) time, O(V) space']],c:'Edge density decides between Prim and Kruskal.',go:'m1'},
{q:'Travel costs between all zones',m:'Directed weighted graph as an n×n cost matrix',o:null,r:[['Floyd-Warshall','Every pair is needed, and the matrix handles ∞ links and negative edges.','Θ(n³) time, Θ(n²) space']],c:'For a single source on a sparse graph, Dijkstra would be cheaper.',go:'m2'},
{q:'Pick projects on a budget',m:'List of items (cost, value) and a capacity',o:['Projects can be split','Projects are indivisible'],r:[['Fractional Knapsack (greedy)','Taking the best value-per-cost first is provably optimal when pieces can be split.','O(n log n) time'],['0/1 Knapsack (DP)','Greedy can fail on whole projects, so DP over every budget level is needed.','O(nW) time and space (pseudo-polynomial, NP-complete)']],c:'Divisible or not decides greedy versus DP.',go:'m3'},
{q:'Index city records',m:'Ordered key set with search, insert, delete',o:['Records on disk','Records in memory'],r:[['B-Tree','Wide nodes mean few disk reads per lookup.','O(log n) per operation'],['Red-Black Tree','Binary nodes and cheap rotations suit RAM.','O(log n) per operation']],c:'Storage medium decides the tree.',go:'m4'},
{q:'Dispatch emergency calls',m:'Priority queue with changing priorities',o:null,r:[['Fibonacci Heap','Insert and decrease-key are O(1) amortized, extract-min is O(log n) amortized; Binomial Heap is O(log n) for most.','Amortized, see Module 4']],c:'Many urgency changes favour the Fibonacci heap.',go:'m4'},
{q:'Place sensors without conflict',m:'Constraint search over an n×n grid',o:null,r:[['Backtracking (N-Queens)','Prunes a branch the moment two sensors conflict.','O(n!) worst case, O(n) space']],c:'The general placement problem is exponential in the worst case.',go:'m5'},
{q:'Inspection tour through every zone',m:'Complete weighted graph (TSP)',o:null,r:[['Branch and bound, or heuristics','Exact search is factorial, so bound and prune, or use nearest neighbour for large n.','O(n!) exact · NP-hard']],c:'Beyond about 15 zones an approximation is the practical choice.',go:'m6'}];
SEL.forEach((s,i)=>$('#sq').add(new Option(s.q,i)));
function selR(){const s=SEL[+$('#sq').value],ci=+($('#so .on')?.dataset.i||0);$('#so').innerHTML=s.o?s.o.map((l,i)=>`<button data-i="${i}" class="${i==(s.o[ci]?ci:0)?'on':''}">${l}</button>`).join(''):'';
 const k=s.o&&s.o[ci]?ci:0,r=s.r[k];$('#s1').textContent=s.m;$('#s2').textContent=r[0];$('#s3').textContent=r[2];$('#s4').innerHTML=`<b>Why:</b> ${r[1]} <br><b>Condition:</b> ${s.c}`;
 const a=$('#s5');a.href='#/'+s.go;a.textContent='Open the module →';
 $$('#so button').forEach(b=>b.onclick=()=>{$$('#so button').forEach(x=>x.className='');b.className='on';selR()})}
$('#sq').onchange=()=>{$('#so').innerHTML='';selR()};selR();
