// js/algorithms/data-structures.js
/* ---------- Module 4 cores: B-Tree, Red-Black, Binomial, Fibonacci ---------- */
class BT{constructor(m){this.m=m;this.maxK=m-1;this.minK=Math.ceil(m/2)-1;this.root={k:[],c:[],leaf:true};this.acc=0;this.splits=0;this.merges=0;this.borrows=0;this.size=0}
 find(x){let n=this.root;for(;;){this.acc++;let i=0;while(i<n.k.length&&n.k[i]<x)i++;if(n.k[i]===x)return n;if(n.leaf)return null;n=n.c[i]}}
 insert(x){this.dup=false;const r=this._ins(this.root,x);if(this.dup)return false;if(r)this.root={k:[r.mid],c:[this.root,r.right],leaf:false};this.size++;return true}
 _ins(n,x){this.acc++;let i=0;while(i<n.k.length&&n.k[i]<x)i++;if(n.k[i]===x){this.dup=true;return null}
  if(n.leaf)n.k.splice(i,0,x);else{const r=this._ins(n.c[i],x);if(this.dup)return null;if(r){n.k.splice(i,0,r.mid);n.c.splice(i+1,0,r.right)}}
  if(n.k.length>this.maxK){const mid=n.k.length>>1,right={k:n.k.splice(mid+1),c:n.leaf?[]:n.c.splice(mid+1),leaf:n.leaf},mk=n.k.pop();this.splits++;return{mid:mk,right}}return null}
 remove(x){if(!this.find(x))return false;this._del(this.root,x);if(!this.root.k.length&&!this.root.leaf)this.root=this.root.c[0];this.size--;return true}
 _del(n,x){this.acc++;let i=0;while(i<n.k.length&&n.k[i]<x)i++;
  if(i<n.k.length&&n.k[i]===x){if(n.leaf){n.k.splice(i,1);return}let p=n.c[i];while(!p.leaf){this.acc++;p=p.c[p.c.length-1]}const pk=p.k[p.k.length-1];n.k[i]=pk;this._del(n.c[i],pk);this._fix(n,i)}
  else if(!n.leaf){this._del(n.c[i],x);this._fix(n,i)}}
 _fix(n,i){const c=n.c[i];if(c.k.length>=this.minK)return;
  if(i>0&&n.c[i-1].k.length>this.minK){const l=n.c[i-1];c.k.unshift(n.k[i-1]);n.k[i-1]=l.k.pop();if(!c.leaf)c.c.unshift(l.c.pop());this.borrows++;return}
  if(i<n.c.length-1&&n.c[i+1].k.length>this.minK){const r=n.c[i+1];c.k.push(n.k[i]);n.k[i]=r.k.shift();if(!c.leaf)c.c.push(r.c.shift());this.borrows++;return}
  if(i>0){const l=n.c[i-1];l.k.push(n.k[i-1],...c.k);l.c.push(...c.c);n.k.splice(i-1,1);n.c.splice(i,1)}else{const r=n.c[i+1];c.k.push(n.k[i],...r.k);c.c.push(...r.c);n.k.splice(i,1);n.c.splice(i+1,1)}this.merges++}
 height(){let h=1,n=this.root;while(!n.leaf){n=n.c[0];h++}return h}}
