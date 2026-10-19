/* ===== Tokens ===== */
:root{
  --bg:#F5F2EB; --bg-2:#ECE8DD; --surface:#FFFFFF;
  --ink:#101714; --muted:#55605A; --line:#D9D4C6;
  --accent:#C8F169; --accent-text:#34600F;
  --btn-bg:#101714; --btn-text:#F5F2EB;
  --shadow:0 18px 40px -24px rgba(16,23,20,.35);
  --radius:16px;
  --font-display:'Bricolage Grotesque','Segoe UI',system-ui,sans-serif;
  --font-body:'Instrument Sans','Segoe UI',system-ui,sans-serif;
}
[data-theme="dark"]{
  --bg:#0C110F; --bg-2:#111814; --surface:#161E1A;
  --ink:#EEF1EA; --muted:#9AA69E; --line:#26312B;
  --accent:#C8F169; --accent-text:#C8F169;
  --btn-bg:#C8F169; --btn-text:#0C110F;
  --shadow:0 18px 40px -24px rgba(0,0,0,.7);
}

/* ===== Base ===== */
.sprite{position:absolute;width:0;height:0}
.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:90px}
body{background:var(--bg);color:var(--ink);font-family:var(--font-body);line-height:1.6;transition:background .25s ease,color .25s ease}
h1,h2,h3,h4,.brand{font-family:var(--font-display);letter-spacing:-.02em;line-height:1.12}
a{color:inherit;text-decoration:none}
ul,ol{list-style:none}
button{font:inherit;color:inherit;cursor:pointer;background:none;border:none}
:focus-visible{outline:2px solid var(--accent-text);outline-offset:3px;border-radius:6px}
.skip-link{position:absolute;left:12px;top:-60px;background:var(--btn-bg);color:var(--btn-text);padding:10px 16px;border-radius:8px;z-index:100}
.skip-link:focus{top:12px}
.wrap{max-width:1120px;margin:0 auto;padding:0 24px}
.narrow{max-width:820px}
.muted-s{font-size:12px;color:var(--muted)}
.ico{stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
svg use{stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}

/* ===== Announcement ===== */
.announce{display:flex;justify-content:center;align-items:center;gap:12px;background:var(--accent);color:#101714;padding:9px 44px;font-size:14px;font-weight:500;position:relative;text-align:center}
.announce a{text-decoration:underline;text-underline-offset:3px;font-weight:600}
.announce-close{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:22px;line-height:1;width:30px;height:30px;border-radius:50%}
.announce-close:hover{background:rgba(16,23,20,.12)}
.announce.hidden{display:none}

/* ===== Header ===== */
.site-header{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.header-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;height:72px}
.brand{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:20px}
.brand-mark{width:22px;height:22px;border-radius:50%;border:4px solid var(--accent);position:relative;background:var(--bg)}
.brand-mark::after{content:'';position:absolute;inset:3px;border-radius:50%;background:var(--accent)}
.brand-pro{color:var(--accent-text);font-weight:600}
.nav-list{display:flex;align-items:center;gap:6px}
.nav-link{display:inline-flex;align-items:center;gap:6px;padding:9px 14px;border-radius:999px;font-size:15px;font-weight:500;color:var(--muted);transition:color .15s,background .15s}
.nav-link:hover,.nav-link.active{color:var(--ink);background:var(--bg-2)}
.has-dropdown{position:relative}
.chev{transition:transform .2s}
.dropdown-toggle[aria-expanded="true"] .chev{transform:rotate(180deg)}
.dropdown{position:absolute;left:0;top:calc(100% + 8px);min-width:270px;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:8px;box-shadow:var(--shadow);opacity:0;visibility:hidden;transform:translateY(6px);transition:opacity .15s,transform .15s,visibility .15s}
.has-dropdown.open .dropdown,.has-dropdown:hover .dropdown{opacity:1;visibility:visible;transform:none}
.dropdown a{display:flex;flex-direction:column;gap:2px;padding:10px 12px;border-radius:10px}
.dropdown a:hover{background:var(--bg-2)}
.dropdown strong{font-size:14.5px}
.dropdown span{font-size:13px;color:var(--muted)}
.header-actions{display:flex;align-items:center;gap:10px}
.icon-btn{width:40px;height:40px;border-radius:50%;border:1px solid var(--line);display:inline-flex;align-items:center;justify-content:center;transition:border-color .15s,transform .15s}
.icon-btn:hover{border-color:var(--accent-text);transform:translateY(-1px)}
.i-sun{display:none}
[data-theme="dark"] .i-sun{display:block}
[data-theme="dark"] .i-moon{display:none}
.menu-btn{display:none;flex-direction:column;gap:4px}
.menu-btn span{width:18px;height:2px;background:var(--ink);border-radius:2px;transition:transform .2s,opacity .2s}
.menu-btn[aria-expanded="true"] span:nth-child(1){transform:translateY(6px) rotate(45deg)}
.menu-btn[aria-expanded="true"] span:nth-child(2){opacity:0}
.menu-btn[aria-expanded="true"] span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}

/* ===== Buttons ===== */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;font-weight:600;font-size:15px;padding:12px 22px;transition:transform .15s,box-shadow .15s,background .15s,border-color .15s}
.btn-sm{padding:9px 18px;font-size:14px}
.btn-lg{padding:15px 28px;font-size:16px}
.btn-primary{background:var(--btn-bg);color:var(--btn-text)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 24px -10px color-mix(in srgb,var(--btn-bg) 70%,transparent)}
.btn-primary:disabled{opacity:.6;cursor:wait;transform:none}
.btn-ghost{border:1.5px solid var(--line);color:var(--ink)}
.btn-ghost:hover{border-color:var(--ink);transform:translateY(-2px)}
.btn .ico{transition:transform .15s}
.btn:hover .ico{transform:translateX(3px)}
.full{width:100%}

