(() => {
    rescanPage();
    document.addEventListener('load', () => {
        rescanPage();
    });

    function rescanPage() {
        const elements = Array.concat(
            Array.from(document.querySelectorAll('czech-events')),
            Array.from(document.querySelectorAll('.czech-events')),
        ).filter((element) => !element.hasAttribute('activated'));

        for (const element of elements) {
            element.setAttribute('activated', 'true');
            activateElement(element);
        }
    }

    function activateElement(element) {
        element.innerHTML = 'activated';
    }
})();
