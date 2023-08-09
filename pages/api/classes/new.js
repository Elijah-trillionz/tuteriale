import { ulid } from 'ulid';
import { Classes } from '.';

export default async function handler(req, res) {
  if (req.headers.method === 'POST') {
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
    res.json({ msg: 'successful' });
  }
  res.status(400).json({ msg: 'post requests only' });
}
