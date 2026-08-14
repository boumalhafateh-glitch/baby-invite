/* ============================================================
   INVITATION DE NAISSANCE — script.js
   Animations : Anime.js v4 (local) | 3 langues FR / EN / AR
   Règle n°1 : aucune emoji — animations discrètes
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
    miracle: 'Une petite merveille est arrivée',
    chooseLang: 'Choisissez votre langue',
    cardTeaser: 'Une surprise vous attend',
    name: '[PRÉNOM]',
    inviteLine: 'Nous avons le plaisir de vous inviter à célébrer la naissance de',
    bornInfo: 'Né(e) le [DATE] à [HEURE]',
    statsInfo: 'Poids [POIDS] · Taille [TAILLE]',
    parentsMsg: '« Depuis que tu es arrivé(e), notre monde est devenu encore plus beau. »',
    parentsNames: '[Prénoms des parents]',
    partyTitle: 'Nous aimerions partager ce merveilleux moment avec vous',
    partyDate: '[22 AOÛT 2026]',
    partyTime: '[18:00]',
    partyPlace: '[LIEU]',
    mapsBtn: "Voir l'itinéraire",
    rsvpLead: 'Votre présence nous ferait très plaisir.',
    rsvpTitle: 'Serez-vous des nôtres ?',
    rsvpYes: 'Je serai présent(e)',
    rsvpNo: 'Je ne pourrai pas venir',
    foot: 'Avec amour',
    rsvpMsgYes: 'Je serai présent(e) à la célébration.',
    rsvpMsgNo: 'Je ne pourrai pas être présent(e), mais je vous souhaite tout le bonheur.',
  },
  en: {
    docTitle: 'Birth Invitation',
    miracle: 'A little miracle has arrived',
    chooseLang: 'Choose your language',
    cardTeaser: 'A surprise awaits you',
    name: '[NAME]',
    inviteLine: 'We would be delighted to invite you to celebrate the birth of',
    bornInfo: 'Born on [DATE] at [TIME]',
    statsInfo: 'Weight [WEIGHT] · Height [HEIGHT]',
    parentsMsg: '“Ever since you arrived, our world has become more beautiful.”',
    parentsNames: "[Parents' names]",
    partyTitle: 'We would love to share this wonderful moment with you',
    partyDate: '[AUGUST 22, 2026]',
    partyTime: '[6:00 PM]',
    partyPlace: '[VENUE]',
    mapsBtn: 'View directions',
    rsvpLead: 'Your presence would mean the world to us.',
    rsvpTitle: 'Will you join us?',
    rsvpYes: "I'll be there",
    rsvpNo: "I won't be able to attend",
    foot: 'With love',
    rsvpMsgYes: "I'll be there for the celebration.",
    rsvpMsgNo: "I won't be able to attend, but I wish you all the happiness.",
  },
  ar: {
    docTitle: 'دعوة ميلاد',
    miracle: 'وصلت معجزة صغيرة',
    chooseLang: 'اختر لغتك',
    cardTeaser: 'مفاجأة بانتظاركم',
    name: '[الاسم]',
    inviteLine: 'يسعدنا أن ندعوكم للاحتفال بولادة',
    bornInfo: 'وُلِد في [التاريخ] على الساعة [الوقت]',
    statsInfo: 'الوزن [الوزن] · الطول [الطول]',
    parentsMsg: '« منذ وصولك، صار عالمنا أجمل. »',
    parentsNames: '[أسماء الوالدين]',
    partyTitle: 'نسعد بمشاركتكم هذه اللحظة الجميلة',
    partyDate: '[22 أغسطس 2026]',
    partyTime: '[السادسة مساءً]',
    partyPlace: '[المكان]',
    mapsBtn: 'عرض الاتجاهات',
    rsvpLead: 'يسعدنا حضوركم.',
    rsvpTitle: 'هل ستكونون معنا؟',
    rsvpYes: 'سأكون حاضراً',
    rsvpNo: 'لن أستطيع الحضور',
    foot: 'مع الحب',
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
applyLanguage('fr');
initPhoto();
introIn();
initMusic();
observeReveals();

/* ---------- Couronne : injection du modèle SVG ---------- */
function injectCrowns() {
  const tpl = document.getElementById('crownTpl').innerHTML;
  document.querySelectorAll('.open-crown, .envelope__emblem, .head-crown').forEach((el) => {
    el.insertAdjacentHTML('beforeend', tpl);
  });
}

