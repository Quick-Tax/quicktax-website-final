document.addEventListener("DOMContentLoaded", function() {

    // --- Mobile Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- Navbar Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Stats Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the #, the faster the count

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('%','').replace('+','');

                const inc = target / speed;

                if (count < target) {
                    let newCount = Math.ceil(count + inc);
                    if(counter.hasAttribute('data-target') && counter.getAttribute('data-target').includes('%')) {
                         counter.innerText = newCount + '%';
                    } else {
                         counter.innerText = newCount + '+';
                    }
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
                }
            };
            updateCount();
        });
    };

    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);

});