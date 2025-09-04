# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **modern responsive website** for Vivah Villa Collection, a premium wedding attire rental business based in Rajkot, Gujarat. The site features a completely redesigned interface with modern HTML5, advanced CSS Grid/Flexbox layouts, and enhanced JavaScript functionality for optimal user experience across all devices.

**Live URL**: https://vivahvilla.in

## Technology Stack

- **Frontend**: Modern HTML5, CSS3 with Grid/Flexbox, JavaScript ES6+
- **Typography**: Google Fonts (Inter + Playfair Display)
- **Icons**: Font Awesome 6.4.0
- **Animations**: CSS transitions with Intersection Observer API
- **SEO**: Enhanced Schema.org structured data, sitemap.xml, robots.txt
- **Responsive**: Mobile-first design with advanced breakpoint system
- **Hosting**: Static site (no build process required)

## Development Commands

### Local Development
```bash
# Serve the site locally (any HTTP server will work)
python -m http.server 8000
# OR
npx serve .
# OR
php -S localhost:8000
```

### Testing
```bash
# Validate HTML (if you have html5validator installed)
html5validator --root . --also-check-css --also-check-svg

# Test responsive images and links
python -m webbrowser index.html
```

### Deployment
```bash
# Simple file copy to web server - no build process needed
# All files in root directory should be uploaded to web root
```

## Architecture & File Structure

### Core Files
- **`index.html`** - Main single-page application with all sections
- **`styles.css`** - Complete CSS with custom properties, responsive design, and animations
- **`animations.js`** - Scroll-based animation system and footer year updater

### Data Files
- **`collections.json`** - Product catalog with tags, images, prices, descriptions
- **`gallery_manifest.json`** - Controls gallery image counts by gender (`Male: 16`, `Female: 3`)

### Asset Structure
```
img/
  ├── collections/     # Product photos (men-*, women-*)
  ├── gallery/
  │   ├── Male/       # 16 photos (1.jpg through 16.jpg)
  │   ├── Female/     # 3 photos (1.jpg through 3.jpg)
  │   └── hero.jpg    # Main hero section background
  └── logo/           # Brand logos and watermarks
```

## Key Architecture Patterns

### Animation System
The site uses a custom scroll-based animation framework:
- Elements with `data-anim` attributes get animated on scroll
- Supports variants: `fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom-in`, `tilt-in`, etc.
- Uses CSS custom properties for timing and offsets
- Respects `prefers-reduced-motion`

### Gallery System
Dynamic image gallery with gender toggle:
- Reads `gallery_manifest.json` to determine image counts
- Loads images from `img/gallery/{gender}/{number}.jpg`
- Creates 3D carousel effect with reflections
- Toggle switches between Male/Female collections

### Collections Filter
Tag-based product filtering:
- Products loaded from `collections.json` with tag arrays
- Filter tabs manipulate `display` CSS property
- Supports tags: `men`, `women`, `Indowestern`, `sherwani`, `lehenga`, `Jodhpuri`, `choli`

### CSS Architecture
- **CSS Custom Properties** for theming (`--vv-maroon`, `--vv-gold`, etc.)
- **Mobile-first responsive** with specific breakpoints (768px, 900px, 1024px)
- **Component-based classes** (`.card`, `.btn`, `.cta`, `.pill`)
- **Animation utilities** with consistent easing and timing

## Development Guidelines

### Adding New Collections
1. Add product images to `img/collections/`
2. Update `collections.json` with new entries including proper tags
3. Ensure image names follow pattern: `{gender}-{type}-{number}.{ext}`

### Adding Gallery Images
1. Add images to `img/gallery/Male/` or `img/gallery/Female/`
2. Name sequentially: `1.jpg`, `2.jpg`, etc.
3. Update `gallery_manifest.json` with new counts

### Modifying Animations
- Use existing `data-anim` variants when possible
- Set custom timing with `--d` CSS custom property
- Add `--tx` and `--ty` for custom offsets
- Stagger child animations with `--i` property

### Color System
Primary brand colors are defined as CSS custom properties:
- `--vv-maroon: #8b1538` (Primary brand color)
- `--vv-gold: #d4af37` (Accent color)  
- `--vv-cream: #fff8ee` (Background sections)
- `--vv-blue: #133a63` (Price text)

### Performance Considerations
- Images are loaded progressively in gallery
- Font Awesome loaded with print media trick for non-blocking
- Google Fonts preconnected for faster loading
- Inline critical CSS for above-the-fold content

## Contact Information Integration

The site includes live contact integration:
- **WhatsApp**: Direct link with pre-filled message
- **Phone**: +919099055844 (click-to-call)
- **Email**: vivahvillacollection@gmail.com
- **Form**: Uses FormSubmit.co for contact form processing

## SEO & Analytics Setup

- Schema.org LocalBusiness markup implemented
- Google Search Console verification (`googlea978b661687e25c2.html`)
- Sitemap and robots.txt configured for search engines
- Open Graph meta tags for social media sharing

## Browser Compatibility

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari 12+, Chrome Android 80+
- **Graceful degradation**: Animations disabled for reduced motion preference
