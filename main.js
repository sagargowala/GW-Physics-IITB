// ---- NAV ----
function showPage(id,btn,closeMob){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelectorAll('.nav-links button,.mob-menu button').forEach(b=>b.classList.remove('active'));
  const idx=['home','prof','group','research','gw'].indexOf(id);
  if(idx>=0){
    document.querySelectorAll('.nav-links button')[idx]?.classList.add('active');
    document.querySelectorAll('.mob-menu button')[idx]?.classList.add('active');
  }
  window.scrollTo({top:0,behavior:'smooth'});
  if(closeMob)document.getElementById('mobMenu').style.display='none';
}
function toggleMob(){
  const m=document.getElementById('mobMenu');
  m.style.display=m.style.display==='flex'?'none':'flex';
}


// THEME TOGGLE
(function(){
  const btn=document.getElementById('themeToggle');
  const icon=document.getElementById('themeIcon');
  const label=document.getElementById('themeLabel');
  const saved=localStorage.getItem('theme');
  if(saved==='light'){
    document.body.classList.add('light-theme');
    icon.textContent='☀️';
    label.textContent='Light';
  }
  btn.addEventListener('click',()=>{
    const isLight=document.body.classList.toggle('light-theme');
    icon.textContent=isLight?'☀️':'🌙';
    label.textContent=isLight?'Light':'Dark';
    localStorage.setItem('theme',isLight?'light':'dark');
  });
})();

// ---- BLACK HOLE MERGER CANVAS ----
(function(){
  const c=document.getElementById('bhCanvas');
  const ctx=c.getContext('2d');
  let W,H,t=0;
  const stars=[];

  function resize(){
    W=c.width=c.offsetWidth;
    H=c.height=c.offsetHeight;
    stars.length=0;
    for(let i=0;i<220;i++) stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4,a:Math.random()});
  }
  window.addEventListener('resize',resize);
  resize();

  function drawBH(x,y,r,glowColor){
    // accretion glow
    let g=ctx.createRadialGradient(x,y,r*.4,x,y,r*4.5);
    g.addColorStop(0,glowColor+'99');
    g.addColorStop(0.4,glowColor+'33');
    g.addColorStop(1,'transparent');
    ctx.beginPath();ctx.arc(x,y,r*4.5,0,Math.PI*2);
    ctx.fillStyle=g;ctx.fill();
    // disk
    ctx.save();ctx.translate(x,y);ctx.scale(1,0.28);
    let dg=ctx.createRadialGradient(0,0,r*0.9,0,0,r*3.2);
    dg.addColorStop(0,glowColor+'cc');
    dg.addColorStop(0.5,glowColor+'55');
    dg.addColorStop(1,'transparent');
    ctx.beginPath();ctx.arc(0,0,r*3.2,0,Math.PI*2);
    ctx.fillStyle=dg;ctx.fill();
    ctx.restore();
    // event horizon
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle='#000';ctx.fill();
    ctx.strokeStyle=glowColor+'88';ctx.lineWidth=1;ctx.stroke();
  }

  function frame(){
    t+=0.008;
    ctx.clearRect(0,0,W,H);

    // Background
    ctx.fillStyle='#04070f';
    ctx.fillRect(0,0,W,H);

    // Stars
    stars.forEach(s=>{
      ctx.globalAlpha=s.a*(0.6+0.4*Math.sin(t*0.7+s.x));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle='#fff';ctx.fill();
    });
    ctx.globalAlpha=1;

    // Orbit setup
    const cx=W/2,cy=H/2;
    const orbitR=Math.min(W,H)*0.25;
    const r1=Math.min(W,H)*0.09, r2=Math.min(W,H)*0.05;
    const x1=cx+orbitR*Math.cos(t);
    const y1=cy+orbitR*Math.sin(t)*0.5;
    const x2=cx-orbitR*Math.cos(t);
    const y2=cy-orbitR*Math.sin(t)*0.5;

    // Gravitational wave ripples
    for(let i=1;i<=8;i++){
      const rr=(((t*60+i*55)%450)+20);
      const alpha=Math.max(0,0.55-rr/480);
      ctx.beginPath();
      ctx.ellipse(cx,cy,rr,rr*0.55,0,0,Math.PI*2);
      ctx.strokeStyle=`rgba(232,201,126,${alpha})`;
      ctx.lineWidth=1;ctx.stroke();
    }

    // BHs
    drawBH(x1,y1,r1,'#e8c97e');
    drawBH(x2,y2,r2,'#c9a84c');

    // Jet-like stream between them
    ctx.save();
    ctx.globalAlpha=0.18;
    let lg=ctx.createLinearGradient(x1,y1,x2,y2);
    lg.addColorStop(0,'#e8c97e');lg.addColorStop(0.5,'#fff');lg.addColorStop(1,'#c9a84c');
    ctx.strokeStyle=lg;ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
    ctx.restore();

    requestAnimationFrame(frame);
  }
  frame();
})();


function copyEmail(e) {
  e.preventDefault(); // stop link behavior

  const email = "archanap@iitb.ac.in";

  navigator.clipboard.writeText(email)
    .then(() => {
      alert("Email copied: " + email);
    })
    .catch(() => {
      alert("Failed to copy email");
    });

    // ===== THEME TOGGLE =====
(function(){
  const btn = document.getElementById('themeToggle');

  // Load saved theme
  if(localStorage.getItem('theme') === 'light'){
    document.body.classList.add('light-theme');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    if(document.body.classList.contains('light-theme')){
      localStorage.setItem('theme','light');
      btn.textContent = '☀️';
    } else {
      localStorage.setItem('theme','dark');
      btn.textContent = '🌙';
    }
  });
})();


}