interface HeadSectionProps {
    subtitle?: string;
}

export function HeadSection(props: HeadSectionProps) {
    const { subtitle } = props;

    return (
        <>
            <title>🧙‍♂️ {subtitle ? `` : `${subtitle} | `}From 0 to 1</title>
            <meta
                name="description"
                content="With the ever-evolving landscape of technology, it can be challenging to keep up to date and use it to its potential in your business. However, by incorporating cutting-edge tools such as advanced browser APIs, >Web Assembly, using TypeScript, and benefiting from GPT when writing code, you can code, you can differentiate your business and achieve new levels of efficiency, innovation and customer engagement. 🚀"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />

            <meta property="og:title" content={`From 0 to 1`} />
            <meta property="og:image" content={`!!!`} />
        </>
    );
}

/**
 * TODO: !!! Warning: A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup
and comments as text in the title and hydration will likely fail and fall back to client rendering
 * TODO: !!! Czech.event NOT 0-1
 * TODO: !!! Remove all traces of CRA
 * TODO: !!! Google Analytics working
 * TODO: !!! Cookies
 */

/*

   <>
            <meta charSet="utf-8" />
            <title>!!! Czech.events | Co se děje v IT</title>

            <link rel="icon" href="profile_photo.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="Web site created using create-react-app" />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <meta property="og:image" content="https://czech.events/fb-image.jpg" />

            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-70710834-7"></script>
            <script>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', 'UA-70710834-7');
              `}
            </script>
        </>


*/
