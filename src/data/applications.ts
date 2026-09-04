import type { JobApplication } from '../types/application'

export const applications: JobApplication[] = [
  {
    id: '1',
    company: 'Northstar Labs',
    role: 'Frontend Developer',
    location: 'Vancouver, BC',
    status: 'Applied',
    appliedAt: '2026-09-02',
    followUpAt: '2026-09-09',
  },
  {
    id: '2',
    company: 'Brightside Software',
    role: 'React Developer',
    location: 'Remote',
    status: 'Interview',
    appliedAt: '2026-08-29',
  },
  {
    id: '3',
    company: 'Maple Systems',
    role: 'UI Engineer',
    location: 'Burnaby, BC',
    status: 'Wishlist',
  },
]
