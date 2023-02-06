export default function Head() {
    return (
        <>
            <meta charSet="utf-8" />
            <title>Czech.events | Co se děje v IT</title>

            <link rel="icon" href="profile_photo.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="Web site created using create-react-app" />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <meta property="og:image" content="https://czech.events/fb-image.jpg" />
            <link
                // TODO: Repair what linter is saying
                href="https://fonts.googleapis.com/css?family=Oswald|Montserrat:100,400,700,800,900&display=swap"
                rel="stylesheet"
                type="text/css"
            />

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
    );
}
