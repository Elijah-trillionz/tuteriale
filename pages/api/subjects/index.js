import { JSONDB } from 'native-json-db';

export const Subjects = new JSONDB('subjects');
const schema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
};

(async () => {
  await Subjects.connect(schema, { writeSync: true, indentSpace: 2 });
})();

export default async function handler(req, res) {
  const subjects = await Subjects.allData;
  res.json({ subjects });
}
