import type { Store } from '@prisma/client';

export interface CreateStoreAPIResponse {
  data: Store;
}

/* export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAta: Date;
} */
