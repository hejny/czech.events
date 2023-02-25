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
            className={styles.ProposeForm}
            onSubmit={async (event) => {
                event.preventDefault();

                const formElement = event.target as HTMLFormElement;

                function getInputByName(name: string) {
                    return formElement.querySelector(
                        `
                          input[name="${name}"],
                          select[name="${name}"],
                          textarea[name="${name}"]
                        `,
                    ) as HTMLInputElement;
                }

                const email = getInputByName(`email`).value;
                const fullname = getInputByName(`fullname`).value;
                const name = getInputByName(`name`).value;
                const topic = getInputByName(`topic`).value;
                const type = getInputByName(`type`).value as EventType;
                const web = getInputByName(`web`).value;
                const city = getInputByName(`city`).value;
                const note = getInputByName(`note`).value;

                const startDate = new Date(
                    getInputByName(`start-date`).value,
                ); /* <- Note: For some reason can not be used valueAsDate */
                const endDateString = getInputByName(`end-date`).value;
                const endDate = endDateString && new Date(endDateString);

                const { year, month, days, time } = parseTimesAndDates({ startDate, endDate });

                console.info({ year, month, days, time });

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
                    note: spaceTrim(
                        (block) => `

                          From: "${fullname}" <${email}>
                          Note:
                          ${block(note)}

                    `,
                    ),
                });

                try {
                    console.info({
                        proposedEvent,
                        subscriber,
                    });

                    const resultEvent = await props.apiClient.postEventProposal(proposedEvent);
                    const resultSubscriber = await props.apiClient.postSubscriber(subscriber);

                    console.info({
                        resultEvent,
                        resultSubscriber,
                    });

                    // !!! formElement.reset();
                    alert(`Děkujeme Vám za návrh!`);
                } catch (error) {
                    if (!(error instanceof Error)) {
                        throw error;
                    }

                    console.error(error);

                    // TODO: Do not use alert but custom modal
                    alert(
                        spaceTrim(`
                            Omlouváme se, ale něco se pokazilo

                            Vyzkoušejte poslat návrh později nebo mi napište na pavol@hejny.org`),
                    );
                }
            }}
        >
            <h2>Navrhněte událost do emailu:</h2>
            <p>
                Cca 2x za měsíc Vaše návrhy procházíme a přidáváme do emailu. Pokud máte organizujete více událostí a
                máte feed, napište mi na <a href="mailto:pavol@hejny.org">pavol@hejny.org</a>.
            </p>
            <div className={styles.field}>
                <label htmlFor="web">Web události: *</label>
                <input type="url" name="web" defaultValue="" required />
                {/* TODO: Try to autofetch the details */}
            </div>

            <div className={styles.field}>
                <label htmlFor="name">Název:</label>
                <input type="text" name="name" defaultValue="" placeholder="např. StartupWeekend" required />
            </div>

            <div className={styles.field}>
                <label htmlFor="topic">Podtitul:</label>
                <input type="text" name="topic" defaultValue="" placeholder="např. Inovace ve vzdělávání" />
            </div>
            <div className={styles.field}>
                <label htmlFor="type">Typ:</label>
                <select name="type" required>
                    <option value="" selected disabled hidden>
                        ---
                    </option>
                    <option value={EventType.CONFERENCE}>📛 Konference</option>
                    <option value={EventType.MEETUP}>🧑🏽‍🤝‍🧑🏽 Meetup</option>
                    <option value={EventType.WORKSHOP}>🎓 Workshop</option>
                    <option value={EventType.HACKATHON}>🐱‍💻 Hackathon</option>
                    <option value={EventType.UNKNOWN}>❔ Nevím / nejsem si jistý</option>
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="date">Datum a čas začátku: *</label>
                <input
                    type="datetime-local"
                    name="start-date"
                    min="2023-01-01T00:00"
                    max="2030-01-01T00:00"
                    /* min={new Date().toISOString()} <- TODO: Make min=today */
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="date">Datum a čas konce:</label>
                <input
                    type="datetime-local"
                    name="end-date"
                    min="2023-01-01T00:00"
                    max="2030-01-01T00:00"
                    /* min={new Date().toISOString()} <- TODO: Make min=start-date  */
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="city">
                    Město:
                    <br />
                    <i>(pokud jde o čistě online událost, nechte město nevyplněné)</i>
                </label>
                <input type="text" name="city" defaultValue="" />
            </div>

            <div className={styles.field}>
                <label>
                    <input type="checkbox" name="online" defaultChecked={false} /> Událost je vysílaná i online
                </label>
            </div>

            <div className={styles.field}>
                <label htmlFor="name">Vaše jméno:</label>
                <input type="text" name="fullname" defaultValue="" />
            </div>
            <div className={styles.field}>
                <label htmlFor="email">Váš E-mail:</label>
                <input type="email" name="email" />
            </div>

            <div className={styles.field}>
                <label htmlFor="city">
                    Poznámka:
                    <br />
                    <i>Libovolné doplňující informace k události</i>
                </label>
                <textarea name="note" />
            </div>

            <div className={styles.submit}>
                <input value="Poslat návrh " type="submit" id="submit" name="submit" className={styles.button} />
            </div>
        </form>
    );
}

/**
 * !!! Persist in LocalStorage
 * !!! Info about the feed
 */
