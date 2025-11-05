// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get elements
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  // Toggle mobile menu
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
    
    // Animate hamburger icon
    const menuIcon = menuToggle.querySelector('.menu-icon');
    menuIcon.style.transform = menu.classList.contains('show') 
      ? 'rotate(90deg)' 
      : 'rotate(0deg)';
  });

  // Smooth scroll to sections and close mobile menu
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get target section
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Get navbar height for offset
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        // Smooth scroll to section
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu after clicking
        menu.classList.remove('show');
        
        // Reset hamburger icon
        const menuIcon = menuToggle.querySelector('.menu-icon');
        menuIcon.style.transform = 'rotate(0deg)';
        
        // Add active state to clicked link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
      menu.classList.remove('show');
      const menuIcon = menuToggle.querySelector('.menu-icon');
      menuIcon.style.transform = 'rotate(0deg)';
    }
  });

  // Highlight active section on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= (sectionTop - navbar.offsetHeight - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Add transition to menu icon
  const menuIcon = menuToggle.querySelector('.menu-icon');
  menuIcon.style.transition = 'transform 0.3s ease';
});
