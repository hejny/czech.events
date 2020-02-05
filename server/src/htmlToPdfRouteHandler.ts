import { RequestHandler } from 'express';
import { ERROR_WRONG_URL } from './config';
import { getConvertedFile } from './getConvertedFile';

export const htmlToPdfRouteHandler: RequestHandler = async (
    { query: { url, download, nocache, renderOnCallback } },
    res,
    next,
) => {
    try {
        // TODO: Pass file name in query parameters
        const content = await getConvertedFile(
            decodeURIComponent(url),
            nocache,
            renderOnCallback,
        );
        res.contentType('application/pdf');
        res.header(
            'Content-disposition',
            `${download ? `attachment"` : 'inline'}; filename="${download}.pdf`,
        );
        res.send(content);
    } catch (error) {
        //TODO: handle other type of errors
        console.error(error);
        res.status(404).send(ERROR_WRONG_URL);
        //next(error);
    }
};
