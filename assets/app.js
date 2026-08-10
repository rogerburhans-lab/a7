document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuBtn = document.querySelector('.menu');
    const topbar = document.querySelector('.topbar');
    
    if (menuBtn && topbar) {
        menuBtn.addEventListener('click', () => {
            const isOpen = topbar.classList.toggle('nav-open');
            menuBtn.setAttribute('aria-expanded', isOpen);
            menuBtn.textContent = isOpen ? '✕' : '☰';
        });
    }

    // Scroll reveal observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        document.body.classList.add('js');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-seen');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // Dynamic Tabbed Collection Filter (AVONE STYLE)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabCards = document.querySelectorAll('.tab-card');

    if (tabBtns.length > 0 && tabCards.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');

                // Toggle active button class
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Hide cards with transition
                tabCards.forEach(card => {
                    card.classList.add('tab-hiding');
                });

                setTimeout(() => {
                    tabCards.forEach(card => {
                        const category = card.getAttribute('data-category');
                        if (filterValue === 'all' || category === filterValue) {
                            card.style.display = 'flex';
                            // Trigger reflow to restart transition
                            void card.offsetWidth;
                            card.classList.remove('tab-hiding');
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }, 300);
            });
        });
    }
});
