import * as React from 'react';

export function Form() {
    // TODO: To Config
    return (
        <>
            <form action="https://www.pavolhejny.com/" method="post" target="_blank">
                <input type="hidden" name="sp_list" value="2197" />
                <input type="hidden" name="sendpress" value="post" />

                {/*
                <div className="group">
                    <input type="text" id="name" name="sp_firstname" placeholder="Jan Novák" />
                    <label htmlFor="name">Vaše jméno:</label>
                    <div className="bar"></div>
                </div> */}

                <div className="group">
                    <input
                        type="email"
                        id="email"
                        name="sp_email"
                        required
                        defaultValue="@"
                        onFocus={(event) => {
                            /*console.log(event);
                            const inputElement: HTMLInputElement = event.target as any;
                            console.log(inputElement);
                            console.log(inputElement.value);
                            if (!inputElement.value) {
                                inputElement.value = '@';
                            }*/
                        }}
                    />
                    <label htmlFor="email">E-mail: *</label>
                    <div className="bar"></div>
                </div>

                {/* TODO: We need here some GDPR */}
                <div className="center">
                    <input value="📧 Přihlásit se " type="submit" id="submit" name="submit" className="button" />
                </div>
            </form>
        </>
    );
}
