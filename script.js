// ========================================
// INVITATION DE NAISSANCE — script.js
// Thème : bleu / blanc / gris illustré
// ========================================

// ========================================
// TEXTES — FR / EN / AR
// ========================================

const I18N = {
    title: {
        fr: 'Invitation de Naissance',
        en: 'Birth Invitation',
        ar: 'دعوة ميلاد'
    },
    seal: {
        fr: 'Ouvrir',
        en: 'Open',
        ar: 'افتح'
    },
    cardSub: {
        fr: 'Invitation',
        en: 'Invitation',
        ar: 'دعوة'
    },
    babyName: {
        fr: 'Rayan Yahya',
        en: 'Rayan Yahya',
        ar: 'ريان يحيى'
    },
    heroIntro: {
        fr: 'Nous avons la joie de vous annoncer',
        en: 'We are delighted to announce',
        ar: 'بقلوبٍ يملؤها الفرح، نشارككم أجمل خبر'
    },
    verseRef: {
        fr: 'Coran — Sourate Maryam, v. 7',
        en: 'Quran — Surah Maryam, 7',
        ar: 'سورة مريم · الآية ٧'
    },
    announceLine: {
        fr: "Son sbu' et sa circoncision",
        en: 'His sbu’ and circumcision',
        ar: 'سبوعه وختانه'
    },
    dateShort: {
        fr: 'À confirmer',
        en: 'To be confirmed',
        ar: 'يُحدَّد لاحقًا'
    },
    placeShort: {
        fr: 'Joinville',
        en: 'Joinville',
        ar: 'جوانفيل'
    },
    storyTitle: {
        fr: 'Notre bonheur',
        en: 'Our joy',
        ar: 'فرحتنا'
    },
    storyKicker: {
        fr: "Son arrivée parmi nous",
        en: 'His arrival among us',
        ar: 'قدومه بيننا'
    },
    storyP1: {
        fr: "Après qu'Allah nous a comblés de bienfaits en nous accordant برتيل, voici qu'aujourd'hui Il nous honore à nouveau et ajoute joie sur joie, en nous annonçant la venue de son frère adoré ريان يحيى",
        en: 'After Allah blessed us with برتيل, today He honours us once again and adds joy upon joy, announcing the arrival of her dear brother ريان يحيى',
        ar: 'بعدما أكرمنا الله ورزقنا برتيل، ها هو اليوم يكرمنا من جديد ويزيد فرحتنا فرحًا، ويبشرنا بقدوم أخيها الغالي ريان يحيى'
    },
    storyP2: {
        fr: "À cette heureuse occasion, nous sommes ravis et honorés de partager avec vous notre joie pour notre nouveau-né, lors de son sbu' et de sa circoncision. Nous demandons à Allah d'en faire un homme vertueux, de nous bénir en lui et de le préserver de Son œil qui jamais ne dort.",
        en: 'On this joyful occasion, we are delighted and honoured to share our joy for our newborn with you, at his sbu’ and his circumcision, and we ask Allah to make him among the righteous, to bless him for us, and to guard him with His ever-watchful eye.',
        ar: 'وبهذه المناسبة السعيدة، يسعدنا ويشرّفنا أن نشارككم فرحتنا بمولودنا، في سبوعه وختانه، ونسأل الله أن يجعله من الصالحين، وأن يبارك لنا فيه ويحفظه بعينه التي لا تنام.'
    },
    storyP3: {
        fr: "Votre présence parmi nous est le plus beau des cadeaux. Ne vous compliquez pas et ne vous chargez d'aucun souci ; il nous suffit que vous veniez partager notre joie et vous réjouir avec nous de son arrivée. Nous demandons à Allah qu'Il réjouisse vos cœurs comme Il a réjoui les nôtres, qu'Il vous accorde une descendance vertueuse et qu'Il vous comble de joie avec vos enfants et vos proches, et qu'Il fasse de tous vos jours des jours de fête et de bonheur.",
        en: 'Your presence among us is the most beautiful gift. Do not go to any trouble or burden yourself — it is enough that you come, share our joy, and rejoice with us in his arrival. We ask Allah to gladden your hearts as He has gladdened ours, to bless you with righteous children, to fill you with joy in your children and loved ones, and to make all your days full of happiness and celebration.',
        ar: 'وجودكم بيننا هو أجمل هدية، فلا تتكلّفوا ولا تحملوا همًّا، يكفينا أن تأتوا وتشاركونا فرحتنا وتفرحوا معنا بقدومه. نسأل الله أن يفرح قلوبكم كما أفرح قلوبنا، وأن يرزقكم ذرية صالحة، ويفرحكم بأولادكم وأحبابكم، وأن يجعل أيامكم كلها أفراحًا ومسرّات.'
    },
    eventTitle: {
        fr: "Détails de l'événement",
        en: 'Event details',
        ar: 'تفاصيل المناسبة'
    },
    subtitle: {
        fr: 'Célébration',
        en: 'Celebration',
        ar: 'الاحتفال'
    },
    evLabelDate: {
        fr: 'DATE',
        en: 'DATE',
        ar: 'التاريخ'
    },
    evValueDate: {
        fr: 'À confirmer',
        en: 'To be confirmed',
        ar: 'يُحدَّد لاحقًا'
    },
    evLabelTime: {
        fr: 'HEURE',
        en: 'TIME',
        ar: 'الوقت'
    },
    evValueTime: {
        fr: 'À confirmer',
        en: 'To be confirmed',
        ar: 'يُحدَّد لاحقًا'
    },
    evLabelPlace: {
        fr: 'LIEU',
        en: 'LOCATION',
        ar: 'المكان'
    },
    evValuePlace: {
        fr: 'Joinville',
        en: 'Joinville',
        ar: 'جوانفيل'
    },
    eventNote: {
        fr: "Notre joie pour notre nouveau-né, lors de son sbu' et de sa circoncision.",
        en: 'Our joy for our newborn, at his sbu’ and his circumcision.',
        ar: 'فرحتنا بمولودنا، في سبوعه وختانه.'
    },
    audioLabel: {
        fr: 'Écouter',
        en: 'Play',
        ar: 'استمع'
    },
    footerLine: {
        fr: 'Avec tout notre amour',
        en: 'With all our love',
        ar: 'بكلّ حبّنا'
    }
};

