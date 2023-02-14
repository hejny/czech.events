import spaceTrim from 'spacetrim';
import styles from './Partners.module.css';
import { PageDiv } from '../PageDiv/PageDiv';
import startupWeekendPragueLogo from '../../../public/design/logos/partners/startup-weekend-prague.png';
import startupWeekendBratislavaLogo from '../../../public/design/logos/partners/startup-weekend-bratislava.png';
import undoutSleepBoxLogo from '../../../public/design/logos/partners/undout.png';
import hackPragueLogo from '../../../public/design/logos/partners/hackprague.svg';
import startupBoxLogo from '../../../public/design/logos/partners/startupbox.png';
import collboardLogo from '../../../public/design/logos/partners/collboard.png';
import Image from 'next/image';
import Head from 'next/head';
import RootLayout from 'src/app/layout';
import { shuffleArray } from 'src/utils/shuffleArray';

export function Partners() {
    return (
        <div className={styles.Partners}>
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
        </div>
    );
}

/**
 * TODO: Link back to home
 */
