
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
      description: 'Learn React',
      status: 'completed',
      createdAt: Date.now()
    },
    {
      description: 'Learn MongoDB',
      status: 'pending',
      createdAt: Date.now() - 1000000
    },
    {
      description: 'Learn NextJS',
      status: 'in-progress',
      createdAt: Date.now() - 10000
    }
  ]
}
