import '@testing-library/jest-dom'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as any

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock CSS.supports
Object.defineProperty(window.CSS, 'supports', {
  writable: true,
  value: jest.fn().mockReturnValue(true),
})

// Mock getComputedStyle for CSS custom properties
const originalGetComputedStyle = window.getComputedStyle
window.getComputedStyle = function (element: Element) {
  const computedStyle = originalGetComputedStyle(element)

  // Custom property accessor
  const getPropertyValue = (property: string) => {
    if (property.startsWith('--')) {
      // Return mock values for CSS custom properties based on design tokens
      const mockValues: Record<string, string> = {
        '--color-bg-page-dark': '#050816',
        '--color-bg-page-alt-dark': '#0B1220',
        '--color-bg-surface-dark': '#020617',
        '--color-status-answered': '#16A34A',
        '--color-status-pending': '#FACC15',
        '--color-status-overdue': '#EF4444',
        '--font-family-heading-redesign': 'var(--font-dm-serif)',
        '--font-size-3xl': '1.75rem',
        '--font-size-4xl': '2.5rem',
        '--line-height-tighter': '1.1',
        '--border-radius-xl': '16px',
        '--shadow-card-redesign': '0 12px 30px rgba(15, 23, 42, 0.16)',
        '--spacing-section': '3rem',
        '--icon-size-base': '20px',
        '--icon-size-lg': '24px',
      }
      return mockValues[property] || ''
    }
    return computedStyle.getPropertyValue(property)
  }

  return {
    ...computedStyle,
    getPropertyValue,
  } as CSSStyleDeclaration
}