/* ---------- Poussière dorée très discrète ---------- */
function spawnDust() {
  const box = document.getElementById('dust');
  for (let i = 0; i < 26; i++) {
    const s = document.createElement('span');
    s.className = 'dust';
    const size = utils.random(2, 3.5);
    s.style.left = utils.random(0, 100) + '%';
    s.style.top = utils.random(0, 100) + '%';
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    box.appendChild(s);
  }
  animate('.dust', {
    opacity: [0.05, 0.45],
    scale: [0.7, 1.2],
    duration: () => utils.random(2600, 6000),
    delay: () => utils.random(0, 4500),
    loop: true,
    alternate: true,
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

/* ---------- Cover : apparition ---------- */
function introIn() {
  const tl = createTimeline({ defaults: { ease: 'outExpo' } });
  tl.add('.envelope-wrap', { scale: [0.85, 1], opacity: [0, 1], duration: 1300, ease: createSpring({ stiffness: 110, damping: 17 }) }, 250)
    .add('.envelope__emblem', { scale: [0.5, 1], rotate: [10, 0], duration: 950, ease: createSpring({ stiffness: 140, damping: 14 }) }, '-=900')
    .add('.open-crown', { opacity: [0, 1], y: [-12, 0], duration: 1000 }, '-=950')
    .add('.open-miracle', { opacity: [0, 1], y: [14, 0], duration: 1100 }, '-=760')
    .add('.open-lang', { opacity: [0, 1], y: [10, 0], duration: 800 }, '-=760')
    .add('.lang-btn', { opacity: [0, 1], y: [12, 0], delay: stagger(130), duration: 800, ease: createSpring({ stiffness: 140, damping: 16 }) }, '-=620')
    .add('.lang-sep', { opacity: [0, 1], scaleY: [0, 1], duration: 550 }, '-=640');
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
  tl.add('.envelope__flap', { rotateX: -182, duration: 1050, ease: 'inOutQuart' }, 0)
    .add('.envelope__seal', { opacity: 0, scale: 0.7, duration: 480 }, 0)
    .add('.envelope__card', { y: -200, scale: 1.05, duration: 860, ease: 'outCubic' }, 380)
    .add('.open-stage', { opacity: 0, scale: 0.96, duration: 600 }, 1200)
    .add(() => {
      document.getElementById('scene-open').classList.add('is-hidden');
      document.getElementById('scene-invite').classList.add('is-active');
      window.scrollTo(0, 0);
      revealInvite();
    }, 1700);
}

/* ---------- Carte : en-tête ---------- */
function revealInvite() {
  const nameEl = document.querySelector('.head-name');
  if (state.lang !== 'ar') splitChars(nameEl);

  const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 900 } });
  tl.add('.card', { opacity: [0, 1], y: [34, 0], duration: 1000 })
    .add('.head-crown', { scale: [0.6, 1], rotate: [-8, 0], duration: 1200, ease: createSpring({ stiffness: 120, damping: 14 }) }, '-=760')
    .add('.head-kicker', { opacity: [0, 1], y: [12, 0] }, '-=950')
    .add('.head-name .ch', {
      opacity: [0, 1],
      y: () => utils.random(16, 34),
      rotate: () => utils.random(-6, 6),
      delay: stagger(45),
      duration: 750,
    }, '-=700')
    .add('.card__head .rule', { opacity: [0, 1], scaleX: [0, 1], duration: 900 }, '-=560');
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

/* ---------- Révélation douce au scroll ---------- */
function observeReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const kids = [...el.children];
      animate(kids.length ? kids : el, {
        opacity: [0, 1],
        y: [26, 0],
        delay: stagger(150),
        duration: 1200,
        ease: 'outExpo',
      });
      io.unobserve(el);
    });
  }, { threshold: 0.15 });
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
  for (let i = 0; i < 8; i++) {
    const h = document.createElement('span');
    h.className = 'burst';
    h.style.color = i % 2 === 0 ? '#b08d57' : '#8a8375';
    h.innerHTML = heartSvg();
    h.style.left = cx + 'px';
    h.style.top = cy + 'px';
    document.body.appendChild(h);
    animate(h, {
      x: utils.random(-100, 100),
      y: utils.random(-130, 30),
      opacity: [1, 0],
      scale: [0.7, 1.3],
      rotate: utils.random(-60, 60),
      duration: 1100,
      ease: 'outCubic',
    });
    setTimeout(() => h.remove(), 1150);
  }
}
