/* ============================================================
   INVITATION ROYALE — script.js
   Animations : Anime.js v4 (local) | 3 langues FR / EN / AR
   Règle n°1 : aucune emoji
   ============================================================ */

import {
  animate,
  createTimeline,
  createSpring,
  stagger,
  utils,
} from './anime.esm.min.js';

/* ---------- Configuration (à modifier plus tard) ---------- */
const CONFIG = {
  whatsapp: '',       // numéro WhatsApp complet SANS '+' ni espaces, ex: '213555123456'
  mapsUrl: '',        // lien Google Maps exact du lieu (vide = lien Google Maps générique)
  music: '',          // chemin du fichier musique, ex: 'audio/ambiance.mp3' (vide = pas de musique)
  photo: 'photos/baby.jpg', // photo du bébé (vide = illustration seule)
};

/* ---------- Dictionnaire des 3 langues ---------- */
const I18N = {
  fr: {
    docTitle: 'Invitation de naissance',
    miracle: 'Une petite merveille est arrivée…',
    chooseLang: 'Choisissez votre langue',
    cardTeaser: 'Une surprise vous attend…',
    welcomeKicker: 'Bienvenue au monde',
    name: '[PRÉNOM]',
    welcome: 'Nous avons le bonheur de vous annoncer la naissance de notre enfant',
    bornLabel: 'Né(e) le',
    timeLabel: 'Heure',
    weightLabel: 'Poids',
    heightLabel: 'Taille',
    birthDate: '[DATE]',
    birthTime: '[HEURE]',
    birthWeight: '[POIDS]',
    birthHeight: '[TAILLE]',
    parentsMsg: '« Depuis que tu es arrivé(e), notre monde est devenu encore plus beau. Tu es notre plus belle histoire. »',
    parentsNames: '[Prénoms des parents]',
    partyTitle: 'Nous aimerions partager ce merveilleux moment avec vous',
    partyDate: '[DATE DE LA FÊTE]',
    partyTime: '[HEURE]',
    partyPlace: '[LIEU]',
    mapsBtn: "Voir l'itinéraire",
    rsvpTitle: 'Serez-vous des nôtres ?',
    rsvpYes: 'Oui, avec plaisir',
    rsvpNo: 'Je ne pourrai pas venir',
    foot: 'Fait avec amour',
    rsvpMsgYes: 'Je serai présent(e) à la célébration.',
    rsvpMsgNo: 'Je ne pourrai pas être présent(e), mais je vous souhaite tout le bonheur.',
  },
  en: {
    docTitle: 'Birth Invitation',
    miracle: 'A little miracle has arrived…',
    chooseLang: 'Choose your language',
    cardTeaser: 'A surprise awaits you…',
    welcomeKicker: 'Welcome to the world',
    name: '[NAME]',
    welcome: 'It is with great joy that we announce the birth of our child',
    bornLabel: 'Born',
    timeLabel: 'Time',
    weightLabel: 'Weight',
    heightLabel: 'Height',
    birthDate: '[DATE]',
    birthTime: '[TIME]',
    birthWeight: '[WEIGHT]',
    birthHeight: '[HEIGHT]',
    parentsMsg: '“Ever since you arrived, our world has become more beautiful. You are our most beautiful story.”',
    parentsNames: "[Parents' names]",
    partyTitle: 'We would love to share this wonderful moment with you',
    partyDate: '[PARTY DATE]',
    partyTime: '[TIME]',
    partyPlace: '[VENUE]',
    mapsBtn: 'View directions',
    rsvpTitle: 'Will you join us?',
    rsvpYes: 'Yes, with pleasure',
    rsvpNo: "I won't be able to attend",
    foot: 'Made with love',
    rsvpMsgYes: "I'll be there for the celebration.",
    rsvpMsgNo: "I won't be able to attend, but I wish you all the happiness.",
  },
  ar: {
    docTitle: 'دعوة ميلاد',
    miracle: 'وصلت معجزة صغيرة…',
    chooseLang: 'اختر لغتك',
    cardTeaser: 'مفاجأة بانتظاركم…',
    welcomeKicker: 'أهلاً بك في العالم',
    name: '[الاسم]',
    welcome: 'يسعدنا أن نعلن لكم عن ولادة طفلنا',
    bornLabel: 'وُلِد',
    timeLabel: 'الساعة',
    weightLabel: 'الوزن',
    heightLabel: 'الطول',
    birthDate: '[التاريخ]',
    birthTime: '[الوقت]',
    birthWeight: '[الوزن]',
    birthHeight: '[الطول]',
    parentsMsg: '« منذ وصولك، صار عالمنا أجمل. أنت أجمل قصصنا. »',
    parentsNames: '[أسماء الوالدين]',
    partyTitle: 'نسعد بمشاركتكم هذه اللحظة الجميلة',
    partyDate: '[موعد الاحتفال]',
    partyTime: '[الساعة]',
    partyPlace: '[المكان]',
    mapsBtn: 'عرض الاتجاهات',
    rsvpTitle: 'هل ستكونون معنا؟',
    rsvpYes: 'نعم، بكل سرور',
    rsvpNo: 'لن أستطيع الحضور',
    foot: 'صُنع بحب',
    rsvpMsgYes: 'سأحضر الاحتفال.',
    rsvpMsgNo: 'لن أستطيع الحضور، لكن أتمنى لكم كل السعادة.',
  },
};

