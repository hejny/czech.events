import Head from 'next/head';
import * as React from 'react';
import { PAGE_TITLE } from '../config';

interface ILayoutProps {
    title?: string;
}

export function Layout({ children, title }: React.PropsWithChildren<ILayoutProps>) {
    return (
        <>
            <Head>
                <title>{title ? `${title} | ${PAGE_TITLE}` : PAGE_TITLE}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                {/*
            TODO:

            <link
                rel="shortcut icon"
                href="https://1.gravatar.com/avatar/3d98c15957c5f5dd227e53dbc7cbb60d?s=64&r=pg&d=mm"
            />

            */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald" />

                {/*
            TODO:
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                
            `.replace(/\s+/gm, ' '),
                }}
            />
            */}
            </Head>
            {children}
            <style jsx global>
                {`
                    body {
                        font-family: oswald;
                    }

                    * {
                        transition: all 0.2s ease-out;
                    }
                `}
            </style>
        </>
    );
}
