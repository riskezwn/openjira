import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { db } from '../../../database'
import { EntryModel, IEntry } from '../../../models'

type Data =
  | {message: string}
  | IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'invalid id' })
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res)
    default:
      return res.status(400).json({ message: 'invalid req method' })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  await db.connect()
  const entryToUpdate = await EntryModel.findById(id)

  if (!entryToUpdate) {
    return res.status(400).json({ message: 'entry id not exists' })
  }

  const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body

  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    )
    res.status(200).json(updatedEntry!)
    await db.disconnect()
  } catch (error: any) {
    await db.disconnect()
    res.status(400).json({ message: error.errors.status.message })
  }
}
