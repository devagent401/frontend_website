# Navbar System Documentation

## Overview

The navbar system has been completely refactored to use a shared configuration and reusable components. This eliminates code duplication and makes the navbar fully configurable through a single JSON object.

## Architecture

### Core Components

1. **JsonNavbarCategory.ts** - Central configuration file
2. **CategoryDropdown.tsx** - Shared category dropdown component
3. **BottomNavigation.tsx** - Mobile bottom navigation
4. **Navbar.tsx** - Main desktop navbar
5. **NavbarMobile.tsx** - Mobile sidebar navigation

### Configuration Structure

```typescript
// NAVBAR_CONFIG contains all navbar configuration
{
  logo: {
    text: "EasyCommerce",
    shortText: "E", 
    href: "/"
  },
  searchPlaceholder: "Search products...",
  whatsappNumber: "your-number",
  navLinks: [...], // Navigation links with mobile/desktop visibility
  bottomNav: [...], // Bottom navigation items
  categories: [...] // Product categories
}
```

## Key Features

### ✅ Dynamic Configuration
- All navbar content is configurable through `NAVBAR_CONFIG`
- Easy to add/remove navigation links, categories, and bottom nav items
- Centralized configuration reduces errors and duplication

### ✅ Shared Components
- `CategoryDropdown` component works for desktop, mobile, and bottom navigation
- Single source of truth for category rendering logic
- Consistent behavior across all variants

### ✅ Responsive Design
- Desktop mega dropdown with hover interactions
- Mobile collapsible categories with smooth animations [[memory:8227078]]
- Bottom navigation for mobile with action buttons
- All components are fully mobile responsive

### ✅ Type Safety
- Full TypeScript support with exported types
- Proper interfaces for all component props
- Type-safe configuration structure

## Component Usage

### CategoryDropdown Variants

```tsx
// Desktop mega dropdown
<CategoryDropdown
  variant="desktop"
  isOpen={categoriesOpen}
  onToggle={() => setCategoriesOpen(!categoriesOpen)}
  onClose={() => setCategoriesOpen(false)}
  activeCategory={activeCategory}
  onCategoryHover={setActiveCategory}
/>

// Mobile sidebar categories
<CategoryDropdown
  variant="mobile"
  isOpen={categoriesOpen}
  onToggle={() => setCategoriesOpen(!categoriesOpen)}
  onClose={() => setCategoriesOpen(false)}
  expandedCategories={expandedCategories}
  onCategoryExpand={toggleCategoryExpansion}
/>

// Bottom navigation dropdown
<CategoryDropdown
  variant="bottom-nav"
  isOpen={categoriesOpen}
  onToggle={() => setCategoriesOpen(!categoriesOpen)}
  onClose={() => setCategoriesOpen(false)}
  expandedCategories={expandedCategories}
  onCategoryExpand={toggleCategoryExpansion}
/>
```

### BottomNavigation

```tsx
<BottomNavigation
  onCategoryToggle={() => setCategoriesOpen(!categoriesOpen)}
  categoriesOpen={categoriesOpen}
  onSignInToggle={() => setSignInSheetOpen(true)}
/>
```

## Customization

### Adding Navigation Links

Edit `NAVBAR_CONFIG.navLinks` in `JsonNavbarCategory.ts`:

```typescript
navLinks: [
  { 
    id: "new-link", 
    href: "/new-page", 
    label: "New Page", 
    showOnMobile: true, 
    showOnDesktop: true 
  },
  // ... other links
]
```

### Adding Categories

Edit `NAVBAR_CONFIG.categories`:

```typescript
categories: [
  {
    id: "new-category",
    title: "New Category",
    href: "/new-category",
    image_url: "/category/new-image.png",
    subcategories: [
      {
        id: "subcategory-1",
        title: "Subcategory 1",
        href: "/new-category/subcategory-1",
        items: ["Item 1", "Item 2"]
      }
    ]
  }
]
```

### Customizing Bottom Navigation

Edit `NAVBAR_CONFIG.bottomNav`:

```typescript
bottomNav: [
  { 
    id: "new-button", 
    label: "New", 
    href: "/new", 
    icon: "🔗", 
    type: "link" 
  },
  { 
    id: "action-button", 
    label: "Action", 
    icon: "⚡", 
    type: "action", 
    action: "custom-action" 
  }
]
```

## Animation Support

All animations use Tailwind CSS transitions and transforms [[memory:8227078]]:
- Category expansion/collapse with smooth height transitions
- Mobile menu slide animations with staggered delays
- Hover effects with color and background transitions
- Icon rotations for expand/collapse indicators

## Mobile Responsiveness

The system provides different experiences for different screen sizes:
- **Desktop (lg+)**: Mega dropdown with hover interactions
- **Mobile**: Full-screen sidebar + bottom navigation
- **Tablet**: Responsive layout that adapts to available space

## Backward Compatibility

For smooth migration, the following exports are maintained:
- `export const CATEGORIES = NAVBAR_CONFIG.categories`
- `export const NAV_LINKS = NAVBAR_CONFIG.navLinks`

## File Structure

```
src/components/navbar/
├── JsonNavbarCategory.ts     # Central configuration
├── CategoryDropdown.tsx      # Shared category component
├── BottomNavigation.tsx      # Mobile bottom nav
├── Navbar.tsx               # Main navbar
├── NavbarMobile.tsx         # Mobile sidebar
└── README.md               # This documentation
```

## Migration Notes

- Removed `MobileNavBottom.tsx` - replaced by `BottomNavigation.tsx`
- Removed `NavbarLinks.ts` - consolidated into `JsonNavbarCategory.ts`
- All category rendering logic moved to shared `CategoryDropdown.tsx`
- WhatsApp integration through configuration
