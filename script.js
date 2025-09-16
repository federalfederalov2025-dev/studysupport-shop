document.addEventListener('DOMContentLoaded', function() {
    // ===== ПРЕЛОАДЕР =====
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 1000);
    });

    // ===== ФУНКЦІЯ ДЛЯ ПЕРЕВІРКИ ВИДИМОСТІ ЕЛЕМЕНТІВ =====
    function checkVisibility() {
        const sections = document.querySelectorAll('.section');
        const header = document.querySelector('header');
        const scrollToTop = document.getElementById('scrollToTop');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
                
                // Анімуємо елементи всередині секції
                const animateElements = section.querySelectorAll('.animate-element');
                animateElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('animated');
                    }, index * 200);
                });

                // Анімуємо кнопки
                const buttons = section.querySelectorAll('button');
                buttons.forEach((button, index) => {
                    setTimeout(() => {
                        button.classList.add('animated');
                    }, index * 200 + 400);
                });
            }
        });
        
        // Додаємо клас для хедера при прокрутці
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Показуємо/ховаємо кнопку "Нагору"
        if (window.scrollY > 500) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }

        // Підсвічуємо активний пункт меню
        highlightNav();
    }
    
    // ===== ПІДСВІТЛЕННЯ АКТИВНОГО РОЗДІЛУ В НАВІГАЦІЇ =====
    function highlightNav() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== ПЕРЕВІРЯЄМО ВИДИМІСТЬ ПРИ ЗАВАНТАЖЕННІ ТА ПРОКРУТЦІ =====
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
    
    // ===== КАРУСЕЛЬ ВІДГУКІВ =====
    const reviews = document.querySelectorAll('.review-item');
    const dots = document.querySelectorAll('.dot');
    let currentReviewIndex = 0;
    let autoSlideInterval;
    
    function showReview(index) {
        reviews.forEach(review => review.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        reviews[index].classList.add('active');
        dots[index].classList.add('active');
        currentReviewIndex = index;
    }
    
    function nextReview() {
        let nextIndex = (currentReviewIndex + 1) % reviews.length;
        showReview(nextIndex);
    }
    
    // Додаємо обробники подій для крапок
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            showReview(index);
            startAutoSlide();
        });
    });
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextReview, 5000);
    }
    
    // Запускаємо автоматичну зміну відгуків
    startAutoSlide();
    
    // ===== ОБРОБНИК ДЛЯ ФОРМИ =====
    const contactForm = document.getElementById('contactForm');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Показуємо модальне вікно
            modalOverlay.classList.add('active');
            
            // Очищаємо форму
            contactForm.reset();
        });
    }
    
    // Закриття модального вікна
    modalClose.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
    });
    
    // Закриття модального вікна при кліку на затемнений фон
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
    
    // ===== КНОПКА "НАГОРУ" =====
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== FAQ АКОРДЕОН =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закриваємо всі інші відкриті питання
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Відкриваємо/закриваємо поточне питання
            item.classList.toggle('active');
        });
    });

    // ===== COOKIE CONSENT =====
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    
    // Перевіряємо, чи користувач вже погодився
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.add('visible');
        }, 2000);
    }
    
    // Обробник для кнопки прийняття cookies
    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.classList.remove('visible');
        });
    }

    // ===== БАЗОВА АНАЛІТИКА =====
    console.log('Сайт завантажено: ' + new Date().toLocaleString());
});
