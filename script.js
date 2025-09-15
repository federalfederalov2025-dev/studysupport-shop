const swiper = new Swiper('.swiper', {
    // Вмикає нескінченну прокрутку
    loop: true,

    // Автоматичне перемикання слайдів кожні 7 секунд
    autoplay: {
        delay: 7000,
        disableOnInteraction: false, // Не вимикати автоплей після взаємодії
    },

    // Пагінація (крапочки внизу)
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Навігація (стрілки "вліво" та "вправо")
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
