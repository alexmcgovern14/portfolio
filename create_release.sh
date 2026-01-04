#!/bin/bash
# Script to create GitHub Release for v2.2.0

RELEASE_NOTES=$(cat << 'EOF'
## [2.2.0] - 2026-01-03

### Added
- Comprehensive favicon support (16x16, 32x32, apple-touch-icon, android-chrome icons)
- `site.webmanifest` with PWA configuration
- `robots.txt` for search engine crawler directives
- `sitemap.xml` with all featured product pages
- JSON-LD structured data (Person schema) with social links
- Security headers in Vercel config
- Dynamic version from package.json in footer

### Changed
- Updated SEO metadata: title to "Alex McGovern — AI Product Manager"
- Updated meta description to focus on production-grade AI features
- Updated Open Graph and Twitter metadata with new social preview images
- Updated 404 page with improved styling and focus states
- Updated global focus color to match new gradient (#7ACAFF)

### Fixed
- Carousel aria-hidden accessibility issues preventing images from displaying
- Carousel rendering reliability on mobile devices
EOF
)

echo "To create a GitHub Release, you can either:"
echo ""
echo "1. Use GitHub CLI (if installed):"
echo "   gh release create v2.2.0 --title 'v2.2.0' --notes '$RELEASE_NOTES'"
echo ""
echo "2. Or create it manually at:"
echo "   https://github.com/alexmcgovern14/portfolio/releases/new"
echo "   - Tag: v2.2.0"
echo "   - Title: v2.2.0"
echo "   - Description: (paste the changelog content)"
