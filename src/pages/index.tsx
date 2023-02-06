import spaceTrim from 'spacetrim';
import styled from 'styled-components';
import { PageDiv } from '../components/PageDiv';
import czechEventsBlackLogo from '../../public/design/logos/czech.events.black-logo.png';
import czechEventsWhiteLogo from '../../public/design/logos/czech.events.white-logo.png';
import czechEventsTransparentLogo from '../../public/design/logos/czech.events.transparent-logo.png';
import Image from 'next/image';
import Head from 'next/head';
import RootLayout from 'src/app/layout';
import { TalksPage } from 'src/components/TalksPage';

export default function IndexPage() {
    return (
        <RootLayout>
            <PageDiv>
                <TalksPage />
            </PageDiv>
        </RootLayout>
    );
}
