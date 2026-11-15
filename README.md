# TDM BUD — Turnkey Apartment & House Renovation in Chernivtsi

A single-page website for **TDM BUD**, a local company in Chernivtsi that
provides turnkey renovation of apartments and houses in the city and the
surrounding region.

The site introduces the company, explains how it works, showcases completed
projects and client reviews, and collects requests for a free cost estimate.

🔗 **Live site:** [www.tdm-bud.com](https://www.tdm-bud.com/)

## Features

- **Responsive, mobile-first layout** with a burger menu on mobile.
- **Portfolio from the API** — project cards are loaded from the backend; the
  "More photos" button fetches a project's photos on demand and opens them in a
  lightbox (SimpleLightbox). On mobile the portfolio turns into a slider.
- **Reviews from the API** — a Swiper slider with navigation and pagination.
- Loaders are shown while data is loading. If the API is unavailable or returns
  an empty list, the portfolio and reviews sections are hidden so the page never
  shows empty blocks.
- **Request form** (in a page section and in a modal) validated with Yup:
  name — 3–30 characters, phone — Ukrainian format (`380XXXXXXXXX` or
  `0XXXXXXXXX`). Errors appear next to the field as the user types. The request
  is sent to `POST /leads`, and the result is shown with an iziToast
  notification.
- **FAQ accordion**, modal window, closing the menu/modal with `Esc` or a click
  on the backdrop.

## Page Sections

| Section              | File                                   |
| -------------------- | -------------------------------------- |
| Header & navigation  | `src/partials/header.html`             |
| Hero                 | `src/partials/hero.html`               |
| About us             | `src/partials/about.html`              |
| Company history      | `src/partials/company-history.html`    |
| 6 steps of work      | `src/partials/steps.html`              |
| On-site process      | `src/partials/process.html`            |
| Portfolio            | `src/partials/portfolio.html`          |
| Reviews              | `src/partials/reviews.html`            |
| FAQ                  | `src/partials/faq.html`                |
| Contacts             | `src/partials/contacts.html`           |
| Footer               | `src/partials/footer.html`             |
| Modal with form      | `src/partials/modal.html`, `form.html` |

## Tech Stack

- [Vite](https://vitejs.dev/) + `vite-plugin-html-inject` (assembles the page
  from HTML partials via `<load src="..."/>`) and `vite-plugin-full-reload`
- Vanilla JavaScript (ES modules), plain CSS, `postcss-sort-media-queries`
- [Axios](https://axios-http.com/) — API requests
- [Swiper](https://swiperjs.com/) — sliders
- [SimpleLightbox](https://simplelightbox.com/) — project photo gallery
- [Yup](https://github.com/jquense/yup) — form validation
- [iziToast](https://izitoast.marcelodolza.com/) — notifications
- Manrope font (`@fontsource-variable/manrope`)

## Project Structure

```
src/
├── index.html          # entry point, includes the partials
├── main.js             # imports the font and JS modules
├── partials/           # HTML page sections
├── css/                # styles, one file per section + styles.css
├── js/
│   ├── projects-api.js     # API requests (projects, photos, reviews, leads)
│   ├── render-function.js  # renders portfolio and review cards
│   ├── handler.js          # menu, modal, FAQ, lightbox
│   ├── form.js             # form validation and submission
│   ├── swiper-portfolio.js # portfolio slider (mobile only)
│   ├── swiper-reviews.js   # reviews slider
│   └── refs.js             # DOM element references
├── img/                # images
└── public/             # favicon, SVG sprite
```

## API

The base URL is set with the `VITE_API_URL` environment variable. Endpoints used:

| Method | Path            | Purpose                                  |
| ------ | --------------- | ---------------------------------------- |
| `GET`  | `/projects`     | list of projects for the portfolio       |
| `GET`  | `/projects/:id` | photos of a specific project             |
| `GET`  | `/reviews`      | list of reviews                          |
| `POST` | `/leads`        | form request (`username`, `phone`)       |

## Running Locally

Requires the LTS version of [Node.js](https://nodejs.org/).

```bash
npm install
```

Create a `src/.env` file based on `.env.example` (the Vite root is the `src`
folder, so `.env` is read from there):

```env
VITE_API_URL=https://your-backend.example.com
```

Then:

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deployment

The frontend is deployed on [Vercel](https://vercel.com/):
[tdm-bud.vercel.app](https://tdm-bud.vercel.app/). Set `VITE_API_URL` in the
Vercel project's environment variables so the build can reach the backend.

The repository also contains a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds the project with `--base=/tdm-bud/`
and publishes `dist` to the `gh-pages` branch on every push to `main`.

## Author

Pavlo Malysh — [GitHub](https://github.com/Pavlo-Malysh)
