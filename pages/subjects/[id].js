import Head from 'next/head';
import Link from 'next/link';

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const subjectRaw = await fetch(`http://localhost:3000/api/subjects/${id}`, {
    headers: { accept: 'application/json' },
  });

  const subjectJson = await subjectRaw.json();
  if (!subjectRaw.ok)
    return { props: { error: subjectJson.msg, classes: [], subject: {} } };

  const classesRaw = await fetch(
    `http://localhost:3000/api/classes/${subjectJson.id}`,
    { headers: { accept: 'application/json' } }
  );

  const classesJson = await classesRaw.json();
  if (!classesRaw.ok)
    return {
      props: {
        error: `No classes on ${subjectJson.name} yet`,
        classes: [],
        subject: subjectJson,
      },
    };

  return {
    props: {
      subject: subjectJson,
      classes: classesJson,
      error: null,
    },
  };
};

export default function Subject({ classes, subject, error }) {
  return (
    <>
      <Head>
        <title>{subject.name ? subject.name : ''} Classes - Tuteriale</title>
      </Head>
      <div>
        {error ? (
          <>
            <span className='text-2xl'>{error}</span>
            {subject.id && (
              <Link
                href={'/classes/new'}
                className='bg-secondary hover:opacity-70 transition-all duration-200 text-white block w-[150px] text-center py-3 rounded mt-5'
              >
                Create New
              </Link>
            )}
          </>
        ) : (
          <>
            <div className='text-center md:text-left md:flex justify-between mb-12 items-center'>
              <h1 className='text-3xl font-bold basis-3/4'>
                Classes for {subject.name}
              </h1>
              <Link
                href={'/classes/new'}
                className='bg-secondary hover:opacity-70 transition-all duration-200 text-white block max-w-[150px] mx-auto mt-5 md:m-0 w-[150px] text-center py-3 rounded'
              >
                New
              </Link>
            </div>
            <ul className='grid grid-rows-2 md:grid-cols-2 gap-x-8 gap-y-6 items-center'>
              {classes.map((_class, index) => (
                <li key={_class.id} className='bg-white py-4 px-5 shadow-md'>
                  <h2 className='text-xl mb-6'>
                    {new Date(_class.startDate).toDateString()} -{' '}
                    {new Date(_class.endDate).toDateString()}
                  </h2>
                  <p className='text-sm mb-4 capitalize'>{_class.type} Class</p>
                  <button className='inline-block bg-[#34afe6] py-1 hover:opacity-70 transition-all duration-200 text-white w-full'>
                    Enroll
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
