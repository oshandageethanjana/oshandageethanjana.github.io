/* ============================================================
   shared.js — Oshanda Geethanjana Portfolio v2
   සියලු pages සඳහා shared functionality
   ============================================================ */

/* ── 1. SCROLL PROGRESS BAR ─────────────────────────────── */
function initScrollProgress() {
  var bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#00f0ff,#00ff66);z-index:9999;transition:width .08s linear;pointer-events:none;';
  document.body.appendChild(bar);
  window.addEventListener('scroll', function() {
    var total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  }, { passive: true });
}

/* ── 2. BACK TO TOP BUTTON ──────────────────────────────── */
function initBackToTop() {
  var btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.title = 'Back to top';
  btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  btn.style.cssText = 'position:fixed;bottom:30px;right:80px;width:42px;height:42px;border-radius:12px;background:rgba(20,20,20,0.8);border:1px solid rgba(0,240,255,0.3);color:#00f0ff;font-size:14px;cursor:none !important;display:flex;align-items:center;justify-content:center;opacity:0;transform:translateY(12px);transition:opacity .3s,transform .3s;z-index:200;backdrop-filter:blur(10px);';
  document.body.appendChild(btn);
  window.addEventListener('scroll', function() {
    var show = window.scrollY > 400;
    btn.style.opacity = show ? '1' : '0';
    btn.style.transform = show ? 'translateY(0)' : 'translateY(12px)';
  }, { passive: true });
  btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  btn.addEventListener('mouseenter', function() { var c=document.getElementById('cursor');if(c)c.classList.add('active-link'); });
  btn.addEventListener('mouseleave', function() { var c=document.getElementById('cursor');if(c)c.classList.remove('active-link'); });
}

/* ── 3. MOBILE HAMBURGER MENU ───────────────────────────── */
function initMobileMenu() {
  var nav = document.querySelector('nav');
  if (!nav) return;
  var links = nav.querySelector('.nav-links');
  if (!links) return;

  var burger = document.createElement('button');
  burger.id = 'nav-burger';
  burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  burger.style.cssText = 'display:none;width:36px;height:36px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#8892b0;cursor:none !important;align-items:center;justify-content:center;font-size:14px;transition:.3s;flex-shrink:0;';
  nav.appendChild(burger);

  var style = document.createElement('style');
  style.textContent = '@media(max-width:600px){#nav-burger{display:flex !important;}.nav-links{position:fixed;top:0;right:-100%;width:220px;height:100vh;background:rgba(5,5,5,0.97);backdrop-filter:blur(20px);flex-direction:column;justify-content:center;align-items:flex-start;padding:40px 30px;gap:8px;border-left:1px solid rgba(255,255,255,0.06);transition:right .4s cubic-bezier(0.85,0,0.15,1);z-index:999;}.nav-links.open{right:0;}.nav-links a{padding:12px 0;font-size:16px;width:100%;}#theme-toggle{margin-top:20px;}#nav-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:998;display:none;}#nav-overlay.show{display:block;}}';
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'nav-overlay';
  document.body.appendChild(overlay);

  var open = false;
  function toggle() {
    open = !open;
    links.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
    burger.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    burger.style.color = open ? '#00f0ff' : '#8892b0';
  }
  burger.addEventListener('click', toggle);
  overlay.addEventListener('click', toggle);
  links.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', function() { if(open) toggle(); }); });
}

/* ── 4. ACTIVE NAV HIGHLIGHT ────────────────────────────── */
function initActiveNav() {
  var page = location.pathname.split('/').pop() || 'index.html';
  if (page === '') page = 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    var href = a.getAttribute('href') || '';
    if (href === page) a.classList.add('active');
    else a.classList.remove('active');
  });
}

/* ── 5. TYPEWRITER EFFECT ON PROMPTS ────────────────────── */
function initTypewriter() {
  document.querySelectorAll('.prompt').forEach(function(el) {
    var text = el.textContent;
    el.textContent = '';
    el.style.borderRight = '2px solid #00f0ff';
    el.style.paddingRight = '4px';
    var i = 0;
    setTimeout(function() {
      var timer = setInterval(function() {
        el.textContent += text[i]; i++;
        if (i >= text.length) {
          clearInterval(timer);
          setTimeout(function() { el.style.borderRight = 'none'; el.style.paddingRight = '0'; }, 1800);
        }
      }, 42);
    }, 1600);
  });
}

