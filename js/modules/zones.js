// js/modules/zones.js
/* ---------- Module 2: Floyd-Warshall ---------- */
const PC_F=['for k in range(n):','    for i in range(n):','        for j in range(n):','            if d[i][k] + d[k][j] &lt; d[i][j]:','                d[i][j] = d[i][k] + d[k][j]'];
let fb,fd,fk,fi,fj,fops,fcur,fupd,ftm,fseed=5;
function fgen(n){const r=rng(fseed);return[...Array(n)].map((_,i)=>[...Array(n)].map((_,j)=>i==j?0:r()<.38?1+Math.floor(r()*20):INF))}
function fReset(){clearInterval(ftm);ftm=0;$('#frun').textContent='▶ Run';const n=+$('#fn').value;fb=fgen(n);fd=fb.map(r=>[...r]);fk=fi=fj=fops=0;fcur=null;fupd=false;fDraw()}
function fStep(){const n=fd.length;if(fk>=n)return false;const a=fd[fi][fk],b=fd[fk][fj];fops++;fcur={i:fi,j:fj,k:fk,a,b};fupd=a+b<fd[fi][fj];if(fupd)fd[fi][fj]=a+b;
 if(++fj>=n){fj=0;if(++fi>=n){fi=0;fk++}}return true}
function fDraw(){const n=fd.length,c=$('#fc'),x=hdc(c),W=c._w,Hh=c._h,m=34,s=Math.floor((Math.min(W,Hh)-m-4)/n),ox=Math.round((W-s*n-m)/2)+m,oy=m;x.clearRect(0,0,W,Hh);
 let mx=1;fd.forEach(r=>r.forEach(v=>{if(v<INF&&v>mx)mx=v}));const kk=fcur?fcur.k:Math.min(fk,n-1),fs=Math.max(8,Math.min(13,s*.4)),gp=Math.max(2,s*.08),rd=Math.min(7,s*.22);
 x.textAlign='center';x.textBaseline='middle';
 for(let i=0;i<n;i++){const hot=i==kk&&fk<n;x.font='600 '+Math.max(7,Math.min(10,s*.32))+'px system-ui';x.fillStyle=hot?'#E37400':'#5F6368';const t=CS[i].slice(0,3).toUpperCase();x.fillText(t,ox+i*s+s/2,oy-14);x.fillText(t,ox-17,oy+i*s+s/2)}
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){const v=fd[i][j],t=v>=INF?0:.12+.88*v/mx,X0=ox+j*s+gp/2,Y0=oy+i*s+gp/2,w=s-gp;
  rr(x,X0,Y0,w,w,rd);x.fillStyle=v>=INF?'#F1F3F4':`rgb(${Math.round(232-206*t)},${Math.round(240-153*t)},${Math.round(254-54*t)})`;x.fill();
  if(fk<n&&(i==kk||j==kk)){x.fillStyle='rgba(251,188,4,.28)';x.fill()}
  x.font='500 '+fs+'px system-ui';x.fillStyle=v>=INF?'#9AA0A6':t>.55?'#fff':'#174EA6';x.fillText(v>=INF?'∞':v,X0+w/2,Y0+w/2+1)}
 if(fcur){const ob=(i,j,col,lw)=>{rr(x,ox+j*s+gp/2,oy+i*s+gp/2,s-gp,s-gp,rd);x.strokeStyle=col;x.lineWidth=lw;x.stroke()};ob(fcur.i,fcur.k,'#4285F4',2);ob(fcur.k,fcur.j,'#4285F4',2);ob(fcur.i,fcur.j,fupd?'#34A853':'#F9AB00',3)}
 x.textAlign='left';const tot=n*n*n;
 $('#fs').innerHTML=`k = <b>${Math.min(fk,n-1)}</b> (${CS[Math.min(fk,n-1)]}) · i = <b>${fi}</b> · j = <b>${fj}</b> · operations <b>${fops}</b> of n³ = <b>${tot}</b>`;
 pcR('#pcF',PC_F,fcur?(fupd?[0,1,2,3,4]:[0,1,2,3]):[]);
 $('#fv').innerHTML=fk>=n?`Done. Every pair now holds its cheapest cost (∞ = no route at all).`:fcur?`Via ${CS[fcur.k]}: d[${fcur.i}][${fcur.k}] + d[${fcur.k}][${fcur.j}] = ${fcur.a>=INF||fcur.b>=INF?'∞':fcur.a+fcur.b} &lt; d[${fcur.i}][${fcur.j}]? <b>${fupd?'yes, cell updated':'no, unchanged'}</b>`:'Press Run or Step.';
 fChart();kLit=fk/n;f3Update()}
