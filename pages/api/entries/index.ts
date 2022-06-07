import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { EntryModel, IEntry } from '../../../models'

type Data =
  | { message: string }
  | IEntry[]

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries(res)
    default:
      return res.status(400).json({ message: 'endpoint not exists' })
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect()
  const entries = await EntryModel.find().sort({ cleatedAt: 'ascending' })
  await db.disconnect()

  res.status(200).json(entries)
}
