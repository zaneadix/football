import { Space_Grotesk } from 'next/font/google';

import '@styles/normalize.css';
import '@styles/designTokens.css';
import '@styles/globals.css';
import '@styles/utility.css';

import Providers from './providers';
import Header from '@components/Header';
import connectToDatabase from '@server/database';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata = {
  title: 'Football',
  description: 'Football on the internet',
};

export default async ({ children }) => {
  await connectToDatabase();

  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <main>
          <Providers>
            <Header></Header>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
};
