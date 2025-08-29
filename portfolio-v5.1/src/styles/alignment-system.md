# Left Alignment System

This document describes the left alignment system implemented across the portfolio site. The goal is to ensure that all primary content shares the exact same left alignment edge.

## Core Components

### CSS Variables

```css
:root {
  --inset-left: 1.5rem;      /* Default for mobile (theme('padding.6')) */
  --inset-left-md: 2rem;     /* For medium screens and up (theme('padding.8')) */
}
```

### Utility Class

```css
.align-left {
  padding-left: var(--inset-left);
}

.align-left > * {
  margin-left: 0; /* prevent double-indent */
}

@media (min-width: theme('screens.md')) {
  .align-left {
    padding-left: var(--inset-left-md);
  }
}
```

### Container Implementation

The main container uses these variables directly:

```css
.container-page { 
  max-width: theme('maxWidth.6xl');
  margin-left: auto;
  margin-right: auto;
  padding-right: theme('padding.6');
  padding-left: var(--inset-left);
}

@media (min-width: theme('screens.md')) {
  .container-page { 
    padding-right: theme('padding.8');
    padding-left: var(--inset-left-md);
  }
}
```

## Usage Guidelines

1. For top-level sections that need to align with the reference element (`#home`), add the `align-left` class.
2. For navigation and fixed elements, use `left-[var(--inset-left)]` directly.
3. When nesting aligned elements, be cautious of additional margins/paddings that could shift content.
4. For responsive design, the system automatically adjusts at the MD breakpoint.

## Reference Element

The home section (`#home`) is used as the reference anchor for all alignment.

## Implementation Areas

- Navigation bar (fixed positioning)
- Section headings 
- Content blocks
- Cards and other UI components

## Benefits

- Consistent visual rhythm across the site
- Improved readability
- Professional and polished design appearance
- Easier maintenance of alignment across components
