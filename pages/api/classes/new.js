import { ulid } from 'ulid';
import { Classes } from './[subjectId]';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subjectId, startDate, endDate, type } = req.body;

    const id = ulid();
    const newClass = {
      subjectId,
      startDate,
      endDate,
      type: type.toLowerCase(),
      id,
    };

    await Classes.create(newClass);
    return res.json({ msg: 'successful' });
  }
  return res.status(400).json({ msg: 'post requests only' });
}