function fChart(){const n=+$('#fn').value,c=$('#fch'),x=hdc(c),W=c._w,H=c._h,P=52,PW=W-P-22,T=8000,Y0=H-78,Y1=16,X=m=>P+(m-4)/16*PW,Y=m=>Y0-(m**3/T)*(Y0-Y1);x.clearRect(0,0,W,H);x.font='11px system-ui';x.textBaseline='middle';
 for(let q=0;q<=4;q++){const y=Y1+(Y0-Y1)*q/4;x.strokeStyle=q==4?'#BDC1C6':'#E8EAED';x.lineWidth=1;x.beginPath();x.moveTo(P,y);x.lineTo(P+PW,y);x.stroke();x.fillStyle='#5F6368';x.textAlign='right';x.fillText(Math.round(T*(4-q)/4),P-8,y)}
 x.textAlign='center';x.fillStyle='#5F6368';[4,8,12,16,20].forEach(m=>x.fillText(m,X(m),Y0+14));x.fillStyle='#80868B';x.fillText('zones n  (operations = n³)',P+PW/2,Y0+30);
 const ar=(to,f)=>{x.beginPath();x.moveTo(X(4),Y0);for(let m=4;m<=to+.001;m+=.25)x.lineTo(X(m),Y(m));x.lineTo(X(to),Y0);x.closePath();x.fillStyle=f;x.fill()};
 const g1=x.createLinearGradient(0,Y1,0,Y0);g1.addColorStop(0,'rgba(66,133,244,.35)');g1.addColorStop(1,'rgba(66,133,244,.02)');ar(20,'rgba(66,133,244,.06)');ar(n,g1);
 const gr=x.createLinearGradient(P,0,P+PW,0);gr.addColorStop(0,'#8AB4F8');gr.addColorStop(1,'#1A73E8');x.strokeStyle=gr;x.lineWidth=3.5;x.lineJoin='round';x.lineCap='round';x.beginPath();for(let m=4;m<=20;m+=.25)m==4?x.moveTo(X(m),Y(m)):x.lineTo(X(m),Y(m));x.stroke();
 x.setLineDash([4,4]);x.strokeStyle='#EA4335';x.lineWidth=1.5;x.beginPath();x.moveTo(X(n),Y(n));x.lineTo(X(n),Y0);x.stroke();x.setLineDash([]);
 x.fillStyle='#fff';x.beginPath();x.arc(X(n),Y(n),8,0,7);x.fill();x.fillStyle='#EA4335';x.beginPath();x.arc(X(n),Y(n),5,0,7);x.fill();
 const bt=`n=${n}: ${n**3}`,bw=x.measureText(bt).width+22,bx=X(n)>P+PW*.6?X(n)-bw-12:X(n)+12,by=Math.max(Y(n)-12,Y1+2);x.fillStyle='#202124';rr(x,bx,by,bw,24,12);x.fill();x.fillStyle='#fff';x.textAlign='center';x.fillText(bt,bx+bw/2,by+12);
 const fr=Math.min(1,fops/n**3),by2=H-34;x.fillStyle='#EEF1F6';rr(x,P,by2,PW,10,5);x.fill();if(fr>0){const pg=x.createLinearGradient(P,0,P+PW,0);pg.addColorStop(0,'#81C995');pg.addColorStop(1,'#34A853');x.fillStyle=pg;rr(x,P,by2,Math.max(10,PW*fr),10,5);x.fill()}
 x.textAlign='left';x.fillStyle='#202124';x.fillText(`operations done: ${fops} of ${n**3}  (${Math.round(fr*100)}%)`,P,by2+23);
 $('#fx').innerHTML=`<b>${n}</b> zones need <b>${n**3}</b> operations. Doubling to ${n*2} zones needs <b>${(n*2)**3}</b>: doubling the zones makes the work <b>8 times</b> bigger. Memory only grows 4 times (n²).`}
$('#fn').oninput=e=>{$('#fnv').textContent=e.target.value;fReset()};$('#fg').onclick=()=>{fseed=fseed*31%9973+7;fReset()};
$('#fst').onclick=()=>{clearInterval(ftm);ftm=0;$('#frun').textContent='▶ Run';fStep();fDraw()};
$('#ffi').onclick=()=>{clearInterval(ftm);ftm=0;while(fStep());fDraw()};
$('#frun').onclick=()=>{if(ftm){clearInterval(ftm);ftm=0;$('#frun').textContent='▶ Run';return}if(fk>=fd.length)fReset();$('#frun').textContent='⏸ Pause';
 const lp=()=>{const[ms,b]=spd('#fsp');for(let q=0;q<b;q++)if(!fStep()){ftm=0;$('#frun').textContent='▶ Run';fDraw();return}fDraw();ftm=setTimeout(lp,ms)};lp()};
fReset();

