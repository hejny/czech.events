import styles from './ProposeForm.module.css';
import { ApiClient } from '../../api/ApiClient';
import { classNames } from '../../utils/classNames';
import { constructObjectFromJSON } from 'src/utils/constructObjectFromJSON';
import spaceTrim from 'spacetrim';
import { Subscriber } from 'src/model/database/Subscriber';
import { parseTimesAndDates } from 'server/utils/parsing/parseTimesAndDates';
import { Event, EventType } from 'src/model/database/Event';

interface IProposeFormProps {
    apiClient: ApiClient;
}

export function ProposeForm(props: IProposeFormProps) {
    // TODO: To Config
    return (
        <form
            className={styles.SubscribeForm}
            onSubmit={async (event) => {
                event.preventDefault();

                const formElement = event.target as HTMLFormElement;

                function getInputByName(name: string) {
                    return formElement.querySelector(`input[name="${name}"]`) as HTMLInputElement;
                }

                const email = getInputByName(`email`).value;
                const fullname = getInputByName(`fullname`).value;
                const name = getInputByName(`name`).value;
                const topic = getInputByName(`topic`).value;
                const type = getInputByName(`type`).value as EventType;
                const web = getInputByName(`web`).value;
                const city = getInputByName(`city`).value;
                const startDate = getInputByName(`start-date`).valueAsDate;
                const endDate = getInputByName(`end-date`).valueAsDate;
                const { year, month, days, time } = parseTimesAndDates({ startDate, endDate });
                const online = getInputByName(`online`).checked;

                const subscriber = constructObjectFromJSON(Subscriber, {
                    email,
                    fullname,
                    source: window.location.toString(/* !!! Is /propose propagated */),
                });

                const proposedEvent = constructObjectFromJSON(Event, {
                    name,
                    topic,
                    type,
                    web,
                    city,
                    year,
                    month,
                    days,
                    time,
                    // TODO: price,
                    // TODO: priceCurrency,
                    // TODO: canceled,
                    online: online ? 1 : 0,
                    note: spaceTrim(`

              From: "${fullname}" <${email}>

              ${formData.get('note') as string}

            `),
                });

                try {
                    const resultEvent = await props.apiClient.postEventProposal(proposedEvent);
                    const resultSubscriber = await props.apiClient.postSubscriber(subscriber);

                    console.log({
                        resultEvent,
                        resultSubscriber,
                    });

                    const formElement = event.target as HTMLFormElement;
                    alert(`Děkujeme za návrh, můžete se těšit na další email!`);
                } catch (error) {
                    if (!(error instanceof Error)) {
                        throw error;
                    }

                    alert(error.message /*TODO: Better*/);
                }
            }}
        >
            <div className="group">
                <label htmlFor="web">Odkaz: *</label>
                <input type="url" name="web" className={styles.field} defaultValue="" required />
                {/* TODO: Try to autofetch the details */}
            </div>

            <div className="group">
                <label htmlFor="name">Název:</label>
                <input
                    type="text"
                    name="name"
                    className={styles.field}
                    defaultValue=""
                    placeholder="např. StartupWeekend"
                    required
                />
            </div>

            <div className="group">
                <label htmlFor="topic">Podtitul:</label>
                <input
                    type="text"
                    name="topic"
                    className={styles.field}
                    defaultValue=""
                    placeholder="např. Inovace ve vzdělávání"
                />
            </div>
            <div className="group">
                <label htmlFor="type">Typ:</label>
                <select name="type" className={styles.field}>
                    <option value={null} selected>
                        ---
                    </option>
                    <option value={EventType.CONFERENCE}>Konference</option>
                    <option value={EventType.MEETUP}>Meetup</option>
                    <option value={EventType.WORKSHOP}>Workshop</option>
                    <option value={EventType.HACKATHON}>Hackathon</option>
                    <option value={EventType.UNKNOWN}>Nevím / nejsem si jistý</option>
                </select>
            </div>

            <div className="group">
                <label htmlFor="date">Datum a čas začátku:</label>
                <input
                    type="datetime-local"
                    name="start-date"
                    className={styles.field}
                    min={new Date().toISOString()}
                    required
                />
            </div>

            <div className="group">
                <label htmlFor="date">Datum a čas konce:</label>
                <input type="datetime-local" name="end-date" className={styles.field} min={new Date().toISOString()} />
            </div>

            <div className="group">
                <label htmlFor="city">
                    Město:
                    <br />
                    <i>(pokud jde o čistě online událost, nechte město nevyplněné)</i>
                </label>
                <input type="text" name="city" className={styles.field} defaultValue="" />
            </div>

            <div className={classNames('group', 'checkbox', styles.gdpr)}>
                <input type="checkbox" name="online" defaultChecked={false} />
                <label htmlFor="online">Událost je vysílaná i online</label>
            </div>

            <div className="group">
                <label htmlFor="name">Vaše jméno:</label>
                <input type="text" name="fullname" className={styles.field} defaultValue="" />
            </div>
            <div className="group">
                <label htmlFor="email">Váš E-mail:</label>
                <input type="email" name="email" defaultValue="@" className={styles.field} />
            </div>

            <div className="group">
                <label htmlFor="city">
                    Poznámka:
                    <br />
                    <i>Libovolné doplňující informace k události</i>
                </label>
                <input type="text" name="city" className={styles.field} defaultValue="" />
            </div>

            <div className={styles.center}>
                <input value="Poslat návrh " type="submit" id="submit" name="submit" className={styles.button} />
            </div>
        </form>
    );
}

/**
 * !!! Persist in LocalStorage
 * !!! Info about the feed
 */
