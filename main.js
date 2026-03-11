// ── Copy Email to Clipboard ──────────────────────────────────
function copyEmail(e) {
  e.preventDefault();
  const email = 'sayan1997tolly@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('📋 Email copied to clipboard!', 'success');
  }).catch(() => {
    window.location.href = 'mailto:' + email;
  });
}

// ── Custom Cursor ──────────────────────────────────────────
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0, rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
(function animRing(){
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,input,textarea,[data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ── Progress Bar ───────────────────────────────────────────
const pbar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  pbar.style.width = pct + '%';
});

// ── Theme Toggle ───────────────────────────────────────────
document.getElementById('theme-toggle').addEventListener('click', () => {
  const html = document.documentElement;
  html.setAttribute('data-theme', html.getAttribute('data-theme')==='dark' ? 'light' : 'dark');
});

// ── Typewriter ─────────────────────────────────────────────
const roles = [
  'Full Stack Java Developer',
  'Spring Boot Architect',
  'Microservices Engineer',
  'BFSI Domain Expert',
  'Angular UI Developer',
  'Cloud & DevOps Enthusiast'
];
let ri=0, ci=0, del=false;
const tw = document.getElementById('typewriter');
function type(){
  const word = roles[ri];
  if(!del){ tw.textContent = word.slice(0,++ci); if(ci===word.length){ del=true; setTimeout(type,1800); return; } }
  else { tw.textContent = word.slice(0,--ci); if(ci===0){ del=false; ri=(ri+1)%roles.length; } }
  setTimeout(type, del ? 50 : 100);
}
type();

// ── Scroll Reveal ──────────────────────────────────────────
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e,i) => {
    if(e.isIntersecting){
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── Active Nav ─────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if(window.scrollY >= s.offsetTop - 200) cur = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-nav') === cur);
  });
});

// ── Animated Counters ──────────────────────────────────────
const counters = document.querySelectorAll('[data-count]');
const cobs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const target = +e.target.dataset.count;
      let n=0; const step = target / 60;
      const t = setInterval(()=>{ n=Math.min(n+step,target); e.target.textContent=Math.floor(n)+(target===100?'%':'+'); if(n>=target) clearInterval(t); },20);
      cobs.unobserve(e.target);
    }
  });
}, { threshold:0.5 });
counters.forEach(c => cobs.observe(c));

// ── Skill Bar Animation ────────────────────────────────────
const bobs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.querySelectorAll('.bar-fill').forEach((b,i) => {
        setTimeout(() => { b.style.width = b.dataset.width + '%'; }, i*120);
      });
      bobs.unobserve(e.target);
    }
  });
}, { threshold:0.2 });
document.querySelectorAll('.skill-category').forEach(c => bobs.observe(c));

// ── 3D Tilt Cards ──────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ── Contact Form via EmailJS ───────────────────────────────
// NOTE: Replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID
// with your actual EmailJS credentials from emailjs.com
const EMAILJS_PUBLIC_KEY  = 'RLkKezdt1cISo3uYV';
const EMAILJS_SERVICE_ID  = 'sayan1997tolly@gmail.com';
const EMAILJS_TEMPLATE_ID = 'template_uj070fa';

emailjs.init(EMAILJS_PUBLIC_KEY);

document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-send');
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim() || 'Portfolio Contact';
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    showToast('⚠️ Please fill in all required fields.', 'warn'); return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:    name,
      from_email:   email,
      subject:      subject,
      message:      message,
      to_name:      'Sayan',
    });
    showToast('✅ Message sent! I\'ll get back to you soon.', 'success');
    e.target.reset();
  } catch (err) {
    console.error('EmailJS error:', err);
    showToast('❌ Failed to send. Please email me directly at sayan1997tolly@gmail.com', 'error');
  } finally {
    btn.textContent = 'Send Message ✉️';
    btn.disabled = false;
    btn.style.opacity = '1';
  }
});

// ── Toast Notification ─────────────────────────────────────
function showToast(msg, type) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = msg;
  const colors = { success: '#00e5ff', warn: '#ffb300', error: '#ff6b6b' };
  Object.assign(toast.style, {
    position: 'fixed', bottom: '32px', right: '32px',
    background: 'var(--bg3)', color: colors[type] || '#fff',
    border: `1px solid ${colors[type] || '#fff'}`,
    borderRadius: '12px', padding: '14px 24px',
    fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    zIndex: '9999', opacity: '0',
    transform: 'translateY(20px)',
    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    maxWidth: '360px', lineHeight: '1.5'
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

