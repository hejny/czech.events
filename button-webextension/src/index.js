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


async function createCzechEventsAdmin() {

    //const {apiUrl,token} = browser;//require(`./config.js`);
    //const {apiUrl,token} = await getApiUrlAndToken();
    console.info(`Czech.events are using apiUrl="${apiUrl}".`)

    const rootElement = document.createElement('P');
    rootElement.classList.add(`czech-events`);
    document.body.appendChild(rootElement);

    rootElement.innerHTML = `Loading...`;


    const eventUrl = new URL(window.location.toString());
    eventUrl.search = '';
    eventUrl.hash = '';
    eventUrl.pathname = eventUrl.pathname.split('/').filter(x=>x!=='').join('/');


    // TODO: !!! Unhardcode token and URL
    const response = await fetch(
        `${apiUrl}/admin/events?serializeId=${encodeURIComponent(
            eventUrl.toString()
        )}&fetch=true&token=${token}`,
    );
    
    const event = await response.json();

    // TODO: Show here JSON5 or other nice format (if not using JSON5 remove it from dependencies)
    rootElement.innerHTML = `
        <textarea>${JSON.stringify(event, null, 4)}</textarea>
        <button>Update</button>
    
    `;

    rootElement.querySelector(`button`).addEventListener(`click`, async () => {
        let value = rootElement.querySelector(`textarea`).value;

        try {
            value = JSON.stringify(eval(`(${value})`));
        } catch (error) {
            alert(`Can not parse JSON in textarea.`);
        }

        //rootElement.innerHTML = `Updating...`;

        // TODO: !!! Unhardcode token and URL
        const response = await fetch(
            // TODO: !!! Unhardcode here URL
            `${apiUrl}/admin/events?serializeId=${encodeURIComponent(
                window.location.toString(),
            )}&fetch=true&token=admin`,
            {
                method: 'PUT',
                body: value,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.status === 400) {
            const body = await response.json();
            console.error(body);
            alert(`${body.message}\nMore in the console`);
        } else if (response.status === 200) {
            rootElement.remove();
            createCzechEventsAdmin();
        }
    });
}

createCzechEventsAdmin();
