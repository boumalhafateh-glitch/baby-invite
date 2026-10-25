// ========================================
// INVITATION DE NAISSANCE — script.js
// Copie du design de référence (Yacine-Diallo-Sarr/Invitation-virtuelle)
// ========================================

// ========================================
// LANGUES — FR / EN / AR
// ========================================

const I18N = {
  seal:            { fr: 'Ouvrir',            en: 'Open',            ar: 'افتح' },
  cardSub:         { fr: 'Invitation',        en: 'Invitation',      ar: 'دعوة' },
  heroIntro:       { fr: 'Nous avons la joie de vous annoncer', en: 'We are delighted to announce', ar: 'بقلوب يملؤها الفرح، نشارككم أجمل خبر، فقد أشرقت حياتنا بقدوم مولودنا الغالي، وازدادت أيامنا جمالاً بقدوم أميرنا الصغير.' },
  storyTitle:      { fr: 'Notre Bonheur',     en: 'Our Joy',         ar: 'فرحتنا' },
  storyP1:         { fr: 'Après qu\'Allah nous a comblés de bienfaits en nous accordant برتيل, voici qu\'aujourd\'hui Il nous honore à nouveau et ajoute joie sur joie, en nous annonçant la venue de son frère adoré ريان يحيى', en: 'After Allah blessed us with برتيل, today He honors us once again and adds joy upon joy, announcing the arrival of her dear brother ريان يحيى', ar: 'بعدما أكرمنا الله ورزقنا برتيل، ها هو اليوم يكرمنا من جديد ويزيد فرحتنا فرحًا، ويبشرنا بقدوم أخيها الغالي ريان يحيى' },
  storyP2:         { fr: 'À cette heureuse occasion, nous sommes ravis et honorés de partager avec vous notre joie pour notre nouveau-né, lors de son sbu\' et de sa circoncision. Nous demandons à Allah d\'en faire un homme vertueux, de nous bénir en lui et de le préserver de Son œil qui jamais ne dort.', en: 'On this joyful occasion, we are delighted and honored to share our joy for our newborn with you, at his sbu\' and his circumcision, and we ask Allah to make him among the righteous, to bless him for us, and to guard him with His ever-watchful eye.', ar: 'وبهذه المناسبة السعيدة، يسعدنا ويشرّفنا أن نشارككم فرحتنا بمولودنا، في سبوعه وختانه، ونسأل الله أن يجعله من الصالحين، وأن يبارك لنا فيه ويحفظه بعينه التي لا تنام.' },
  storyP3:         { fr: 'Votre présence parmi nous est le plus beau des cadeaux. Ne vous compliquez pas et ne vous chargez d\'aucun souci ; il nous suffit que vous veniez partager notre joie et vous réjouir avec nous de son arrivée. Nous demandons à Allah qu\'Il réjouisse vos cœurs comme Il a réjoui les nôtres, qu\'Il vous accorde une descendance vertueuse et qu\'Il vous comble de joie avec vos enfants et vos proches, et qu\'Il fasse de tous vos jours des jours de fête et de bonheur.', en: 'Your presence among us is the most beautiful gift. Do not go to any trouble or burden yourself — it is enough that you come, share our joy, and rejoice with us in his arrival. We ask Allah to gladden your hearts as He has gladdened ours, to bless you with righteous children, to fill you with joy in your children and loved ones, and to make all your days full of happiness and celebration.', ar: 'وجودكم بيننا هو أجمل هدية، فلا تتكلّفوا ولا تحملوا همًّا، يكفينا أن تأتوا وتشاركونا فرحتنا وتفرحوا معنا بقدومه. نسأل الله أن يفرح قلوبكم كما أفرح قلوبنا، وأن يرزقكم ذرية صالحة، ويفرحكم بأولادكم وأحبابكم، وأن يجعل أيامكم كلها أفراحًا ومسرّات.' },
  eventTitle:      { fr: 'Détails de l\'Événement', en: 'Event Details', ar: 'تفاصيل المناسبة' },
  subtitle:        { fr: 'CÉLÉBRATION',       en: 'CELEBRATION',     ar: 'الاحتفال' },
  evLabelCelebration: { fr: 'CÉLÉBRATION',    en: 'CELEBRATION',     ar: 'الاحتفال' },
  evValueCelebration: { fr: 'Notre joie pour notre nouveau-né, lors de son sbu\' et de sa circoncision', en: 'Our joy for our newborn, at his sbu\' and his circumcision', ar: 'فرحتنا بمولودنا، في سبوعه وختانه' },
  evLabelPlace:    { fr: 'LIEU',              en: 'LOCATION',        ar: 'المكان' },
  evValuePlace:    { fr: 'Joinville',         en: 'Joinville',       ar: 'جوانفيل' },
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

// Démarrage du son : JAMAIS quand la page du verset est à l'écran.
// Le son ne peut s'enclencher qu'une fois le verset entièrement quitté,
// et il est coupé systématiquement si le verset réapparaît à l'écran.
let musicStarted = false;
let nameReached = false;

function verseOnScreen() {
    const heroSection = document.querySelector('#hero');
    if (!heroSection) return false;
    const r = heroSection.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
}

function startMusic() {
    if (musicStarted) return;
    if (verseOnScreen()) return;
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
                nameReached = true;
                startMusic();
            }
        });
    }, { threshold: 0.4 });
    nameObserver.observe(babyName);
}

