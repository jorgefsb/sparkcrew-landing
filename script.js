(function () {
    'use strict';

    var sw = document.querySelector('.lang-switcher');
    var hud = document.querySelector('[data-hud]');
    var burger = hud ? hud.querySelector('.hud__burger') : null;
    var nav = document.getElementById('hud-nav');

    function setLang(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-es]').forEach(function (el) {
            var v = el.getAttribute('data-' + lang);
            if (!v) return;
            if (el.tagName === 'META') el.setAttribute('content', v);
            else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.setAttribute('placeholder', v);
            else if (el.tagName === 'OPTION') el.textContent = v;
            else el.innerHTML = v;
        });
        if (sw) {
            sw.querySelectorAll('a[lang]').forEach(function (a) {
                a.classList.toggle('active', a.lang === lang);
            });
        }
        try { localStorage.setItem('preferred-lang', lang); } catch (_) {}
    }

    if (sw) {
        sw.addEventListener('click', function (e) {
            var a = e.target.closest('a[lang]');
            if (!a) return;
            e.preventDefault();
            var url = new URL(window.location.href);
            url.searchParams.set('lang', a.lang);
            history.replaceState({}, '', url);
            setLang(a.lang);
        });
    }

    var saved = null;
    try { saved = localStorage.getItem('preferred-lang'); } catch (_) {}
    var urlLang = new URLSearchParams(location.search).get('lang');
    var browser = (navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
    setLang(['es', 'en'].indexOf(urlLang) > -1 ? urlLang : (saved || browser));

    if (hud && burger && nav) {
        burger.addEventListener('click', function () {
            var open = burger.getAttribute('aria-expanded') !== 'true';
            burger.setAttribute('aria-expanded', String(open));
            nav.classList.toggle('is-open', open);
        });
        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) {
                burger.setAttribute('aria-expanded', 'false');
                nav.classList.remove('is-open');
            }
        });
        var scrolled = false;
        window.addEventListener('scroll', function () {
            var next = window.scrollY > 24;
            if (next !== scrolled) {
                scrolled = next;
                hud.classList.toggle('is-scrolled', scrolled);
            }
        }, { passive: true });
    }

    var chrome = document.querySelector('.site-return-bar');
    var offset = ((chrome ? chrome.offsetHeight : 0) + (hud ? hud.offsetHeight : 0) + 12);

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (!id || id === '#') return;
            var target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - offset,
                behavior: 'smooth'
            });
        });
    });

    function initStatsAnimation() {
        var stats = document.querySelectorAll('.stat-number');
        if (!stats.length) return;

        var animateStats = function () {
            stats.forEach(function (stat) {
                var text = stat.textContent.trim();
                if (text === '∞') return;
                var match = text.match(/^(\D*)(\d+)(.*)$/);
                if (!match) return;
                var prefix = match[1];
                var finalValue = parseInt(match[2], 10);
                var suffix = match[3];
                var current = 0;
                var increment = Math.max(1, Math.ceil(finalValue / 20) || 1);
                var counter = setInterval(function () {
                    current += increment;
                    if (current >= finalValue) {
                        current = finalValue;
                        clearInterval(counter);
                    }
                    stat.textContent = prefix + current + suffix;
                }, 100);
            });
        };

        var heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;
        var heroObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                setTimeout(animateStats, 1000);
                heroObserver.unobserve(entry.target);
            });
        });
        heroObserver.observe(heroStats);
    }
    initStatsAnimation();

    document.querySelectorAll('.faq-item').forEach(function (item) {
        var question = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;
        question.addEventListener('click', function () {
            var isActive = item.classList.contains('is-open');
            document.querySelectorAll('.faq-item').forEach(function (other) {
                other.classList.remove('is-open');
                var otherAnswer = other.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.style.maxHeight = '0';
            });
            if (!isActive) {
                item.classList.add('is-open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
})();
