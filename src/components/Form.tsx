import * as React from 'react';
import { IWPFromResponse } from '../model/IWPFromResponse';

export function Form() {
    // TODO: To Config
    return (
        <>
            <form
                action="https://www.pavolhejny.com/wp-json/contact-form-7/v1/contact-forms/2466/feedback"
                method="post"
                target="_blank"
                onSubmit={async (event) => {
                    event.preventDefault();
                    const form = event.target as HTMLFormElement;

                    try {
                        const result = (await (
                            await fetch(form.action, {
                                method: 'POST',
                                body: new FormData(form),
                            })
                        ).json()) as IWPFromResponse;

                        if (result.status !== 'mail_sent') {
                            throw new Error(result.message);
                        }

                        form.reset();
                        alert(`Děkujeme, můžete se těšit na další email!`);
                    } catch (error) {
                        alert(error.message /*TODO: Better*/);
                    }
                }}
            >
                <input type="hidden" name="source" value="WEB" />

                <div className="group">
                    <input type="text" name="fullname" placeholder="Jan Novák" />
                    <label htmlFor="name">Vaše jméno:</label>
                    <div className="bar"></div>
                </div>

                <div className="group">
                    <input
                        type="email"
                        name="email"
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
                    <input value="Přihlásit se " type="submit" id="submit" name="submit" className="button" />
                </div>
            </form>
        </>
    );
}
