# yamanbosna.li

Personal site of Yaman Bosnali, built around a loss-landscape theme.

- **Stack:** Astro (static output), TypeScript, D3 (build-time contours), self-hosted fonts
- **Hosting:** Cloudflare Pages, deployed on every push to `main`

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm test` | Optimizer unit tests (hero surface, PRD Appendix B) |

## Where things live

| Path | Contents |
|---|---|
| `src/data/` | All site content: profile, roles, projects, skills. Edit these to update the site |
| `src/lib/surface.ts` | Hero loss surface and SGD, Momentum, Adam optimizers |
| `src/components/` | Sections and figures |
| `src/styles/tokens.css` | Colors, fonts, and both themes |
| `public/resume.pdf` | The public resume. Replace this file to update it |

## Cloudflare Pages settings

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 (from `.node-version`)
