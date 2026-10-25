/* ==========================================================================
   ANIMATIONS — ourson en peluche & ballons
   Ajout pur : ce script ne modifie rien de l'existant.
   Il injecte ses propres éléments dans ses propres couches (.fx-layer).
   ========================================================================== */

(function () {
    'use strict';

    /* ---------------------------------------------------------------
       Réglages
       --------------------------------------------------------------- */

    var PALETTE = [
        { fill: '#a9c9e0', stroke: 'rgba(63,107,150,0.22)',  opacity: 0.78 },
        { fill: '#cfe2f1', stroke: 'rgba(63,107,150,0.18)',  opacity: 0.72 },
        { fill: '#ffffff', stroke: 'rgba(123,167,203,0.55)', opacity: 0.85 },
        { fill: '#b9d6ea', stroke: 'rgba(63,107,150,0.22)',  opacity: 0.7  },
        { fill: '#e8f2fa', stroke: 'rgba(123,167,203,0.45)', opacity: 0.85 },
        { fill: '#9dc0da', stroke: 'rgba(63,107,150,0.26)',  opacity: 0.68 }
    ];

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var uid = 0;
    function nextId(prefix) {
        uid += 1;
        return prefix + '-' + uid;
    }

    /* ---------------------------------------------------------------
       Briques graphiques
       --------------------------------------------------------------- */

    /* Un ballon (corps + reflet + nœud + ficelle) */
    function balloonSvg(color) {
        return '' +
            '<svg viewBox="0 0 60 104" aria-hidden="true" focusable="false">' +
                '<ellipse cx="30" cy="34" rx="24" ry="30" fill="' + color.fill + '" stroke="' + color.stroke + '" stroke-width="1.2"/>' +
                '<ellipse cx="20" cy="19" rx="7" ry="10.5" fill="#ffffff" opacity="0.5" transform="rotate(-26 20 19)"/>' +
                '<ellipse cx="41" cy="51" rx="5.5" ry="7.5" fill="#ffffff" opacity="0.18" transform="rotate(22 41 51)"/>' +
                '<path d="M25 61 L35 61 L32.4 69 L27.6 69 Z" fill="' + color.fill + '" stroke="' + color.stroke + '" stroke-width="1"/>' +
                '<path d="M30 69 C 37 82, 22 88, 27 102" fill="none" stroke="rgba(43,77,107,0.34)" stroke-width="1.1" stroke-linecap="round"/>' +
            '</svg>';
    }

    /* Le corps de la peluche (coordonnées locales 140 × 160) */
    function teddyCore(gid) {
        return '' +
            '<defs>' +
                '<radialGradient id="' + gid + '-fur" cx="38%" cy="28%" r="80%">' +
                    '<stop offset="0%"   stop-color="#f6fafd"/>' +
                    '<stop offset="55%"  stop-color="#e0e9f0"/>' +
                    '<stop offset="100%" stop-color="#c2d2de"/>' +
                '</radialGradient>' +
                '<radialGradient id="' + gid + '-cream" cx="45%" cy="35%" r="75%">' +
                    '<stop offset="0%"   stop-color="#fffdf8"/>' +
                    '<stop offset="100%" stop-color="#f4e8d6"/>' +
                '</radialGradient>' +
            '</defs>' +
            '<g class="fx-teddy__breathe">' +
                /* pattes */
                '<ellipse cx="50" cy="142" rx="17" ry="14" fill="url(#' + gid + '-fur)"/>' +
                '<ellipse cx="90" cy="142" rx="17" ry="14" fill="url(#' + gid + '-fur)"/>' +
                '<ellipse cx="50" cy="145" rx="9" ry="6.4" fill="url(#' + gid + '-cream)" opacity="0.95"/>' +
                '<ellipse cx="90" cy="145" rx="9" ry="6.4" fill="url(#' + gid + '-cream)" opacity="0.95"/>' +
                /* corps */
                '<ellipse cx="70" cy="108" rx="37" ry="35" fill="url(#' + gid + '-fur)"/>' +
                '<ellipse cx="70" cy="115" rx="23" ry="21" fill="url(#' + gid + '-cream)" opacity="0.6"/>' +
                /* bras gauche */
                '<ellipse cx="33" cy="107" rx="12" ry="21" fill="url(#' + gid + '-fur)" transform="rotate(20 33 107)"/>' +
                /* tête + oreilles */
                '<circle cx="36" cy="20" r="16" fill="url(#' + gid + '-fur)"/>' +
                '<circle cx="104" cy="20" r="16" fill="url(#' + gid + '-fur)"/>' +
                '<circle cx="36" cy="21" r="8.5" fill="#f6d9d4" opacity="0.75"/>' +
                '<circle cx="104" cy="21" r="8.5" fill="#f6d9d4" opacity="0.75"/>' +
                '<circle cx="70" cy="54" r="39" fill="url(#' + gid + '-fur)"/>' +
                /* museau */
                '<ellipse cx="70" cy="68" rx="22" ry="16.5" fill="url(#' + gid + '-cream)"/>' +
                /* joues */
                '<ellipse cx="45" cy="64" rx="7" ry="4.6" fill="#efb6b0" opacity="0.45"/>' +
                '<ellipse cx="95" cy="64" rx="7" ry="4.6" fill="#efb6b0" opacity="0.45"/>' +
                /* yeux */
                '<g class="fx-teddy__eyes">' +
                    '<ellipse cx="54" cy="46" rx="4.9" ry="5.7" fill="#33506b"/>' +
                    '<ellipse cx="86" cy="46" rx="4.9" ry="5.7" fill="#33506b"/>' +
                    '<circle cx="52.4" cy="43.8" r="1.7" fill="#ffffff" opacity="0.92"/>' +
                    '<circle cx="84.4" cy="43.8" r="1.7" fill="#ffffff" opacity="0.92"/>' +
                '</g>' +
                /* nez + bouche */
                '<path d="M64.5 59.5 q5.5 -3.6 11 0 q2.2 2.8 -1 4.8 q-4.5 2.8 -9 0 q-3.2 -2 -1 -4.8 Z" fill="#4e6d89"/>' +
                '<path d="M70 64.6 v4.2 M70 68.8 q-6 5.6 -11 1.8 M70 68.8 q6 5.6 11 1.8" fill="none" stroke="#5c7c98" stroke-width="1.5" stroke-linecap="round"/>' +
                /* bras droit — celui qui salue */
                '<g class="fx-teddy__arm">' +
                    '<ellipse cx="107" cy="107" rx="12" ry="21" fill="url(#' + gid + '-fur)" transform="rotate(-20 107 107)"/>' +
                '</g>' +
            '</g>';
    }

    /* Ourson du coin : la peluche + un petit bouquet de ballons */
    function cornerTeddySvg() {
        var gid = nextId('fx-teddy');
        var balloons = PALETTE.slice(0, 3);
        return '' +
            '<svg viewBox="0 0 214 250" aria-hidden="true" focusable="false">' +
                '<g class="fx-teddy__balloons">' +
                    /* ficelles */
                    '<path d="M112 172 Q 140 118 156 76" fill="none" stroke="rgba(43,77,107,0.32)" stroke-width="1.2"/>' +
                    '<path d="M112 172 Q 152 132 186 100" fill="none" stroke="rgba(43,77,107,0.32)" stroke-width="1.2"/>' +
                    '<path d="M112 172 Q 130 132 140 108" fill="none" stroke="rgba(43,77,107,0.32)" stroke-width="1.1"/>' +
                    /* ballons */
                    '<ellipse cx="160" cy="52" rx="18" ry="22.5" fill="' + balloons[0].fill + '" stroke="' + balloons[0].stroke + '" stroke-width="1.2"/>' +
                    '<ellipse cx="152" cy="42" rx="5" ry="7.5" fill="#ffffff" opacity="0.5" transform="rotate(-26 152 42)"/>' +
                    '<path d="M156 74 L164 74 L161.4 81 L158.6 81 Z" fill="' + balloons[0].fill + '"/>' +
                    '<ellipse cx="190" cy="78" rx="16.5" ry="20.5" fill="' + balloons[1].fill + '" stroke="' + balloons[1].stroke + '" stroke-width="1.2"/>' +
                    '<ellipse cx="183" cy="69" rx="4.6" ry="6.8" fill="#ffffff" opacity="0.5" transform="rotate(-26 183 69)"/>' +
                    '<path d="M186.5 98 L193.5 98 L191 104.5 L189 104.5 Z" fill="' + balloons[1].fill + '"/>' +
                    '<ellipse cx="137" cy="88" rx="14" ry="17.5" fill="' + balloons[2].fill + '" stroke="' + balloons[2].stroke + '" stroke-width="1.2"/>' +
                    '<ellipse cx="131" cy="80" rx="4" ry="6" fill="#9dc4e0" opacity="0.35" transform="rotate(-26 131 80)"/>' +
                    '<path d="M133.5 105 L140.5 105 L138 111 L136 111 Z" fill="' + balloons[2].fill + '"/>' +
                '</g>' +
                '<g transform="translate(4,78)">' + teddyCore(gid) + '</g>' +
            '</svg>';
    }

    /* Ourson emporté par ses ballons (traversée de l'écran) */
    function rideSvg() {
        var gid = nextId('fx-ride');
        var b = PALETTE;
        return '' +
            '<svg viewBox="0 0 176 336" aria-hidden="true" focusable="false">' +
                /* ficelles vers les pattes */
                '<path d="M52 92 Q 66 140 78 196" fill="none" stroke="rgba(43,77,107,0.3)" stroke-width="1.2"/>' +
                '<path d="M94 82 Q 92 140 88 196" fill="none" stroke="rgba(43,77,107,0.3)" stroke-width="1.2"/>' +
                '<path d="M134 100 Q 112 148 96 196" fill="none" stroke="rgba(43,77,107,0.3)" stroke-width="1.2"/>' +
                /* ballons */
                '<ellipse cx="52" cy="58" rx="25" ry="31" fill="' + b[0].fill + '" stroke="' + b[0].stroke + '" stroke-width="1.3"/>' +
                '<ellipse cx="43" cy="45" rx="7.5" ry="11" fill="#ffffff" opacity="0.5" transform="rotate(-26 43 45)"/>' +
                '<path d="M47 87 L57 87 L54 95 L50 95 Z" fill="' + b[0].fill + '"/>' +
                '<ellipse cx="94" cy="40" rx="27" ry="34" fill="' + b[4].fill + '" stroke="' + b[4].stroke + '" stroke-width="1.3"/>' +
                '<ellipse cx="85" cy="26" rx="8" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-26 85 26)"/>' +
                '<path d="M88 72 L100 72 L96.6 81 L91.4 81 Z" fill="' + b[4].fill + '"/>' +
                '<ellipse cx="134" cy="70" rx="22" ry="28" fill="' + b[1].fill + '" stroke="' + b[1].stroke + '" stroke-width="1.3"/>' +
                '<ellipse cx="126" cy="59" rx="6.5" ry="9.5" fill="#ffffff" opacity="0.55" transform="rotate(-26 126 59)"/>' +
                '<path d="M129 96 L139 96 L136 104 L132 104 Z" fill="' + b[1].fill + '"/>' +
                /* la peluche */
                '<g transform="translate(18,168) scale(0.86)">' + teddyCore(gid) + '</g>' +
            '</svg>';
    }

    /* ---------------------------------------------------------------
       Construction des couches
       --------------------------------------------------------------- */

    function makeLayer(modifier) {
        var el = document.createElement('div');
        el.className = 'fx-layer ' + modifier;
        el.setAttribute('aria-hidden', 'true');
        return el;
    }

    /* Positions des ballons : on reste sur les côtés, on évite le centre
       pour ne jamais gêner la lecture. */
    var SPOTS_WIDE = [
        { x: '3%',   size: 40, dur: 27, delay: 0,  op: 0.8  },
        { x: '11%',  size: 58, dur: 34, delay: 6,  op: 0.72 },
        { x: '17%',  size: 32, dur: 23, delay: 13, op: 0.7  },
        { x: '30%',  size: 26, dur: 38, delay: 2,  op: 0.6  },
        { x: '68%',  size: 30, dur: 29, delay: 9,  op: 0.6  },
        { x: '76%',  size: 54, dur: 36, delay: 4,  op: 0.72 },
        { x: '86%',  size: 38, dur: 25, delay: 16, op: 0.7  },
        { x: '93%',  size: 26, dur: 31, delay: 11, op: 0.65 }
    ];

    /* Sur mobile les cartes occupent presque toute la largeur :
       on colle les ballons aux bords et on les rend plus discrets
       pour ne jamais passer sur le texte. */
    var SPOTS_NARROW = [
        { x: '-1%',  size: 26, dur: 30, delay: 0,  op: 0.42 },
        { x: '0%',   size: 38, dur: 38, delay: 8,  op: 0.38 },
        { x: '97%',  size: 30, dur: 33, delay: 4,  op: 0.38 },
        { x: '99%',  size: 20, dur: 26, delay: 15, op: 0.34 }
    ];

    var SPOTS = (window.innerWidth < 700) ? SPOTS_NARROW : SPOTS_WIDE;

    function addBalloons(layer, spots) {
        spots.forEach(function (spot, i) {
            var color = PALETTE[i % PALETTE.length];
            var wrap = document.createElement('div');
            wrap.className = 'fx-balloon';
            wrap.style.setProperty('--fx-x', spot.x);
            wrap.style.setProperty('--fx-size', spot.size + 'px');
            wrap.style.setProperty('--fx-dur', spot.dur + 's');
            wrap.style.setProperty('--fx-delay', spot.delay + 's');
            wrap.style.setProperty('--fx-opacity', spot.op || color.opacity);
            wrap.innerHTML = '<span class="fx-balloon__sway">' + balloonSvg(color) + '</span>';
            layer.appendChild(wrap);
        });
    }

    function addRide(layer) {
        var ride = document.createElement('div');
        ride.className = 'fx-ride';
        ride.style.setProperty('--fx-y', '14%');
        ride.style.setProperty('--fx-cross-dur', '58s');
        ride.style.setProperty('--fx-cross-delay', '7s');
        ride.innerHTML = '<span class="fx-ride__bob">' + rideSvg() + '</span>';
        layer.appendChild(ride);
    }

    function addCornerTeddy(layer) {
        var teddy = document.createElement('div');
        teddy.className = 'fx-teddy';
        teddy.innerHTML = cornerTeddySvg();
        layer.appendChild(teddy);
    }

    function build() {
        if (document.getElementById('fx-layer-page')) return;

        /* --- Couche de l'intro : quelques ballons autour de l'enveloppe --- */
        var introLayer = makeLayer('fx-layer--intro');
        introLayer.id = 'fx-layer-intro';
        addBalloons(introLayer, (window.innerWidth < 700 ? SPOTS_NARROW : SPOTS_WIDE)
            .slice(0, 5)
            .map(function (s, i) {
                return {
                    x: s.x,
                    size: Math.round(s.size * 1.15),
                    dur: s.dur + 4,
                    delay: i * 2.4,
                    op: Math.min(1, (s.op || 0.7) + 0.15)
                };
            }));
        document.body.appendChild(introLayer);
        requestAnimationFrame(function () { introLayer.classList.add('fx-live'); });

        /* --- Couche de la page : ballons + ourson porté + ourson du coin --- */
        var pageLayer = makeLayer('fx-layer--page');
        pageLayer.id = 'fx-layer-page';
        addBalloons(pageLayer, SPOTS);
        addRide(pageLayer);
        addCornerTeddy(pageLayer);
        document.body.appendChild(pageLayer);

        /* On attend que l'enveloppe soit ouverte pour révéler la couche */
        var revealed = false;
        function reveal() {
            if (revealed) return;
            revealed = true;
            pageLayer.classList.add('fx-live');
            introLayer.classList.remove('fx-live');
            setTimeout(function () {
                if (introLayer.parentNode) introLayer.parentNode.removeChild(introLayer);
            }, 1400);
        }

        var intro = document.getElementById('intro');
        if (!intro) {
            reveal();
        } else {
            var tries = 0;
            var watch = setInterval(function () {
                tries += 1;
                var hidden = intro.style.display === 'none' ||
                             getComputedStyle(intro).display === 'none' ||
                             intro.classList.contains('open');
                if (hidden || tries > 120) {
                    clearInterval(watch);
                    reveal();
                }
            }, 250);
        }

        /* Économie de ressources : on met en pause quand l'onglet est caché */
        document.addEventListener('visibilitychange', function () {
            pageLayer.classList.toggle('fx-passive', document.hidden);
        });
    }

    if (reduceMotion) {
        /* Mouvement réduit : on garde seulement l'ourson, bien sage */
        document.addEventListener('DOMContentLoaded', function () {
            var layer = makeLayer('fx-layer--page fx-live');
            layer.id = 'fx-layer-page';
            addCornerTeddy(layer);
            document.body.appendChild(layer);
        });
        return;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();
