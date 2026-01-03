# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-01-03

### Added
- Comprehensive favicon support (16x16, 32x32, apple-touch-icon, android-chrome icons)
- `site.webmanifest` with PWA configuration
- `robots.txt` for search engine crawler directives
- `sitemap.xml` with all featured product pages
- JSON-LD structured data (Person schema) with social links
- Security headers in Vercel config (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy)

### Changed
- Updated SEO metadata: title to "Alex McGovern — AI Product Manager"
- Updated meta description to focus on production-grade AI features
- Updated Open Graph and Twitter metadata with new social preview images
- Updated 404 page with improved styling and focus states
- Updated global focus color to match new gradient (#7ACAFF)

### Fixed
- Carousel aria-hidden accessibility issues preventing images from displaying
- Carousel rendering reliability on mobile devices

## [2.1.0] - 2026-01-03

### Added
- Mobile-specific optimizations for image carousel
- Footer icons wrap to 2 rows of 3 on mobile
- Spotify player height doubled on mobile/tablet (300px/600px)
- Beyond Product text container 100% width on tablet
- Job overview card gradient stroke with proper height matching
- Email copy pill hover gradient effect
- Icon hover effects with lateral swipe transitions

### Changed
- Updated all gradient colors from `#00a1ff/#00ff6f` to `#7ACAFF/#67FFC2`
- Replaced all social icons with new SVG versions
- Updated Digital art section icons to SVG
- Improved mobile layout and spacing throughout
- Job overview card image uses natural aspect ratio on mobile
- Footer icon spacing optimized for mobile

### Fixed
- Job overview card border intermittent issue with useLayoutEffect and ResizeObserver
- Spotify player empty space issues
- Padding under Spotify player on mobile/tablet
- Carousel accessibility warnings
- Mobile carousel rendering issues

## [2.0.0] - 2025-12-27

### Added
- Production-ready portfolio codebase refactored from Figma Make prototype
- React + TypeScript architecture with Vite
- Tailwind CSS styling system
- React Router for navigation
- Component-based architecture with clear separation of concerns
- Route-based code splitting and lazy loading
- Content as data structure (projects, skills, paintings in TypeScript)
- Featured products section
- AI product management section with job overview and skill cards
- Digital art carousel section
- Beyond product section with Spotify and YouTube embeds
- Project detail pages with PRD sections
- Sticky Contents navigation on desktop
- Responsive design for mobile, tablet, and desktop
- Error boundaries and 404 page
- Google Analytics integration
- Vercel deployment configuration

### Changed
- Refactored from monolithic prototype components to maintainable, production-quality code
- Improved performance with intentional loading behavior
- Enhanced accessibility with semantic HTML, focus management, and ARIA labels
- Consolidated styling for consistency and easier maintenance

---

## Version History

- **v1.0.0** - Original Figma Make prototype (pre-refactoring, not in this repository)
- **v2.0.0** - Production-ready refactored codebase (Initial commit: 2025-12-27)
- **v2.1.0** - Major feature updates and design improvements (2026-01-03)
- **v2.2.0** - Production-level polish (SEO, security, accessibility) (2026-01-03)
