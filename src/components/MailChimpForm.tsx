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
                <input type="email" defaultValue="" name="EMAIL" />
                {/*<input type="text" name="b_eb937c8f3515cec96347304a3_d230d6001c" value="" />*/}
                <input type="submit" defaultValue="Subscribe" name="subscribe" />
            </form>
        </>
    );
}
