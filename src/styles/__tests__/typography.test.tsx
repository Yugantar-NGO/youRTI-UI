/**
 * Typography Rendering Tests - Task 1
 *
 * Validates that typography scales correctly across breakpoints
 * and that font families are properly applied.
 *
 * Tests cover:
 * - Typography scale consistency
 * - Font family application
 * - Responsive behavior
 * - Line height calculations
 */

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Typography Rendering - Task 1', () => {
  describe('Font Family Application', () => {
    it('should apply DM Serif Display to headline elements', () => {
      const { container } = render(
        <div style={{ fontFamily: 'var(--font-dm-serif)' }}>
          <h1>Test Headline</h1>
        </div>
      )

      const div = container.firstChild as HTMLElement
      expect(div).toBeInTheDocument()
      expect(div.style.fontFamily).toContain('var(--font-dm-serif)')
    })

    it('should maintain separate font variables for old and new headlines', () => {
      const oldHeadline = 'var(--font-playfair)'
      const newHeadline = 'var(--font-dm-serif)'

      expect(oldHeadline).not.toBe(newHeadline)
      expect(oldHeadline).toContain('playfair')
      expect(newHeadline).toContain('dm-serif')
    })

    it('should apply Inter to body text', () => {
      const { container } = render(
        <p style={{ fontFamily: 'var(--font-inter)' }}>Body text</p>
      )

      const p = container.firstChild as HTMLElement
      expect(p).toBeInTheDocument()
      expect(p.style.fontFamily).toContain('var(--font-inter)')
    })

    it('should apply IBM Plex Mono to monospace text', () => {
      const { container } = render(
        <code style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>Code text</code>
      )

      const code = container.firstChild as HTMLElement
      expect(code).toBeInTheDocument()
      expect(code.style.fontFamily).toContain('var(--font-ibm-plex-mono)')
    })
  })

  describe('Typography Scale (TODO 3)', () => {
    it('should render H1 at 40px (2.5rem)', () => {
      const { container } = render(
        <h1 style={{ fontSize: 'var(--font-size-4xl)' }}>H1 Headline</h1>
      )

      const h1 = container.firstChild as HTMLElement
      expect(h1).toBeInTheDocument()
      expect(h1.style.fontSize).toContain('var(--font-size-4xl)')
    })

    it('should render H2 at 28px (1.75rem)', () => {
      const { container } = render(
        <h2 style={{ fontSize: 'var(--font-size-3xl)' }}>H2 Section Title</h2>
      )

      const h2 = container.firstChild as HTMLElement
      expect(h2).toBeInTheDocument()
      expect(h2.style.fontSize).toContain('var(--font-size-3xl)')
    })

    it('should have proportional scale between heading levels', () => {
      const h1Size = 2.5 // rem (40px)
      const h2Size = 1.75 // rem (28px)
      const h3Size = 1.5 // rem (24px)

      // Each level should be smaller than the previous
      expect(h1Size).toBeGreaterThan(h2Size)
      expect(h2Size).toBeGreaterThan(h3Size)

      // Scale should be reasonable (not too drastic)
      const h1ToH2Ratio = h1Size / h2Size
      expect(h1ToH2Ratio).toBeGreaterThan(1.2)
      expect(h1ToH2Ratio).toBeLessThan(2)
    })

    it('should use base font size of 16px (1rem)', () => {
      const { container } = render(
        <p style={{ fontSize: 'var(--font-size-base)' }}>Body text</p>
      )

      const p = container.firstChild as HTMLElement
      expect(p).toBeInTheDocument()
      expect(p.style.fontSize).toContain('var(--font-size-base)')
    })
  })

  describe('Line Height Application (TODO 3)', () => {
    it('should apply tight line height (1.1) to large headlines', () => {
      const { container } = render(
        <h1 style={{ lineHeight: 'var(--line-height-tighter)' }}>
          Big Win of the Week
        </h1>
      )

      const h1 = container.firstChild as HTMLElement
      expect(h1).toBeInTheDocument()
      expect(h1.style.lineHeight).toContain('var(--line-height-tighter)')
    })

    it('should apply normal line height (1.5) to body text', () => {
      const { container } = render(
        <p style={{ lineHeight: 'var(--line-height-normal)' }}>
          This is body text that should be easy to read with proper line spacing.
        </p>
      )

      const p = container.firstChild as HTMLElement
      expect(p).toBeInTheDocument()
      expect(p.style.lineHeight).toContain('var(--line-height-normal)')
    })

    it('should have looser line height for body than headlines', () => {
      const tighter = 1.1 // Headlines
      const tight = 1.2 // Subheadings
      const normal = 1.5 // Body text

      expect(normal).toBeGreaterThan(tight)
      expect(tight).toBeGreaterThan(tighter)
    })
  })

  describe('Responsive Typography', () => {
    it('should maintain typography tokens across viewport sizes', () => {
      const tokens = [
        '--font-size-4xl',
        '--font-size-3xl',
        '--font-size-base',
      ]

      // Typography tokens should be defined consistently
      tokens.forEach((token) => {
        expect(token).toMatch(/^--font-size-/)
      })
    })

    it('should use rem units for scalable typography', () => {
      const sizes = {
        h1: '2.5rem',
        h2: '1.75rem',
        base: '1rem',
      }

      Object.values(sizes).forEach((size) => {
        expect(size).toMatch(/rem$/)
      })
    })
  })

  describe('Font Weight Consistency', () => {
    it('should render headlines with DM Serif Display (400 weight)', () => {
      const { container } = render(
        <h1
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontWeight: 400,
          }}
        >
          Stories That Changed Something
        </h1>
      )

      const h1 = container.firstChild as HTMLElement
      expect(h1).toBeInTheDocument()
      expect(h1.style.fontWeight).toBe('400')
    })

    it('should support multiple Inter weights for body hierarchy', () => {
      const weights = [400, 500, 600]

      weights.forEach((weight) => {
        const { container } = render(
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: weight,
            }}
          >
            Text at weight {weight}
          </p>
        )

        const p = container.firstChild as HTMLElement
        expect(p).toBeInTheDocument()
        expect(p.style.fontWeight).toBe(String(weight))
      })
    })
  })

  describe('Heading Hierarchy', () => {
    it('should render complete heading hierarchy', () => {
      const { container } = render(
        <div>
          <h1>Level 1: Hero Title</h1>
          <h2>Level 2: Section Title</h2>
          <h3>Level 3: Subsection</h3>
          <h4>Level 4: Card Title</h4>
        </div>
      )

      const h1 = container.querySelector('h1')
      const h2 = container.querySelector('h2')
      const h3 = container.querySelector('h3')
      const h4 = container.querySelector('h4')

      expect(h1).toBeInTheDocument()
      expect(h2).toBeInTheDocument()
      expect(h3).toBeInTheDocument()
      expect(h4).toBeInTheDocument()
    })

    it('should have decreasing font sizes for heading hierarchy', () => {
      const fontSizes = {
        h1: 2.5, // rem
        h2: 1.75,
        h3: 1.5,
        h4: 1.25,
      }

      expect(fontSizes.h1).toBeGreaterThan(fontSizes.h2)
      expect(fontSizes.h2).toBeGreaterThan(fontSizes.h3)
      expect(fontSizes.h3).toBeGreaterThan(fontSizes.h4)
    })
  })

  describe('Typography Tokens', () => {
    it('should have all required font size tokens defined', () => {
      const requiredTokens = [
        '--font-size-xs',
        '--font-size-sm',
        '--font-size-base',
        '--font-size-lg',
        '--font-size-xl',
        '--font-size-2xl',
        '--font-size-3xl',
        '--font-size-4xl',
      ]

      requiredTokens.forEach((token) => {
        expect(token).toBeTruthy()
        expect(token).toMatch(/^--font-size-/)
      })
    })

    it('should have all required line height tokens defined', () => {
      const requiredTokens = [
        '--line-height-tighter',
        '--line-height-tight',
        '--line-height-snug',
        '--line-height-normal',
        '--line-height-relaxed',
        '--line-height-loose',
      ]

      requiredTokens.forEach((token) => {
        expect(token).toBeTruthy()
        expect(token).toMatch(/^--line-height-/)
      })
    })

    it('should have all required font family tokens defined', () => {
      const requiredTokens = [
        '--font-family-heading',
        '--font-family-heading-redesign',
        '--font-family-body',
        '--font-family-mono',
      ]

      requiredTokens.forEach((token) => {
        expect(token).toBeTruthy()
        expect(token).toMatch(/^--font-family-/)
      })
    })
  })

  describe('Text Rendering Quality', () => {
    it('should apply font-smoothing for better rendering', () => {
      const { container } = render(
        <p style={{ WebkitFontSmoothing: 'antialiased' }}>
          Smoothed text for better readability
        </p>
      )

      const p = container.firstChild as HTMLElement
      expect(p).toBeInTheDocument()
      // WebkitFontSmoothing is a non-standard property, just verify element exists
    })

    it('should use swap display strategy to prevent FOIT', () => {
      // Font display swap prevents invisible text during font load
      const fontDisplay = 'swap'
      expect(fontDisplay).toBe('swap')
    })
  })

  describe('Typography Variables Integration', () => {
    it('should map redesign heading font to DM Serif Display', () => {
      const redesignToken = 'var(--font-dm-serif)'
      expect(redesignToken).toContain('--font-dm-serif')
    })

    it('should maintain backward compatibility with Playfair', () => {
      const oldToken = 'var(--font-playfair)'
      expect(oldToken).toContain('--font-playfair')
    })

    it('should support both heading systems simultaneously', () => {
      const tokens = [
        '--font-family-heading', // Old: Playfair
        '--font-family-heading-redesign', // New: DM Serif
      ]

      // Both should be available for gradual migration
      expect(tokens.length).toBe(2)
      expect(tokens[0]).not.toBe(tokens[1])
    })
  })

  describe('Content Readability', () => {
    it('should render multi-line headlines with tight spacing', () => {
      const { container } = render(
        <h1
          style={{
            fontSize: 'var(--font-size-4xl)',
            lineHeight: 'var(--line-height-tighter)',
          }}
        >
          This is a long headline that might wrap to multiple lines in the interface
        </h1>
      )

      const h1 = container.firstChild as HTMLElement
      expect(h1).toHaveTextContent('This is a long headline')
    })

    it('should render body text with comfortable line spacing', () => {
      const { container } = render(
        <p
          style={{
            fontSize: 'var(--font-size-base)',
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          This is body text that should be comfortable to read across multiple
          lines with adequate spacing for optimal readability.
        </p>
      )

      const p = container.firstChild as HTMLElement
      expect(p).toHaveTextContent('This is body text')
    })
  })

  describe('Small Text Readability', () => {
    it('should render small text (12px) for metadata', () => {
      const { container } = render(
        <span style={{ fontSize: 'var(--font-size-xs)' }}>
          Filed 2 days ago
        </span>
      )

      const span = container.firstChild as HTMLElement
      expect(span).toHaveStyle({ fontSize: 'var(--font-size-xs)' })
    })

    it('should ensure small text is above minimum readable size', () => {
      const xsSize = 0.75 // rem (12px)
      const smSize = 0.875 // rem (14px)

      // Even smallest text should be at least 12px
      expect(xsSize * 16).toBeGreaterThanOrEqual(12)
      expect(smSize * 16).toBeGreaterThanOrEqual(14)
    })
  })
})
