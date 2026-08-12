document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href') !== '#') {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            
            // Close other items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle current item
            accordionItem.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Modal Logic
    const openModalBtns = document.querySelectorAll('.btn-open-modal');
    const closeModalBtns = document.querySelectorAll('.btn-close-modal');
    const modals = document.querySelectorAll('.modal-overlay');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('show');
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-overlay').classList.remove('show');
        });
    });

    // Close modal when clicking on backdrop
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });

    // Reveal Animation on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };
        const revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
});
