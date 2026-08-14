// ========================================
// INVITATION DE NAISSANCE — script.js
// Copie du design de référence (Yacine-Diallo-Sarr/Invitation-virtuelle)
// ========================================

// ========================================
// À MODIFIER : date de la célébration
// ========================================

const CELEBRATION_DAY = '2026-08-22T00:00:00'; // minuit du jour J — mode "jour de la fête"

// ========================================
// LANGUES — FR / EN / AR
// ========================================

const I18N = {
  seal:            { fr: 'Ouvrir',            en: 'Open',            ar: 'افتح' },
  heroIntro:       { fr: 'Nous avons la joie de vous annoncer', en: 'We are delighted to announce', ar: 'يسعدنا أن نعلن لكم' },
  storyTitle:      { fr: 'Notre Bonheur',     en: 'Our Joy',         ar: 'فرحتنا' },
  storyP1:         { fr: 'Après qu\'Allah nous a comblés de bienfaits en nous accordant برتيل, voici qu\'aujourd\'hui Il nous honore à nouveau et ajoute joie sur joie, en nous annonçant la venue de son frère adoré ريان يحيى', en: 'After Allah blessed us with برتيل, today He honors us once again and adds joy upon joy, announcing the arrival of her dear brother ريان يحيى', ar: 'بعدما أكرمنا الله ورزقنا برتيل، ها هو اليوم يكرمنا من جديد ويزيد فرحتنا فرحًا، ويبشرنا بقدوم أخيها الغالي ريان يحيى' },
  storyP2:         { fr: 'À cette heureuse occasion, nous sommes ravis et honorés de partager avec vous notre joie pour notre nouveau-né, lors de son sbu\' et de sa circoncision. Nous demandons à Allah d\'en faire un homme vertueux, de nous bénir en lui et de le préserver de Son œil qui jamais ne dort.', en: 'On this joyful occasion, we are delighted and honored to share our joy for our newborn with you, at his sbu\' and his circumcision, and we ask Allah to make him among the righteous, to bless him for us, and to guard him with His ever-watchful eye.', ar: 'وبهذه المناسبة السعيدة، يسعدنا ويشرّفنا أن نشارككم فرحتنا بمولودنا، في سبوعه وختانه، ونسأل الله أن يجعله من الصالحين، وأن يبارك لنا فيه ويحفظه بعينه التي لا تنام.' },
  storyP3:         { fr: 'Votre présence parmi nous est le plus beau des cadeaux. Ne vous compliquez pas et ne vous chargez d\'aucun souci ; il nous suffit que vous veniez partager notre joie et vous réjouir avec nous de son arrivée. Nous demandons à Allah qu\'Il réjouisse vos cœurs comme Il a réjoui les nôtres, qu\'Il vous accorde une descendance vertueuse et qu\'Il vous comble de joie avec vos enfants et vos proches, et qu\'Il fasse de tous vos jours des jours de fête et de bonheur.', en: 'Your presence among us is the most beautiful gift. Do not go to any trouble or burden yourself — it is enough that you come, share our joy, and rejoice with us in his arrival. We ask Allah to gladden your hearts as He has gladdened ours, to bless you with righteous children, to fill you with joy in your children and loved ones, and to make all your days full of happiness and celebration.', ar: 'وجودكم بيننا هو أجمل هدية، فلا تتكلّفوا ولا تحملوا همًّا، يكفينا أن تأتوا وتشاركونا فرحتنا وتفرحوا معنا بقدومه. نسأل الله أن يفرح قلوبكم كما أفرح قلوبنا، وأن يرزقكم ذرية صالحة، ويفرحكم بأولادكم وأحبابكم، وأن يجعل أيامكم كلها أفراحًا ومسرّات.' },
  eventTitle:      { fr: 'Détails de l\'Événement', en: 'Event Details', ar: 'تفاصيل المناسبة' },
  subtitle:        { fr: 'CÉLÉBRATION',       en: 'CELEBRATION',     ar: 'الاحتفال' },
  evLabelDate:     { fr: 'DATE',              en: 'DATE',            ar: 'التاريخ' },
  evDescBirth:     { fr: 'Jour de naissance', en: 'Birth day',       ar: 'يوم الميلاد' },
  evLabelCelebration: { fr: 'CÉLÉBRATION',    en: 'CELEBRATION',     ar: 'الاحتفال' },
  evDescCelebration:  { fr: 'L\'accueil de ريان يحي', en: 'Welcoming ريان يحي', ar: 'استقبال ريان يحي' },
  evLabelPlace:    { fr: 'LIEU',              en: 'LOCATION',        ar: 'المكان' },
  audioLabel:      { fr: 'Écouter',           en: 'Play',            ar: 'استمع' },
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

    document.documentElement.style.overflow = 'auto';
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

// Démarrage automatique du son UNIQUEMENT quand l'invité atteint le prénom du bébé
let musicStarted = false;

function startMusic() {
    if (musicStarted) return;
    musicStarted = true;
    const p = audio.play();
    if (p && p.catch) p.catch(() => {
        // Autoplay bloqué (souvent iOS) : on réessaie au prochain contact
        musicStarted = false;
        window.addEventListener('touchstart', startMusic, { passive: true, once: true });
        window.addEventListener('pointerdown', startMusic, { passive: true, once: true });
    });
}

const babyName = document.querySelector('#announce .hero-names');
if (babyName && 'IntersectionObserver' in window) {
    const nameObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                nameObserver.disconnect();
                startMusic();
            }
        });
    }, { threshold: 0.4 });
    nameObserver.observe(babyName);
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

        envelope.classList.add('open');

        // La page du verset est révélée dès que le rabat est ouvert (1.4s)
        setTimeout(() => {
            window.scrollTo(0, 0);
            intro.style.transition = 'opacity 0.9s ease';
            intro.style.opacity = '0';

            setTimeout(() => {
                intro.style.display = 'none';
                document.documentElement.style.overflow = 'auto';
                document.body.style.overflow = 'auto';
            }, 900);

        }, 1500);
    });
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

    // Bloque le défilement tant que l'enveloppe n'est pas ouverte :
    // l'invité atterrit toujours sur la page du verset
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    initLanguage();

    if (isWeddingDay()) {
        activateWeddingDayMode();
        return;
    }

    initScrollAnimations();
    initSmoothScroll();
    initScrollIndicator();
    initCardEffects();
    fixMobileViewport();

    console.log('💐 Invitation de naissance prête !');
});

document.addEventListener('DOMContentLoaded', initAccessibility);
