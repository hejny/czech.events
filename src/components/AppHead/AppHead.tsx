import Head from 'next/head';
import Script from 'next/script';
import favicon from '../../../public/favicon.ico';
import fbimage from '../../../public/fb-image.jpg';

interface AppHeadSectionProps {
    subtitle?: string;
}

export function AppHead(props: AppHeadSectionProps) {
    const { subtitle = 'Co se děje v IT' } = props;

    return (
        <>
            <Head>
                <title>{`${!subtitle ? `` : `${subtitle} 📆 `}Czech.events`}</title>
                <meta
                    name="description"
                    content="Mějte přehled o nejzajímavějších událostech z IT & startupového světa."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
                <link rel="author" href="https://pavolhejny.com/" />

                <meta property="og:title" content={`Czech.events | ${subtitle}`} />
                <meta property="og:image" content={fbimage.src} />

                <meta name="theme-color" content="#000000" />
            </Head>
            <Script src="https://www.googletagmanager.com/gtag/js?id=UA-70710834-7" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', 'UA-70710834-7');
              `}
            </Script>
        </>
    );
}

/**
 * TODO: Is Google Analytics working
 * TODO: !!! Real favicon
 * TODO: Dark and light favicon
 * TODO: !!! Cookies bar
 * TODO: !!! Test social sharing
 */
