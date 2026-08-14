/* ============================================================
   INVITATION ROYALE — script.js
   Animations : Anime.js v4 (local) | 3 langues FR / EN / AR
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
};

/* ---------- Dictionnaire des 3 langues ---------- */
const I18N = {
  fr: {
    docTitle: 'Invitation Royale 💌',
    kicker: '✦ Une Cérémonie Royale ✦',
    chooseLang: 'Choisissez votre langue',
    langSub: "L'invitation s'ouvrira dans la langue choisie",
    cardTeaser: 'Une surprise vous attend…',
    miracle: 'Une petite merveille est arrivée',
    name: '[PRÉNOM]',
    welcome: 'Avec une immense joie, nous vous annonçons la naissance de notre petit trésor',
    bornLabel: 'Né(e) le',
    timeLabel: 'À',
    weightLabel: 'Poids',
    heightLabel: 'Taille',
    birthDate: '[DATE]',
    birthTime: '[HEURE]',
    birthWeight: '[POIDS]',
    birthHeight: '[TAILLE]',
    parentsMsg: '« Depuis que tu es arrivé(e), notre monde est devenu encore plus beau. Tu es notre plus belle histoire. »',
    parentsNames: '[Prénoms des parents]',
    partyTitle: 'Nous serions honorés de célébrer cette arrivée avec vous',
    partyDate: '[DATE DE LA FÊTE]',
    partyTime: '[HEURE]',
    partyPlace: '[LIEU]',
    mapsBtn: 'Voir l\'emplacement',
    rsvpTitle: 'Serez-vous parmi nous ?',
    rsvpYes: 'Oui, avec plaisir',
    rsvpNo: 'Je ne pourrai pas venir',
    foot: 'Fait avec amour',
    rsvpMsgYes: 'Je serai présent(e) à la célébration 🎉',
    rsvpMsgNo: 'Je ne pourrai pas être présent(e), mais je vous souhaite tout le bonheur 🥰',
  },
  en: {
    docTitle: 'Royal Invitation 💌',
    kicker: '✦ A Royal Celebration ✦',
    chooseLang: 'Choose your language',
    langSub: 'The invitation will open in your chosen language',
    cardTeaser: 'A surprise awaits you…',
    miracle: 'A little miracle has arrived',
    name: '[NAME]',
    welcome: 'With immense joy, we announce the birth of our little one',
    bornLabel: 'Born',
    timeLabel: 'At',
    weightLabel: 'Weight',
    heightLabel: 'Height',
    birthDate: '[DATE]',
    birthTime: '[TIME]',
    birthWeight: '[WEIGHT]',
    birthHeight: '[HEIGHT]',
    parentsMsg: '“Ever since you arrived, our world has become more beautiful. You are our most beautiful story.”',
    parentsNames: "[Parents' names]",
    partyTitle: 'We would be honored to celebrate this arrival with you',
    partyDate: '[PARTY DATE]',
    partyTime: '[TIME]',
    partyPlace: '[VENUE]',
    mapsBtn: 'View location',
    rsvpTitle: 'Will you be with us?',
    rsvpYes: 'Yes, with pleasure',
    rsvpNo: "I won't be able to attend",
    foot: 'Made with love',
    rsvpMsgYes: "I'll be there for the celebration 🎉",
    rsvpMsgNo: "I won't be able to attend, but I wish you all the happiness 🥰",
  },
  ar: {
    docTitle: 'دعوة ملكية 💌',
    kicker: '✦ احتفال ملكي ✦',
    chooseLang: 'اختر لغتك',
    langSub: 'ستُفتح الدعوة باللغة التي تختارها',
    cardTeaser: 'مفاجأة بانتظاركم…',
    miracle: 'وصلت معجزة صغيرة إلى عالمنا',
    name: '[الاسم]',
    welcome: 'يسعدنا أن نعلن لكم بفرحٍ كبير عن ولادة طفلنا',
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
    partyTitle: 'يشرفنا أن نحتفل بقدومه معكم',
    partyDate: '[موعد الاحتفال]',
    partyTime: '[الساعة]',
    partyPlace: '[المكان]',
    mapsBtn: 'عرض الموقع',
    rsvpTitle: 'هل ستكونون معنا؟',
    rsvpYes: 'نعم، بكل سرور',
    rsvpNo: 'لن أستطيع الحضور',
    foot: 'صُنع بحب',
    rsvpMsgYes: 'سأحضر الاحتفال 🎉',
    rsvpMsgNo: 'لن أستطيع الحضور، لكن أتمنى لكم كل السعادة 🥰',
  },
};

const state = { lang: 'fr', opened: false };

/* ============================================================
   INITIALISATION
   ============================================================ */
document.documentElement.classList.add('js');
injectCrowns();
spawnStars();
spawnPetals();
applyLanguage('fr');
introIn();
initMusic();
observeReveals();

/* ---------- Couronne : injection du modèle SVG ---------- */
function injectCrowns() {
  const tpl = document.getElementById('crownTpl').innerHTML;
  document.querySelectorAll('.envelope__emblem, .invite__crown').forEach((el) => {
    el.insertAdjacentHTML('beforeend', tpl);
  });
}

