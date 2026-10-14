// js/modules/data-maps.js
/* M4: India maps for city records and emergency dispatch */
const S4A=stage('#m4a','m4',30),S4D=stage('#m4d','m4',30);[S4A,S4D].forEach(z=>{indiaBase(z);z.sway=.4;z.rx=.95;z.ry=0;z.ly=0});
const HUBI=11,callCity=id=>{const i=id%19;return i>=HUBI?i+1:i};
function m4A(){const g=S4A.g;clr(g);const cnt={};KEYS.forEach(k=>{const i=k%CITY.length;cnt[i]=(cnt[i]||0)+1});const hi=hl!=null?hl%CITY.length:-1;
 Object.keys(cnt).forEach(i=>{i=+i;site(g,cityPos(i),PAL[i%8],i==hi,CS[i]+' · '+cnt[i],.5+Math.min(cnt[i],8)*.35)});
 ambSet(S4A,[],hi>=0?[cityPos(hi)]:[],'a'+hi+':'+KEYS.length);
 $('#m4at').innerHTML=hi>=0?`Record <b>${hl}</b> belongs to the <b>${CS[hi]}</b> registry. The B-Tree reads few wide nodes and the Red-Black Tree walks a taller path to reach it.`:`<b>${KEYS.length}</b> records across <b>${Object.keys(cnt).length}</b> city registries (record ID mod ${CITY.length} picks the city).`}
function m4D(){const g=S4D.g;clr(g);const ids=Object.keys(bh.map).map(Number);let best=null;ids.forEach(id=>{if(best==null||bh.map[id].key<bh.map[best].key)best=id});
 const hub=cityPos(HUBI),cs=[];site(g,hub,0x4285F4,false,'Control room',1.6);
 ids.forEach(id=>{const k=bh.map[id].key,p=cityPos(callCity(id)),col=k<100?0xEA4335:k<200?0xF29900:0x34A853;site(g,p,col,false,'#'+id,id==best?2.8:1);
  if(id==best){const c=arc(hub,p,.5,1);cs.push(c);g.add(tube(c,.1,0xFBBC04))}});
 ambSet(S4D,cs,ids.map(i=>cityPos(callCity(i))),'d'+ids.map(i=>i+':'+bh.map[i].key).join());
 $('#m4dt').innerHTML=best!=null?`<b>${ids.length}</b> live calls. Most urgent: call <b>#${best}</b> (urgency ${bh.map[best].key}) in <b>${CS[callCity(best)]}</b>. The heap finds it without scanning every call.`:'No live calls. Insert some to see them appear on the map.'}
const _u4=upd4;upd4=function(){_u4();m4A()};const _hd=hDraw;hDraw=function(){_hd();m4D()};m4A();m4D();

