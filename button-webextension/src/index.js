createCzechEventsAdmin(apiUrl, token);

async function createCzechEventsAdmin(apiUrl, token) {
    //const {apiUrl,token} = browser;//require(`./config.js`);
    //const {apiUrl,token} = await getApiUrlAndToken();
    console.info(`Czech.events are using apiUrl="${apiUrl}".`);

    const eventUrl = new URL(window.location.toString());
    eventUrl.search = '';
    eventUrl.hash = '';
    eventUrl.pathname = eventUrl.pathname
        .split('/')
        .filter((x) => x !== '')
        .join('/');

    const response = await fetch(
        `${apiUrl}/admin/events?serializeId=${encodeURIComponent(eventUrl.toString())}&fetch=true&token=${token}`,
        { method: 'POST', body: JSON.stringify({ html: document.body.innerHTML }) },
    );

    const event = await response.json();

    if (event.error) {
        const error = new Error(event.error.message);
        Object.assign(error, event.error);
        throw error;
    }

    const rootElement = document.createElement('P');
    rootElement.classList.add(`czech-events`);
    document.body.appendChild(rootElement);

    //rootElement.innerHTML = `Loading...`;

    // TODO: Show here JSON5 or other nice format (if not using JSON5 remove it from dependencies)
    rootElement.innerHTML = `
        <textarea class="event-data">${JSON.stringify(event, null, 4)}</textarea>
        <button class="update">Update</button>
        ${event.visibility === 'PENDING' ? `<button class="update-visible">VISIBLE</button>` : ''}
    
    `;

    rootElement
        .querySelector(`.update`)
        .addEventListener(`click`, () => updateEvent(apiUrl, token, rootElement, eventUrl));
    rootElement
        .querySelector(`.update-visible`)
        .addEventListener(`click`, () => updateEvent(apiUrl, token, rootElement, eventUrl, { visibility: 'VISIBLE' }));
}

async function updateEvent(apiUrl, token, rootElement, eventUrl, additionalData = {}) {
    // console.log({ apiUrl, token, rootElement, eventUrl, additionalData });
    let eventDataElement = rootElement.querySelector(`.event-data`);
    let eventData = eventDataElement.value;

    // console.log({ eventDataElement, eventData });

    try {
        eventData = /*JSON.stringify*/ eval(`(${eventData})`);
    } catch (error) {
        alert(`Can not parse JSON in textarea.`);
    }

    // TODO: Prevent multiple clicks
    rootElement.classList.add('disabled');

    try {
        const response = await fetch(
            `${apiUrl}/admin/events?serializeId=${encodeURIComponent(eventUrl.toString())}&fetch=true&token=${token}`,
            {
                method: 'PUT',
                body: JSON.stringify({ ...eventData, ...additionalData }),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.status === 400) {
            const body = await response.json();
            console.error(body);
            alert(`${body.message}\nMore in the console`);
            //return;
        } else if (response.status === 200) {
            rootElement.remove();
            createCzechEventsAdmin(apiUrl, token);
        } else {
            console.error(`Response ended with unexpected status ${response.status}.`);
            alert(`Strange server response\nMore in the console`);
        }
    } catch (error) {
        console.error(body);
        alert(`Can not connect to the server\nMore in the console`);
    }
}

/*
TODO: more elegant
async function getApiUrlAndToken() {

    let apiUrl = `http://localhost:7755`;
    let token = `test`;

    try{
        throw new Error(`Bypassing`);
        const response = await fetch(
            `${apiUrl}/about`,
        );
        //if(!response.ok)
    }catch(error){
   
        apiUrl = `https://www.pavolhejny.com/czech-events`;


        token = window.localStorage.get(`token`);
        if(!token){
            token = prompt(`Czech.events API admin token:`);
            window.localStorage.set(`token`,token);
        }
    }

    return {apiUrl,token};
}
*/
