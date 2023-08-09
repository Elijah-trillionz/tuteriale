import '@/styles/globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <header className={`bg-secondary text-white ${inter.className}`}>
        <div className='flex justify-between items-center py-5 px-3 md:px-10 max-w-[1000px] mx-auto'>
          <span className='font-bold text-2xl tracking-wider'>Tuteriale</span>
          <Link
            href={'/'}
            className='block text-sm text-gray-300 hover:text-white transition-all'
          >
            Subjects
          </Link>
        </div>
      </header>
      <main
        className={`px-6 md:px-20 my-10 max-w-[1000px] mx-auto ${inter.className}`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
