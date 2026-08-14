// ========================================
// INVITATION DE NAISSANCE — script.js
// Copie du design de référence (Yacine-Diallo-Sarr/Invitation-virtuelle)
// ========================================

// ========================================
// À MODIFIER : date de la célébration
// ========================================

const CELEBRATION_DAY   = '2026-08-22T00:00:00'; // minuit du jour J — mode "jour de la fête"
const CELEBRATION_START = '2026-08-22T18:00:00'; // heure de la fête — compte à rebours

// ========================================
// LANGUES — FR / EN / AR
// ========================================

const I18N = {
  seal:            { fr: 'Ouvrir',            en: 'Open',            ar: 'افتح' },
  heroIntro:       { fr: 'Nous avons la joie de vous annoncer', en: 'We are delighted to announce', ar: 'يسعدنا أن نعلن لكم' },
  storyTitle:      { fr: 'Notre Bonheur',     en: 'Our Joy',         ar: 'فرحتنا' },
  storyP1:         { fr: 'Le [DATE] à [HEURE], notre famille s\'est agrandie. Un petit trésor est venu illuminer nos vies, et nos cœurs battent désormais à l\'unisson au rythme de ses premiers sourires.', en: 'On [DATE] at [HEURE], our family grew by one. A little treasure came to brighten our lives, and our hearts now beat as one to the rhythm of their first smiles.', ar: 'في [DATE] على الساعة [HEURE]، كبرت عائلتنا. جاء كنز صغير ينير حياتنا، وأصبحت قلوبنا تنبض بإيقاع ابتساماته الأولى.' },
  storyP2:         { fr: 'Ce bonheur immense, nous souhaitons le partager avec ceux qui comptent pour nous, avec vous qui avez toujours été présents à nos côtés, dans la joie comme dans la vie de tous les jours.', en: 'This immense joy, we want to share it with those who matter to us, with you who have always been by our side, in happiness as in everyday life.', ar: 'هذه الفرحة العظيمة نريد مشاركتها مع من يعنون لنا الكثير، معكم الذين كنتم دائماً بجانبنا في الفرح وفي الحياة اليومية.' },
  storyP3:         { fr: 'Aujourd\'hui, nous vous invitons à célébrer la naissance de ريان يحي et à venir partager avec nous ce moment inoubliable. Nous serions honorés de votre présence pour accueillir notre petit miracle.', en: 'Today, we invite you to celebrate the birth of ريان يحي and to share this unforgettable moment with us. We would be honored by your presence to welcome our little miracle.', ar: 'اليوم، ندعوكم للاحتفال بميلاد ريان يحي ومشاركتنا هذه اللحظة التي لا تُنسى. سيشرفنا حضوركم للترحيب بمعجزتنا الصغيرة.' },
  eventTitle:      { fr: 'Détails de l\'Événement', en: 'Event Details', ar: 'تفاصيل المناسبة' },
  subtitle:        { fr: 'CÉLÉBRATION',       en: 'CELEBRATION',     ar: 'الاحتفال' },
  evLabelDate:     { fr: 'DATE',              en: 'DATE',            ar: 'التاريخ' },
  evDescBirth:     { fr: 'Jour de naissance', en: 'Birth day',       ar: 'يوم الميلاد' },
  evLabelCelebration: { fr: 'CÉLÉBRATION',    en: 'CELEBRATION',     ar: 'الاحتفال' },
  evDescCelebration:  { fr: 'L\'accueil de ريان يحي', en: 'Welcoming ريان يحي', ar: 'استقبال ريان يحي' },
  evLabelPlace:    { fr: 'LIEU',              en: 'LOCATION',        ar: 'المكان' },
  cdSubtitle:      { fr: 'COMPTE À REBOURS',  en: 'COUNTDOWN',       ar: 'العد التنازلي' },
  cdTitle:         { fr: 'Le Jour de la Fête Approche', en: 'The Big Day Approaches', ar: 'يقترب يوم الاحتفال' },
  cdDays:          { fr: 'Jours',             en: 'Days',            ar: 'أيام' },
  cdHours:         { fr: 'Heures',            en: 'Hours',           ar: 'ساعات' },
  cdMinutes:       { fr: 'Minutes',           en: 'Minutes',         ar: 'دقائق' },
  cdSeconds:       { fr: 'Secondes',          en: 'Seconds',         ar: 'ثوانٍ' },
  title:           { fr: 'Invitation de Naissance', en: 'Birth Invitation', ar: 'دعوة ميلاد' }
};

