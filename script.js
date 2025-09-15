document.addEventListener('DOMContentLoaded', function() {
    const main = document.getElementById('fullpage');
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;
    let isScrolling = false;

    // --- Логіка вертикальної прокрутки ---
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            main.style.transform = `translateY(-${index * 100}vh)`;
            currentSection = index;
        }
    }

    document.addEventListener('wheel', event => {
        if (isScrolling) return;
        isScrolling = true;

        if (event.deltaY > 0) {
            if (currentSection < sections.length - 1) {
                currentSection++;
                scrollToSection(currentSection);
            }
        } else {
            if (currentSection > 0) {
                currentSection--;
                scrollToSection(currentSection);
            }
        }

        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Затримка, щоб уникнути занадто швидкої прокрутки
    });

    // --- Логіка каруселі відгуків ---
    const reviewItems = document.querySelectorAll('.review-item');
    const dots = document.querySelectorAll('.dot');
    let currentReview = 0;

    function showReview(index) {
        reviewItems.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentReview = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showReview(index);
        });
    });

    setInterval(() => {
        let nextReview = (currentReview + 1) % reviewItems.length;
        showReview(nextReview);
    }, 5000); // Кожні 5 секунд

    showReview(0);
});
