# Hoang Minh Phuong Blog

## Overview
A personal blog website built with static HTML, CSS, and JavaScript. The blog is written in Vietnamese and Japanese, featuring personal posts about career aspirations, hobbies, and self-introductions.

## Project Structure
- `index.html` - Main homepage with blog post listings
- `about.html` - About page
- `cv.html` - Resume/CV page (履歴書)
- `newpost.html` - Page for creating new posts
- `post/` - Directory containing individual blog posts
- `css/` - Stylesheets
  - `header-footer.css` - Header and footer styles
  - `home.css` - Homepage styles
  - `post-style.css` - Individual post styles
  - `newpost.css` - New post form styles
  - `cv.css` - CV page styles
- `js/` - JavaScript files
  - `script.js` - Main site scripts
  - `post.js` - Post-related functionality
  - `newpost.js` - New post form functionality
- `images/` - Image assets
- `pdf/` - PDF documents

## Development
The site is served using a simple Python HTTP server with cache control headers disabled.

To run locally:
```bash
python server.py
```

The server runs on port 5000 at 0.0.0.0.

## Deployment
This is a static site and can be deployed directly. All HTML, CSS, JS, and assets are served from the root directory.
