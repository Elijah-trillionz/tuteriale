import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/subjects', {
    headers: { accept: 'application/json' },
  });
  const jsonRes = await res.json();

  return {
    props: {
      subjects: jsonRes.subjects,
    },
  };
};

const Class = ({ subjects }) => {
  const [subject, setSubject] = useState('');
  const [classType, setClassType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async () => {
    const newClass = {
      subjectId: subject,
      type: classType,
      startDate,
      endDate,
    };

    setLoading(true);
    const res = await fetch('http://localhost:3000/api/classes/new', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(newClass),
    });
    setLoading(false);
    if (res.ok) router.push(`/subjects/${subject}`);
  };

  return (
    <>
      <Head>
        <title>New Class - Tuteriale</title>
      </Head>
      <div>
        <h1 className='text-3xl font-bold mb-12 basis-3/4'>
          Create a new class
        </h1>
        <div className='bg-white py-10 px-10 shadow-md'>
          <div className=' grid grid-cols-2 gap-x-5 gap-y-10'>
            <div>
              <label className={'block font-medium mb-3'} htmlFor='subject'>
                Select Subject
              </label>
              <select
                name='subject'
                className='block border border-black py-3 w-full px-6'
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjects.map((subject) => (
                  <option value={subject.id} key={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={'block font-medium mb-3'} htmlFor='type'>
                Select Class Type
              </label>
              <select
                name='type'
                className='block border border-black py-3 w-full px-6'
                required
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
              >
                <option value='online'>Online</option>
                <option value='physical'>Physical</option>
              </select>
            </div>
            <div>
              <label className={'block font-medium mb-3'} htmlFor='startDate'>
                Starts from
              </label>
              <input
                type='date'
                name='startDate'
                className='block border border-black py-3 w-full px-6'
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className={'block font-medium mb-3'} htmlFor='endDate'>
                Ends on
              </label>
              <input
                type='date'
                name='endDate'
                className='block border border-black py-3 w-full px-6'
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleFormSubmit}
            disabled={loading}
            className={`bg-secondary mt-10 hover:opacity-70 transition-opacity duration-200 text-white rounded w-full block py-3 disabled:opacity-30`}
          >
            {loading ? 'loading...' : 'Submit'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Class;