const state = { lang: 'fr', opened: false };

/* ============================================================
   INITIALISATION
   ============================================================ */
document.documentElement.classList.add('js');
injectCrowns();
spawnDust();
spawnPetals();
applyLanguage('fr');
initPhoto();
introIn();
initMusic();
observeReveals();

/* ---------- Couronne : injection du modèle SVG ---------- */
function injectCrowns() {
  const tpl = document.getElementById('crownTpl').innerHTML;
  document.querySelectorAll('.open-crown, .envelope__emblem, .invite__crown').forEach((el) => {
    el.insertAdjacentHTML('beforeend', tpl);
  });
}

/* ---------- Poussière dorée scintillante ---------- */
function spawnDust() {
  const box = document.getElementById('dust');
  for (let i = 0; i < 36; i++) {
    const s = document.createElement('span');
    s.className = 'dust';
    const size = utils.random(2, 4);
    s.style.left = utils.random(0, 100) + '%';
    s.style.top = utils.random(0, 100) + '%';
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    box.appendChild(s);
  }
  animate('.dust', {
    opacity: [0.08, 0.7],
    scale: [0.6, 1.25],
    duration: () => utils.random(1800, 4200),
    delay: () => utils.random(0, 3500),
    loop: true,
    alternate: true,
    ease: 'inOutSine',
  });
}

/* ---------- Pétales doux qui tombent ---------- */
function spawnPetals() {
  const box = document.getElementById('petals');
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.style.left = utils.random(0, 100) + '%';
    p.style.width = utils.random(10, 15) + 'px';
    p.style.height = utils.random(14, 20) + 'px';
    box.appendChild(p);
  }
  animate('.petal', {
    y: [0, window.innerHeight + 160],
    rotate: [0, () => utils.random(360, 720)],
    opacity: [0, 0.9, 0],
    duration: () => utils.random(12000, 22000),
    delay: () => utils.random(0, 14000),
    loop: true,
    ease: 'inOutSine',
  });
}

/* ---------- Photo du bébé (si présente) ---------- */
function initPhoto() {
  if (!CONFIG.photo) return;
  const med = document.getElementById('medallion');
  const img = document.createElement('img');
  img.className = 'medallion__photo';
  img.alt = '';
  img.onload = () => img.classList.add('is-loaded');
  img.onerror = () => img.remove();
  img.src = CONFIG.photo;
  med.insertBefore(img, med.firstChild);
}

/* ---------- Acte 1 : apparition ---------- */
function introIn() {
  const tl = createTimeline({ defaults: { ease: 'outExpo' } });
  tl.add('.envelope-wrap', { scale: [0.8, 1], opacity: [0, 1], duration: 1200, ease: createSpring({ stiffness: 120, damping: 16 }) }, 250)
    .add('.envelope__emblem', { scale: [0.4, 1], rotate: [12, 0], duration: 900, ease: createSpring({ stiffness: 150, damping: 13 }) }, '-=820')
    .add('.open-crown', { opacity: [0, 1], y: [-14, 0], duration: 900 }, '-=850')
    .add('.open-miracle', { opacity: [0, 1], y: [16, 0], duration: 1000 }, '-=680')
    .add('.open-lang', { opacity: [0, 1], y: [12, 0], duration: 750 }, '-=620')
    .add('.lang-btn', { opacity: [0, 1], y: [16, 0], delay: stagger(120), duration: 750, ease: createSpring({ stiffness: 160, damping: 15 }) }, '-=520')
    .add('.lang-sep', { opacity: [0, 1], scaleY: [0, 1], duration: 500 }, '-=560');
}

/* ---------- Choix de langue ---------- */
document.getElementById('langButtons').addEventListener('click', (e) => {
  const btn = e.target.closest('.lang-btn');
  if (!btn || state.opened) return;
  state.lang = btn.dataset.lang;
  applyLanguage(state.lang);
  tryStartMusic();
  openInvitation();
});

function applyLanguage(lang) {
  const root = document.documentElement;
  root.setAttribute('lang', lang);
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] != null) el.textContent = dict[key];
  });
  document.title = dict.docTitle;
}

/* ============================================================
   OUVERTURE DE L'ENVELOPPE
   ============================================================ */
function openInvitation() {
  if (state.opened) return;
  state.opened = true;

  const tl = createTimeline({ defaults: { ease: 'inOutExpo' } });
  tl.add('.envelope__flap', { rotateX: -182, duration: 1000, ease: 'inOutQuart' }, 0)
    .add('.envelope__seal', { opacity: 0, scale: 0.7, duration: 460 }, 0)
    .add('.envelope__card', { y: -205, scale: 1.06, duration: 820, ease: 'outCubic' }, 360)
    .add('.open-stage', { opacity: 0, scale: 0.95, duration: 560 }, 1150)
    .add(() => {
      document.getElementById('scene-open').classList.add('is-hidden');
      document.getElementById('scene-invite').classList.add('is-active');
      window.scrollTo(0, 0);
      revealInvite();
    }, 1630);
}

