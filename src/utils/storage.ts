const STORAGE_KEY = 'jobflow.applications'

export function loadStoredApplications<T>(fallback: T): T {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) as T : fallback
  } catch {
    return fallback
  }
}

export function saveStoredApplications(value: unknown) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}
