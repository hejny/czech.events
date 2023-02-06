import spaceTrim from 'spacetrim';
import styled from 'styled-components';
import { PageDiv } from '../components/PageDiv';
import czechEventsBlackLogo from '../../public/design/logos/czech.events.black-logo.png';
import czechEventsWhiteLogo from '../../public/design/logos/czech.events.white-logo.png';
import czechEventsTransparentLogo from '../../public/design/logos/czech.events.transparent-logo.png';
import Image from 'next/image';
import Head from 'next/head';
import RootLayout from 'src/app/layout';

export default function AboutPage() {
    return (
        <RootLayout>
            <PageDiv>
                <AboutPageDiv>
                    <div className="front black">
                        <div className="inner">
                            {/* <h1>Czech.events</h1> */}

                            {[
                                {
                                    name: 'Tmavá verze',
                                    image: czechEventsBlackLogo,
                                },

                                {
                                    name: 'Světlá verze',
                                    image: czechEventsWhiteLogo,
                                },

                                {
                                    name: 'Průhledná verze',
                                    image: czechEventsTransparentLogo,
                                },
                            ].map(({ name, image }, i) => {
                                return (
                                    <div key={i} className="logo">
                                        <a href={image.src}>
                                            <Image src={image} alt="Czech.events logo" />
                                        </a>
                                        {`${name} `}
                                        <a href={image.src} download>
                                            (Stáhnout)
                                        </a>
                                        <pre>
                                            {spaceTrim(`
                                            <a href="https://czech.events/">
                                                <img src="${image.src}" alt="Czech.events logo" width="200" />
                                            </a>
                                        `)}
                                        </pre>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </AboutPageDiv>
            </PageDiv>
        </RootLayout>
    );
}

export const AboutPageDiv = styled.div`
    .logo {
        margin: 20px;
        border-radius: 5px;
        display: inline-block;
        width: 200px;
        height: 200px;
        color: white;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .logo img {
        display: block;
        max-width: 200px;
        max-height: 200px;
    }

    .logo pre {
        display: block;
        width: 200px;
        overflow-x: scroll;
    }
`;

/**
 * TODO: Link back to home
 */