/* ---------- Acte 2 & 3 : contenu de l'invitation ---------- */
function revealInvite() {
  const nameEl = document.querySelector('.invite__name');
  if (state.lang !== 'ar') splitChars(nameEl);

  const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 850 } });
  tl.add('.invite', { opacity: [0, 1], y: [40, 0], scale: [0.98, 1], duration: 900 })
    .add('.invite__crown', { scale: [0.5, 1], rotate: [-12, 0], duration: 1100, ease: createSpring({ stiffness: 120, damping: 13 }) }, '-=720')
    .add('.invite__kicker', { opacity: [0, 1], y: [14, 0] }, '-=920')
    .add('.invite__name .ch', {
      opacity: [0, 1],
      y: () => utils.random(20, 42),
      rotate: () => utils.random(-8, 8),
      filter: ['blur(5px)', 'blur(0px)'],
      delay: stagger(40),
      duration: 700,
    }, '-=680')
    .add('.medallion', { opacity: [0, 1], scale: [0.82, 1], duration: 1100, ease: createSpring({ stiffness: 150, damping: 15 }) }, '-=700')
    .add('.invite__welcome', { opacity: [0, 1], y: [16, 0] }, '-=820')
    .add('.invite__stats .stat', {
      opacity: [0, 1],
      y: [26, 0],
      scale: [0.92, 1],
      delay: stagger(110),
      ease: createSpring({ stiffness: 150, damping: 15 }),
    }, '-=840')
    .add('.invite__parents', { opacity: [0, 1], y: [24, 0] }, '-=720')
    .add('.invite__foot', { opacity: [0, 1] }, '-=460');
}

/* ---------- Lettre par lettre (prénoms non-arabes) ---------- */
function splitChars(el) {
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.textContent = '';
  for (const ch of text) {
    const s = document.createElement('span');
    s.className = 'ch';
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    el.appendChild(s);
  }
}

/* ---------- Révélation au scroll (fête + RSVP) ---------- */
function observeReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const kids = [...el.children];
      animate(kids.length ? kids : el, {
        opacity: [0, 1],
        y: [36, 0],
        delay: stagger(140),
        duration: 1000,
        ease: 'outExpo',
      });
      io.unobserve(el);
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

/* ============================================================
   MUSIQUE
   ============================================================ */
function initMusic() {
  if (!CONFIG.music) return;
  const btn = document.getElementById('musicBtn');
  const audio = document.getElementById('music');
  const icoOn = document.getElementById('icoSound');
  const icoOff = document.getElementById('icoMuted');
  audio.src = CONFIG.music;
  btn.classList.add('visible');
  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      icoOn.classList.add('is-hidden');
      icoOff.classList.remove('is-hidden');
    } else {
      audio.pause();
      icoOn.classList.remove('is-hidden');
      icoOff.classList.add('is-hidden');
    }
  });
}

function tryStartMusic() {
  if (!CONFIG.music) return;
  const audio = document.getElementById('music');
  audio.play().catch(() => {});
}

/* ============================================================
   RSVP — confirmation via WhatsApp
   ============================================================ */
function waLink(msg) {
  if (CONFIG.whatsapp) return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg);
  return 'https://api.whatsapp.com/send?text=' + encodeURIComponent(msg);
}

document.getElementById('rsvpYes').addEventListener('click', () => {
  heartBurst(document.getElementById('rsvpYes'));
  window.open(waLink(I18N[state.lang].rsvpMsgYes), '_blank', 'noopener');
});

document.getElementById('rsvpNo').addEventListener('click', () => {
  window.open(waLink(I18N[state.lang].rsvpMsgNo), '_blank', 'noopener');
});

document.getElementById('mapsBtn').addEventListener('click', (e) => {
  if (CONFIG.mapsUrl) {
    e.preventDefault();
    window.open(CONFIG.mapsUrl, '_blank', 'noopener');
  }
});

/* ---------- Cœurs (SVG) qui s'envolent ---------- */
function heartSvg() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.5-9.2-9A5 5 0 0 1 12 6.5 5 5 0 0 1 21.2 11C19 15.5 12 20 12 20z"/></svg>';
}

function heartBurst(btn) {
  const r = btn.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  for (let i = 0; i < 10; i++) {
    const h = document.createElement('span');
    h.className = 'burst';
    h.style.color = i % 2 === 0 ? '#c3a05e' : '#e7c8bc';
    h.innerHTML = heartSvg();
    h.style.left = cx + 'px';
    h.style.top = cy + 'px';
    document.body.appendChild(h);
    animate(h, {
      x: utils.random(-120, 120),
      y: utils.random(-150, 40),
      opacity: [1, 0],
      scale: [0.7, 1.4],
      rotate: utils.random(-70, 70),
      duration: 1000,
      ease: 'outCubic',
    });
    setTimeout(() => h.remove(), 1050);
  }
}
