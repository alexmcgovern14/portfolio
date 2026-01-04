# Portfolio

A production-quality portfolio site showcasing my work as a Product Manager, with a focus on AI systems and delivery — including LiveScore case studies and selected personal projects.

This codebase started as a Figma Make prototype and was later refactored into a maintainable, production-ready React application, prioritising clear structure, typed content, and real performance work.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- React Markdown

## Architecture

- **Content as data**: projects, skills, and paintings live in `src/app/data/`, with TypeScript types in `src/app/types/`
- **Component organisation**: grouped by domain (`layout`, `sections`, `project`, `shared`) for clarity and scalability
- **Performance**: route- and section-based code splitting for heavy components; lazy loading for below-the-fold content

## Development

Run the app locally:

npm install  
npm run dev

## Build

Create a production build:

npm run build

## Live

Vercel deployment: <add URL>

