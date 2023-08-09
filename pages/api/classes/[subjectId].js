import { JSONDB } from 'native-json-db';
import { ulid } from 'ulid';
import { Subjects } from '../subjects/index';

export const Classes = new JSONDB('classes');
const schema = {
  type: 'object',
  properties: {
    subjectId: { type: 'string' },
    id: { type: 'string' },
    type: { type: 'string' },
    startDate: { type: 'string', format: 'date' },
    endDate: { type: 'string', format: 'date' },
  },
};

(async () => {
  await Classes.connect(schema, { writeSync: true, indentSpace: 2 });
})();

export default async function handler(req, res) {
  const { subjectId } = req.query;

  const classes = await Classes.findMany({ subjectId });
  if (classes.length <= 0)
    return res.status(404).json({ msg: 'No classes on this subject yet' });

  res.json(classes);
}
