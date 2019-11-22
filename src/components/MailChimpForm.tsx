import * as React from 'react';

export function MailChimpForm() {
    // TODO: To Config
    return (
        <>
            <form
                action="https://pavolhejny.us5.list-manage.com/subscribe/post?u=eb937c8f3515cec96347304a3&amp;id=d230d6001c"
                method="post"
                target="_blank"
            >
                <div className="group">
                    <input type="email" id="name" value="@" name="NAME" required />
                    <label htmlFor="name">Name</label>
                    <div className="bar"></div>
                </div>
                <div className="group">
                    <input type="text" id="email" placeholder="Jan Novák" name="EMAIL" required />
                    <label htmlFor="email">E-mail</label>
                    <div className="bar"></div>
                </div>
                {/* TODO: We need here some GDPR */}
                <input type="hidden" name="SOURCE" value="WEB" />
                <div className="center">
                    <button className="button">Přihlásit se</button>
                </div>
            </form>
        </>
    );
}