function chooseLanguage(code) {
    document.documentElement.lang = code;
    document.body.dir = (code === 'ar') ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', code === 'ar');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const value = I18N[key] && I18N[key][code];
        if (value) el.textContent = value;
    });

    document.title = I18N.title[code];

    const overlay = document.getElementById('langOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.45s ease';
        setTimeout(() => { overlay.style.display = 'none'; }, 450);
    }

    try { localStorage.setItem('invitation-lang', code); } catch (e) {}
}

function initLanguage() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => chooseLanguage(btn.dataset.lang));
    });
}

// ========================================
// AUDIO
// ========================================

const audio = new Audio('audio/music.mp3');
audio.loop = true;
audio.volume = 0.75;

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

// Le son ne démarre jamais pendant que la page du verset est à l'écran.
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
            if (!audio.paused) {
                pausedForVerse = true;
                audio.pause();
            }
        } else {
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
// ENVELOPPE / INTRO
// ========================================

const envelope = document.getElementById('envelope');
const intro    = document.getElementById('intro');
const envHint  = document.getElementById('envHint');

if (envelope) {
    let isOpen = false;

    const openEnvelope = () => {
        if (isOpen) return;
        isOpen = true;
        envelope.style.pointerEvents = 'none';
        envelope.classList.add('open');
        envelope.style.transform = '';

        // Chronologie : nœud (0.65s) → rabat (1.25s) → la carte s'élève
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

    if (envHint) {
        envHint.addEventListener('click', openEnvelope);
        envHint.setAttribute('role', 'button');
        envHint.setAttribute('tabindex', '0');
        envHint.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openEnvelope();
            }
        });
    }

    envelope.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            openEnvelope();
        }
    });

    // Inclinaison 3D au pointeur (desktop)
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
// ANIMATIONS AU DÉFILEMENT
// ========================================

function initScrollAnimations() {
    const items = document.querySelectorAll('.fade-on-scroll');
    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { rootMargin: '-60px', threshold: 0.08 });

    items.forEach(el => observer.observe(el));
}

// ========================================
// DÉFILEMENT DOUX / INDICATEUR
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;
    window.addEventListener('scroll', () => {
        const hidden = window.scrollY > 80;
        indicator.style.opacity = hidden ? '0' : '1';
        indicator.style.pointerEvents = hidden ? 'none' : 'auto';
    }, { passive: true });
}

// ========================================
// HAUTEUR D'ÉCRAN MOBILE
// ========================================

function fixMobileViewport() {
    const set = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    set();
    window.addEventListener('resize', set);
    window.addEventListener('orientationchange', set);
}

// ========================================
// ACCESSIBILITÉ
// ========================================

function initAccessibility() {
    document.body.addEventListener('keydown', (e) => {
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

    // Bloque le défilement tant que l'enveloppe n'est pas ouverte
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    initLanguage();
    initScrollAnimations();
    initSmoothScroll();
    initScrollIndicator();
    fixMobileViewport();

    console.log('🌙 Invitation prête — thème bleu & gris illustré');
});

document.addEventListener('DOMContentLoaded', initAccessibility);