/* ── 6. CURSOR TRAIL ────────────────────────────────────── */
function initCursorTrail() {
  var dots = [];
  for (var i = 0; i < 7; i++) {
    var d = document.createElement('div');
    var s = 5 - i * 0.4;
    d.style.cssText = 'position:fixed;border-radius:50%;pointer-events:none;z-index:99997;width:'+s+'px;height:'+s+'px;background:rgba(0,240,255,'+(0.5-i*0.06)+');';
    document.body.appendChild(d);
    dots.push({ el: d, x: 0, y: 0 });
  }
  var mx = 0, my = 0;
  document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function loop() {
    requestAnimationFrame(loop);
    var px = mx, py = my;
    dots.forEach(function(t, i) {
      var spd = 0.28 - i * 0.025;
      t.x += (px - t.x) * spd; t.y += (py - t.y) * spd;
      t.el.style.left = (t.x - parseFloat(t.el.style.width)/2) + 'px';
      t.el.style.top  = (t.y - parseFloat(t.el.style.height)/2) + 'px';
      px = t.x; py = t.y;
    });
  })();
}

/* ── 7. VOICE NAVIGATION ────────────────────────────────── */
function initVoiceNav() {
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var btn = document.getElementById('voice-btn');
  if (!SR || !btn) return;

  var rec = new SR();
  rec.continuous = false; rec.lang = 'en-US'; rec.interimResults = false;
  var active = false;

  rec.onresult = function(e) {
    var t = e.results[0][0].transcript.toLowerCase();
    var toast = document.getElementById('toast');
    if (toast) { toast.textContent = 'Heard: "' + t + '"'; toast.style.background='#a855f7'; toast.style.color='#fff'; toast.className='show'; setTimeout(function(){toast.className='';},3000); }
    if (t.includes('home'))                                    location.href='index.html';
    else if (t.includes('about'))                              location.href='about.html';
    else if (t.includes('project')||t.includes('work'))       location.href='projects.html';
    else if (t.includes('contact'))                            location.href='contact.html';
    else if (t.includes('dark')||t.includes('light'))         { if(typeof toggleTheme==='function') toggleTheme(); }
  };
  rec.onend = function() {
    active = false;
    btn.querySelector('i').className = 'fa-solid fa-microphone';
    btn.style.color=''; btn.style.borderColor='';
  };
  btn.addEventListener('click', function() {
    if (!active) { rec.start(); active=true; btn.querySelector('i').className='fa-solid fa-microphone-lines'; btn.style.color='#f38ba8'; btn.style.borderColor='#f38ba8'; }
    else rec.stop();
  });
}

/* ── 8. EASTER EGG (all pages except index) ─────────────── */
function initEasterEgg() {
  var p = location.pathname;
  if (p.endsWith('index.html') || p === '/' || p.endsWith('/')) return;

  var egg = document.createElement('div');
  egg.style.cssText = 'position:fixed;inset:0;background:#000;z-index:99998;display:none;align-items:center;justify-content:center;flex-direction:column;font-family:monospace;';
  egg.innerHTML = '<div style="color:#00f0ff;font-size:clamp(22px,5vw,50px);margin-bottom:20px;font-weight:700">// HACKER MODE UNLOCKED</div><div id="egg-txt" style="color:#00ff66;font-size:13px;line-height:2.2;max-width:560px;padding:0 20px;"></div><div style="margin-top:28px;color:#8892b0;font-size:12px">Press <kbd style="background:rgba(255,255,255,.1);padding:3px 8px;border-radius:4px;color:#fff">ESC</kbd> to exit</div>';
  document.body.appendChild(egg);

  var lines = ['> Accessing classified files...','> Identity: Oshanda Geethanjana','> Role: Creative Developer & AI Engineer','> Status: Building the future, one commit at a time','> Projects shipped: 50+','> Students reached: 6,000+','> github.com/oshandageethanjana','> "I learn by building — and I build things that matter."'];
  var buf = '';

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { egg.style.display='none'; buf=''; return; }
    buf += e.key.toLowerCase();
    if (buf.length > 7) buf = buf.slice(-7);
    if (buf === 'oshanda') {
      egg.style.display = 'flex';
      var el = document.getElementById('egg-txt'); el.innerHTML = '';
      lines.forEach(function(l,i){ setTimeout(function(){ el.innerHTML+=l+'<br>'; },i*320); });
      buf = '';
    }
  });
}

