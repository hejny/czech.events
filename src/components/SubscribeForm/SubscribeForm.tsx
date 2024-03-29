import spaceTrim from 'spacetrim';
import { ApiClient } from '../../api/ApiClient';
import { Subscriber } from '../../model/database/Subscriber';
import { classNames } from '../../utils/classNames';
import { constructObjectFromJSON } from '../../utils/constructObjectFromJSON';
import styles from './SubscribeForm.module.css';

interface ISubscribeFormProps {
    apiClient: ApiClient;
}

export function SubscribeForm(props: ISubscribeFormProps) {
    // TODO: To Config
    return (
        <form
            className={styles.SubscribeForm}
            onSubmit={async (event) => {
                event.preventDefault();

                const formElement = event.target as HTMLFormElement;
                const formData = new FormData(formElement);

                if (!formData.get('gdpr')) {
                    alert(`Potřebujeme od Vás zaškrtnout souhlas se zpracováním osobních údajů.`);
                    return;
                }

                const email = formData.get('email') as string;
                const fullname = formData.get('fullname') as string;

                const subscriber = constructObjectFromJSON(Subscriber, {
                    email,
                    fullname,
                    source: window.location.toString(),
                });

                try {
                    const result = await props.apiClient.postSubscriber(subscriber);

                    console.log('result', result);

                    formElement.reset();
                    alert(`Děkujeme, můžete se těšit na další email!`);
                } catch (error) {
                    if (!(error instanceof Error)) {
                        throw error;
                    }

                    console.error(error);

                    // TODO: Do not use alert but custom modal
                    alert(
                        spaceTrim(`
                            Omlouváme se, ale něco se pokazilo

                            Vyzkoušejte se přihlásit později nebo mi napište na pavol@hejny.org`),
                    );
                }
            }}
        >
            <div className="group">
                <label htmlFor="name">Vaše jméno:</label>
                <input type="text" name="fullname" className={styles.field} defaultValue="" />
            </div>

            <div className="group">
                <label htmlFor="email">E-mail: *</label>
                <input type="email" name="email" defaultValue="@" required className={styles.field} />
            </div>

            <div className={classNames('group', 'checkbox', styles.gdpr)}>
                <input type="checkbox" name="gdpr" id="gdpr" defaultChecked={false} />
                <label htmlFor="gdpr">Souhlasím se zpracováním osobních údajů</label>
            </div>

            {/* TODO: We need here some GDPR */}
            <div className={styles.center}>
                <input value="Přihlásit se " type="submit" id="submit" name="submit" className={styles.button} />
            </div>
        </form>
    );
}
