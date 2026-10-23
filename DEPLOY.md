# Deploying to GitHub Pages

1. Push this folder to your repository (branch `main`).
2. GitHub → **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`.
3. Wait about a minute; the site appears at `https://<user>.github.io/<repo>/`.
   All links are computed from the script location, so any repo name works.

## Why it stays fast
- Photos are served as WebP at the size they are shown: `images/w800` (cards, gallery grid, portrait)
  and `images/w1600` (post headers, enlarged photos). The 1–3 MB originals live in `images/original`
  and are **not** loaded by any page — you can keep them out of the repo (add `images/original/` to `.gitignore`).
- `.nojekyll` makes GitHub publish the files as-is (no Jekyll build).
- Image sizes (`width`/`height`) are set, so the layout does not jump while loading.
- Font Awesome loads without blocking the first paint; the home portrait is preloaded.
- Animations use only `transform`/`opacity`, and the scroll vignette is a separate fixed layer.

## When you add a new photo
Create the two WebP sizes (800 px and 1600 px wide, quality ~76) and put them in `images/w800` / `images/w1600`.

## Logo and phone home-screen icon
The ChiChiLu phoenix is used as the site icon (pixel-art redraw by default).

| File | Used for |
|---|---|
| `favicon.ico`, `favicon.svg` | Browser tab |
| `icons/apple-touch-icon.png` | iPhone / iPad "Add to Home Screen" |
| `icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` + `site.webmanifest` | Android / Chrome "Install app" |
| `images/logo-bird-pixel.png` | Pixel phoenix, transparent, 512 px (for any other use) |
| `images/logo-bird-classic.png` | Original phoenix (no text), transparent background |
| `icons/classic/` | The same icon set made from the original (smooth) artwork |

To use the smooth artwork instead of the pixel one, copy the 4 PNG files from `icons/classic/` over the ones in `icons/`.

**Add to the phone:** open the site, then
- iPhone (Safari): Share → *Add to Home Screen*.
- Android (Chrome): ⋮ menu → *Add to Home screen* / *Install app*.

Phones remember the icon from the moment you add the site. If you change the icon later, delete the shortcut and add it again.
