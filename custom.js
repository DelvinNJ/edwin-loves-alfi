
// 1. Initialize Icons
lucide.createIcons();

// 2. Custom Magnetic Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const triggers = document.querySelectorAll('.hover-trigger');

// Move cursor
window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight lag/ease (using animate for smooth performance)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Add hover effects for interactive elements
triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
        // Optional: Magnetic effect on buttons could go here
    });
    trigger.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
    });
});

// 3. Preloader Animation
window.addEventListener('load', () => {
    const counter = document.getElementById('counter');
    const loaderBar = document.getElementById('loader-bar');
    const preloader = document.getElementById('preloader');

    let count = 0;
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 10) + 5;
        if (count > 100) count = 100;

        counter.innerText = count + '%';
        loaderBar.style.width = count + '%';

        if (count === 100) {
            clearInterval(interval);

            // Reveal animation
            gsap.to(preloader, {
                yPercent: -100,
                duration: 1.5,
                ease: "power4.inOut",
                delay: 0.5
            });

            // Reveal Hero Image
            setTimeout(() => {
                document.querySelector('.reveal-img').classList.add('active');
            }, 1500);
        }
    }, 100);
});

// 4. GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Animate Sections
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Parallax Effect for Images
gsap.utils.toArray('.reveal-img').forEach(img => {
    gsap.to(img, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
            trigger: img,
            scrub: true
        }
    });
});

// 5. Mobile Menu Logic
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('open');
}

menuToggle.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// 6. Google Calendar (Same as before)
function addToGoogleCalendar() {
    const event = {
        title: "Edwin & Alphi - Wedding",
        start: "20260105T120000Z",
        end: "20260105T150000Z",
        details: "Join us for our wedding ceremony and reception!",
        location: "St. Joseph's Syro-Malabar Church, Poovathussery"
    };
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    window.open(googleUrl, '_blank');
}

// Timer
const eventDate = new Date("January 05, 2026 00:00:00").getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML =
            "<h2 class='text-5xl font-syne text-red-800'>The Day Has Arrived</h2>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}, 1000);