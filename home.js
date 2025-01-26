// Get the elements to be revealed
const elementsToReveal = [
    document.querySelector('.rectangle-18'),
    document.querySelector('.rectangle-19'),
    document.querySelector('.rectangle-20'),
    document.querySelector('.rectangle-21'),
    document.querySelector('.h1'),
    document.querySelector('.h2-container')
  ];
  
  // Function to check if the elements are in view
  function checkIfInView() {
      elementsToReveal.forEach(element => {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
              // Add visible class when element is in view
              element.classList.add('visible');
              element.classList.remove('hidden');
          } else {
              // Optionally, you can hide them again when they go out of view
              element.classList.remove('visible');
              element.classList.add('hidden');
          }
      });
  }
  
  // Run the check when the page is loaded and when the user scrolls
  window.addEventListener('scroll', checkIfInView);
  document.addEventListener('DOMContentLoaded', checkIfInView);
  