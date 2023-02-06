# Pick events

In Adminer show and sort:

https://blog.pavolhejny.com/mysql/?username=czechevents&db=czechevents&select=Event_extra&columns%5B0%5D%5Bfun%5D=&columns%5B0%5D%5Bcol%5D=&where%5B0%5D%5Bcol%5D=isInFuture&where%5B0%5D%5Bop%5D=%3D&where%5B0%5D%5Bval%5D=1&where%5B1%5D%5Bcol%5D=visibility&where%5B1%5D%5Bop%5D=%3D&where%5B1%5D%5Bval%5D=PENDING&where%5B3%5D%5Bcol%5D=&where%5B3%5D%5Bop%5D=%3D&where%5B3%5D%5Bval%5D=&order%5B0%5D=&limit=1000&text_length=100

```sql
SELECT * FROM `Event_extra` WHERE `isInFuture` = '1' AND `visibility` = 'PENDING' LIMIT 1000
```

## The view model:

```sql
CREATE VIEW Event_extra AS
SELECT
*,
STR_TO_DATE(CONCAT(SUBSTRING_INDEX(`days`, '-', 1),',',`month`,',',`year`),'%d,%m,%Y') >= CURDATE() as isInFuture
FROM `Event`
```