/* ── 9. FOOTER ──────────────────────────────────────────── */
function initFooter() {
  if (document.getElementById('site-footer')) return;

  var s = document.createElement('style');
  s.textContent = '.fsoc{width:40px;height:40px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;color:#8892b0;text-decoration:none;font-size:16px;transition:.3s;cursor:none !important;}.fsoc:hover{border-color:#00f0ff;color:#00f0ff;background:rgba(0,240,255,.06);}#site-footer{padding:60px 8vw;border-top:1px solid rgba(255,255,255,0.05);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:30px;max-width:1300px;margin:0 auto;}@media(max-width:600px){#site-footer{flex-direction:column;text-align:center;}}';
  document.head.appendChild(s);

  var f = document.createElement('footer');
  f.id = 'site-footer';
  f.innerHTML = '<div><div style="font-family:monospace;font-weight:700;font-size:18px;color:#fff;margin-bottom:8px">Oshanda<span style="color:#00f0ff">.</span></div><div style="font-family:monospace;font-size:12px;color:#8892b0">&copy;'+new Date().getFullYear()+' Oshanda Geethanjana. All rights reserved.</div></div><div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"><a href="https://github.com/oshandageethanjana" target="_blank" class="fsoc" title="GitHub"><i class="fa-brands fa-github"></i></a><a href="https://lk.linkedin.com/in/oshanda-geethanjana-725574336" target="_blank" class="fsoc" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a><a href="https://www.instagram.com/whitecoder._" target="_blank" class="fsoc" title="Instagram"><i class="fa-brands fa-instagram"></i></a><a href="https://wa.me/94764778100" target="_blank" class="fsoc" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a><a href="mailto:oshanda@whitecoder.online" class="fsoc" title="Email"><i class="fa-solid fa-envelope"></i></a></div><div style="font-family:monospace;font-size:11px;color:#8892b0;text-align:right"><div style="color:#00ff66;margin-bottom:4px">&#9679; Available for projects</div><div>Sri Lanka</div></div>';

  document.body.appendChild(f);
  f.querySelectorAll('.fsoc').forEach(function(a) {
    a.addEventListener('mouseenter',function(){var c=document.getElementById('cursor');if(c)c.classList.add('active-link');});
    a.addEventListener('mouseleave',function(){var c=document.getElementById('cursor');if(c)c.classList.remove('active-link');});
  });
}

/* ── 10. GSAP SCROLL ANIMATIONS ─────────────────────────── */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.glass-card').forEach(function(el, i) {
    gsap.fromTo(el,{y:60,opacity:0,rotateX:8,transformPerspective:800},{y:0,opacity:1,rotateX:0,duration:.8,ease:'power3.out',delay:(i%3)*.08,scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'}});
  });
  gsap.utils.toArray('.skill-card').forEach(function(el, i) {
    gsap.fromTo(el,{y:40,opacity:0,scale:.92},{y:0,opacity:1,scale:1,duration:.5,ease:'back.out(1.4)',delay:i*.05,scrollTrigger:{trigger:el,start:'top 90%',toggleActions:'play none none none'}});
  });
  gsap.utils.toArray('.h-card').forEach(function(el, i) {
    gsap.fromTo(el,{x:60,opacity:0},{x:0,opacity:1,duration:.6,ease:'power3.out',delay:i*.1,scrollTrigger:{trigger:el,start:'top 90%',toggleActions:'play none none none'}});
  });
  var img = document.getElementById('hero-img');
  if (img) gsap.to(img,{yPercent:-12,ease:'none',scrollTrigger:{trigger:img,start:'top bottom',end:'bottom top',scrub:true}});
}

/* ── 11. KINETIC TYPOGRAPHY ─────────────────────────────── */
function initKineticTypography() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  var h = document.querySelector('.hero-title');
  if (!h) return;
  var sv = 1;
  ScrollTrigger.create({start:'top top',end:'bottom bottom',onUpdate:function(self){
    var v = Math.min(1.18, 1 + Math.abs(self.getVelocity()) * 0.00008);
    sv += (v - sv) * 0.15;
    h.style.transform = 'scaleY('+sv+')';
    h.style.transformOrigin = 'top center';
  }});
}

