import * as React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="footer black">
            <h2>Mediální partneři:</h2>
            <img src="https://www.ceehacks.com/wp-content/uploads/ceehacks-logo.png" />
            <Link to="/branding">Naše loga</Link>
            Chcete se stát partnerem projektu?
        </footer>
    );
}
