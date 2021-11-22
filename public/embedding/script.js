(() => {
    rescanPage();
    window.addEventListener('load', () => {
        rescanPage();
    });

    function rescanPage() {
        const elements = []
            .concat(
                Array.from(document.querySelectorAll('czech-events')),
                Array.from(document.querySelectorAll('.czech-events')),
            )
            .filter((element) => !element.hasAttribute('activated'));

        for (const element of elements) {
            element.setAttribute('activated', 'true');
            activateElement(element);
        }
    }

    async function activateElement(element) {
        console.info(`Activating Czech.events`, { element });

        const response = await fetch(`https://www.pavolhejny.com/czech-events/export/html`);
        if (!response.ok) {
            element.innerHTML = 'Chyba při načítání.';
            return;
        }

        element.innerHTML = await response.text();
    }
})();
