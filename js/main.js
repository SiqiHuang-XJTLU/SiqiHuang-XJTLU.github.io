/* ============ MOBILE NAV ============ */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ============ SCROLL SPY ============ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => spy.observe(s));

/* ============ FADE-IN ON SCROLL ============ */
const fadeEls = document.querySelectorAll('.section, .card, .pub');
fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ============ PUBLICATION FILTER ============ */
const filterBtns = document.querySelectorAll('.filter-btn');
const pubs = document.querySelectorAll('.pub');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    pubs.forEach(pub => {
      const match = filter === 'all' || pub.dataset.group === filter;
      pub.classList.toggle('hidden', !match);
    });
  });
});

/* ============ STAT COUNTER ANIMATION ============ */
const statNums = document.querySelectorAll('.stat-num[data-count]');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const isDecimal = target % 1 !== 0;
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }, 25);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNums.forEach(n => statObserver.observe(n));

/* ============ FOOTER YEAR ============ */
document.getElementById('year').textContent = new Date().getFullYear();