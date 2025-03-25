/**
 * TechVision Solutions - Main JavaScript
 * Handles responsive navigation, smooth scrolling, and interactive elements
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");
  const navbar = document.querySelector(".navbar");

  // Toggle mobile menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinksItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Highlight active section in navigation
  const highlightActiveSection = () => {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + 100; // Offset for navbar height

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinksItems.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  // Change navbar style on scroll
  const changeNavbarStyle = () => {
    if (window.scrollY > 0) {
      navbar.style.padding = "8px 0";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.padding = "15px 0";
      navbar.style.boxShadow = "none";
    }
  };

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for navbar height
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on scroll - simple reveal effect
  const revealElements = () => {
    const elements = document.querySelectorAll(
      ".feature, .service-card, .team-member"
    );
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  };

  // Event listeners for scroll events
  window.addEventListener("scroll", () => {
    highlightActiveSection();
    changeNavbarStyle();
    revealElements();
  });

  // Initialize
  highlightActiveSection();
  changeNavbarStyle();
  revealElements();
});
