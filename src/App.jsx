import { useState, useEffect, useRef } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Syne:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:      #f5f2ec;
  --bg1:     #ede9e1;
  --bg2:     #e6e1d8;
  --bg3:     #faf8f4;
  --card:    #ffffff;
  --line:    rgba(0,0,0,0.07);
  --line2:   rgba(0,0,0,0.13);
  --acc:     #1a6b3a;
  --acc-l:   #e8f5ee;
  --acc-m:   rgba(26,107,58,0.12);
  --acc2:    #c47c2b;
  --acc2-l:  #fdf3e5;
  --text:    #1a1816;
  --muted:   #9b9590;
  --mut2:    #6b6560;
  --serif:   'Lora', Georgia, serif;
  --sans:    'Syne', sans-serif;
  --mono:    'JetBrains Mono', monospace;
  --r:       8px;
  --shadow:  0 2px 16px rgba(0,0,0,0.07);
  --shadow2: 0 8px 40px rgba(0,0,0,0.11);
}

html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-weight: 400;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
::selection { background: var(--acc); color: #fff; }
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--acc); border-radius: 3px; }

@keyframes fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn  { from{opacity:0} to{opacity:1} }
@keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
@keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
@keyframes scanline{ from{top:-40px} to{top:110%} }

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 28px 72px;
  transition: all 0.45s cubic-bezier(.4,0,.2,1);
}
.nav.solid {
  background: rgba(245,242,236,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--line);
  padding: 16px 72px;
  box-shadow: 0 1px 24px rgba(0,0,0,0.06);
}
.logo {
  font-family: var(--serif); font-size: 1.18rem; font-weight: 700;
  color: var(--text); text-decoration: none;
  display: flex; align-items: center; gap: 4px;
}
.logo-bracket { color: var(--acc); font-weight: 400; font-family: var(--mono); font-size: 1rem; }
.nav-links { display: flex; gap: 34px; list-style: none; align-items: center; }
.nav-links a { font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s; }
.nav-links a:hover { color: var(--acc); }
.nav-cta { background: var(--acc); color: #fff; font-family: var(--mono); font-size: 0.61rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 8px 18px; border-radius: 20px; text-decoration: none; transition: all .22s; box-shadow: 0 2px 10px rgba(26,107,58,0.25); }
.nav-cta:hover { background: #145830; }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center; gap: 60px;
  padding: 110px 72px 80px;
  position: relative; overflow: hidden;
}
.hero-bg-dots {
  position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(circle, rgba(0,0,0,0.065) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse 100% 100% at 25% 50%, black 15%, transparent 75%);
}
.hero-left { position: relative; z-index: 1; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 9px;
  font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--acc); margin-bottom: 28px;
  background: var(--acc-l); border: 1px solid rgba(26,107,58,0.2);
  padding: 5px 14px; border-radius: 20px;
  animation: fadeIn .8s .2s forwards; opacity: 0;
}
.hero-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--acc); animation: pulse 2s infinite; }
.hero-name {
  font-family: var(--serif); font-size: clamp(3.8rem,6.5vw,6.2rem); font-weight: 700;
  line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 10px;
  animation: fadeUp .9s .35s forwards; opacity: 0;
}
.hero-name-italic { display: block; font-style: italic; font-weight: 400; color: var(--acc); }
.hero-role-line {
  font-family: var(--mono); font-size: 0.85rem; color: var(--mut2);
  margin: 20px 0 28px; display: flex; align-items: center; gap: 10px;
  animation: fadeUp .9s .5s forwards; opacity: 0;
}
.hero-role-line .cursor { color: var(--acc); animation: blink 1s infinite; }
.hero-desc {
  font-size: 0.96rem; color: var(--mut2); line-height: 1.85; max-width: 420px; margin-bottom: 36px;
  animation: fadeUp .9s .65s forwards; opacity: 0;
}
.hero-desc strong { color: var(--text); font-weight: 600; }
.hero-btns { display: flex; align-items: center; gap: 14px; animation: fadeUp .9s .8s forwards; opacity: 0; }
.btn-primary { background: var(--acc); color: #fff; font-family: var(--mono); font-size: 0.67rem; letter-spacing: 0.1em; text-transform: uppercase; border: none; cursor: pointer; padding: 13px 26px; border-radius: var(--r); transition: all .25s; box-shadow: 0 4px 18px rgba(26,107,58,0.28); display: flex; align-items: center; gap: 10px; }
.btn-primary:hover { background: #145830; gap: 14px; }
.btn-secondary { background: transparent; color: var(--mut2); font-family: var(--mono); font-size: 0.67rem; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid var(--line2); cursor: pointer; padding: 13px 26px; border-radius: var(--r); transition: all .25s; }
.btn-secondary:hover { border-color: var(--acc); color: var(--acc); }
.hero-stats { display: flex; gap: 32px; margin-top: 48px; animation: fadeUp .9s 1s forwards; opacity: 0; }
.stat-item { display: flex; flex-direction: column; gap: 4px; }
.stat-num { font-family: var(--serif); font-size: 1.9rem; font-weight: 700; color: var(--text); line-height: 1; }
.stat-lbl { font-family: var(--mono); font-size: 0.57rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.stat-div { width: 1px; background: var(--line2); align-self: stretch; }

/* ── HERO CODE WINDOW ── */
.hero-right {
  display: flex; align-items: center; justify-content: center;
  position: relative; z-index: 1;
  animation: fadeIn 1s .6s forwards; opacity: 0;
}
.code-window {
  width: 100%; max-width: 500px; background: #1c1e26;
  border-radius: 14px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05);
  overflow: hidden; animation: float 6s ease-in-out infinite;
}
.code-titlebar {
  background: #252830; padding: 12px 18px;
  display: flex; align-items: center; gap: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.code-dot { width: 10px; height: 10px; border-radius: 50%; }
.code-filename { font-family: var(--mono); font-size: 0.64rem; color: #6b7280; letter-spacing: 0.05em; margin-left: 6px; }
.code-body { padding: 22px 20px; position: relative; overflow: hidden; }
.code-body::after { content: ''; position: absolute; left: 0; right: 0; height: 38px; background: linear-gradient(to bottom, transparent, rgba(28,30,38,0.7)); animation: scanline 4s linear infinite; pointer-events: none; opacity: .28; }
.code-line { font-family: var(--mono); font-size: 0.7rem; line-height: 1.9; display: flex; gap: 14px; }
.ln { color: #3a3d4a; min-width: 16px; text-align: right; user-select: none; }
.kw  { color: #c792ea; }
.fn  { color: #82aaff; }
.str { color: #c3e88d; }
.cm  { color: #4a5568; font-style: italic; }
.num { color: #f78c6c; }
.var { color: #eeffff; }
.op  { color: #89ddff; }
.cls { color: #ffcb6b; }
.pn  { color: #89ddff; }
.code-window-footer { background: #1a6b3a; padding: 7px 18px; display: flex; align-items: center; justify-content: space-between; }
.cwf-left { font-family: var(--mono); font-size: 0.57rem; color: rgba(255,255,255,0.7); display: flex; gap: 16px; }
.cwf-right { font-family: var(--mono); font-size: 0.54rem; color: rgba(255,255,255,0.5); }

.code-badge {
  position: absolute; background: var(--card); border: 1px solid var(--line2);
  border-radius: 10px; padding: 10px 16px;
  box-shadow: var(--shadow2); animation: float 5s ease-in-out infinite;
}
.code-badge-1 { top: 10%; right: -20px; animation-delay: 1s; }
.code-badge-2 { bottom: 18%; left: -24px; animation-delay: 2.5s; }
.badge-label { font-family: var(--mono); font-size: 0.57rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
.badge-value { font-family: var(--sans); font-size: 0.82rem; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 6px; }
.badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--acc); animation: pulse 2s infinite; }

/* ── LAYOUT ── */
.wrap { max-width: 1140px; margin: 0 auto; padding: 0 72px; position: relative; z-index: 1; }
.section { padding: 120px 0; border-top: 1px solid var(--line); }
.s-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--acc); margin-bottom: 16px; }
.s-eyebrow::before { content:'//'; opacity: .5; }
.s-title { font-family: var(--serif); font-size: clamp(2.4rem,4.2vw,3.6rem); font-weight: 700; line-height: 1.06; letter-spacing: -0.025em; margin-bottom: 64px; }
.s-title em { font-style: italic; font-weight: 400; color: var(--muted); }

/* ── REVEAL ── */
.reveal { opacity: 0; transform: translateY(20px); transition: opacity .75s ease, transform .75s ease; }
.reveal.visible { opacity: 1; transform: none; }
.d1{transition-delay:.07s} .d2{transition-delay:.16s} .d3{transition-delay:.25s} .d4{transition-delay:.34s}

/* ── ABOUT ── */
.about-layout { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 90px; align-items: start; }
.about-left p { font-size: 0.97rem; line-height: 1.87; color: var(--mut2); margin-bottom: 22px; }
.about-left p strong { color: var(--text); font-weight: 600; }
.avail-pill { display: inline-flex; align-items: center; gap: 8px; background: var(--acc-l); border: 1px solid rgba(26,107,58,0.2); border-radius: 24px; padding: 5px 15px; font-family: var(--mono); font-size: 0.59rem; color: var(--acc); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 30px; }
.avail-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--acc); animation: pulse 2s infinite; }
.info-card { border: 1px solid var(--line2); border-radius: 12px; overflow: hidden; background: var(--card); box-shadow: var(--shadow); }
.info-row { display: flex; justify-content: space-between; align-items: center; padding: 15px 22px; border-bottom: 1px solid var(--line); transition: background .2s; }
.info-row:last-child { border-bottom: none; }
.info-row:hover { background: var(--bg); }
.info-key { font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.info-val { font-size: 0.85rem; color: var(--mut2); }
.info-val a { color: var(--acc); text-decoration: none; }
.info-val a:hover { text-decoration: underline; }

/* ── SKILLS ── */
.skills-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
.skill-cell { background: var(--card); border: 1px solid var(--line2); border-radius: 12px; padding: 26px 22px; transition: transform .25s, box-shadow .25s, border-color .25s; box-shadow: var(--shadow); }
.skill-cell:hover { transform: translateY(-3px); box-shadow: var(--shadow2); border-color: rgba(26,107,58,0.25); }
.skill-cell-lbl { font-family: var(--mono); font-size: 0.59rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--acc); margin-bottom: 18px; }
.skill-list { display: flex; flex-wrap: wrap; gap: 7px; }
.skill-pill { font-size: 0.77rem; color: var(--mut2); padding: 4px 11px; border: 1px solid var(--line2); border-radius: 5px; background: var(--bg); transition: all .2s; cursor: default; }
.skill-pill:hover { border-color: var(--acc); color: var(--acc); background: var(--acc-l); }

/* ── EXPERIENCE ── */
.exp-item { display: grid; grid-template-columns: 190px 1fr; align-items: stretch; position: relative; }
.exp-left { padding: 36px 44px 36px 0; border-right: 1px solid var(--line2); position: relative; }
.exp-left::after { content: ''; position: absolute; right: -5px; top: 44px; width: 9px; height: 9px; border-radius: 50%; background: var(--bg); border: 2px solid var(--acc); }
.exp-right { padding: 36px 0 36px 44px; border-bottom: 1px solid var(--line); }
.exp-item:last-child .exp-right { border-bottom: none; }
.exp-period { font-family: var(--mono); font-size: 0.59rem; color: var(--muted); letter-spacing: 0.08em; line-height: 1.6; white-space: pre-line; }
.exp-company { font-family: var(--serif); font-size: 1.45rem; font-weight: 700; margin-bottom: 4px; }
.exp-role { font-family: var(--mono); font-size: 0.63rem; color: var(--acc); letter-spacing: 0.08em; margin-bottom: 16px; text-transform: uppercase; }
.exp-desc { list-style: none; margin-bottom: 18px; }
.exp-desc li { font-size: 0.88rem; color: var(--mut2); line-height: 1.75; padding-left: 18px; position: relative; margin-bottom: 6px; }
.exp-desc li::before { content: '›'; position: absolute; left: 0; color: var(--acc); font-size: 1rem; }
.exp-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.exp-tag { font-family: var(--mono); font-size: 0.57rem; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; border: 1px solid var(--line2); border-radius: 4px; color: var(--muted); background: var(--bg); }

/* ── PROJECTS ── */
.proj-section { padding: 120px 0; border-top: 1px solid var(--line); background: var(--bg1); }
.proj-inner { max-width: 1140px; margin: 0 auto; padding: 0 72px; }
.proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.proj-card {
  background: var(--card); border: 1px solid var(--line2); border-radius: 16px;
  overflow: hidden; box-shadow: var(--shadow);
  transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s, border-color .3s;
  cursor: default; display: flex; flex-direction: column;
}
.proj-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.13); border-color: rgba(26,107,58,0.3); }

.proj-card.featured {
  grid-column: span 2;
  display: grid; grid-template-columns: 1.1fr 0.9fr;
  min-height: 280px;
}
.proj-card-preview {
  position: relative; overflow: hidden; background: #1c1e26; height: 220px; flex-shrink: 0;
}
.proj-card.featured .proj-card-preview { height: auto; min-height: 280px; }
.proj-preview-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(10,10,20,0.45));
  pointer-events: none;
}
.proj-card-body { padding: 24px 26px 26px; flex: 1; display: flex; flex-direction: column; }
.proj-card.featured .proj-card-body { padding: 38px 38px; justify-content: center; }
.proj-card-num { font-family: var(--mono); font-size: 0.57rem; color: var(--muted); letter-spacing: 0.1em; margin-bottom: 11px; }
.proj-card-name { font-family: var(--serif); font-size: 1.38rem; font-weight: 700; line-height: 1.2; margin-bottom: 8px; }
.proj-card.featured .proj-card-name { font-size: 1.95rem; margin-bottom: 14px; }
.proj-card-tag { font-size: 0.83rem; color: var(--muted); margin-bottom: 14px; line-height: 1.55; }
.proj-card.featured .proj-card-tag { font-size: 0.93rem; color: var(--mut2); margin-bottom: 22px; }
.proj-card-tech { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 14px; }
.proj-card-tech span { font-family: var(--mono); font-size: 0.57rem; color: var(--mut2); padding: 3px 9px; border: 1px solid var(--line2); border-radius: 4px; background: var(--bg); }
.proj-card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--line); }
.proj-card-status { font-family: var(--mono); font-size: 0.57rem; letter-spacing: 0.07em; text-transform: uppercase; padding: 4px 11px; border-radius: 4px; }
.ps-live { background: var(--acc-l); color: var(--acc); border: 1px solid rgba(26,107,58,0.22); }
.ps-wip  { background: var(--acc2-l); color: var(--acc2); border: 1px solid rgba(196,124,43,0.22); }
.proj-card-arrow { width: 32px; height: 32px; border-radius: 50%; background: var(--bg); border: 1px solid var(--line2); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: var(--muted); transition: all .25s; }
.proj-card:hover .proj-card-arrow { background: var(--acc); border-color: var(--acc); color: #fff; transform: rotate(-45deg); }

/* FLOATING PREVIEW */
.proj-preview {
  position: fixed; pointer-events: none; z-index: 500;
  width: 290px; height: 185px; border-radius: 10px; overflow: hidden;
  border: 1px solid rgba(0,0,0,0.1);
  opacity: 0; transform: scale(.93) translateY(8px);
  transition: opacity .2s ease, transform .2s ease;
  box-shadow: 0 32px 72px rgba(0,0,0,0.22);
}
.proj-preview.show { opacity: 1; transform: scale(1) translateY(0); }

/* ── EDUCATION ── */
.edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.edu-card { background: var(--card); border: 1px solid var(--line2); border-radius: 12px; padding: 34px 30px; box-shadow: var(--shadow); transition: transform .28s cubic-bezier(.4,0,.2,1), box-shadow .28s; position: relative; overflow: hidden; }
.edu-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--acc), #5ab97a); opacity: 0; transition: opacity .3s; }
.edu-card:hover { transform: translateY(-4px); box-shadow: var(--shadow2); }
.edu-card:hover::before { opacity: 1; }
.edu-yr { font-family: var(--mono); font-size: 0.59rem; color: var(--acc); letter-spacing: 0.1em; margin-bottom: 20px; }
.edu-deg { font-family: var(--serif); font-size: 1.38rem; font-weight: 700; margin-bottom: 10px; line-height: 1.25; }
.edu-sch { font-size: 0.84rem; color: var(--muted); }

/* ── CONTACT ── */
.contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: start; }
.contact-big { font-family: var(--serif); font-size: clamp(2rem,3vw,2.9rem); font-weight: 700; line-height: 1.14; margin-bottom: 20px; }
.contact-big em { font-style: italic; font-weight: 400; color: var(--muted); }
.contact-sub { font-size: 0.95rem; color: var(--mut2); line-height: 1.82; margin-bottom: 34px; }
.contact-btn { display: inline-flex; align-items: center; gap: 12px; font-family: var(--mono); font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; background: var(--acc); border: none; cursor: pointer; padding: 13px 26px; border-radius: var(--r); transition: all .25s; box-shadow: 0 4px 18px rgba(26,107,58,0.28); }
.contact-btn:hover { background: #145830; gap: 17px; }
.contact-info-card { background: var(--card); border: 1px solid var(--line2); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow); }
.ci-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 22px; border-bottom: 1px solid var(--line); transition: background .2s; }
.ci-row:last-child { border-bottom: none; }
.ci-row:hover { background: var(--bg); }
.ci-key { font-family: var(--mono); font-size: 0.59rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.ci-val { font-size: 0.85rem; color: var(--mut2); }
.ci-val a { color: var(--acc); text-decoration: none; }
.ci-val a:hover { text-decoration: underline; }
.social-links { display: flex; gap: 10px; margin-top: 22px; }
.social-link { font-family: var(--mono); font-size: 0.59rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); border: 1px solid var(--line2); border-radius: 5px; padding: 8px 14px; text-decoration: none; transition: all .2s; background: var(--card); }
.social-link:hover { color: var(--acc); border-color: rgba(26,107,58,0.3); background: var(--acc-l); }

/* ── FOOTER ── */
.footer { border-top: 1px solid var(--line); padding: 26px 72px; display: flex; justify-content: space-between; align-items: center; font-family: var(--mono); font-size: 0.57rem; color: var(--muted); letter-spacing: 0.07em; background: var(--card); }
.footer-back { background: none; border: none; color: var(--muted); cursor: pointer; font-family: var(--mono); font-size: 0.57rem; letter-spacing: 0.07em; display: flex; align-items: center; gap: 6px; transition: color .2s; }
.footer-back:hover { color: var(--acc); }

/* ── RESPONSIVE ── */
@media(max-width:960px){
  .nav{padding:18px 24px;} .nav.solid{padding:12px 24px;}
  .nav-links,.nav-cta{display:none;}
  .hero{grid-template-columns:1fr;padding:100px 24px 70px;gap:0;}
  .hero-right{display:none;}
  .hero-name{font-size:clamp(3.2rem,11vw,5.5rem);}
  .wrap{padding:0 24px;}
  .section{padding:80px 0;}
  .s-title{margin-bottom:42px;}
  .about-layout,.contact-layout,.edu-grid{grid-template-columns:1fr;gap:44px;}
  .skills-grid{grid-template-columns:1fr 1fr;}
  .exp-item{grid-template-columns:1fr;}
  .exp-left{padding:0 0 10px;border-right:none;border-bottom:1px solid var(--line);}
  .exp-left::after{display:none;}
  .exp-right{padding:16px 0 32px;}
  .proj-inner{padding:0 24px;}
  .proj-grid{grid-template-columns:1fr;}
  .proj-card.featured{grid-column:span 1;grid-template-columns:1fr;display:flex;flex-direction:column;}
  .proj-card.featured .proj-card-preview{height:200px;}
  .footer{padding:20px 24px;}
}
`;

// ── Preview Components ────────────────────────────────────────────────────────
function SocialPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#0a0d14',display:'flex',flexDirection:'column'}}>
      <div style={{height:28,background:'#131825',display:'flex',alignItems:'center',gap:5,padding:'0 10px',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        {['#ff5f57','#ffbd2e','#28c840'].map((c,i)=><div key={i} style={{width:7,height:7,borderRadius:'50%',background:c}}/>)}
        <div style={{flex:1,height:8,background:'#1e2636',borderRadius:3,marginLeft:8}}/>
      </div>
      <div style={{flex:1,display:'flex'}}>
        <div style={{width:52,background:'#0f1521',padding:'12px 6px',display:'flex',flexDirection:'column',gap:10,alignItems:'center'}}>
          {[{c:'#7ee8c2',a:1},{c:'#3a4a5e',a:.5},{c:'#3a4a5e',a:.4}].map((x,i)=><div key={i} style={{width:28,height:28,borderRadius:'50%',background:x.c,opacity:x.a}}/>)}
        </div>
        <div style={{flex:1,padding:'9px',display:'flex',flexDirection:'column',gap:8}}>
          {[true,false].map((r,i)=>(
            <div key={i} style={{background:'#0f1521',borderRadius:7,padding:'8px',display:'flex',flexDirection:'column',gap:5,border:'1px solid rgba(255,255,255,0.04)'}}>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <div style={{width:20,height:20,borderRadius:'50%',background:r?'#7ee8c280':'#f0ddb460'}}/>
                <div style={{height:4,width:'38%',background:'#1e2840',borderRadius:2}}/>
              </div>
              <div style={{height:32,background:'#151e30',borderRadius:4}}/>
              <div style={{display:'flex',gap:6}}>{['♥','💬','↗'].map(t=><div key={t} style={{height:12,flex:1,background:'#1a2538',borderRadius:2}}/>)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function GamingPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#060810',display:'flex',flexDirection:'column'}}>
      <div style={{height:24,background:'#0c0f1a',display:'flex',alignItems:'center',gap:5,padding:'0 10px'}}>
        {['#ff5f57','#ffbd2e','#28c840'].map((c,i)=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:c}}/>)}
      </div>
      <div style={{flex:1,padding:'10px',display:'flex',flexDirection:'column',gap:8}}>
        <div style={{display:'flex',gap:6}}>
          {[{c:'#b49dff',f:2,o:.9},{c:'#2a3050',f:1,o:.4},{c:'#1e2535',f:1,o:.3}].map((x,i)=><div key={i} style={{flex:x.f,height:10,background:x.c,borderRadius:2,opacity:x.o}}/>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7,flex:1}}>
          {[['#1a1e2e','#b49dff'],['#141820','#7ee8c2'],['#1a1e2e','#f0ddb0'],['#14181f','#ff7eb3']].map(([bg,ac],i)=>(
            <div key={i} style={{background:bg,borderRadius:7,padding:'8px',border:`1px solid ${ac}22`,display:'flex',flexDirection:'column',gap:4}}>
              <div style={{width:'55%',height:5,background:ac,borderRadius:2,opacity:.7}}/>
              <div style={{width:'70%',height:4,background:ac,borderRadius:2,opacity:.18}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function FoodPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#0c0f15',display:'flex',flexDirection:'column'}}>
      <div style={{height:24,background:'#131720',display:'flex',alignItems:'center',gap:5,padding:'0 10px'}}>
        {['#ff5f57','#ffbd2e','#28c840'].map((c,i)=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:c}}/>)}
      </div>
      <div style={{flex:1,padding:'10px',display:'flex',flexDirection:'column',gap:7}}>
        <div style={{display:'flex',gap:7}}>
          <div style={{flex:1,height:22,background:'#1a2030',borderRadius:5,border:'1px solid #252e45'}}/>
          <div style={{width:46,height:22,background:'#f0ddb080',borderRadius:5}}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7,flex:1}}>
          {[['#f9731618','#f97316'],['#22c55e18','#22c55e'],['#f59e0b18','#f59e0b'],['#7ee8c218','#7ee8c2']].map(([bg,ac],i)=>(
            <div key={i} style={{background:'#111620',borderRadius:7,border:'1px solid #1c2535',overflow:'hidden',display:'flex',flexDirection:'column'}}>
              <div style={{height:36,background:bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:13,height:13,borderRadius:'50%',background:ac,opacity:.65}}/>
              </div>
              <div style={{padding:'5px 7px',display:'flex',flexDirection:'column',gap:3}}>
                <div style={{height:4,width:'60%',background:'#252e45',borderRadius:2}}/>
                <div style={{height:3,width:'40%',background:'#1c2535',borderRadius:2}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function ChatPreview() {
  const msgs=[{r:false,t:"Hey! Working on anything?"},{r:true,t:"Building something 🚀"},{r:false,t:"Looks amazing!"},{r:true,t:"Thanks! Almost done."}];
  return (
    <div style={{width:'100%',height:'100%',background:'#090c14',display:'flex',flexDirection:'column'}}>
      <div style={{height:34,background:'#0f1522',display:'flex',alignItems:'center',gap:7,padding:'0 10px',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        {['#ff5f57','#ffbd2e','#28c840'].map((c,i)=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:c}}/>)}
        <div style={{width:20,height:20,borderRadius:'50%',background:'#7ee8c270',marginLeft:8}}/>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',gap:6,padding:'9px',overflow:'hidden'}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:'flex',justifyContent:m.r?'flex-end':'flex-start'}}>
            <div style={{background:m.r?'#1a3a2e':'#151e30',border:`1px solid ${m.r?'#7ee8c225':'#1e2840'}`,borderRadius:8,padding:'4px 8px',maxWidth:'70%',fontSize:'0.55rem',color:m.r?'#7ee8c2':'#8899bb',lineHeight:1.4}}>{m.t}</div>
          </div>
        ))}
        <div style={{marginTop:'auto',display:'flex',gap:5}}>
          <div style={{flex:1,height:18,background:'#0f1522',border:'1px solid #1e2840',borderRadius:9}}/>
          <div style={{width:18,height:18,borderRadius:'50%',background:'#7ee8c270'}}/>
        </div>
      </div>
    </div>
  );
}
function BookPreview() {
  const covers=['#a78bfa','#f97316','#22d3ee','#4ade80','#f472b6'];
  return (
    <div style={{width:'100%',height:'100%',background:'#0c0f15',display:'flex',flexDirection:'column'}}>
      <div style={{height:24,background:'#131720',display:'flex',alignItems:'center',gap:5,padding:'0 10px'}}>
        {['#ff5f57','#ffbd2e','#28c840'].map((c,i)=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:c}}/>)}
      </div>
      <div style={{flex:1,padding:'10px',display:'flex',flexDirection:'column',gap:6}}>
        <div style={{display:'flex',gap:6}}>
          <div style={{flex:1,height:20,background:'#1a2030',borderRadius:4,border:'1px solid #252e45'}}/>
          <div style={{width:38,height:20,background:'#f0ddb070',borderRadius:4}}/>
        </div>
        {covers.map((c,i)=>(
          <div key={i} style={{display:'flex',gap:7,alignItems:'center',padding:'4px 6px',background:'#111620',borderRadius:4,border:'1px solid #1c2535'}}>
            <div style={{width:14,height:20,borderRadius:2,background:c,opacity:.75,flexShrink:0}}/>
            <div style={{flex:1,display:'flex',flexDirection:'column',gap:3}}>
              <div style={{height:4,width:'58%',background:'#252e45',borderRadius:2}}/>
              <div style={{height:3,width:'38%',background:'#1c2535',borderRadius:2}}/>
            </div>
            <div style={{width:28,height:12,background:'#f0ddb050',borderRadius:2}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { num:'01', name:'Social Media App',            tag:'Real-time social platform built with MERN stack. Features live notifications, posts, and friend connections.',  tech:['MERN','Socket.io','JWT'],      status:'wip',  featured:true,  Preview:SocialPreview },
  { num:'02', name:'Multiplayer Gaming Platform', tag:'Online real-time multiplayer games with matchmaking via Node.js WebSockets.',                                    tech:['Node.js','Socket.io','React'],  status:'wip',  featured:false, Preview:GamingPreview },
  { num:'03', name:'Food Ordering App',           tag:'AI-integrated restaurant finder and ordering platform using MERN.',                                             tech:['MERN','REST API','MongoDB'],    status:'live', featured:false, Preview:FoodPreview },
  { num:'04', name:'Chatting Application',        tag:'Real-time messaging with WebSocket rooms and typing indicators.',                                               tech:['MERN','Socket.io'],             status:'live', featured:false, Preview:ChatPreview },
  { num:'05', name:'Book Ordering App',           tag:'Full-stack online bookstore with search, cart, and order management.',                                         tech:['Node.js','Express','MySQL'],    status:'live', featured:false, Preview:BookPreview },
];

const SKILLS_DATA = [
  { label:'Languages',    items:['JavaScript','Java','Python','C++','HTML','CSS'] },
  { label:'Technologies', items:['Node.js','Express.js','React','Socket.io','REST APIs','JWT'] },
  { label:'Databases',    items:['MongoDB','MySQL'] },
  { label:'Tools',        items:['Git','GitHub','AWS','Vercel','Render'] },
];

const EXPERIENCE = [
  { company:'RainWire',        role:'Software Developer',       period:'Jan 2026\n– Present',  tags:['Defence','Current'],   desc:['Developing a mission-critical defence project for the Indian Army.'] },
  { company:'Unified Mentor',  role:'Full Stack Web Developer', period:'Jul – Aug 2024',       tags:['MERN','Internship'],   desc:['Built full-stack apps using React, Node.js, Express & MongoDB.','Developed RESTful APIs for authentication and data management.'] },
  { company:'Interview Mocks', role:'Graphic Designer',         period:'May – Jul 2023',       tags:['Design','Internship'], desc:['Designed graphics and layouts for social media and digital platforms.'] },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.07 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useTypewriter(words) {
  const [text, setText] = useState('');
  const s = useRef({ w:0, c:0, del:false });
  useEffect(() => {
    const id = setInterval(() => {
      const st = s.current; const word = words[st.w];
      if (!st.del) {
        setText(word.slice(0, st.c + 1));
        if (st.c + 1 === word.length) setTimeout(() => { s.current.del = true; }, 1800);
        st.c++;
      } else {
        setText(word.slice(0, st.c - 1));
        if (st.c - 1 === 0) { st.del = false; st.w = (st.w + 1) % words.length; st.c = 0; }
        else st.c--;
      }
    }, 90);
    return () => clearInterval(id);
  }, [words]);
  return text;
}

// ── Components ────────────────────────────────────────────────────────────────
function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const h = () => setSolid(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={`nav${solid ? ' solid' : ''}`}>
      <a className="logo" href="#home">
        <span className="logo-bracket">&lt;</span>Ankush<span className="logo-bracket">/&gt;</span>
      </a>
      <ul className="nav-links">
        {['About','Skills','Experience','Projects','Education','Contact'].map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
        ))}
      </ul>
      <a className="nav-cta" href="#contact">Hire Me</a>
    </nav>
  );
}

function CodeWindow() {
  const lines = [
    [{t:'cm',v:'// Full Stack Developer — 2026'}],
    null,
    [{t:'kw',v:'const '},{t:'var',v:'developer'},{t:'op',v:' = '}],
    [{t:'pn',v:'  {'}],
    [{t:'str',v:'    name'},{t:'pn',v:': '},{t:'str',v:'"Ankush Dhull"'},{t:'pn',v:','}],
    [{t:'str',v:'    role'},{t:'pn',v:': '},{t:'str',v:'"MERN Developer"'},{t:'pn',v:','}],
    [{t:'str',v:'    stack'},{t:'pn',v:': ['},{t:'str',v:'"React"'},{t:'pn',v:','},{t:'str',v:'"Node"'},{t:'pn',v:']'}],
    [{t:'pn',v:'  };'}],
    null,
    [{t:'kw',v:'async function '},{t:'fn',v:'buildProject'},{t:'pn',v:'('},{t:'var',v:'idea'},{t:'pn',v:') {'}],
    [{t:'kw',v:'  const '},{t:'var',v:'app'},{t:'op',v:' = '},{t:'kw',v:'await '},{t:'fn',v:'create'},{t:'pn',v:'('},{t:'var',v:'idea'},{t:'pn',v:');'}],
    [{t:'kw',v:'  return '},{t:'var',v:'app'},{t:'pn',v:'.'},{t:'fn',v:'deploy'},{t:'pn',v:'();'}],
    [{t:'pn',v:'}'}],
    null,
    [{t:'cm',v:'// Currently: Defence App @ RainWire 🚀'}],
  ];
  return (
    <div className="code-window">
      <div className="code-titlebar">
        <div className="code-dot" style={{background:'#ff5f57'}}/>
        <div className="code-dot" style={{background:'#ffbd2e'}}/>
        <div className="code-dot" style={{background:'#28c840'}}/>
        <span className="code-filename">ankush.dev.js</span>
        <span style={{marginLeft:'auto',fontFamily:'var(--mono)',fontSize:'0.54rem',color:'#4a5568'}}>JS ESNext</span>
      </div>
      <div className="code-body">
        {lines.map((line, i) => (
          <div className="code-line" key={i}>
            <span className="ln">{i+1}</span>
            <span>{line ? line.map((p,j) => <span key={j} className={p.t}>{p.v}</span>) : ''}</span>
          </div>
        ))}
      </div>
      <div className="code-window-footer">
        <div className="cwf-left"><span>JavaScript</span><span>UTF-8</span><span>Ln 15</span></div>
        <div className="cwf-right">● Live</div>
      </div>
    </div>
  );
}

function Hero() {
  const role = useTypewriter(['Full Stack Developer','MERN Stack Engineer','React Developer','API Architect']);
  return (
    <section className="hero" id="home">
      <div className="hero-bg-dots"/>
      <div className="hero-left">
        <div className="hero-eyebrow"><span className="hero-dot"/>Available for opportunities</div>
        <h1 className="hero-name">
          Ankush
          <span className="hero-name-italic">Dhull.</span>
        </h1>
        <div className="hero-role-line">
          <span style={{color:'var(--acc)'}}>$</span>
          <span>{role}</span>
          <span className="cursor">|</span>
        </div>
        <p className="hero-desc">
          <strong>MCA student & MERN developer</strong> building scalable real-time web applications.
          Currently at <strong>RainWire</strong> crafting defence-grade software for the Indian Army.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({behavior:'smooth'})}>
            View Projects <span>→</span>
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})}>
            Let's Talk
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-num">5+</span>
            <span className="stat-lbl">Projects</span>
          </div>
          <div className="stat-div"/>
          <div className="stat-item">
            <span className="stat-num">2</span>
            <span className="stat-lbl">Internships</span>
          </div>
          <div className="stat-div"/>
          <div className="stat-item">
            <span className="stat-num">MCA</span>
            <span className="stat-lbl">Pursuing</span>
          </div>
        </div>
      </div>
      <div className="hero-right" style={{position:'relative'}}>
        <CodeWindow/>
        <div className="code-badge code-badge-1">
          <div className="badge-label">Status</div>
          <div className="badge-value"><span className="badge-dot"/>Open to Work</div>
        </div>
        <div className="code-badge code-badge-2">
          <div className="badge-label">Stack</div>
          <div className="badge-value" style={{fontSize:'0.75rem'}}>MERN + Socket.io</div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <div className="wrap">
      <section className="section" id="about">
        <div className="s-eyebrow reveal">About Me</div>
        <div className="about-layout">
          <div className="reveal d1">
            <div className="avail-pill"><span className="avail-dot"/>Open to opportunities</div>
            <p>I'm a <strong>Full Stack Web Developer</strong> from Rohtak, India — specializing in the MERN stack, REST APIs, JWT authentication, and real-time features with Socket.io.</p>
            <p>Currently at <strong>RainWire</strong> developing a mission-critical defence project for the Indian Army, while completing my MCA at JCC Community College, Delhi.</p>
            <p>I'm seeking an entry-level Full Stack / MERN Developer role to contribute to <strong>high-impact software projects</strong>.</p>
          </div>
          <div className="reveal d2">
            <div className="info-card">
              {[
                {k:'Email',        v:<a href="mailto:ankushdhull9908@gmail.com">ankushdhull9908@gmail.com</a>},
                {k:'Phone',        v:'+91 7404722365'},
                {k:'Location',     v:'Rohtak, Haryana, India'},
                {k:'Education',    v:'MCA — JCC College, Delhi'},
                {k:'Current Role', v:'Software Dev @ RainWire'},
                {k:'Status',       v:<span style={{color:'var(--acc)',fontWeight:600}}>Available for hire</span>},
              ].map(r => (
                <div className="info-row" key={r.k}>
                  <span className="info-key">{r.k}</span>
                  <span className="info-val">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Skills() {
  return (
    <div className="wrap">
      <section className="section" id="skills">
        <div className="s-eyebrow reveal">Skills</div>
        <div className="s-title reveal">Tech <em>Stack</em></div>
        <div className="skills-grid reveal d1">
          {SKILLS_DATA.map(g => (
            <div className="skill-cell" key={g.label}>
              <div className="skill-cell-lbl">{g.label}</div>
              <div className="skill-list">
                {g.items.map(i => <span className="skill-pill" key={i}>{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Experience() {
  return (
    <div className="wrap">
      <section className="section" id="experience">
        <div className="s-eyebrow reveal">Experience</div>
        <div className="s-title reveal">Where I've <em>Worked</em></div>
        {EXPERIENCE.map((e, i) => (
          <div className={`exp-item reveal d${i+1}`} key={e.company}>
            <div className="exp-left"><div className="exp-period">{e.period}</div></div>
            <div className="exp-right">
              <div className="exp-company">{e.company}</div>
              <div className="exp-role">{e.role}</div>
              <ul className="exp-desc">{e.desc.map((d,j)=><li key={j}>{d}</li>)}</ul>
              <div className="exp-tags">{e.tags.map(t=><span className="exp-tag" key={t}>{t}</span>)}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function Projects() {
  const [hovered, setHovered] = useState(null);
  const [pos, setPos]         = useState({x:0,y:0});
  const [show, setShow]       = useState(false);
  const timer = useRef(null);

  const onMove  = (e) => {
    const x = Math.min(e.clientX + 24, window.innerWidth - 305);
    const y = Math.max(10, Math.min(e.clientY - 92, window.innerHeight - 200));
    setPos({x,y});
  };
  const onEnter = (p) => { clearTimeout(timer.current); setHovered(p); timer.current = setTimeout(()=>setShow(true),50); };
  const onLeave = () => { setShow(false); timer.current = setTimeout(()=>setHovered(null),220); };

  const Preview = hovered?.Preview;
  const featured = PROJECTS.find(p=>p.featured);
  const rest = PROJECTS.filter(p=>!p.featured);

  return (
    <>
      {hovered && (
        <div className={`proj-preview${show?' show':''}`} style={{left:pos.x,top:pos.y}}>
          {Preview && <Preview/>}
        </div>
      )}
      <section className="proj-section" id="projects" onMouseMove={onMove}>
        <div className="proj-inner">
          <div className="s-eyebrow reveal">Projects</div>
          <div className="s-title reveal">Selected <em>Work</em></div>
          <div className="proj-grid">
            {featured && (
              <div className="proj-card featured reveal d1" onMouseEnter={()=>onEnter(featured)} onMouseLeave={onLeave}>
                <div className="proj-card-preview"><featured.Preview/><div className="proj-preview-overlay"/></div>
                <div className="proj-card-body">
                  <div className="proj-card-num">{featured.num} — Featured Project</div>
                  <div className="proj-card-name">{featured.name}</div>
                  <div className="proj-card-tag">{featured.tag}</div>
                  <div className="proj-card-tech">{featured.tech.map(t=><span key={t}>{t}</span>)}</div>
                  <div className="proj-card-footer">
                    <span className={featured.status==='wip'?'ps-wip':'ps-live'}>{featured.status==='wip'?'In Progress':'Live'}</span>
                    <div className="proj-card-arrow">→</div>
                  </div>
                </div>
              </div>
            )}
            {rest.map((p,i) => (
              <div key={p.num} className={`proj-card reveal d${(i%3)+1}`} onMouseEnter={()=>onEnter(p)} onMouseLeave={onLeave}>
                <div className="proj-card-preview"><p.Preview/><div className="proj-preview-overlay"/></div>
                <div className="proj-card-body">
                  <div className="proj-card-num">{p.num}</div>
                  <div className="proj-card-name">{p.name}</div>
                  <div className="proj-card-tag">{p.tag}</div>
                  <div className="proj-card-tech">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
                  <div className="proj-card-footer">
                    <span className={p.status==='wip'?'ps-wip':'ps-live'}>{p.status==='wip'?'In Progress':'Live'}</span>
                    <div className="proj-card-arrow">→</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Education() {
  return (
    <div className="wrap">
      <section className="section" id="education">
        <div className="s-eyebrow reveal">Education</div>
        <div className="s-title reveal">Academic <em>Background</em></div>
        <div className="edu-grid">
          {[
            {year:'2024 – 2026',deg:'Master of Computer Application',sch:'JCC Community College, Delhi'},
            {year:'2021 – 2024',deg:'Bachelor of Computer Application',sch:'JCC Community College, Delhi'},
          ].map((e,i)=>(
            <div className={`edu-card reveal d${i+1}`} key={e.deg}>
              <div className="edu-yr">{e.year}</div>
              <div className="edu-deg">{e.deg}</div>
              <div className="edu-sch">{e.sch}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="wrap">
      <section className="section" id="contact">
        <div className="s-eyebrow reveal">Contact</div>
        <div className="contact-layout">
          <div className="reveal d1">
            <div className="contact-big">Let's build<br/><em>something great</em></div>
            <p className="contact-sub">Open to full-stack roles, freelance projects, and interesting collaborations. Drop me a message — I'd love to connect.</p>
            <button className="contact-btn" onClick={()=>window.location.href='mailto:ankushdhull9908@gmail.com'}>
              <span>Send a Message</span><span>→</span>
            </button>
            <div className="social-links">
              <a className="social-link" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              <a className="social-link" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="reveal d2">
            <div className="contact-info-card">
              {[
                {k:'Email',        v:<a href="mailto:ankushdhull9908@gmail.com">ankushdhull9908@gmail.com</a>},
                {k:'Phone',        v:'+91 7404722365'},
                {k:'Location',     v:'Rohtak, Haryana, India'},
                {k:'Availability', v:<span style={{color:'var(--acc)',fontWeight:600}}>Open to work</span>},
              ].map(c=>(
                <div className="ci-row" key={c.k}>
                  <span className="ci-key">{c.k}</span>
                  <span className="ci-val">{c.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>Ankush Dhull — Full Stack Developer © 2026</span>
      <button className="footer-back" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to top ↑</button>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <style>{STYLES}</style>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}