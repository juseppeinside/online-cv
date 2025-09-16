export const selectors = {
  // Header
  header: '#header',
  title: '#title',
  aboutMeButton: '#about-me-button',
  tools: '#tools',

  // Navigation buttons
  languageButton: 'button[aria-label*="Toggle language"]',
  themeButton: 'button[aria-label="Toggle theme"]',

  // Sections
  aboutMe: '#about-me',
  myStack: 'section:nth-of-type(2)',
  myExperience: 'section:nth-of-type(3)',
  contacts: '#contacts',

  // Copy buttons - ищем в секции контактов
  copyButtons: '#contacts button:has(svg)',

  // Contact links
  telegramLink: 'a[href*="t.me"]',
  linkedinLink: 'a[href*="linkedin.com"]',
  githubLink: 'a[href*="github.com"]',
  emailLink: 'a[href^="mailto:"]',
  phoneLink: 'a[href^="tel:"]',

  // Footer
  footer: 'footer',
  githubStars: 'footer div:has(svg)',

  // Animations
  slideUp: '#slide-up',

  // Custom cursor
  customCursor: 'div[class*="pointer-events-none"]:has(svg)',

  // Tooltips - ищем по тексту "Theme" или "Тема"
  tooltip:
    'nav div[id^="tooltip-"]:has-text("Theme"), nav div[id^="tooltip-"]:has-text("Тема")',
} as const;
