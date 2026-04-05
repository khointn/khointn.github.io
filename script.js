// Theme Toggle (Light/Dark)
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

function toggleTheme() {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const mobileOverlay = document.getElementById('mobileOverlay');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileOverlay.classList.add('open');
    });
}

if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', () => {
        mobileOverlay.classList.remove('open');
    });
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
            mobileOverlay.classList.remove('open');
        }
    });
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileOverlay.classList.remove('open');
    });
});

// Sidebar active link tracking
const sideLinks = document.querySelectorAll('.side-link');
const sections = document.querySelectorAll('.swiss-section');

sideLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        sideLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Update active link on scroll — picks the section whose top is closest above the viewport top
const NAV_OFFSET = 80; // nav bar height + buffer
function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top <= NAV_OFFSET) {
            current = section.id;
        }
    });
    if (current) {
        sideLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });
    }
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
