document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('competence-card')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observer les éléments
    document.querySelectorAll('.competence-card, .projet-card, .hero h1, .hero p')
        .forEach(el => observer.observe(el));

    // Animation des compteurs
    function animateCounter(element) {
        const counter = element.querySelector('.counter');
        if (counter && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target;
                }
            };
            updateCount();
        }
    }

    // Effet de parallaxe
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animation du texte
    const texts = document.querySelectorAll('.typing-text');
    texts.forEach(text => {
        const content = text.textContent;
        text.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < content.length) {
                text.textContent += content.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        typeWriter();
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Fermer le menu mobile si ouvert
                navMenu.classList.remove('active');
            }
        });
    });

    // Animation du formulaire
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = form.querySelector('button');
            button.textContent = 'Envoi en cours...';
            button.disabled = true;
            
            // Simuler l'envoi (à remplacer par votre logique d'envoi réelle)
            setTimeout(() => {
                button.textContent = 'Envoyé !';
                form.reset();
                setTimeout(() => {
                    button.textContent = 'Envoyer';
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
});
