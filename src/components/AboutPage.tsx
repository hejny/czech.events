import * as React from 'react';

interface IAboutPageProps {
    selfUrl: string;
}

export function AboutPage(props: IAboutPageProps) {
    return (
        <>
            <div className="content about">
                <div className="front black">
                    <div className="inner">
                        {/* <h1>Czech.events</h1> */}

                        {[
                            {
                                name: 'Tmavá verze',
                                src: 'czech.events.black-logo.png',
                            },

                            {
                                name: 'Světlá verze',
                                src: 'czech.events.white-logo.png',
                            },
                        ].map(({ name, src }) => {
                            const url = `${props.selfUrl}/design/logos/${src}`;
                            return (
                                <div key={src} className="logo">
                                    <a href={url}>
                                        <img src={url} alt="Czech.events logo" />
                                    </a>
                                    {`${name} `}
                                    <a href={url} download>
                                        (Stáhnout)
                                    </a>
                                    <pre>
                                        {`                                     
<a href="https://czech.events/">
    <img src="${url}" alt="Czech.events logo" width="200" />
</a>`.trim()}
                                    </pre>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
