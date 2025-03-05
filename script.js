document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile amélioré
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;
    
    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !e.target.closest('nav')) {
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Animation au scroll améliorée
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animation des barres de progression
                if (entry.target.classList.contains('competence-card')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        progressBar.style.width = `${progress}%`;
                    }
                }

                // Animation des statistiques
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observer tous les éléments animés
    document.querySelectorAll('.competence-card, .projet-card, .certification-card, .hero h1, .hero p, .section-title, .apropos-text, .stat-number')
        .forEach(el => observer.observe(el));

    // Animation des nombres
    function animateNumber(element) {
        if (element.classList.contains('animated')) return;
        
        element.classList.add('animated');
        const target = parseInt(element.textContent);
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        function updateNumber() {
            if (current < target) {
                current += increment;
                element.textContent = Math.min(Math.ceil(current), target);
                requestAnimationFrame(updateNumber);
            }
        }

        updateNumber();
    }

    // Effet de parallaxe amélioré
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Parallaxe pour la section hero
                document.querySelectorAll('.hero').forEach(element => {
                    const speed = 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });

                // Parallaxe pour les images des projets
                document.querySelectorAll('.projet-img').forEach(element => {
                    const rect = element.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const speed = 0.2;
                        const yPos = (rect.top - window.innerHeight) * speed;
                        element.style.transform = `translateY(${yPos}px)`;
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // Animation du texte améliorée
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

        // Démarrer l'animation quand l'élément est visible
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    textObserver.unobserve(entry.target);
                }
            });
        });

        textObserver.observe(text);
    });

    // Smooth scroll amélioré
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Fermer le menu mobile si ouvert
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });

    // Formulaire de contact amélioré avec validation
    const form = document.getElementById('contactForm');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        // Validation en temps réel
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
            });
        });

        function validateInput(input) {
            const parent = input.parentElement;
            const errorMessage = parent.querySelector('.error-message') || document.createElement('div');
            errorMessage.className = 'error-message';

            if (input.validity.valid) {
                input.classList.remove('invalid');
                input.classList.add('valid');
                errorMessage.remove();
            } else {
                input.classList.remove('valid');
                input.classList.add('invalid');
                errorMessage.textContent = getErrorMessage(input);
                if (!parent.querySelector('.error-message')) {
                    parent.appendChild(errorMessage);
                }
            }
        }

        function getErrorMessage(input) {
            if (input.validity.valueMissing) return 'Ce champ est requis';
            if (input.validity.typeMismatch) return 'Format invalide';
            if (input.validity.tooShort) return `Minimum ${input.minLength} caractères`;
            return 'Format invalide';
        }

        // Gestion de l'envoi du formulaire
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = form.querySelector('button');
            const originalText = button.textContent;

            // Vérifier la validité de tous les champs
            let isValid = true;
            inputs.forEach(input => {
                validateInput(input);
                if (!input.validity.valid) isValid = false;
            });

            if (!isValid) return;

            // Animation du bouton
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            button.disabled = true;

            try {
                // Simuler l'envoi (à remplacer par votre logique d'envoi réelle)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Succès
                button.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
                button.classList.add('success');
                form.reset();

                // Réinitialiser le bouton
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.classList.remove('success');
                }, 2000);

            } catch (error) {
                // Erreur
                button.innerHTML = '<i class="fas fa-times"></i> Erreur';
                button.classList.add('error');
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.classList.remove('error');
                }, 2000);
            }
        });
    }

    // Animation des cartes au hover
    document.querySelectorAll('.competence-card, .projet-card, .certification-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const bounds = card.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            
            card.style.transform = `
                scale(1.02)
                perspective(1000px)
                rotateX(${(mouseY - bounds.height/2) * -0.01}deg)
                rotateY(${(mouseX - bounds.width/2) * 0.01}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});
