document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо всі елементи відгуків та навігаційні крапки
    const reviews = document.querySelectorAll('.review-item');
    const dots = document.querySelectorAll('.dot');
    
    // Індекс поточного активного відгуку
    let currentReviewIndex = 0;
    
    // Функція для показу певного відгуку
    function showReview(index) {
        // Ховаємо всі відгуки
        reviews.forEach(review => {
            review.style.display = 'none';
        });
        
        // Забираємо клас 'active' з усіх крапок
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Показуємо потрібний відгук та робимо відповідну крапку активною
        reviews[index].style.display = 'block';
        dots[index].classList.add('active');
    }
    
    // Функція для показу наступного відгуку
    function showNextReview() {
        // Збільшуємо індекс, якщо він перевищує кількість відгуків - починаємо з нуля
        currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
        showReview(currentReviewIndex);
    }
    
    // Додаємо обробники подій для крапок
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // При кліку на крапку показуємо відповідний відгук
            currentReviewIndex = index;
            showReview(currentReviewIndex);
        });
    });
    
    // Встановлюємо інтервал для автоматичної зміни відгуків (кожні 5 секунд)
    setInterval(showNextReview, 5000);
    
    // Показуємо перший відгук при завантаженні сторінки
    showReview(currentReviewIndex);
});
