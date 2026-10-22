export interface BucketItem {
  id: string;
  text: string;
  createdAt: string; // ISO Date string
  completedAt: string | null; // ISO Date string or null
}

export type FilterType = 'all' | 'active' | 'completed';