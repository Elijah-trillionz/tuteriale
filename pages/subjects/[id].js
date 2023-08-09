import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const getServerSideProps = async (ctx) => {
  // const { id } = ctx.query;
  const subjectRaw = await fetch(
    `http://localhost:3000/api/subjects/01H7B7F67FCE544EAK85S0Y3ER`,
    {
      headers: { accept: 'application/json' },
    }
  );
  const subjectJson = await subjectRaw.json();

  if (!subjectRaw.ok)
    return { props: { error: subjectJson.msg, classes: [], subject: {} } };

  // const classesRaw = await fetch('http://localhost:3000/api/classes/')

  return {
    props: {
      subject: subjectJson,
      classes: [1, 2, 3, 4, 5],
    },
  };
};

export default function Subject({ classes, subject, error }) {
  return (
    <>
      <Head>
        <title>{!error ? subject.name : ''} Classes - Tuteriale</title>
      </Head>
      <div>
        {error ? (
          <span className='text-2xl'>{error}</span>
        ) : (
          <>
            <div className='flex justify-between mb-12 items-center'>
              <h1 className='text-3xl font-bold basis-3/4'>
                Classes for {subject.name}
              </h1>
              <Link
                href={'/classes/new'}
                className='bg-secondary hover:opacity-70 transition-all duration-200 text-white block w-[150px] text-center py-3 rounded'
              >
                New
              </Link>
            </div>
            <ul className='grid grid-cols-2 gap-x-8 gap-y-6 items-center'>
              {classes.map((_, index) => (
                <li key={index} className='bg-white py-4 px-5 shadow-md'>
                  <h2 className='text-xl mb-6'>August 12th - September 15th</h2>
                  <p className='text-sm mb-4'>Online Class</p>
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
