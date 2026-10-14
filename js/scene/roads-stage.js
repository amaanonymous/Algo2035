// js/scene/roads-stage.js
/* M1: Prim and Kruskal lay cables between real Indian cities */
const S1P=stage('#cP','m1',29),S1K=stage('#cK','m1',29);[S1P,S1K].forEach(z=>{indiaBase(z);z.sway=.4;z.rx=.95;z.ry=0;z.ly=0});
function paint3(cv,st,i,out){const S=cv.id=='cP'?S1P:S1K,gp=S.g;clr(gp);const k=Math.min(i,st.length),live=i<Math.max(sP.length,sK.length),P=g.nd.map(p=>cityPos(p.c));
 curveLines(gp,g.E.map(e=>arc(P[e.a],P[e.b],.3,1)),0x8AB4F8,.3);
 let cost=0;const inT=new Set(cv.id=='cP'?[0]:[]);
 st.slice(0,k).forEach((z,j)=>{const last=j==k-1&&live,c=arc(P[z.e.a],P[z.e.b],.5,1);
  if(z.ok){cost+=z.e.w;inT.add(z.e.a);inT.add(z.e.b);gp.add(tube(c,last?.16:.1,last?0xFBBC04:0x34A853));const t=tag(''+z.e.w,.7,'#FBBC04');t.position.copy(c.getPoint(.5)).add(V3(0,.7,0));gp.add(t)}
  else gp.add(tube(c,.035,0xEA4335))});
 P.forEach((p,j)=>site(gp,p,PAL[j%8],inT.has(j),CS[g.nd[j].c],1.2));
 const acc=st.slice(0,k).filter(z=>z.ok).map(z=>arc(P[z.e.a],P[z.e.b],.5,1));ambSet(S,acc,[...inT].map(j=>P[j]),(window.GID||0)+':'+acc.length);
 return{cost,cnt:k?st[k-1].cnt:0,steps:k}}
function c1Chart(){const c=$('#c1ch'),x=hdc(c),W=c._w,H=c._h;x.clearRect(0,0,W,H);if(!sP)return;
 const L=Math.max(sP.length,sK.length),M=Math.max(sP[sP.length-1].cnt,sK[sK.length-1].cnt,1),X0=56,X1=W-26,Y0=H-36,Y1=46,px=i=>X0+(X1-X0)*i/L,py=v=>Y0-(Y0-Y1)*v/M;
 x.font='11px system-ui';x.textBaseline='middle';
 for(let q=0;q<=4;q++){const y=Y0-(Y0-Y1)*q/4;x.strokeStyle=q?'#E8EAED':'#BDC1C6';x.lineWidth=1;x.beginPath();x.moveTo(X0,y);x.lineTo(X1,y);x.stroke();x.fillStyle='#5F6368';x.textAlign='right';x.fillText(Math.round(M*q/4),X0-8,y)}
 const tk=Math.max(1,Math.ceil(L/10));x.textAlign='center';x.fillStyle='#5F6368';for(let i=0;i<=L;i+=tk)x.fillText(i,px(i),Y0+14);
 x.fillStyle='#80868B';x.textAlign='right';x.fillText('steps',X1,H-8);x.textAlign='left';x.fillText('operations (cumulative)',X0,24);
 [[sP,'#4285F4','Prim'],[sK,'#F9AB00','Kruskal']].forEach(([st,col,nm],q)=>{const cn=[0,...st.map(z=>z.cnt)],k=Math.min(idx,st.length);
  x.setLineDash([4,5]);x.strokeStyle=col+'66';x.lineWidth=2;x.beginPath();cn.forEach((v,i)=>i?x.lineTo(px(i),py(v)):x.moveTo(px(0),py(0)));x.stroke();x.setLineDash([]);
  const gr=x.createLinearGradient(0,Y1,0,Y0);gr.addColorStop(0,col+'44');gr.addColorStop(1,col+'00');x.beginPath();x.moveTo(px(0),Y0);for(let i=0;i<=k;i++)x.lineTo(px(i),py(cn[i]));x.lineTo(px(k),Y0);x.closePath();x.fillStyle=gr;x.fill();
  x.strokeStyle=col;x.lineWidth=3;x.lineJoin='round';x.lineCap='round';x.beginPath();for(let i=0;i<=k;i++)i?x.lineTo(px(i),py(cn[i])):x.moveTo(px(0),py(0));x.stroke();
  x.fillStyle='#fff';x.beginPath();x.arc(px(k),py(cn[k]),7,0,7);x.fill();x.fillStyle=col;x.beginPath();x.arc(px(k),py(cn[k]),4.5,0,7);x.fill();
  const lx=X1-214+q*110;x.fillStyle=col+'22';rr(x,lx,8,100,24,12);x.fill();x.fillStyle=col;x.beginPath();x.arc(lx+13,20,4.5,0,7);x.fill();x.fillStyle='#202124';x.font='600 12px system-ui';x.textAlign='left';x.fillText(nm+'  '+cn[k],lx+24,20);x.font='11px system-ui'})}
