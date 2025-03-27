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
    // 使用更精确的导航栏高度偏移，考虑导航栏实际高度
    const navHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 20; // 增加20px额外偏移，优化检测

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      // 更精确的检测逻辑，确保准确识别当前部分
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight - navHeight
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
        // 获取导航栏高度，用于动态计算滚动偏移量
        const navHeight = navbar.offsetHeight;

        // 为不同部分设置不同的偏移量，优化显示
        let offset = navHeight + 10;
        if (targetId === "#home") {
          offset = 0; // 首页使用更小的偏移量
        } else if (targetId === "#about") {
          offset = navHeight + 30; // 关于我们部分使用更大的偏移量
        }

        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on scroll - simple reveal effect
  const revealElements = () => {
    const elements = document.querySelectorAll(
      ".feature, .service-card, .team-member, .workspace-item"
    );
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 120;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  };

  // 添加初始化函数，在页面加载时检查是否需要调整视图
  const adjustViewOnLoad = () => {
    // 检查分辨率是否接近1440*964
    if (window.innerWidth <= 1440 && window.innerHeight <= 964) {
      // 对于小屏幕，可能需要确保主要内容可见
      document.body.classList.add("compact-view");

      // 修复第一屏显示问题，确保足够的内容高度
      const homeSection = document.querySelector("#home");
      const aboutSection = document.querySelector("#about");
      if (homeSection && aboutSection) {
        // 确保home部分高度足够，不显示about部分
        const viewportHeight = window.innerHeight;
        homeSection.style.minHeight = `${viewportHeight}px`;

        // 增加about部分的上边距，防止它显示在第一屏
        aboutSection.style.paddingTop = "30px";
      }
    } else {
      document.body.classList.remove("compact-view");
    }
  };

  // Event listeners for scroll events
  window.addEventListener("scroll", () => {
    highlightActiveSection();
    changeNavbarStyle();
    revealElements();
  });

  // 添加窗口大小变化事件
  window.addEventListener("resize", adjustViewOnLoad);

  // Initialize
  highlightActiveSection();
  changeNavbarStyle();
  revealElements();
  adjustViewOnLoad();
});
