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

const audio = new Audio('music.mp3');
audio.loop = true;
audio.volume = 0.6;

function playMusic() {
    audio.play().catch(err => console.log('Audio error:', err));
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
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
// RSVP TRACKING
// ========================================

function initRSVPTracking() {
    const btn = document.querySelector('.rsvp-button');
    if (btn) btn.addEventListener('click', () => console.log('RSVP clicked'));
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

    if (isWeddingDay()) {
        activateWeddingDayMode();
        return;
    }

    initCountdown();
    initScrollAnimations();
    initSmoothScroll();
    initScrollIndicator();
    initCardEffects();
    initRSVPTracking();
    fixMobileViewport();

    console.log('💐 Invitation de naissance prête !');
});

document.addEventListener('DOMContentLoaded', initAccessibility);
