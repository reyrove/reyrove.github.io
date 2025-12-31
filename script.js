// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Close navbar when clicking anywhere outside
document.addEventListener('click', (event) => {
  const navbar = document.querySelector('.navbar');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse && !navbar.contains(event.target) && navbarCollapse.classList.contains('show')) {
    navbarToggler.click();
  }
});

// Close navbar when clicking nav links (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarCollapse && navbarCollapse.classList.contains('show') && window.innerWidth < 992) {
      navbarToggler.click();
    }
  });
});

// Artist Statement Toggle Functionality
class CreativeStatement {
  constructor() {
    this.toggleBtn = document.querySelector('.toggle-btn');
    this.statementContent = document.querySelector('.statement-content');
    
    if (this.toggleBtn && this.statementContent) {
      this.init();
    } else {
      console.warn('Artist statement elements not found');
    }
  }
  
  init() {
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this.statementContent.setAttribute('aria-hidden', 'true');
    
    this.toggleBtn.addEventListener('click', () => {
      this.toggleStatement();
    });
    
    this.toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleStatement();
      }
    });
  }
  
  toggleStatement() {
    const isExpanded = this.toggleBtn.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;
    
    this.toggleBtn.setAttribute('aria-expanded', newState);
    this.statementContent.setAttribute('aria-hidden', !newState);
    
    const buttonText = this.toggleBtn.querySelector('span');
    if (buttonText) {
      buttonText.textContent = newState ? 'Close Statement' : 'Artist Statement';
    }
    
    if (newState) {
      setTimeout(() => {
        this.statementContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }
}