document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById('backToTop');

  if (!backToTopButton) return;

  function updateButtonVisibility() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    backToTopButton.classList.toggle('visible', scrollTop > 100);
  }

  backToTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', updateButtonVisibility);
  updateButtonVisibility(); 
});