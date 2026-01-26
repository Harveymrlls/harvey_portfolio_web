// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
    initActiveNavigation();
    animateSkillMeters();
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('menu');

    if (mobileMenuButton && menu) {
        mobileMenuButton.addEventListener('click', function() {
            const isOpen = menu.classList.contains('mobile-open');
            
            if (!isOpen) {
                // Open menu
                menu.classList.remove('hidden');
                // Force reflow
                menu.offsetHeight;
                menu.classList.add('mobile-open');
                mobileMenuButton.classList.add('menu-open');
                
                // Change menu icon to X
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            } else {
                // Close menu
                menu.classList.remove('mobile-open');
                mobileMenuButton.classList.remove('menu-open');
                
                // Change icon back to hamburger
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                
                // transition before hiding icon
                setTimeout(() => {
                    if (!menu.classList.contains('mobile-open')) {
                        menu.classList.add('hidden');
                    }
                }, 300);
            }
        });

        // Close mobile menu when clicking on links
        const navLinks = menu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('mobile-open');
                mobileMenuButton.classList.remove('menu-open');
                
                // Change icon back to hamburger
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                
                setTimeout(() => {
                    menu.classList.add('hidden');
                }, 300);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !mobileMenuButton.contains(e.target) && menu.classList.contains('mobile-open')) {
                menu.classList.remove('mobile-open');
                mobileMenuButton.classList.remove('menu-open');
                
                // Change icon back to hamburger
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                
                setTimeout(() => {
                    menu.classList.add('hidden');
                }, 300);
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('mobile-open')) {
                menu.classList.remove('mobile-open');
                mobileMenuButton.classList.remove('menu-open');
                
                // Change icon back to hamburger
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                
                setTimeout(() => {
                    menu.classList.add('hidden');
                }, 300);
            }
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Active navigation link highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const options = {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute("id");
            const navItem = document.querySelector(`.nav-link[href="#${id}"]`);

            if (entry.isIntersecting && navItem) {
                navLinks.forEach(link => {
                    link.classList.remove("border-purple-600", "text-purple-600", "active");
                });
                navItem.classList.add("border-purple-600", "text-purple-600", "active");
            }
        });
    }, options);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });
}

// Animate skill meters on scroll
function animateSkillMeters() {
    const skillMeters = document.querySelectorAll('.skill-meter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillMeters.forEach(meter => observer.observe(meter));
}

// Back button functionality
function goBack() {
    window.location.href = "index.html#portfolio";
}