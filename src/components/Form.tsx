import * as React from 'react';
import { constructObjectFromJSON } from '../utils/constructObjectFromJSON';
import { Subscriber } from '../model/database/Subscriber';
import { ApiClient } from '../api/ApiClient';

interface IFormProps {
    apiClient: ApiClient;
}

export function Form(props: IFormProps) {
    // TODO: To Config
    return (
        <>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    const form = event.target as HTMLFormElement;
                    const formData = new FormData(form);

                    if (!formData.get('gdpr')) {
                        alert(`Potřebujeme od Vás zaškrtnout souhlas se zpracováním osobních údajů.`);
                        return;
                    }

                    const subscriber = constructObjectFromJSON(Subscriber, {
                        email: formData.get('email') as string,
                        fullname: formData.get('fullname') as string,
                        source: window.location.toString(),
                    });

                    try {
                        const result = await props.apiClient.postSubscriber(subscriber);

                        console.log('result', result);

                        form.reset();
                        alert(`Děkujeme, můžete se těšit na další email!`);
                    } catch (error) {
                        alert(error.message /*TODO: Better*/);
                    }
                }}
            >
                <div className="group">
                    <input type="text" name="fullname" className="field" defaultValue="" />
                    <label htmlFor="name">Vaše jméno:</label>
                    <div className="bar"></div>
                </div>

                <div className="group">
                    <input type="email" name="email" defaultValue="@" required className="field" />
                    <label htmlFor="email">E-mail: *</label>
                    <div className="bar"></div>
                </div>

                <div className="group checkbox gdpr">
                    <input type="checkbox" name="gdpr" id="gdpr" defaultChecked={false} />
                    <label htmlFor="gdpr">Souhlasím se zpracováním osobních údajů</label>
                </div>

                {/* TODO: We need here some GDPR */}
                <div className="center">
                    <input value="Přihlásit se " type="submit" id="submit" name="submit" className="button" />
                </div>
            </form>
        </>
    );
}
