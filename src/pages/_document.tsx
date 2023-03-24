import { Head, Html, Main, NextScript } from 'next/document';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <ShuffleSeedContext.Provider value={new Date().getUTCHours()}>
                    <Main />
                </ShuffleSeedContext.Provider>
                <NextScript />
            </body>
        </Html>
    );
}

/**
 * TODO: Is this a good place to insert a Context.Provider
 */
