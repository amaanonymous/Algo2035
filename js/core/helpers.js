// js/core/helpers.js
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),ez=x=>1-Math.pow(1-cl(x),3),rnd=(a,b)=>a+Math.random()*(b-a);
let page='home',motion=true;
