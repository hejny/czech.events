async function createCzechEventsAdmin() {
    const rootElement = document.createElement('P');
    rootElement.classList.add(`czech-events`);
    document.body.appendChild(rootElement);

    rootElement.innerHTML = `Loading...`;

    // TODO: Unhardcode token and URL
    const response = await fetch(
        `http://localhost:7755/admin/events?serializeId=${encodeURIComponent(
            window.location.toString(),
        )}&fetch=true&token=admin`,
    );
    const event = await response.json();

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

        // TODO: Unhardcode token and URL
        const response = await fetch(
            `http://localhost:7755/admin/events?serializeId=${encodeURIComponent(
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
