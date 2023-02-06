import spaceTrim from 'spacetrim';
import styled from 'styled-components';
import { PageDiv } from '../components/PageDiv';
import startupWeekendPragueLogo from '../../public/design/logos/partners/startup-weekend-prague.png';
import startupWeekendBratislavaLogo from '../../public/design/logos/partners/startup-weekend-bratislava.png';
import undoutSleepBoxLogo from '../../public/design/logos/partners/undout.png';
import hackPragueLogo from '../../public/design/logos/partners/hackprague.svg';
import startupBoxLogo from '../../public/design/logos/partners/startupbox.png';
import collboardLogo from '../../public/design/logos/partners/collboard.png';
import Image from 'next/image';
import Head from 'next/head';
import RootLayout from 'src/app/layout';
import { shuffleArray } from 'src/utils/shuffleArray';

export function Partners() {
    return (
        <PartnersDiv className="partners">
            <h2>Partneři</h2>

            <div className="partners">
                {shuffleArray([
                    // TODO: To some other file or even to DB
                    {
                        name: 'Startup Weekend Prague',
                        image: startupWeekendPragueLogo,
                        link: 'https://www.facebook.com/swprague/',
                    },

                    {
                        name: 'Startup Weekend Bratislava',
                        image: startupWeekendBratislavaLogo,
                        link: 'https://www.facebook.com/StartupWeekendBratislava/',
                    },
                    {
                        name: 'Undout Sleep Box',
                        image: undoutSleepBoxLogo,
                        link: 'https://undout.com/',
                    },
                    {
                        name: 'HackPrague',
                        image: hackPragueLogo,
                        link: 'https://hackprague.com/',
                    },
                    {
                        name: 'StartupBox',
                        image: startupBoxLogo,
                        link: 'https://www.startupbox.cz/',
                    },
                    {
                        name: 'Collboard',
                        image: collboardLogo,
                        link: 'https://www.collboard.com/',
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
                ]).map(({ name, image, link }) => {
                    return (
                        <a key={image.src} href={image.src} target="_blank" rel="noopener noreferrer" title={name}>
                            <div key={name} className="partner">
                                {/* TODO: Use image and cointan css property */}
                                <div className="logo" style={{ backgroundImage: `url(${image.src})` }}></div>
                                {name}
                            </div>
                        </a>
                    );
                })}
            </div>

            {/*
                <Link to="/about" className="our-logos">
                    O nás
                </Link>
                 */}
        </PartnersDiv>
    );
}

export const PartnersDiv = styled.div`
    text-align: center;
    font-family: Arial, Helvetica, sans-serif, 'Montserrat', sans-serif;
    color: rgb(212, 212, 212);
    padding: 2em;
    /* padding-top: 0; */

    h2 {
        font-size: 1.5rem;
        font-family: 'Montserrat', sans-serif;
    }

    .partners {
        /*/
        border: 1px dotted red;
        /**/

        display: flex;
        flex-wrap: wrap;
    }

    .partner {
        /*/
        border: 1px dotted red;
        /**/

        margin: 20px;

        width: 100px;
        display: inline-block;
        color: white;
        font-size: 0.9rem;
    }

    .logo {
        width: 100px;
        height: 100px;
        border-radius: 7px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-bottom: 10px;
    }

    .our-logos {
        font-size: 0.8em;
        color: white;
        display: block;
    }
`;

/**
 * TODO: Link back to home
 */
