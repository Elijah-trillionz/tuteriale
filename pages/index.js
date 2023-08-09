import Head from 'next/head';
import Link from 'next/link';

export const getServerSideProps = async () => {
  const subjectsRaw = await fetch('http://localhost:3000/api/subjects', {
    headers: { accept: 'application/json' },
  });
  const subjectsJson = await subjectsRaw.json();

  const classesRaw = await fetch('http://localhost:3000/api/classes', {
    headers: { accept: 'application/json' },
  });
  const classesJson = await classesRaw.json();

  const subjects = subjectsJson.map((subject) => {
    let onlineClasses = 0;
    let physicalClasses = 0;
    classesJson.map((_class) => {
      if (subject.id === _class.subjectId) {
        return _class.type === 'online'
          ? (onlineClasses += 1)
          : (physicalClasses += 1);
      }
    });
    return {
      ...subject,
      classes: { online: onlineClasses, physical: physicalClasses },
    };
  });

  return {
    props: {
      subjects: subjects,
    },
  };
};

export default function Home({ subjects }) {
  return (
    <>
      <Head>
        <title>Subjects - Tuteriale</title>
      </Head>
      <div>
        <ul className='grid grid-cols-3 gap-x-8 gap-y-6 items-center'>
          {subjects.map((subject) => (
            <li key={subject.id}>
              <Link
                href={`/subjects/${subject.id}`}
                className='block bg-white py-10 px-5 min-h-[320px] hover:shadow-solid ease-in-out duration-500 transition-shadow'
              >
                <h2 className='text-3xl min-h-[85px] flex items-end'>
                  {subject.name}
                </h2>
                <div className='mt-10'>
                  <p className='text-sm online'>
                    {subject.classes.online} Online Classes
                  </p>
                  <p className='text-sm physical'>
                    {subject.classes.physical} Physical Classes
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
