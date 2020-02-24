import * as React from 'react';
import { NewsletterContent, NewsletterContentPosition } from '../model/database/NewsletterContent';

interface INewsletterContentsComponentProps {
    position: NewsletterContentPosition;
    newsletterContents: NewsletterContent[];
}

export function NewsletterContentsComponent({ newsletterContents, position }: INewsletterContentsComponentProps) {
    return (
        <>
            {newsletterContents
                .filter((newsletterContent) => newsletterContent.position === position)
                .sort((a, b) => (a.order > b.order ? 1 : -1) /* TODO: Correct? */)
                .map((newsletterContent, key) => (
                    <p key={key} dangerouslySetInnerHTML={{ __html: newsletterContent.html }}></p>
                ))}
        </>
    );
}