class RB{constructor(){const N={c:0,k:null};N.l=N.r=N.p=N;this.N=N;this.root=N;this.acc=0;this.rot=0;this.rec=0;this.size=0}
 col(n,c){if(n!==this.N&&n.c!==c){n.c=c;this.rec++}}
 rotL(x){const N=this.N,y=x.r;this.rot++;x.r=y.l;if(y.l!==N)y.l.p=x;y.p=x.p;if(x.p===N)this.root=y;else if(x===x.p.l)x.p.l=y;else x.p.r=y;y.l=x;x.p=y}
 rotR(x){const N=this.N,y=x.l;this.rot++;x.l=y.r;if(y.r!==N)y.r.p=x;y.p=x.p;if(x.p===N)this.root=y;else if(x===x.p.r)x.p.r=y;else x.p.l=y;y.r=x;x.p=y}
 find(k){let n=this.root;while(n!==this.N){this.acc++;if(k===n.k)return n;n=k<n.k?n.l:n.r}return null}
 insert(k){const N=this.N;let y=N,x=this.root;while(x!==N){this.acc++;y=x;if(k===x.k)return false;x=k<x.k?x.l:x.r}
  const z={k,c:1,l:N,r:N,p:y};if(y===N)this.root=z;else if(k<y.k)y.l=z;else y.r=z;this.size++;this.fixIns(z);return true}
 fixIns(z){while(z.p.c==1){const g=z.p.p;if(z.p===g.l){const u=g.r;if(u.c==1){this.col(z.p,0);this.col(u,0);this.col(g,1);z=g}else{if(z===z.p.r){z=z.p;this.rotL(z)}this.col(z.p,0);this.col(z.p.p,1);this.rotR(z.p.p)}}
  else{const u=g.l;if(u.c==1){this.col(z.p,0);this.col(u,0);this.col(g,1);z=g}else{if(z===z.p.l){z=z.p;this.rotR(z)}this.col(z.p,0);this.col(z.p.p,1);this.rotL(z.p.p)}}}this.col(this.root,0)}
 tp(u,v){if(u.p===this.N)this.root=v;else if(u===u.p.l)u.p.l=v;else u.p.r=v;v.p=u.p}
 remove(k){const N=this.N,z=this.find(k);if(!z)return false;let y=z,yc=y.c,x;
  if(z.l===N){x=z.r;this.tp(z,z.r)}else if(z.r===N){x=z.l;this.tp(z,z.l)}else{y=z.r;while(y.l!==N){this.acc++;y=y.l}yc=y.c;x=y.r;if(y.p===z)x.p=y;else{this.tp(y,y.r);y.r=z.r;y.r.p=y}this.tp(z,y);y.l=z.l;y.l.p=y;this.col(y,z.c)}
  this.size--;if(yc==0)this.fixDel(x);return true}
 fixDel(x){const N=this.N;while(x!==this.root&&x.c==0){if(x===x.p.l){let w=x.p.r;if(w.c==1){this.col(w,0);this.col(x.p,1);this.rotL(x.p);w=x.p.r}
   if(w.l.c==0&&w.r.c==0){this.col(w,1);x=x.p}else{if(w.r.c==0){this.col(w.l,0);this.col(w,1);this.rotR(w);w=x.p.r}this.col(w,x.p.c);this.col(x.p,0);this.col(w.r,0);this.rotL(x.p);x=this.root}}
  else{let w=x.p.l;if(w.c==1){this.col(w,0);this.col(x.p,1);this.rotR(x.p);w=x.p.l}
   if(w.l.c==0&&w.r.c==0){this.col(w,1);x=x.p}else{if(w.l.c==0){this.col(w.r,0);this.col(w,1);this.rotL(w);w=x.p.l}this.col(w,x.p.c);this.col(x.p,0);this.col(w.l,0);this.rotR(x.p);x=this.root}}}this.col(x,0)}
 height(n=this.root){return n===this.N?0:1+Math.max(this.height(n.l),this.height(n.r))}}
class BH{constructor(){this.roots=[];this.w=0;this.links=0;this.sw=0;this.map={};this.n=0}
 link(a,b){this.w++;this.links++;if(b.key<a.key)[a,b]=[b,a];a.ch.push(b);b.p=a;a.deg++;return a}
 union(rs){const b=[];for(const r of rs){let t=r;while(b[t.deg]){const o=b[t.deg];b[t.deg]=undefined;t=this.link(o,t)}b[t.deg]=t}return b.filter(Boolean)}
 insert(key,id){const x={key,id,deg:0,ch:[],p:null};this.map[id]=x;this.n++;this.roots=this.union(this.roots.concat([x]))}
 extract(){if(!this.roots.length)return null;let m=this.roots[0];for(const r of this.roots){this.w++;if(r.key<m.key)m=r}
  this.roots=this.roots.filter(r=>r!==m);m.ch.forEach(c=>c.p=null);this.roots=this.union(this.roots.concat(m.ch));delete this.map[m.id];this.n--;return m}
 dec(id,nk){let x=this.map[id];x.key=nk;while(x.p){this.w++;if(!(x.key<x.p.key))break;this.sw++;const p=x.p;[x.key,p.key]=[p.key,x.key];[x.id,p.id]=[p.id,x.id];this.map[x.id]=x;this.map[p.id]=p;x=p}}}
class FH{constructor(){this.roots=[];this.min=null;this.w=0;this.links=0;this.cuts=0;this.map={};this.n=0}
 insert(key,id){const x={key,id,deg:0,ch:[],p:null,mark:false};this.map[id]=x;this.roots.push(x);this.w++;if(!this.min||key<this.min.key)this.min=x;this.n++}
 extract(){const m=this.min;if(!m)return null;this.roots=this.roots.filter(r=>r!==m);m.ch.forEach(c=>{c.p=null;c.mark=false;this.roots.push(c)});delete this.map[m.id];this.n--;this.cons();return m}
 cons(){const A=[];for(const r of [...this.roots]){let x=r;while(A[x.deg]){let y=A[x.deg];A[x.deg]=undefined;this.w++;if(y.key<x.key)[x,y]=[y,x];this.roots.splice(this.roots.indexOf(y),1);x.ch.push(y);y.p=x;y.mark=false;x.deg++;this.links++}A[x.deg]=x}
  this.min=null;for(const r of this.roots){this.w++;if(!this.min||r.key<this.min.key)this.min=r}}
 cut(x,p){p.ch.splice(p.ch.indexOf(x),1);p.deg--;this.roots.push(x);x.p=null;x.mark=false;this.cuts++;this.w++}
 cc(y){const z=y.p;if(z){if(!y.mark)y.mark=true;else{this.cut(y,z);this.cc(z)}}}
 dec(id,nk){const x=this.map[id];x.key=nk;const p=x.p;this.w++;if(p&&x.key<p.key){this.cut(x,p);this.cc(p)}if(x.key<this.min.key)this.min=x}}

