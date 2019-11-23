import Head from 'next/head';
import * as React from 'react';
import { PAGE_TITLE } from '../config';

interface ILayoutProps {
    title?: string;
}

export function Layout({ children, title }: React.PropsWithChildren<ILayoutProps>) {
    return (
        <>
            <Head>
                <title>{title ? `${title} | ${PAGE_TITLE}` : PAGE_TITLE}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {children}
            <style jsx global>
                {`
                    @import url('https://fonts.googleapis.com/css?family=Montserrat:100,400,700,800,900&display=swap');

                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #1d1c21;
                        font-family: Montserrat;
                        display: grid;
                        -webkit-text-size-adjust: 100%;
                        -webkit-font-smoothing: antialiased;
                    }

                    .black h1 {
                        color: rgb(255, 255, 255);
                        text-align: left;
                        font-size: 35px;
                    }

                    .front {
                        width: 70%;
                        padding: 100px;
                    }

                    form {
                        padding: 20px 0;
                        width: 450px;
                    }

                    .front form .button {
                        text-decoration: none;
                        padding: 16px 20px;
                        color: white;
                        cursor: pointer;
                        display: inline-block;
                        background-color: transparent;
                        border-radius: 6px;
                    }

                    .front form button:hover {
                        background-color: white;
                        color: black;
                    }

                    .front form label {
                        position: absolute;
                        top: 20px;
                        color: rgba(255, 255, 255, 0.5);
                        font: 400 16px Montserrat;
                        cursor: text;
                        transition: 0.25s ease;
                    }

                    .front form input {
                        display: block;
                        width: 100%;
                        padding-top: 30px;
                        border: none;
                        border-radius: 0;
                        color: white;
                        background: transparent;
                        font-size: 20px;
                        transition: 0.3s ease;
                    }
                    .front form input:valid ~ label {
                        top: 0;
                        font: 700 16px;
                        color: #01ccbf;
                    }
                    .front form input:focus {
                        outline: none;
                    }
                    .front form input:focus ~ label {
                        top: 0;
                        font: 700 16px Montserrat;
                        color: #01ccbf;
                    }
                    .front form input:focus ~ .bar:before {
                        transform: translateX(0);
                    }
                    .front form input:-webkit-autofill {
                        -webkit-box-shadow: 0 0 0px 1000px #333 inset;
                        -webkit-text-fill-color: white !important;
                    }

                    .black p {
                        font-size: 16px;
                    }

                    .black .font-light {
                        font-weight: 100;
                    }

                    .black h2 {
                        color: rgb(255, 255, 255);
                        text-align: left;
                        font-size: 25px;
                    }

                    .black * {
                        box-sizing: border-box;
                    }

                    .footer {
                        text-align: center;
                        color: white;
                        padding: 20px;
                        margin-top: auto;
                    }

                    .black a:link {
                        color: white;
                    }

                    .black a:visited {
                        color: rgb(211, 211, 211);
                    }

                    .black a:hover {
                        color: hotpink;
                    }

                    .black .group {
                        width: 100%;
                        height: 90px;
                        overflow: hidden;
                        position: relative;
                    }

                    .center {
                        text-align: center;
                        margin: 0 auto;
                    }

                    .black .bar {
                        background: rgba(255, 255, 255, 0.5);
                        content: '';
                        width: 500px;
                        height: 2px;
                        transition: 0.3s ease;
                        position: relative;
                    }
                    .black .bar:before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 150%;
                        background: #01ccbf;
                        transform: translateX(-100%);
                    }

                    .black ::selection {
                        background: rgba(33, 150, 243, 0.3);
                    }
                    .background img {
                        position: absolute;
                        z-index: -1;
                        right: 0;
                        padding: 0%;
                        margin: 00px auto;
                        height: 90%;
                    }

                    .event-wrapper {
                        width: 80%;
                        padding: 50px;
                        margin: 20px auto;
                        background-color: white;
                        border-radius: 50px;
                    }
                `}
            </style>
        </>
    );
}
