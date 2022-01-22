import * as React from 'react';
import spaceTrim from 'spacetrim';
import styled from 'styled-components';
import { PageDiv } from './PageDiv';
interface IAboutPageProps {
    selfUrl: string;
}

export function AboutPage(props: IAboutPageProps) {
    return (
        <PageDiv>
            <AboutPageDiv>
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

                            {
                                name: 'Průhledná verze',
                                src: 'czech.events.transparent-logo.png',
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
                                        {spaceTrim(`                                     
                                            <a href="https://czech.events/">
                                                <img src="${url}" alt="Czech.events logo" width="200" />
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
