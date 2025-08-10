import 'bootstrap';
import './scss/styles.scss';

/**
 * Smooth scrolling functionality for navigation links
 */
class SmoothScroll {
  constructor() {
    this.initScrollTriggers();
  }

  private initScrollTriggers(): void {
    const scrollTriggers = document.querySelectorAll('.js-scroll-trigger');

    scrollTriggers.forEach((trigger) => {
      trigger.addEventListener('click', this.handleScrollClick.bind(this));
    });

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.querySelector('.navbar-toggler');
    const responsiveNavItems = document.querySelectorAll('#navbarSupportedContent .nav-link');

    responsiveNavItems.forEach((responsiveNavItem) => {
      responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler as Element).display !== 'none') {
          (navbarToggler as HTMLElement).click();
        }
      });
    });
  }

  private handleScrollClick(event: Event): void {
    event.preventDefault();

    const target = event.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute('href');

    if (href?.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SmoothScroll();
});

// Add some modern enhancements
class ModernEnhancements {
  constructor() {
    this.addIntersectionObserver();
    this.addKeyboardNavigation();
  }

  private addIntersectionObserver(): void {
    // Add scroll-based animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.resume-section').forEach((section) => {
      observer.observe(section);
    });
  }

  private addKeyboardNavigation(): void {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }
}

// Initialize modern enhancements
document.addEventListener('DOMContentLoaded', () => {
  new ModernEnhancements();
});
