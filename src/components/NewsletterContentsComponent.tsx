import React from 'react';
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
                    <div key={key}>
                        <span dangerouslySetInnerHTML={{ __html: newsletterContent.html.split('\n').join('<br/>') }} />
                        {position !== NewsletterContentPosition.SUBJECT && (
                            <>
                                <br />
                            </>
                        )}
                    </div>
                ))}
        </>
    );
}
