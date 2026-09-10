# JobFlow AI Job Tracker

A React + TypeScript job application tracker built to keep the job search organized in one place. Track applications, follow-ups, recruiter details and notes, then use dashboard insights to see how the search is progressing.

## Features

- Add, edit and delete job applications
- Track application status from wishlist through offer or closed
- Search and filter applications
- Save recruiter details, job links, notes and follow-up dates
- View upcoming and overdue follow-ups
- Dashboard metrics and application pipeline insights
- Job description skill matching with practical match feedback
- Local browser persistence with `localStorage`
- Responsive layout and keyboard focus states

## Tech stack

- React
- TypeScript
- Vite
- React Router
- CSS

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Project notes

JobFlow is currently frontend-only, so application data stays in the browser where it was created. The job match tool also runs locally and does not require an API key.

## Deployment

The app is ready to deploy as a Vite project. Use `npm run build` as the build command and `dist` as the output directory.
