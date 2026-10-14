// js/scene/hero-india.js
/* India hero stages for Roads and Zones: packets + radar pulses */
function heroIndia(id,pg,roads){const o=stage(id,pg,27);indiaBase(o);o.sway=.45;o.rx=.95;o.ry=0;o.ly=0;
 const n=roads?10:8,P=[...Array(n)].map((_,i)=>cityPos(i)),cv=[];
 if(roads){const inT=[0];while(inT.length<n){let b=null;for(const a of inT)for(let j=0;j<n;j++)if(!inT.includes(j)){const d=P[a].distanceTo(P[j]);if(!b||d<b.d)b={a,j,d}}inT.push(b.j);cv.push(arc(P[b.a],P[b.j],.5,1))}}
 else P.forEach((a,i)=>P.map((b,j)=>[a.distanceTo(b),j]).filter(q=>q[1]!=i).sort((u,v)=>u[0]-v[0]).slice(0,2).forEach(([d,j])=>cv.push(arc(P[i],P[j],.7,1))));
 cv.forEach(c=>o.g.add(tube(c,roads?.1:.05,roads?0x34A853:0x8AB4F8)));
 P.forEach((p,i)=>site(o.g,p,PAL[i%8],roads,CS[i],1.2));ambSet(o,cv,P,'h')}
heroIndia('#hm1','m1',true);heroIndia('#hm2','m2',false);

