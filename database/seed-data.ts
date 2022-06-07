
interface SeedEntry {
  description: string
  status: string
  createdAt: number
}

interface SeedData {
  entries: SeedEntry[]
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'completed: Aprender React',
      status: 'completed',
      createdAt: Date.now()
    },
    {
      description: 'pending: Aprender MongoDB',
      status: 'pending',
      createdAt: Date.now() - 1000000
    },
    {
      description: 'in-progress: Aprender NextJS',
      status: 'in-progress',
      createdAt: Date.now() - 10000
    }
  ]
}
