import * as React from 'react';

interface IPartnersProps {
    selfUrl: string;
}

export function Partners(props: IPartnersProps) {
    return (
        <>
            <div className="partners">
                <h1>Mediální partneři</h1>

                {[
                    // TODO: To some other file or even to DB
                    {
                        name: 'Startup Weekend | Prague',
                        logoUrl: `${props.selfUrl}/design/logos/partners/startup-weekend-prague.png`,
                        link: 'https://www.facebook.com/swprague/',
                    },

                    {
                        name: 'Startup Weekend | Bratislava',
                        logoUrl: `${props.selfUrl}/design/logos/partners/startup-weekend-bratislava.png`,
                        link: 'https://www.facebook.com/StartupWeekendBratislava/',
                    },
                    {
                        name: 'Undout Sleep Box',
                        logoUrl: `${props.selfUrl}/design/logos/partners/undout.png`,
                        link: 'https://undout.com/',
                    },
                    {
                        name: 'CEEHACKS',
                        logoUrl: `${props.selfUrl}/design/logos/partners/ceehacks.png`,
                        link: 'https://www.ceehacks.com/',
                    },
                    {
                        name: 'TechHeaven',
                        logoUrl: `${props.selfUrl}/design/logos/partners/techheaven.svg`,
                        link: 'https://techheaven.org/',
                    },
                    // TODO: CzechFuture tech
                ].map(({ name, logoUrl, link }) => {
                    return (
                        <div key={name} className="logo">
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <img src={logoUrl} alt={`${name} logo`} />
                            </a>
                            {/*`${name} `*/}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
