import { Space_Grotesk } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@styles/normalize.css';
import '@styles/designTokens.css';
import '@styles/globals.css';
import '@styles/utility.css';

import Header from '@client/components/Header';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={spaceGrotesk.className}>
        <Header></Header>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
