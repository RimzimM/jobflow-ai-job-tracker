export type ApplicationStatus =
  | 'Wishlist'
  | 'Applied'
  | 'Interview'
  | 'Offer'
  | 'Closed'

export type JobApplication = {
  id: string
  company: string
  role: string
  location: string
  status: ApplicationStatus
  appliedAt?: string
  followUpAt?: string
}
