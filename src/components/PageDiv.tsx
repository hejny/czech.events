import styled from 'styled-components';

export const PageDiv = styled.div`
    max-width: 1200px;
    display: inline-block;
    text-align: left;
    overflow: visible;

    .white {
        /*We are using here standart Gmail font*/
        font-family: Arial, Helvetica, sans-serif, 'Montserrat', serif;
    }

    .white a {
        color: black;
    }

    .front {
        /*/border: 1px dotted red; /**/
        width: 100%;
        max-width: 850px;
    }

    .front .inner {
        padding: 10vh;
        padding-bottom: 0;
    }

    .front .separator {
        /*margin-top: 10vh;*/
    }

    .black {
        font-family: 'Montserrat', serif;
        /*font-family: 'Oswald', serif;*/
    }

    .black h1 {
        color: rgb(255, 255, 255);
        text-align: left;
        font-size: 35px;
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
        font-size: 20px;
    }

    .black * {
        box-sizing: border-box;
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
    .black .group.checkbox {
        width: 100%;
        height: 40px;
    }

    .black .bar {
        background: rgba(255, 255, 255, 0.5);
        content: '';
        max-width: 500px;
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

    .line {
        line-height: 32px;
    }

    .option-in-text {
        background: none;
        color: white;
        margin-left: 0.35em;
        outline: none;
        border: 2px solid rgba(255, 255, 255, 0.5);
        font-weight: 100;
        font-size: 20px;
        font-family: 'Montserrat', serif;
    }

    .option-in-text option {
        background: white;
        color: black;
    }

    .letter {
        margin: 5vh;
        padding: 5vh;
        background-color: white;
        border-radius: 50px;
    }
`;
