const profilePic = document.querySelector('.profile-pic');
const quotes = [
  { text: "Change begins the moment you decide to see challenges not as obstacles, but as opportunities to grow.", author: "Reyrove" },
  { text: "The true power of creativity is in transforming your mindset and embracing the unknown with courage.", author: "Reyrove" },
  { text: "Every small step you take today builds the foundation for the life you dream of tomorrow.", author: "Reyrove" },
  { text: "Growth is not linear—embrace the setbacks, for they carry the lessons that shape your strength.", author: "Reyrove" },
  { text: "Your mindset is the brush; your actions are the colors—paint a life filled with purpose and passion.", author: "Reyrove" },
  { text: "When you learn to code your own life, you create the freedom to rewrite any story you don’t like.", author: "Reyrove" },
  { text: "The most profound changes happen not in moments of comfort, but in moments of deliberate discomfort.", author: "Reyrove" },
  { text: "Resilience is built through persistence, through getting up again after every fall, stronger and wiser.", author: "Reyrove" },
  { text: "The art of living is in balancing discipline with creativity—rigor with open-mindedness.", author: "Reyrove" },
  { text: "True transformation comes when you stop waiting for permission and start believing in your own power.", author: "Reyrove" },
  { text: "Harness the power of your imagination—it is the blueprint for the future you want to create.", author: "Reyrove" },
  { text: "Every idea, no matter how small, has the potential to become a catalyst for extraordinary change.", author: "Reyrove" },
  { text: "The key to mastering any craft, including life itself, is patience, persistence, and a willingness to fail.", author: "Reyrove" },
  { text: "Your inner dialogue shapes your reality—choose thoughts that empower, not limit, your potential.", author: "Reyrove" },
  { text: "Innovation is born when you let go of fear and embrace curiosity with an open heart.", author: "Reyrove" },
  { text: "The greatest breakthroughs come when you combine knowledge with empathy and kindness.", author: "Reyrove" },
  { text: "Progress is not about perfection; it’s about continuous improvement and learning from mistakes.", author: "Reyrove" },
  { text: "Unlock your potential by stepping outside your comfort zone and embracing uncertainty.", author: "Reyrove" },
  { text: "Every code you write, every decision you make, is an opportunity to create meaning and impact.", author: "Reyrove" },
  { text: "Remember, transformation is a journey, not a destination—celebrate every moment of growth.", author: "Reyrove" },
  { text: "Creativity is a tool to reimagine your world—start with the belief that change is possible.", author: "Reyrove" },
  { text: "The most powerful code you can write is the one that rewires your own limiting beliefs.", author: "Reyrove" },
  { text: "Success isn’t just about what you achieve; it’s about who you become along the way.", author: "Reyrove" },
  { text: "Your story matters—own it, evolve it, and inspire others to do the same.", author: "Reyrove" },
  { text: "When you align your passion with purpose, you unlock a force that can change your life and others'.", author: "Reyrove" },
  { text: "Growth happens when you confront your fears and choose to act in spite of them.", author: "Reyrove" },
  { text: "Life is the ultimate codebase—debug your mindset, optimize your habits, and deploy your best self.", author: "Reyrove" },
  { text: "Start where you are, use what you have, and do what you can to build the future you want.", author: "Reyrove" },
  { text: "The only limits that exist are the ones you impose on yourself—break free and soar.", author: "Reyrove" },
  { text: "Let your creativity be the light that guides you through uncertainty and doubt.", author: "Reyrove" },
  { text: "Transformation requires courage—the courage to let go of the familiar and embrace the unknown.", author: "Reyrove" }
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  modalText.innerHTML = `${quotes[randomIndex].text}<br><span style="font-style: italic; font-size: 0.7em; margin-top: 10px; display: block;">— ${quotes[randomIndex].author}</span>`;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; 
}

const modal = document.createElement('div');
modal.classList.add('modal-overlay');
modal.style.display = 'none'; 

const popup = document.createElement('div');
popup.classList.add('modal-popup');

const modalText = document.createElement('p');
popup.appendChild(modalText);
modal.appendChild(popup);
document.body.appendChild(modal);

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; 
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

if (profilePic) {
  profilePic.addEventListener('click', showRandomQuote);
  profilePic.addEventListener('touchstart', (e) => {
    e.preventDefault();
    profilePic.classList.add('hovered');
    showRandomQuote();
  });
  profilePic.addEventListener('touchend', () => {
    profilePic.classList.remove('hovered');
  });
}

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } else {
    console.error('Back to top button not found!');
  }
});