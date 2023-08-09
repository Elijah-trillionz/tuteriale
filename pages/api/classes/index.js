import { Classes } from './[subjectId]';

export default async function handler(req, res) {
  const classes = await Classes.allData;

  res.json(classes);
}
