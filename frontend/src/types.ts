export type Role = 'client' | 'helper' | 'admin'
export type Availability = 'full_time' | 'part_time' | 'whenever_needed'
export type Experience = 'none' | 'some' | 'degree'
export type Urgency = 'low' | 'normal' | 'urgent'
export type Status = 'idle' | 'loading' | 'success' | 'error'

export interface HelperProfile {
  id: number; userId: number; name: string
  experience: Experience; degrees: string[]
  availability: Availability; district: string; bio: string
}
export interface JobPosting {
  id: number; clientId: number; title: string; description: string
  timeType: Availability; urgency: Urgency; district: string
  status: 'open' | 'filled' | 'completed'; createdAt: string
}
export type NewJob = Omit<JobPosting, 'id'>