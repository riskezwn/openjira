import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { EntryModel, IEntry } from '../../../../models'

type Data =
  | {message: string}
  | IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntryById(req, res)
    case 'PUT':
      return updateEntry(req, res)
    case 'DELETE':
      return deleteEntry(req, res)
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

const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  await db.connect()

  const entry = await EntryModel.findById(id)
  await db.disconnect()

  if (!entry) {
    return res.status(400).json({ message: 'entry id not exists' })
  }

  res.status(200).json(entry)
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  await db.connect()
  const entryToDelete = await EntryModel.findById(id)

  if (!entryToDelete) {
    return res.status(400).json({ message: 'entry id not exists' })
  }

  try {
    await EntryModel.deleteOne({ _id: entryToDelete._id })
    res.status(200).json(entryToDelete)
    await db.disconnect()
  } catch (error: any) {
    await db.disconnect()
    res.status(400).json({ message: error.errors.status.message })
  }
}
