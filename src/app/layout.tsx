import '../style/reset.css' /* <- TODO: Where whould be this file and from where it should be imported? */;
import '../style/global.css' /* <- TODO: Where whould be this file and from where it should be imported? */;
import '../style/newsletter.css' /* <- TODO: Remove global styles */;
import '../style/body.css' /* <- TODO: Remove global styles */;
import '../style/page.css' /* <- TODO: Remove global styles */;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>{children}</body>
        </html>
    );
}
