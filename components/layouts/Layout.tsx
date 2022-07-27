import React, { FC } from 'react'
import Head from 'next/head';
import { Navbar } from '../ui';

interface Props {
    children: React.ReactNode;
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name='author' content='Angel Muñoz'/>
            <meta name='description' content='Informacion sobre el pokemon xxxx'/>
            <meta name='keywords' content={`${title}, pokemon, pokedex`}/>
            <meta property="og:title" content={`Informacion sobre ${title}`} />
            <meta property="og:description" content={`Esta es la paginación sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>
        <Navbar />
        <main style={{
            padding: '0 20px'
        }}>
            { children }
        </main>

    </>
  )
}
