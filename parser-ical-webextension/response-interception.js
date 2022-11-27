// TODO: This extension is not finished and unused

chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
        const headers = details.responseHeaders;

        console.log(headers);

        for (let i = 0; i < headers.length; i++) {
            if (headers[i].name.toLowerCase() === 'content-disposition') {
                if (headers[i].value.indexOf('attachment') === 0) {
                    headers.splice(i, 1);
                    // headers[i].value='inline';
                }
                break;
            }
        }
        for (let j = 0; j < headers.length; j++) {
            if (headers[j].name.toLowerCase() === 'content-type') {
                if (/^text\/calendar/.test(headers[j].value)) {
                    headers[j].value = 'text/plain';
                }
                break;
            }
        }
        return { responseHeaders: headers };
    },
    {
        urls: ['<all_urls>'],
        types: ['main_frame', 'sub_frame'], //,'stylesheet','script','image','object','xmlhttprequest','other']
    },
    ['blocking', 'responseHeaders'],
);
