import type { AppProps } from 'next/app';
import '../style/body.css' /* <- TODO: Remove global styles */;
import '../style/global.css' /* <- TODO: Where whould be this file and from where it should be imported? */;
import '../style/newsletter.css' /* <- TODO: Remove global styles */;
import '../style/page.css' /* <- TODO: Remove global styles */;
import '../style/reset.css' /* <- TODO: Where whould be this file and from where it should be imported? */;

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
