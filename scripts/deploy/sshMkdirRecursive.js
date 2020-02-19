export async function sshMkdirRecursive(client, wholePath, listsCache = {}) {
    let partialPath = '/';
    for (const folder of wholePath.split('/').filter((x) => x)) {
        let isThare;

        //console.info(partialPath);

        //if (checkedDirs.includes(partialPath)) {
        //    isThare = true;
        //} else {
        //console.info('listing');

        listsCache[partialPath] = listsCache[partialPath] || (await client.list(partialPath));

        //console.info('list',list);
        isThare = listsCache[partialPath].some((fileObject) => fileObject.name === folder);
        //console.info('isThare',isThare);
        //}

        listsCache[partialPath].push({ name: folder });

        partialPath = (partialPath + '/' + folder).split('//').join('/');

        //checkedDirs.push(partialPath);

        //console.info('partialPath',partialPath);

        if (!isThare) {
            console.info(`Creating folder "${partialPath}".`);
            await client.mkdir(partialPath);
        }
    }
}
