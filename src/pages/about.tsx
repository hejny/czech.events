import Image from 'next/image';
import spaceTrim from 'spacetrim';
import czechEventsBlackLogo from '../../public/design/logos/czech.events.black-logo.png';
import czechEventsTransparentLogo from '../../public/design/logos/czech.events.transparent-logo.png';
import czechEventsWhiteLogo from '../../public/design/logos/czech.events.white-logo.png';
import { AppHead } from '../components/AppHead/AppHead';
import styles from './about.module.css';

export default function AboutPage() {
    return (
        <>
            <AppHead subtitle="O nás" />
            <div className="page">
                <div>
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
                            ].map(({ name, image }, index) => {
                                return (
                                    <div key={index} className={styles.logo}>
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
                </div>
            </div>
        </>
    );
}

/**
 * TODO: [🥞] Link back to home
 * TODO: [🥞] Common skeleton - logo + footer for all pages
 */
