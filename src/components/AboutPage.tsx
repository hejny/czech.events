import * as React from 'react';
import { Link } from 'react-router-dom';
import { DateRange, RangeConstant } from '../model/DateRange';
import { ErrorComponent } from './ErrorComponent';
import { Form } from './Form';
import { LoadingComponent } from './LoadingComponent';
import { TalksPageEmail } from './TalksPageEmail';

export function AboutPage() {
    return (
        <>
            <div className="content">
                <div className="front black">
                    <div className="inner">
                        <h1>Mějte přehled o nejzajímavějších událostech z IT &amp; startupového světa.</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
