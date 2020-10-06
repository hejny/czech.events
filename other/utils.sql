/* Normalize serializeId */

UPDATE
`Event`
SET serializeId = 
TRIM(TRAILING '/' FROM  
SUBSTRING_INDEX(serializeId,'?',1)) 


/* Find duplicate serializeId */


SELECT 
    serializeId, 
    COUNT(serializeId)
FROM
    `Event`
GROUP BY serializeId
HAVING COUNT(serializeId) > 1;





/* REGEXP_REPLACE(serializeId,'^(.*?)\/?\?.*$','$1') as x */
