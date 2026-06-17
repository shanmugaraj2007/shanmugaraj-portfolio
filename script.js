document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-reveal').forEach((section) => {
        observer.observe(section);
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });

    // Trigger initial reveal for items in viewport on load
    setTimeout(() => {
        document.querySelectorAll('.section-reveal').forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight) {
                section.classList.add('active');
            }
        });
    }, 100);

    // Form Submission Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            const dataObj = {};
            formData.forEach((value, key) => {
                dataObj[key] = value;
            });

            let actionUrl = this.action;
            if (actionUrl.includes('formsubmit.co/') && !actionUrl.includes('/ajax/')) {
                actionUrl = actionUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/');
            }

            fetch(actionUrl, {
                method: 'POST',
                body: JSON.stringify(dataObj),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.reset();
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                    submitBtn.style.backgroundColor = '#10b981';
                    submitBtn.style.color = '#fff';

                    let successMsg = this.querySelector('.success-message');
                    if (!successMsg) {
                        successMsg = document.createElement('div');
                        successMsg.className = 'success-message';
                        this.appendChild(successMsg);
                    }
                    successMsg.innerHTML = 'Thank you! Your message has been sent successfully.';

                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.style.color = '';
                        submitBtn.disabled = false;
                        if (successMsg) successMsg.remove();
                    }, 5000);
                })
                .catch(error => {
                    submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }

    // Certificate Slideshow
    let slideIndex = 0;
    const slides = document.querySelectorAll('.certificate-slideshow .slide');
    
    if (slides.length > 0) {
        setInterval(() => {
            slides.forEach(slide => slide.classList.remove('active'));
            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            slides[slideIndex].classList.add('active');
        }, 3000);
    }

    // Skills 3D Sphere (TagCloud)
    const sphereContainer = document.querySelector('.skills-sphere');
    if (sphereContainer && typeof TagCloud !== 'undefined') {
        const texts = [
            '<div class="tech-icon"><i class="fab fa-html5" style="color: #e34f26;"></i><span>HTML5</span></div>',
            '<div class="tech-icon"><i class="fab fa-css3-alt" style="color: #1572b6;"></i><span>CSS3</span></div>',
            '<div class="tech-icon"><i class="fab fa-js" style="color: #f7df1e;"></i><span>JS</span></div>',
            '<div class="tech-icon"><i class="fab fa-react" style="color: #61dafb;"></i><span>React</span></div>',
            '<div class="tech-icon"><i class="fab fa-python" style="color: #3776ab;"></i><span>Python</span></div>',
            '<div class="tech-icon"><i class="fab fa-git-alt" style="color: #f05032;"></i><span>Git</span></div>',
            '<div class="tech-icon"><i class="fab fa-node-js" style="color: #339933;"></i><span>Node.js</span></div>',
            '<div class="tech-icon"><i class="fab fa-github" style="color: #ffffff;"></i><span>GitHub</span></div>',
            '<div class="tech-icon"><i class="fas fa-database" style="color: #4db33d;"></i><span>MongoDB</span></div>',
            '<div class="tech-icon"><i class="fas fa-layer-group" style="color: #fff;"></i><span>Next.js</span></div>'
        ];

        TagCloud('.skills-sphere', texts, {
            radius: window.innerWidth < 768 ? 130 : 170,
            maxSpeed: 'normal',
            initSpeed: 'normal',
            direction: 135,
            keep: true,
            useHTML: true
        });
    }
});
