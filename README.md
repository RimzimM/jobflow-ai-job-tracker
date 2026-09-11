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

## How it works

Applications are stored in `localStorage`, so edits, notes, statuses and follow-up dates remain available after a refresh in the same browser. Dashboard metrics are derived from the saved application data.

The job match tool runs in the browser and checks a pasted job description for relevant frontend skills. It provides a quick match score and feedback without sending the description to an external AI service or requiring an API key.

## Deployment

JobFlow is configured for Vercel as a Vite single-page application. The production build uses `npm run build` and outputs to `dist`. The included Vercel rewrite keeps client-side routes working when a page is opened or refreshed directly.

## Current scope

This version is intentionally frontend-only. Authentication, cloud sync and a server-backed database are possible future additions, but are not required for the current portfolio build.
