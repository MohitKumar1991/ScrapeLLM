import React from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Footer } from '@/components/footer';

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  console.log("APP IS LOADED");
  return (
    <>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
          @import
          url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
        </style>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <Footer />
    </>
  );
}