/* ── 12. LETTER REVEAL ──────────────────────────────────── */
function initLetterReveal() {
  if (typeof gsap === 'undefined') return;
  ['name-chars','surname-chars'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var txt = el.textContent; el.innerHTML = '';
    txt.split('').forEach(function(ch) {
      var sp = document.createElement('span');
      sp.style.cssText = 'display:inline-block;transition:transform .3s,color .3s;';
      sp.textContent = ch === ' ' ? '\u00A0' : ch;
      sp.addEventListener('mouseenter',function(){this.style.color='#00f0ff';this.style.transform='translateY(-6px) rotate(-3deg)';});
      sp.addEventListener('mouseleave',function(){this.style.color='';this.style.transform='';});
      el.appendChild(sp);
    });
    gsap.fromTo(el.querySelectorAll('span'),{y:40,opacity:0,rotateX:40},{y:0,opacity:1,rotateX:0,duration:.6,stagger:.04,ease:'back.out(2)',delay:2.2});
  });
}

/* ── 13. UI SOUND EFFECTS ───────────────────────────────── */
var SFX = {
  _ctx:null, _muted:localStorage.getItem('sfx-muted')==='true',
  _getCtx:function(){if(!this._ctx)this._ctx=new(window.AudioContext||window.webkitAudioContext)();return this._ctx;},
  _beep:function(freq,type,dur,vol){if(this._muted)return;try{var c=this._getCtx(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(vol||.04,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur);o.start(c.currentTime);o.stop(c.currentTime+dur);}catch(e){}},
  hover:function(){this._beep(880,'sine',.08,.03);},
  click:function(){this._beep(660,'square',.06,.04);},
  nav:function(){this._beep(440,'sine',.12,.04);},
  toggleMute:function(){this._muted=!this._muted;localStorage.setItem('sfx-muted',this._muted);return this._muted;},
  isMuted:function(){return this._muted;}
};

function initSoundEffects() {
  document.querySelectorAll('a,button,.glass-card,.skill-card,.filter-btn').forEach(function(el){
    el.addEventListener('mouseenter',function(){SFX.hover();},{passive:true});
    el.addEventListener('click',function(){SFX.click();},{passive:true});
  });
  document.querySelectorAll('.nav-links a').forEach(function(el){
    el.addEventListener('mouseenter',function(){SFX.nav();},{passive:true});
  });
}

/* ── 14. AMBIENT AUDIO ──────────────────────────────────── */
function initAmbientAudio() {
  var btn = document.getElementById('ambient-btn');
  if (!btn) return;
  var ctx = null, playing = false;
  btn.addEventListener('click', function() {
    if (!playing) {
      ctx = new(window.AudioContext||window.webkitAudioContext)();
      var m=ctx.createGain();m.gain.value=.04;m.connect(ctx.destination);
      [[55,.5],[220,.2],[880,.05]].forEach(function(p,i){
        var o=ctx.createOscillator(),g=ctx.createGain();
        o.type='sine';o.frequency.value=p[0];g.gain.value=p[1];
        o.connect(g);g.connect(m);o.start();
        if(i>0){var lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=i===1?.15:.08;lg.gain.value=i===1?20:40;lfo.connect(lg);lg.connect(o.frequency);lfo.start();}
      });
      playing=true; btn.querySelector('i').className='fa-solid fa-volume-high';
    } else {
      if(ctx){ctx.close();ctx=null;}
      playing=false; btn.querySelector('i').className='fa-solid fa-volume-xmark';
    }
  });
}

/* ── 15. SFX TOGGLE ─────────────────────────────────────── */
function initSfxToggle() {
  var btn = document.getElementById('sfx-btn');
  if (!btn) return;
  btn.querySelector('i').className = SFX.isMuted()?'fa-solid fa-bell-slash':'fa-solid fa-bell';
  btn.addEventListener('click',function(){
    var m=SFX.toggleMute();
    btn.querySelector('i').className=m?'fa-solid fa-bell-slash':'fa-solid fa-bell';
  });
}

/* ── 16. DEVELOPER MODE ─────────────────────────────────── */
var portfolioData={developer:{name:"Oshanda Geethanjana",role:"Creative Developer & AI Engineer",location:"Sri Lanka",email:"oshanda7@gmail.com",github:"github.com/oshandageethanjana",linkedin:"in/oshanda-geethanjana-725574336"},stats:{projects_built:"50+",students_reached:"6000+",years_of_dev:"3+",award:"1st Place, Technovation 2025"},companies:[{name:"WhiteCoder",role:"Founder & Lead Developer",year:"2023-Present"},{name:"HND Study Hub",role:"Founder & Manager",year:"2024-Present"},{name:"Abans PLC",role:"Customer Service Officer",year:"2023-2024"}],tech_stack:["JavaScript","PHP","MySQL","HTML5","CSS3","Tailwind","Figma","AI/Prompt Eng","Three.js","Python"],featured_projects:[{name:"WhiteCoder Copilot",url:"copilot.whitecoder.online",category:"AI"},{name:"HND Study Hub",url:"hndstudy.online",category:"EdTech"},{name:"ResumeIQ",url:"resumeiq.whitecoder.online",category:"AI"},{name:"ProfileAI",url:"profileai.click",category:"AI"},{name:"Smart POS System",url:"whitecoder.online/demos/pos_system",category:"FullStack"}],availability:"Open to freelance & AI projects"};

function syntaxHighlightJSON(o){var j=JSON.stringify(o,null,2).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');return j.replace(/(\"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*\"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,function(m){if(/^"/.test(m)){if(/:$/.test(m))return'<span style="color:#89b4fa">'+m+'</span>';return'<span style="color:#a6e3a1">'+m+'</span>';}if(/true|false/.test(m))return'<span style="color:#fab387">'+m+'</span>';if(/null/.test(m))return'<span style="color:#f38ba8">'+m+'</span>';return'<span style="color:#fab387">'+m+'</span>';});}

function initDevMode() {
  var btn=document.getElementById('devmode-btn'),ov=document.getElementById('devmode-overlay');
  if(!btn||!ov) return;
  btn.addEventListener('click',function(){
    var open=ov.style.display==='flex';
    ov.style.display=open?'none':'flex';
    if(!open){var c=document.getElementById('devmode-code');if(c&&!c.innerHTML)c.innerHTML=syntaxHighlightJSON(portfolioData);if(typeof gsap!=='undefined')gsap.fromTo(ov,{opacity:0},{opacity:1,duration:.3});}
  });
  var cb=document.getElementById('devmode-close');
  if(cb)cb.addEventListener('click',function(){if(typeof gsap!=='undefined')gsap.to(ov,{opacity:0,duration:.3,onComplete:function(){ov.style.display='none';}});else ov.style.display='none';});
  document.addEventListener('keydown',function(e){
    if(e.key.toLowerCase()==='d'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA')btn.click();
    if(e.key==='Escape'&&ov.style.display==='flex')ov.style.display='none';
  });
}

/* ── 17. INJECT VOICE BUTTON ────────────────────────────── */
function injectVoiceButton() {
  var bar=document.getElementById('control-bar');
  if(!bar||document.getElementById('voice-btn'))return;
  if(!window.SpeechRecognition&&!window.webkitSpeechRecognition)return;
  var b=document.createElement('button');
  b.className='ctrl-btn';b.id='voice-btn';b.title='Voice navigation (en)';
  b.innerHTML='<i class="fa-solid fa-microphone"></i><span class="ctrl-tooltip">Voice Nav</span>';
  bar.appendChild(b);
}

/* ── 18. INIT ALL ───────────────────────────────────────── */
function initSharedFeatures(options) {
  options = options || {};
  initScrollProgress();
  initBackToTop();
  initMobileMenu();
  initActiveNav();
  initTypewriter();
  initCursorTrail();
  injectVoiceButton();
  initVoiceNav();
  initEasterEgg();
  initFooter();
  if (options.scrollAnimations !== false) initScrollAnimations();
  if (options.kineticTypography) initKineticTypography();
  if (options.letterReveal) initLetterReveal();
  initSoundEffects();
  initAmbientAudio();
  initDevMode();
  initSfxToggle();
}
