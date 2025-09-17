window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
        });

        // Mobile Navigation
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll to Top Button
        const scrollTop = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTop.classList.add('active');
            } else {
                scrollTop.classList.remove('active');
            }
        });

        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form Validation and Submission
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor ingresa un email válido');
                return;
            }
            
            // Simulate form submission
            alert(`¡Gracias por tu mensaje, ${name}! Te contactaremos pronto.`);
            contactForm.reset();
        });

        // Animation on Scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.menu-item, .service-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });

        // Active Navigation Link
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });
        });

        // Parallax Effect for Hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });

        // Menu Item Hover Effect
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Dynamic Year in Footer
        const currentYear = new Date().getFullYear();
        document.querySelector('footer p').innerHTML = `&copy; ${currentYear} FoodDelight. Todos los derechos reservados.`;

        // Reservation Modal (bonus feature)
        function createReservationModal() {
            const modal = document.createElement('div');
            modal.innerHTML = `
                <div id="reservationModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; justify-content: center; align-items: center;">
                    <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; width: 90%; position: relative; animation: fadeInUp 0.3s ease;">
                        <span style="position: absolute; top: 10px; right: 15px; font-size: 2rem; cursor: pointer; color: #999;" onclick="closeReservation()">&times;</span>
                        <h2 style="color: var(--dark-color); margin-bottom: 1rem;">Hacer Reservación</h2>
                        <form id="reservationForm">
                            <div class="form-group">
                                <label>Fecha</label>
                                <input type="date" required style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 5px;">
                            </div>
                            <div class="form-group">
                                <label>Hora</label>
                                <input type="time" required style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 5px;">
                            </div>
                            <div class="form-group">
                                <label>Personas</label>
                                <select required style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 5px;">
                                    <option>1 persona</option>
                                    <option>2 personas</option>
                                    <option>3 personas</option>
                                    <option>4 personas</option>
                                    <option>5+ personas</option>
                                </select>
                            </div>
                            <button type="submit" class="cta-button" style="width: 100%;">Confirmar Reservación</button>
                        </form>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Initialize reservation modal
        createReservationModal();

        function openReservation() {
            document.getElementById('reservationModal').style.display = 'flex';
        }

        function closeReservation() {
            document.getElementById('reservationModal').style.display = 'none';
        }

        // Add reservation button to hero section
        const heroContent = document.querySelector('.hero-content');
        const reserveBtn = document.createElement('a');
        reserveBtn.href = '#';
        reserveBtn.className = 'cta-button';
        reserveBtn.style.marginLeft = '1rem';
        reserveBtn.innerHTML = 'Reservar Mesa';
        reserveBtn.onclick = (e) => {
            e.preventDefault();
            openReservation();
        };
        heroContent.appendChild(reserveBtn);

        // Handle reservation form
        document.addEventListener('DOMContentLoaded', () => {
            const reservationForm = document.getElementById('reservationForm');
            if (reservationForm) {
                reservationForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('¡Reservación confirmada! Te enviaremos un correo de confirmación.');
                    closeReservation();
                });
            }
        });

        // Add floating animation to service icons
        document.querySelectorAll('.service-icon').forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.2}s`;
        });

        // Counter animation for stats
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 16);
        }

        // Initialize page enhancements
        console.log('FoodDelight - Website loaded successfully!');
        
        // Performance optimization - Lazy loading for images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '1';
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img').forEach(img => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                imageObserver.observe(img);
            });
        }