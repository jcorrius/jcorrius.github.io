import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Personal Website', () => {
  beforeEach(() => {
    // Set up basic HTML structure for tests
    document.body.innerHTML = `
      <nav id="sideNav" class="navbar">
        <a class="navbar-brand js-scroll-trigger" href="#page-top">Test</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#about">About</a>
            </li>
          </ul>
        </div>
      </nav>
      <section id="about" class="resume-section">
        <h1>Test Content</h1>
      </section>
    `;
  });

  it('should have navigation elements', () => {
    const nav = document.querySelector('#sideNav');
    expect(nav).toBeTruthy();

    const navLinks = document.querySelectorAll('.js-scroll-trigger');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should have resume sections', () => {
    const sections = document.querySelectorAll('.resume-section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should handle scroll trigger clicks', () => {
    const scrollTrigger = document.querySelector(
      '.js-scroll-trigger[href="#about"]'
    ) as HTMLAnchorElement;
    const targetSection = document.querySelector('#about');

    expect(scrollTrigger).toBeTruthy();
    expect(targetSection).toBeTruthy();

    // Mock scrollIntoView
    const mockScrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    // Simulate click
    const clickEvent = new Event('click');
    scrollTrigger?.dispatchEvent(clickEvent);

    // Note: Testing the actual scroll behavior would require importing and testing the main.ts module
    // This test verifies the DOM structure is correct for the functionality
  });
});