/* ---------- Étoiles scintillantes ---------- */
function spawnStars() {
  const box = document.getElementById('stars');
  for (let i = 0; i < 46; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    const size = utils.random(2, 4);
    s.style.left = utils.random(0, 100) + '%';
    s.style.top = utils.random(0, 100) + '%';
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    box.appendChild(s);
  }
  animate('.star', {
    opacity: [0.15, 0.95],
    scale: [0.5, 1.35],
    duration: () => utils.random(900, 2400),
    delay: () => utils.random(0, 2200),
    loop: true,
    alternate: true,
    ease: 'inOutSine',
  });
}

/* ---------- Pétales qui tombent ---------- */
function spawnPetals() {
  const box = document.getElementById('petals');
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.style.left = utils.random(0, 100) + '%';
    p.style.width = utils.random(10, 16) + 'px';
    p.style.height = utils.random(15, 22) + 'px';
    box.appendChild(p);
  }
  animate('.petal', {
    y: [0, window.innerHeight + 150],
    rotate: [0, () => utils.random(360, 760)],
    opacity: [0, 1, 0],
    duration: () => utils.random(7500, 15000),
    delay: () => utils.random(0, 9000),
    loop: true,
    ease: 'inOutSine',
  });
}

/* ---------- Scène 1 : apparition ---------- */
function introIn() {
  const tl = createTimeline({ defaults: { ease: 'outExpo' } });
  tl.add('.envelope-wrap', { scale: [0.7, 1], opacity: [0, 1], duration: 1100, ease: createSpring({ stiffness: 130, damping: 15 }) }, 150)
    .add('.envelope__emblem', { scale: [0.3, 1], rotate: [18, 0], duration: 850, ease: createSpring({ stiffness: 160, damping: 12 }) }, '-=750')
    .add('.lang-kicker', { opacity: [0, 1], y: [12, 0], duration: 650 }, '-=700')
    .add('.lang-title', { opacity: [0, 1], y: [18, 0], duration: 750 }, '-=450')
    .add('.lang-sub', { opacity: [0, 1], y: [12, 0], duration: 650 }, '-=420')
    .add('.lang-btn', { opacity: [0, 1], y: [24, 0], delay: stagger(95), duration: 650, ease: createSpring({ stiffness: 180, damping: 14 }) }, '-=350');
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
  tl.add('.envelope__flap', { rotateX: -182, duration: 950, ease: 'inOutQuart' }, 0)
    .add('.envelope__seal', { opacity: 0, scale: 0.7, duration: 430 }, 0)
    .add('.envelope__card', { y: -205, scale: 1.06, duration: 760, ease: 'outCubic' }, 330)
    .add('.envelope-stage', { opacity: 0, scale: 0.94, duration: 540 }, 1080)
    .add(() => {
      document.getElementById('scene-envelope').classList.add('is-hidden');
      document.getElementById('scene-invite').classList.add('is-active');
      window.scrollTo(0, 0);
      revealInvite();
    }, 1560);
}

/* ---------- Scène 2 : contenu de l'invitation ---------- */
function revealInvite() {
  const nameEl = document.querySelector('.invite__name');
  if (state.lang !== 'ar') splitChars(nameEl);

  const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 750 } });
  tl.add('.invite', { opacity: [0, 1], y: [44, 0], scale: [0.97, 1], duration: 860 })
    .add('.invite__crown', { scale: [0.4, 1], rotate: [-14, 0], duration: 1000, ease: createSpring({ stiffness: 130, damping: 12 }) }, '-=680')
    .add('.invite__kicker', { opacity: [0, 1], y: [14, 0] }, '-=840')
    .add('.invite__name .ch', {
      opacity: [0, 1],
      y: () => utils.random(22, 46),
      rotate: () => utils.random(-10, 10),
      filter: ['blur(6px)', 'blur(0px)'],
      delay: stagger(36),
    }, '-=620')
    .add('.invite__divider', { opacity: [0, 1], scaleX: [0, 1] }, '-=430')
    .add('.invite__welcome', { opacity: [0, 1], y: [16, 0] }, '-=540')
    .add('.invite__stats .stat', {
      opacity: [0, 1],
      y: [30, 0],
      scale: [0.85, 1],
      delay: stagger(90),
      ease: createSpring({ stiffness: 170, damping: 14 }),
    }, '-=780')
    .add('.invite__parents', { opacity: [0, 1], y: [26, 0] }, '-=650')
    .add('.invite__foot', { opacity: [0, 1] }, '-=420');
}

/* ---------- Lettre par lettre (noms non-arabes) ---------- */
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

/* ---------- Révélation au scroll (section fête + RSVP) ---------- */
function observeReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const kids = [...el.children];
      animate(kids.length ? kids : el, {
        opacity: [0, 1],
        y: [38, 0],
        delay: stagger(120),
        duration: 900,
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
  audio.src = CONFIG.music;
  btn.classList.add('visible');
  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      btn.textContent = '🔊';
    } else {
      audio.pause();
      btn.textContent = '🔇';
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

/* ---------- Cœurs qui explosent ---------- */
function heartBurst(btn) {
  const r = btn.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  for (let i = 0; i < 12; i++) {
    const h = document.createElement('span');
    h.className = 'burst';
    h.textContent = Math.random() < 0.5 ? '💛' : '❤️';
    h.style.left = cx + 'px';
    h.style.top = cy + 'px';
    document.body.appendChild(h);
    animate(h, {
      x: utils.random(-130, 130),
      y: utils.random(-150, 40),
      opacity: [1, 0],
      scale: [0.6, 1.5],
      rotate: utils.random(-70, 70),
      duration: 950,
      ease: 'outCubic',
    });
    setTimeout(() => h.remove(), 1000);
  }
}
