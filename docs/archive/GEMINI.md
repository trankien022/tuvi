# Project Overview

This is a web project built with [Astro](https://astro.build/), a modern static site builder. It uses [React](https://reactjs.org/) for UI components and [Tailwind CSS](https://tailwindcss.com/) for styling. The project is configured with a variety of tools for development, testing, and deployment.

## Building and Running

### Development

To start the development server, run:

```bash
npm run dev
```

This will start a hot-reloading development server, typically at `http://localhost:4321`.

### Building

To build the project for production, run:

```bash
npm run build
```

This will create a `dist/` directory with the optimized, static assets of the website.

### Previewing the Build

To preview the production build locally, run:

```bash
npm run preview
```

## Testing

The project uses [Vitest](https://vitest.dev/) for unit testing and [Playwright](https://playwright.dev/) for end-to-end testing.

-   **Run all tests:** `npm test`
-   **Run tests with UI:** `npm run test:ui`
-   **Run end-to-end tests:** `npm run test:e2e`
-   **Check test coverage:** `npm run coverage`

## Code Quality

The project uses [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting.

-   **Check for issues:** `npm run check`
-   **Fix issues automatically:** `npm run fix`

## Development Conventions

The project follows a structured organization as detailed in `src/README.md`. Key conventions include:

-   **Component-based architecture:** The UI is built from reusable components located in `src/components/`.
-   **Clear separation of concerns:** The project is organized into `assets`, `components`, `layouts`, `pages`, `lib`, and `utils` directories, each with a specific purpose.
-   **Path aliases:** The project uses aliases like `~` for `src/` to simplify import paths.
-   **Styling:** Tailwind CSS is used for styling, with the main configuration in `tailwind.config.js`.
-   **Astro-based routing:** The `src/pages` directory uses file-based routing to create pages and API endpoints.
