import Script from 'next/script';
import favicon from '../../../public/favicon.ico';

interface HeadSectionProps {
    subtitle?: string;
}

// TODO: !!! Maybe name CzechEventsHead or ProjectHead, AppHead,... + 0-1>
export function HeadSection(props: HeadSectionProps) {
    const { subtitle = 'Co se děje v IT' } = props;

    return (
        // TODO: !!! Maybe <Head should be here + 0-1>
        <>
            <title>{`Czech.events | ${subtitle}`}</title>
            <meta name="description" content="!!!!" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
            <link rel="author" href="https://pavolhejny.com/" />

            <meta property="og:title" content={`Czech.events | ${subtitle}`} />
            <meta property="og:image" content={`!!!`} />

            <meta name="theme-color" content="#000000" />

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
 * TODO: !!! Warning: A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup
and comments as text in the title and hydration will likely fail and fall back to client rendering
 * TODO: Is Google Analytics working
 * TODO: !!! Real favicon
 * TODO: !!! Cookies bar
 * TODO: !!! Test social sharing
 */