/* ===== Hero ===== */
.hero{padding:72px 0 56px;overflow:hidden}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13.5px;font-weight:600;color:var(--accent-text);margin-bottom:16px}
.eyebrow .dot{width:8px;height:8px;border-radius:50%;background:var(--accent)}
.hero h1{font-size:clamp(38px,5.4vw,64px);margin-bottom:22px}
.lead{font-size:18px;color:var(--muted);max-width:520px;margin-bottom:30px}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:34px}
.built-with{display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-size:13.5px;color:var(--muted)}
.built-with ul{display:flex;gap:8px;flex-wrap:wrap}
.built-with li{border:1px solid var(--line);padding:4px 12px;border-radius:999px;color:var(--ink);background:var(--surface);font-weight:500}

/* Hero workflow visual */
.flow{position:relative;display:flex;flex-direction:column;gap:14px;padding:8px 0 8px 30px}
.flow::before{content:'';position:absolute;left:10px;top:36px;bottom:70px;width:2px;background:repeating-linear-gradient(var(--line) 0 6px,transparent 6px 12px)}
.flow-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:16px 18px;box-shadow:var(--shadow);position:relative}
.flow-card::before{content:'';position:absolute;left:-26px;top:22px;width:12px;height:12px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px var(--bg)}
.c2{margin-left:26px;animation:floaty 6s ease-in-out infinite}
.c1{animation:floaty 7s ease-in-out infinite reverse}
.c3{margin-left:10px;animation:floaty 8s ease-in-out infinite}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.flow-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.chip{display:inline-block;font-size:12px;font-weight:600;padding:4px 10px;border-radius:999px;border:1px solid var(--line);background:var(--bg-2)}
.chip-accent{background:var(--accent);border-color:var(--accent);color:#101714}
.flow-name{font-weight:600;font-size:15px;margin-bottom:2px}
.flow-text{font-size:14px;color:var(--muted)}
.score li{display:flex;align-items:center;gap:10px;font-size:13.5px;margin-bottom:8px}
.score li>span:first-child{width:74px;color:var(--muted)}
.bar{flex:1;height:6px;background:var(--bg-2);border-radius:6px;overflow:hidden}
.bar i{display:block;height:100%;background:var(--accent-text);border-radius:6px}
.bar i.w88{width:88%}
.bar i.w72{width:72%}
.score b{font-weight:600}
.score .next{color:var(--accent-text)}
.ticks li{display:flex;align-items:center;gap:8px;font-size:14px;margin-bottom:6px}
.ticks svg{color:var(--accent-text);flex-shrink:0}
.flow-note{font-size:12px;color:var(--muted);padding-left:6px}

/* ===== Sections ===== */
.section{padding:88px 0}
.section.alt{background:var(--bg-2)}
.section-head{max-width:620px;margin-bottom:46px}
.section-head h2,.split h2,.contact-grid h2{font-size:clamp(28px,3.6vw,42px);margin-bottom:14px}
.section-head p,.split-copy>p,.contact-grid p{color:var(--muted);font-size:17px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:28px;transition:transform .2s,border-color .2s,box-shadow .2s}
.card:hover{transform:translateY(-4px);border-color:var(--accent-text);box-shadow:var(--shadow)}
.card.featured{border-color:var(--accent-text)}
.card-icon{display:inline-flex;width:46px;height:46px;align-items:center;justify-content:center;border-radius:12px;background:var(--accent);color:#101714;margin-bottom:18px}
.card h3{font-size:20px;margin-bottom:8px}
.card .chip{margin-bottom:14px}
.card p,.mini p,.step p,.work p{color:var(--muted);font-size:15px}
.mini{padding:24px;border-radius:var(--radius);border:1px solid var(--line);background:var(--surface);transition:transform .2s,border-color .2s}
.mini:hover{transform:translateY(-3px);border-color:var(--accent-text)}
.mini h3{font-size:18px;margin-bottom:6px}

/* Steps */
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;counter-reset:s}
.step{padding:26px 24px;border-top:2px solid var(--line);transition:border-color .2s}
.step:hover{border-color:var(--accent-text)}
.step-num{font-family:var(--font-display);font-size:34px;font-weight:700;color:var(--accent-text);display:block;margin-bottom:10px}
.step h3{font-size:19px;margin-bottom:6px}

/* Split sections */
.split{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.split.reverse .split-copy{order:2}
.checks{margin-top:22px;display:grid;gap:12px}
.checks li{display:flex;gap:10px;align-items:flex-start;font-size:15.5px}
.checks svg{color:var(--accent-text);flex-shrink:0;margin-top:3px}
.panel{background:var(--surface);border:1px solid var(--line);border-radius:22px;padding:28px;box-shadow:var(--shadow)}
.mock-field{margin-bottom:14px}
.mock-field span{display:block;font-size:12.5px;font-weight:600;margin-bottom:6px;color:var(--muted)}
.mock-field i{display:block;height:38px;border:1px solid var(--line);border-radius:10px;background:var(--bg)}
.mock-field i.tall{height:76px}
.mock-field i.short{width:55%}
.mock-btn{display:inline-block;background:var(--btn-bg);color:var(--btn-text);font-weight:600;font-size:14px;padding:10px 20px;border-radius:999px;margin-top:4px}
.mock-result{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px;padding-top:18px;border-top:1px dashed var(--line)}
.timeline{position:relative;display:grid;gap:22px;padding-left:26px}
.timeline::before{content:'';position:absolute;left:5px;top:6px;bottom:6px;width:2px;background:var(--line)}
.timeline li{position:relative;display:flex;flex-direction:column;gap:2px}
.timeline li::before{content:'';position:absolute;left:-26px;top:5px;width:12px;height:12px;border-radius:50%;background:var(--surface);border:2px solid var(--accent-text)}
.timeline li.done::before{background:var(--accent);border-color:var(--accent)}
.timeline b{font-size:15px}
.timeline span{font-size:14px;color:var(--muted)}

/* Work */
.work{display:flex;flex-direction:column;gap:6px;padding:24px;border-radius:var(--radius);border:1px solid var(--line);background:var(--surface);transition:transform .2s,border-color .2s,box-shadow .2s}
.work:hover{transform:translateY(-4px);border-color:var(--accent-text);box-shadow:var(--shadow)}
.work-tag{font-size:12px;font-weight:600;color:var(--accent-text)}
.work h3{font-size:20px}
.work p{flex:1}
.work-link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;margin-top:10px}
.work:hover .ico{transform:translateX(3px)}
.work .ico{transition:transform .15s}

/* FAQ */
.accordion{border-top:1px solid var(--line)}
.acc-item{border-bottom:1px solid var(--line)}
.acc-q{width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 4px;text-align:left;font-size:18px;font-weight:600;font-family:var(--font-display)}
.acc-q:hover{color:var(--accent-text)}
.acc-icon{position:relative;width:18px;height:18px;flex-shrink:0}
.acc-icon::before,.acc-icon::after{content:'';position:absolute;left:0;top:8px;width:18px;height:2px;background:currentColor;border-radius:2px;transition:transform .25s}
.acc-icon::after{transform:rotate(90deg)}
.acc-q[aria-expanded="true"] .acc-icon::after{transform:rotate(0)}
.acc-a{max-height:0;overflow:hidden;transition:max-height .3s ease}
.acc-a p{padding:0 4px 22px;color:var(--muted);max-width:640px}

/* Contact */
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
.form{background:var(--surface);border:1px solid var(--line);border-radius:22px;padding:32px;box-shadow:var(--shadow)}
.field{margin-bottom:18px}
.field label{display:block;font-size:14px;font-weight:600;margin-bottom:6px}
.field input,.field select,.field textarea{width:100%;padding:12px 14px;border-radius:10px;border:1.5px solid var(--line);background:var(--bg);color:var(--ink);font:inherit;transition:border-color .15s}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--accent-text)}
.field.invalid input,.field.invalid select,.field.invalid textarea{border-color:#E5533D}
.error{display:block;min-height:18px;margin-top:4px;font-size:13px;color:#E5533D}
.form-status{margin-top:14px;font-size:14.5px;font-weight:600;text-align:center}
.form-status.ok{color:var(--accent-text)}
.form-status.err{color:#E5533D}

.direct-label{margin-top:28px;font-size:14px;font-weight:600;color:var(--muted)}
.direct{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.direct a{display:inline-block;padding:9px 18px;border:1.5px solid var(--line);border-radius:999px;font-size:14.5px;font-weight:600;background:var(--surface);transition:border-color .15s,transform .15s,color .15s}
.direct a:hover{border-color:var(--accent-text);color:var(--accent-text);transform:translateY(-2px)}

/* Footer */
.footer{border-top:1px solid var(--line);padding:60px 0 28px}
.footer-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:40px;margin-bottom:44px}
.footer-brand p{color:var(--muted);font-size:14.5px;max-width:300px;margin-top:14px}
.footer h4{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-bottom:14px;font-family:var(--font-body);font-weight:600}
.footer li{margin-bottom:10px;font-size:15px}
.footer li a{transition:color .15s}
.footer li a:hover{color:var(--accent-text)}
.footer-bottom{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;padding-top:22px;border-top:1px solid var(--line);font-size:13.5px;color:var(--muted)}

/* ===== Motion ===== */
.reveal-load{opacity:0;transform:translateY(22px);animation:loadIn .75s ease forwards}
.reveal-load.delay{animation-delay:.2s}
@keyframes loadIn{to{opacity:1;transform:none}}
.js .reveal{opacity:0;transform:translateY(26px);transition:opacity .6s ease,transform .6s ease}
.js .reveal.is-visible{opacity:1;transform:none}
.js .reveal-stagger.is-visible,.js .stagger.is-visible{transition-delay:calc(var(--i,0) * .08s)}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .reveal-load{animation:none;opacity:1;transform:none}
  .js .reveal{opacity:1;transform:none;transition:none}
  .c1,.c2,.c3{animation:none}
  *{transition-duration:.01ms !important}
}

/* ===== Responsive ===== */
@media (max-width:980px){
  .menu-btn{display:inline-flex}
  .header-cta{display:none}
  .nav{position:absolute;left:0;right:0;top:100%;background:var(--bg);border-bottom:1px solid var(--line);padding:14px 24px 22px;display:none;max-height:calc(100vh - 72px);overflow:auto}
  .nav.open{display:block}
  .nav-list{flex-direction:column;align-items:stretch;gap:2px}
  .nav-link{width:100%;justify-content:space-between;padding:12px 8px;border-radius:10px}
  .dropdown{position:static;opacity:1;visibility:visible;transform:none;box-shadow:none;border:none;padding:0 0 6px 10px;display:none;background:transparent}
  .has-dropdown:hover .dropdown{display:none}
  .has-dropdown.open .dropdown{display:block}
  .grid-4{grid-template-columns:repeat(2,1fr)}
  .steps{grid-template-columns:repeat(2,1fr)}
  .footer-grid{grid-template-columns:1fr 1fr}
}
@media (max-width:860px){
  .hero-grid,.split,.contact-grid{grid-template-columns:1fr;gap:40px}
  .split.reverse .split-copy{order:0}
  .grid-3{grid-template-columns:1fr}
  .section{padding:64px 0}
}
@media (max-width:560px){
  .wrap{padding:0 18px}
  .grid-4,.steps{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr}
  .form{padding:22px}
  .announce{font-size:13px;padding:9px 40px}
  .flow{padding-left:22px}
  .c2{margin-left:12px}.c3{margin-left:4px}
}
