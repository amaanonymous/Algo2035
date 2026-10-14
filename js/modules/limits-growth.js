// js/modules/limits-growth.js
/* ---------- Module 6: growth chart ---------- */
const lg={'n log n':n=>Math.log10(n*Math.log2(Math.max(n,2))),'n³':n=>3*Math.log10(n),'2ⁿ':n=>n*Math.log10(2),'n!':n=>{let s=0;for(let i=2;i<=n;i++)s+=Math.log10(i);return s}};
const lc={'n log n':'#34A853','n³':'#4285F4','2ⁿ':'#F9AB00','n!':'#EA4335'};
function fmtE(l){return l<6?Math.round(Math.pow(10,l)).toLocaleString():'10^'+l.toFixed(1)}
function fmtT(l){const s=l-9;if(s<-3)return'under a millisecond';if(s<0)return Math.round(Math.pow(10,s+3))+' ms';if(s<1.78)return Math.round(Math.pow(10,s))+' seconds';if(s<3.56)return Math.round(Math.pow(10,s)/60)+' minutes';if(s<4.94)return Math.round(Math.pow(10,s)/3600)+' hours';
 const y=s-7.5;if(y<0)return Math.round(Math.pow(10,s)/86400)+' days';if(y<9)return Math.round(Math.pow(10,y)).toLocaleString()+' years';return `about 10^${y.toFixed(0)} years (the universe is 1.4×10^10 years old)`}
function eDraw(){const n=+$('#en').value;$('#env').textContent=n;const c=$('#ec'),x=hdc(c),W=c._w,H=c._h,P=58,X1=W-30,Y0=H-40,Y1=46,ymax=Math.max(20,Math.ceil(lg['n!'](n)/5)*5);x.clearRect(0,0,W,H);
 const py=v=>Y0-Math.min(v,ymax)/ymax*(Y0-Y1),px=m=>P+(m-1)/Math.max(1,n-1)*(X1-P);x.font='11px system-ui';x.textBaseline='middle';const st=ymax>40?10:5;
 for(let y=0;y<=ymax;y+=st){const yy=py(y);x.strokeStyle=y?'#E8EAED':'#BDC1C6';x.lineWidth=1;x.beginPath();x.moveTo(P,yy);x.lineTo(X1,yy);x.stroke();x.fillStyle='#5F6368';x.textAlign='right';x.fillText('10^'+y,P-8,yy)}
 [[9,'1 second','#5F6368'],[16.5,'1 year','#E37400'],[26.6,'age of the universe','#C5221F']].forEach(([v,t,col])=>{if(v>ymax)return;const yy=py(v);x.setLineDash([6,5]);x.strokeStyle=col;x.lineWidth=1.2;x.beginPath();x.moveTo(P,yy);x.lineTo(X1,yy);x.stroke();x.setLineDash([]);x.fillStyle=col;x.textAlign='right';x.font='600 11px system-ui';x.fillText(t,X1,yy-8);x.font='11px system-ui'});
 x.textAlign='center';x.fillStyle='#5F6368';x.fillText('n = 1',P,Y0+16);x.fillText('n = '+n,X1,Y0+16);
 {const gr=x.createLinearGradient(0,Y1,0,Y0);gr.addColorStop(0,'rgba(234,67,53,.22)');gr.addColorStop(1,'rgba(234,67,53,0)');x.beginPath();x.moveTo(px(1),Y0);for(let m=1;m<=n;m++)x.lineTo(px(m),py(lg['n!'](m)));x.lineTo(px(n),Y0);x.closePath();x.fillStyle=gr;x.fill()}
 let lx=P;for(const k in lg){const col=lc[k];x.strokeStyle=col;x.lineWidth=3.5;x.lineJoin='round';x.lineCap='round';x.beginPath();for(let m=1;m<=n;m++){const X=px(m),Y=py(lg[k](m));m==1?x.moveTo(X,Y):x.lineTo(X,Y)}x.stroke();
  const ex=px(n),ey=py(lg[k](n));x.fillStyle='#fff';x.beginPath();x.arc(ex,ey,7,0,7);x.fill();x.fillStyle=col;x.beginPath();x.arc(ex,ey,4.5,0,7);x.fill();
  x.fillStyle=col+'22';rr(x,lx,8,92,24,12);x.fill();x.fillStyle=col;x.beginPath();x.arc(lx+13,20,4.5,0,7);x.fill();x.fillStyle='#202124';x.font='600 12px system-ui';x.textAlign='left';x.fillText(k,lx+24,20);x.font='11px system-ui';lx+=100}
 let t='<tr><th>Growth</th><th>Operations at n='+n+'</th><th>When n doubles to '+2*n+'</th><th>Time at 10⁹ ops/s</th></tr>';
 for(const k in lg){const a=lg[k](n),d=lg[k](2*n)-a;t+=`<tr><td><span style="color:${lc[k]}">●</span> <b>${k}</b></td><td>${fmtE(a)}</td><td>${d<2?'× '+Math.pow(10,d).toFixed(1):'× 10^'+d.toFixed(1)}</td><td>${fmtT(a)}</td></tr>`}
 $('#et').innerHTML=t;e3Update(n,ymax);$('#ev').innerHTML=`At n = <b>${n}</b> the cubic algorithm (Floyd-Warshall) needs <b>${fmtE(lg['n³'](n))}</b> steps, but an exact factorial search (TSP, Hamiltonian) needs <b>${fmtE(lg['n!'](n))}</b>, about <b>${fmtT(lg['n!'](n))}</b>.`}
$('#en').oninput=eDraw;eDraw();

