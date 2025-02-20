document.addEventListener('DOMContentLoaded', function() {
    // Animation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message envoyé ! (Simulation)');
            contactForm.reset();
        });
    }

    // Animation des cartes au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.competence-card, .projet-card').forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });

    // Ajout de l'effet de parallaxe
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animation des compétences avec compteur
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Animation des icônes
    const icons = document.querySelectorAll('.competence-card i');
    icons.forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.transform = 'rotate(360deg) scale(1.2)';
            this.style.transition = 'transform 0.5s ease-in-out';
        });
        
        icon.addEventListener('mouseout', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });

    // Amélioration de l'animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('competence-card')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter) {
                        animateValue(counter, 0, parseInt(counter.dataset.target), 2000);
                    }
                }
            }
        });
    }, observerOptions);

    // Ajout d'un effet de typing pour le texte d'accueil
    const typeWriter = (element, text, speed) => {
        let i = 0;
        element.innerHTML = '';
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        type();
    };

    const heroText = document.querySelector('.hero p');
    if (heroText) {
        typeWriter(heroText, heroText.textContent, 50);
    }

    // Initialisation des animations au scroll
    document.querySelectorAll('.competence-card, .projet-card, .hero h1, .hero p')
        .forEach(el => observer.observe(el));
}); 