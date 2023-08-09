import { Subjects } from '.';

export default async function handler(req, res) {
  const { id } = req.query;
  const subject = await Subjects.findOne({ id });
  if (!subject) return res.status(404).json({ msg: 'Subject does not exist' });

  res.json(subject);
}
