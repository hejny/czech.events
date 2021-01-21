import * as React from 'react';
import styled from 'styled-components';

import { shuffleArray } from '../utils/array';

interface IPartnersProps {
    selfUrl: string;
}

export function Partners(props: IPartnersProps) {
    return (
        <>
            <div className="partners">
                <h2>Mediální partneři</h2>

                {shuffleArray([
                    // TODO: To some other file or even to DB
                    {
                        name: 'Startup Weekend Prague',
                        logoUrl: `${props.selfUrl}/design/logos/partners/startup-weekend-prague.png`,
                        link: 'https://www.facebook.com/swprague/',
                    },

                    {
                        name: 'Startup Weekend Bratislava',
                        logoUrl: `${props.selfUrl}/design/logos/partners/startup-weekend-bratislava.png`,
                        link: 'https://www.facebook.com/StartupWeekendBratislava/',
                    },
                    {
                        name: 'Undout Sleep Box',
                        logoUrl: `${props.selfUrl}/design/logos/partners/undout.png`,
                        link: 'https://undout.com/',
                    },
                    {
                        name: 'HackPrague',
                        logoUrl: `${props.selfUrl}/design/logos/partners/hackprague.svg`,
                        link: 'https://hackprague.com/',
                    },
                    {
                        name: 'StartupBox',
                        logoUrl: `${props.selfUrl}/design/logos/partners/startupbox.png`,
                        link: 'https://www.startupbox.cz/',
                    },
                    /*
                    TODO:
                    {
                        name: 'CEEHACKS',
                        logoUrl: `${props.selfUrl}/design/logos/partners/ceehacks.png`,
                        link: 'https://www.ceehacks.com/',
                    },
                    {
                        name: 'TechHeaven',
                        logoUrl: `${props.selfUrl}/design/logos/partners/techheaven.svg`,
                        link: 'https://techheaven.org/',
                    },*/
                    // TODO: CzechFuture tech
                    // TODO: Random shuffle
                ]).map(({ name, logoUrl, link }) => {
                    return (
                        <a
                            href={`${link}?utm_source=czech.events&amp;utm_medium=referral&amp;utm_campaign=partners`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={name}
                        >
                            <div key={name} className="logo" style={{ backgroundImage: `url(${logoUrl})` }}>
                                {/* <img src={logoUrl} title={name} alt={`${name} logo`} /> */}
                                {/*`${name} `*/}
                            </div>
                        </a>
                    );
                })}
            </div>
        </>
    );
}

const PartnersDiv = styled.div`
    text-align: center;
    font-family: Arial, Helvetica, sans-serif, 'Montserrat', serif;
    color: rgb(212, 212, 212);
    padding: 2em;
    /* padding-top: 0; */

    h2 {
        font-size: 1.5rem;
        font-family: 'Montserrat', serif;
    }

    .logo {
        margin: 20px;
        border-radius: 5px;
        display: inline-block;
        width: 100px;
        height: 100px;
        color: white;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    /*
    .logo img {
        display: block;
        max-width: 100px;
        max-height: 100px;
    }
    */
`;