const heroSection = document.querySelector('#hero');
if (heroSection) {
    let pausedForVerse = false;
    const handleVerse = () => {
        if (verseOnScreen()) {
            // Le verset est à l'écran : son coupé systématiquement
            if (!audio.paused) {
                pausedForVerse = true;
                audio.pause();
            }
        } else {
            // On a quitté la page du verset : on peut entendre le son
            if (pausedForVerse) {
                pausedForVerse = false;
                audio.play().catch(() => {});
            }
            if (nameReached) startMusic();
        }
    };
    window.addEventListener('scroll', handleVerse, { passive: true });
    window.addEventListener('resize', handleVerse, { passive: true });
    handleVerse();
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
    let isOpen = false;

    const openEnvelope = () => {
        if (isOpen) return;
        isOpen = true;
        envelope.style.pointerEvents = 'none';
        envelope.classList.add('open');
        envelope.style.transform = '';

        // Chronologie : cachet (0.6s) → rabat (1.25s) → la carte s'élève (1.15s)
        setTimeout(() => {
            window.scrollTo(0, 0);
            intro.style.transition = 'opacity 1s ease';
            intro.style.opacity = '0';

            setTimeout(() => {
                intro.style.display = 'none';
                document.documentElement.style.overflow = 'auto';
                document.body.style.overflow = 'auto';
            }, 1000);

        }, 2750);
    };

    envelope.addEventListener('click', openEnvelope);

    // Accessibilité clavier : Entrée ou Espace ouvre l'enveloppe
    envelope.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            openEnvelope();
        }
    });

    // Inclinaison 3D subtile au pointeur (desktop uniquement)
    if (window.matchMedia('(pointer: fine)').matches && intro) {
        const scene = envelope.closest('.envelope-scene');
        intro.addEventListener('pointermove', (e) => {
            if (isOpen || !scene) return;
            const r = scene.getBoundingClientRect();
            const dx = (e.clientX - r.left) / r.width  - 0.5;
            const dy = (e.clientY - r.top)  / r.height - 0.5;
            envelope.style.transform = `rotateY(${(dx * 9).toFixed(2)}deg) rotateX(${(-dy * 7).toFixed(2)}deg)`;
        });
        intro.addEventListener('pointerleave', () => {
            if (!isOpen) envelope.style.transform = '';
        });
    }
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
    initScrollAnimations();
    initSmoothScroll();
    initScrollIndicator();
    initCardEffects();
    fixMobileViewport();

    console.log('💐 Invitation de naissance prête !');
});

document.addEventListener('DOMContentLoaded', initAccessibility);