function chooseLanguage(code) {
    document.documentElement.lang = code;
    document.body.dir = code === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', code === 'ar');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (I18N[key] && I18N[key][code]) el.textContent = I18N[key][code];
    });

    document.title = I18N.title[code];

    const overlay = document.getElementById('langOverlay');
    if (overlay) overlay.style.display = 'none';
}

function initLanguage() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => chooseLanguage(btn.dataset.lang));
    });
}

// ========================================
// DÉTECTION DU JOUR J
// À partir de la date de célébration : seul le hero s'affiche
// ========================================

function isWeddingDay() {
    const now = new Date();
    const weddingDay = new Date(CELEBRATION_DAY);
    return now >= weddingDay;
}

function activateWeddingDayMode() {
    document.body.classList.add('wedding-day');

    const intro = document.getElementById('intro');
    if (intro) intro.style.display = 'none';

    document.body.style.overflow = 'auto';

    // Bouton discret pour lancer la musique (obligatoire sur mobile)
    const musicBtn = document.createElement('button');
    musicBtn.innerHTML = '♪ Musique';
    musicBtn.style.cssText = `
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        z-index: 999;
        background: rgba(212, 165, 116, 0.92);
        color: white;
        border: none;
        border-radius: 9999px;
        padding: 0.65rem 1.3rem;
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: opacity 0.4s ease;
    `;
    document.body.appendChild(musicBtn);

    musicBtn.addEventListener('click', () => {
        playMusic();
        musicBtn.style.opacity = '0';
        setTimeout(() => musicBtn.remove(), 400);
    });
}


// ========================================
// AUDIO PLAYER
// ========================================

const audio = new Audio('audio/music.mp3');
audio.loop = true;
audio.volume = 0.8;

function playMusic() {
    audio.play().catch(err => console.log('Audio error:', err));
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
}

function updateAudioIcon() {
    const btn = document.getElementById('audioBtn');
    if (btn) btn.classList.toggle('playing', !audio.paused);
}

const audioBtn = document.getElementById('audioBtn');
if (audioBtn) {
    audioBtn.addEventListener('click', () => {
        if (audio.paused) playMusic(); else stopMusic();
        updateAudioIcon();
    });
    audio.addEventListener('play', updateAudioIcon);
    audio.addEventListener('pause', updateAudioIcon);
}

window.addEventListener('beforeunload', stopMusic);

window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        audio.pause();
    } else {
        if (!audio.paused) audio.play().catch(() => {});
    }
});


// ========================================
// ENVELOPE / INTRO
// ========================================

const envelope = document.getElementById('envelope');
const intro    = document.getElementById('intro');

if (envelope) {
    envelope.addEventListener('click', () => {
        envelope.style.pointerEvents = 'none';

        playMusic();
        envelope.classList.add('open');

        setTimeout(() => {
            intro.style.transition = 'opacity 1.5s ease';
            intro.style.opacity = '0';

            setTimeout(() => {
                intro.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 1500);

        }, 3000);
    });
}


// ========================================
// COUNTDOWN TIMER
// ========================================

function initCountdown() {
    const celebrationDate = new Date(CELEBRATION_START).getTime();

    function updateCountdown() {
        const distance = celebrationDate - Date.now();

        if (distance > 0) {
            const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent    = String(days).padStart(2, '0');
            document.getElementById('hours').textContent   = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
                document.getElementById(id).textContent = '00';
            });
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}


// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { rootMargin: '-80px', threshold: 0.1 });

    document.querySelectorAll('.fade-on-scroll').forEach(el => observer.observe(el));
}


// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}


// ========================================
// SCROLL INDICATOR
// ========================================

function initScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;

    window.addEventListener('scroll', () => {
        indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
        indicator.style.pointerEvents = window.scrollY > 100 ? 'none' : 'auto';
    });
}


// ========================================
// CARD HOVER EFFECTS
// ========================================

function initCardEffects() {
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
    });
}


// ========================================
// VIEWPORT HEIGHT — fix mobile
// ========================================

function fixMobileViewport() {
    const set = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    set();
    window.addEventListener('resize', set);
}


// ========================================
// ACCESSIBILITY
// ========================================

function initAccessibility() {
    document.body.addEventListener('keydown', e => {
        if (e.key === 'Tab') document.body.classList.add('keyboard-navigation');
    });
    document.body.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}


// ========================================
// INIT
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    initLanguage();

    if (isWeddingDay()) {
        activateWeddingDayMode();
        return;
    }

    initCountdown();
    initScrollAnimations();
    initSmoothScroll();
    initScrollIndicator();
    initCardEffects();
    fixMobileViewport();

    console.log('💐 Invitation de naissance prête !');
});

document.addEventListener('DOMContentLoaded', initAccessibility);
