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
    startDate: { type: 'string', format: 'date-time' },
    endDate: { type: 'string', format: 'date-time' },
  },
};

(async () => {
  await Classes.connect(schema, { writeSync: true, indentSpace: 2 });
})();

export default async function handler(req, res) {
  const id = ulid();

  const reses = await Subjects.findOne({ name: 'IELTS' });
  console.log(reses);
  res.json({ msg: 'Hello world' });
}
