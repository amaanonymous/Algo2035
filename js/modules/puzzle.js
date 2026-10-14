// js/modules/puzzle.js
/* ---------- Module 5: N-Queens ---------- */
const PC_Q=['def place(row):','    if row == n: solutions += 1; return','    for col in range(n):','        if conflicts(row, col): continue','        cols[row] = col; place(row + 1)','        cols[row] = None  # backtrack'];
let qg,qe=null,qN=0,qB=0,qS=0,qtm,qdone=false;
function qReset(){clearInterval(qtm);qtm=0;$('#qrun').textContent='▶ Run';qg=nqGen(+$('#qn').value);qe=null;qN=qB=qS=0;qdone=false;qDraw()}
function qStep(){const r=qg.next();if(r.done){qdone=true;qe=null;return 'end'}qe=r.value;if(qe.t=='place'||qe.t=='conflict')qN++;if(qe.t=='back')qB++;if(qe.t=='sol')qS++;return qe.t}
function qDraw(){const n=+$('#qn').value,cs=qe?qe.c:[];q3Update();
 $('#qv').textContent=qN;$('#qb').textContent=qB;$('#qs').textContent=qS;qLit=cs.length/n;
 pcR('#pcQ',PC_Q,!qe?[]:qe.t=='sol'?[0,1]:qe.t=='conflict'?[2,3]:qe.t=='place'?[2,4]:[5]);
 $('#qd').innerHTML=qdone?`Search finished: <b>${qS}</b> solutions for N = ${n} after ${qN} nodes and ${qB} backtracks.`:!qe?'Press Run. Coloured towers = placed sensors, red = conflict.':qe.t=='sol'?`<b>Solution ${qS} found.</b> Press Next solution to keep searching.`:qe.t=='conflict'?`Row ${qe.r}, column ${qe.col} clashes with the sensor in row ${qe.w}. Skip it.`:qe.t=='place'?`Sensor placed at row ${qe.r}, column ${qe.col}.`:`Row ${qe.r} has no safe spot left, so remove the sensor at column ${qe.col} and backtrack.`}
function qRun(untilSol){clearTimeout(qtm);$('#qrun').textContent='⏸ Pause';const lp=()=>{const[ms,b]=untilSol?[70,5]:spd('#qsp');for(let q=0;q<b;q++){const t=qStep();if(t=='end'||t=='sol'){qtm=0;$('#qrun').textContent='▶ Run';qDraw();return}}qDraw();qtm=setTimeout(lp,ms)};lp()}
$('#qrun').onclick=()=>{if(qtm){clearInterval(qtm);qtm=0;$('#qrun').textContent='▶ Run'}else if(qdone){qReset();qRun()}else qRun()};
$('#qnx').onclick=()=>{if(qdone)qReset();qRun(true)};$('#qrs').onclick=qReset;$('#qn').oninput=e=>{$('#qnv').textContent=e.target.value;qReset()};qReset();

