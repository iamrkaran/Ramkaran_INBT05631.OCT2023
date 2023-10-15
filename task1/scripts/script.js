document.addEventListener("scroll", function () {
    const parallaxBg = document.querySelector(".parallax-bg");
    const scrollY = window.scrollY;
    parallaxBg.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
});


const mainImage = document.querySelector('.feature-image');
const galleryImages = document.querySelectorAll('.gallery-image');

galleryImages.forEach((image) => {
    image.addEventListener('click', () => {
        mainImage.src = image.src;
        mainImage.alt = image.alt;
        galleryImages.forEach((img) => img.classList.remove('selected'));
        image.classList.add('selected');
    });
});

