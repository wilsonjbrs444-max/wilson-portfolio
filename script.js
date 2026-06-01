/* ════════════════════════════════════════
   WILSON PORTFOLIO — script.js — iOS 26
   ════════════════════════════════════════ */
   "use strict";
   const $  = (s,c=document)=>c.querySelector(s);
   const $$ = (s,c=document)=>[...c.querySelectorAll(s)];
   
   /* ══ 1. CURSOR ══════════════════════════ */
   (()=>{
     const c=$('#cursor'), f=$('#cursorFollower');
     if(!c||!f||matchMedia('(pointer:coarse)').matches)return;
     let mx=-200,my=-200,fx=-200,fy=-200;
     addEventListener('mousemove',e=>{
       mx=e.clientX;my=e.clientY;
       c.style.left=mx+'px';c.style.top=my+'px';
     });
     (function loop(){
       fx+=(mx-fx)*.11;fy+=(my-fy)*.11;
       f.style.left=fx+'px';f.style.top=fy+'px';
       requestAnimationFrame(loop);
     })();
     const sel='a,button,.ios-chip,.stack-pill,.project-card,.channel-card,.social-pill,.ios-card';
     document.addEventListener('mouseover',e=>{
       if(e.target.closest(sel)){c.classList.add('h');f.classList.add('h')}
     });
     document.addEventListener('mouseout',e=>{
       if(e.target.closest(sel)){c.classList.remove('h');f.classList.remove('h')}
     });
   })();
   
   /* ══ 2. PARTICLES ════════════════════════ */
   (()=>{
     const canvas=$('#particles');
     if(!canvas)return;
     const ctx=canvas.getContext('2d');
     let W,H,pts=[];
     const N=65;
     const COLS=['rgba(59,158,255,','rgba(48,213,194,','rgba(191,139,255,'];
   
     function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
     resize();addEventListener('resize',resize);
   
     class P{
       constructor(){this.reset(true)}
       reset(init=false){
         this.x=Math.random()*W;
         this.y=init?Math.random()*H:H+5;
         this.r=.7+Math.random()*2;
         this.vx=(Math.random()-.5)*.28;
         this.vy=-(0.12+Math.random()*.3);
         this.a=.12+Math.random()*.4;
         this.col=COLS[Math.floor(Math.random()*COLS.length)];
       }
       tick(){this.x+=this.vx;this.y+=this.vy;if(this.y<-8)this.reset()}
       draw(){
         ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
         ctx.fillStyle=this.col+this.a+')';ctx.fill();
       }
     }
     for(let i=0;i<N;i++)pts.push(new P());
   
     (function loop(){
       ctx.clearRect(0,0,W,H);
       pts.forEach(p=>{p.tick();p.draw()});
       for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
         const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y;
         const d=Math.sqrt(dx*dx+dy*dy);
         if(d<110){
           ctx.beginPath();
           ctx.strokeStyle=`rgba(59,158,255,${(1-d/110)*.055})`;
           ctx.lineWidth=.7;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();
         }
       }
       requestAnimationFrame(loop);
     })();
   })();
   
   /* ══ 3. TYPEWRITER ═══════════════════════ */
   (()=>{
     const el=$('#typewriter');
     if(!el)return;
     const words=['Développeur Full-Stack','Passionné de Cybersécurité',"Concepteur d'interfaces","Spécialiste Python","Étudiant & Autodidacte"];
     let wi=0,ci=0,del=false;
     function tick(){
       const w=words[wi];
       if(!del){el.textContent=w.slice(0,++ci);if(ci===w.length){del=true;setTimeout(tick,2200);return}}
       else{el.textContent=w.slice(0,--ci);if(!ci){del=false;wi=(wi+1)%words.length;setTimeout(tick,480);return}}
       setTimeout(tick,del?36:68);
     }
     setTimeout(tick,900);
   })();
   
   /* ══ 4. SCROLL REVEAL ════════════════════ */
   (()=>{
     const els=$$('[data-reveal]');
     if(!els.length)return;
     const io=new IntersectionObserver(entries=>{
       entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}});
     },{threshold:.1});
     els.forEach(el=>io.observe(el));
     // Hero immediate
     $$('.hero [data-reveal]').forEach(el=>{
       setTimeout(()=>el.classList.add('revealed'),parseInt(el.dataset.delay)||0)
     });
   })();
   
   /* ══ 5. NAVBAR ═══════════════════════════ */
   (()=>{
     const nav=$('#navbar');
     const links=$$('.nav-link');
     const secs=$$('section[id]');
     addEventListener('scroll',()=>{
       nav.classList.toggle('scrolled',scrollY>20);
       let cur='';
       secs.forEach(s=>{if(scrollY>=s.offsetTop-130)cur=s.id});
       links.forEach(a=>a.classList.toggle('active',a.dataset.section===cur));
     },{passive:true});
   })();
   
   /* ══ 6. PARALLAX ═════════════════════════ */
   (()=>{
     const wrap=$('.hero__photo-wrap');
     const blobs=$$('.blob');
     if(!wrap)return;
     let ticking=false;
     addEventListener('scroll',()=>{
       if(ticking)return;
       requestAnimationFrame(()=>{
         const sy=scrollY,vp=innerHeight;
         if(sy>vp*1.5){ticking=false;return}
         wrap.style.transform=`translateY(${sy*.15}px)`;
         blobs.forEach((b,i)=>{b.style.transform=`translateY(${sy*(i%2===0?.05:-.04)}px)`});
         ticking=false;
       });
       ticking=true;
     },{passive:true});
   
     const hero=$('.hero');
     if(hero)hero.addEventListener('mousemove',e=>{
       const r=hero.getBoundingClientRect();
       const cx=(e.clientX-r.left)/r.width-.5;
       const cy=(e.clientY-r.top)/r.height-.5;
       wrap.style.transform=`translateY(${scrollY*.15}px) rotateY(${cx*5}deg) rotateX(${-cy*3.5}deg)`;
     });
   })();
   
   /* ══ 7. HAMBURGER ════════════════════════ */
   (()=>{
     const btn=$('#hamburger'),nav=$('#mobileNav');
     if(!btn||!nav)return;
     btn.addEventListener('click',()=>{btn.classList.toggle('open');nav.classList.toggle('open')});
     $$('.mobile-nav__link').forEach(a=>a.addEventListener('click',()=>{btn.classList.remove('open');nav.classList.remove('open')}));
   })();
   
   /* ══ 8. THEME ════════════════════════════ */
   (()=>{
     const btn=$('#themeToggle'),icon=$('#themeIcon'),html=document.documentElement;
     const saved=localStorage.getItem('wilson-theme')||'dark';
     html.setAttribute('data-theme',saved);
     if(icon)icon.textContent=saved==='dark'?'🌙':'☀️';
     if(!btn)return;
     btn.addEventListener('click',()=>{
       const next=html.getAttribute('data-theme')==='dark'?'light':'dark';
       html.setAttribute('data-theme',next);
       localStorage.setItem('wilson-theme',next);
       if(icon)icon.textContent=next==='dark'?'🌙':'☀️';
     });
   })();
   
   /* ══ 9. CONTACT FORM ═════════════════════ */
   (()=>{
     const form=$('#contactForm');if(!form)return;
     const ni=form.querySelector('#name'),ei=form.querySelector('#email');
     const ne=$('#nameError'),ee=$('#emailError'),bt=$('#btnText');
     function ok(){
       let v=true;
       if(ni&&ni.value.trim().length<2){ni.classList.add('err');if(ne)ne.textContent='Nom trop court.';v=false}
       else{if(ni)ni.classList.remove('err');if(ne)ne.textContent=''}
       const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(ei&&!re.test(ei.value)){ei.classList.add('err');if(ee)ee.textContent='Email invalide.';v=false}
       else{if(ei)ei.classList.remove('err');if(ee)ee.textContent=''}
       return v;
     }
     form.addEventListener('submit',e=>{
       e.preventDefault();if(!ok())return;
       const n=ni?ni.value.trim():'',em=ei?ei.value.trim():'';
       const s=(form.querySelector('#subject')||{value:''}).value.trim();
       const m=(form.querySelector('#message')||{value:''}).value.trim();
       window.location.href=`mailto:wilsonjbrs444@icloud.com?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(`Nom: ${n}\nEmail: ${em}\n\n${m}`)}`;
       if(bt){bt.textContent='✓ Envoyé !';setTimeout(()=>bt.textContent='Envoyer le message',4000)}
     });
     [ni,ei].forEach(inp=>{if(!inp)return;inp.addEventListener('blur',ok);inp.addEventListener('input',()=>inp.classList.remove('err'))});
   })();
   
   /* ══ 10. GLASS 3D TILT ═══════════════════ */
   (()=>{
     if(matchMedia('(pointer:coarse)').matches)return;
     $$('.ios-card').forEach(card=>{
       card.addEventListener('mousemove',e=>{
         const r=card.getBoundingClientRect();
         const cx=(e.clientX-r.left)/r.width-.5;
         const cy=(e.clientY-r.top)/r.height-.5;
         card.style.transform=`translateY(-5px) scale(1.006) rotateX(${-cy*6}deg) rotateY(${cx*6}deg)`;
       });
       card.addEventListener('mouseleave',()=>card.style.transform='');
     });
   })();
   
   /* ══ 11. HERO NAME ENTRANCE ══════════════ */
   (()=>{
     $$('.name-line').forEach((l,i)=>{
       l.style.cssText=`opacity:0;transform:translateY(55px);transition:opacity .7s cubic-bezier(.16,1,.3,1) ${.08+i*.13}s,transform .7s cubic-bezier(.16,1,.3,1) ${.08+i*.13}s`;
       setTimeout(()=>{l.style.opacity='1';l.style.transform='translateY(0)'},50);
     });
     const ey=$('.hero__eyebrow');
     if(ey){
       ey.style.cssText='opacity:0;transform:translateY(18px);transition:opacity .55s ease .04s,transform .55s ease .04s';
       setTimeout(()=>{ey.style.opacity='1';ey.style.transform='translateY(0)'},50);
     }
   })();
   
   /* ══ 12. SMOOTH SCROLL ═══════════════════ */
   $$('a[href^="#"]').forEach(a=>{
     a.addEventListener('click',e=>{
       const t=document.querySelector(a.getAttribute('href'));
       if(!t)return;
       e.preventDefault();
       window.scrollTo({top:t.getBoundingClientRect().top+scrollY-76,behavior:'smooth'});
     });
   });
   
   /* ══ 13. YEAR ════════════════════════════ */
   const yr=$('#year');if(yr)yr.textContent=new Date().getFullYear();
   
   console.log('%c WILSON Portfolio 2026 🚀 ','background:linear-gradient(135deg,#3b9eff,#30d5c2);color:#fff;padding:6px 14px;border-radius:20px;font-weight:800');