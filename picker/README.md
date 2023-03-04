# Pick events

In Adminer show and sort:

https://blog.pavolhejny.com/mysql/?username=czechevents&db=czechevents&select=Event_picker&columns%5B0%5D%5Bfun%5D=&columns%5B0%5D%5Bcol%5D=name&columns%5B1%5D%5Bfun%5D=&columns%5B1%5D%5Bcol%5D=topic&columns%5B2%5D%5Bfun%5D=&columns%5B2%5D%5Bcol%5D=type&columns%5B3%5D%5Bfun%5D=&columns%5B3%5D%5Bcol%5D=web&columns%5B4%5D%5Bfun%5D=&columns%5B4%5D%5Bcol%5D=city&columns%5B5%5D%5Bfun%5D=&columns%5B5%5D%5Bcol%5D=year&columns%5B6%5D%5Bfun%5D=&columns%5B6%5D%5Bcol%5D=online&columns%5B7%5D%5Bfun%5D=&columns%5B7%5D%5Bcol%5D=note&columns%5B8%5D%5Bfun%5D=&columns%5B8%5D%5Bcol%5D=visibility&columns%5B9%5D%5Bfun%5D=&columns%5B9%5D%5Bcol%5D=&where%5B1%5D%5Bcol%5D=&where%5B1%5D%5Bop%5D=%3D&where%5B1%5D%5Bval%5D=&order%5B0%5D=&limit=1000&text_length=100

## Event_picker

```sql
CREATE VIEW Event_picker AS
SELECT
  `id`,
  `name`,
  `topic`,
  `type`,
  `web`,
  `city`,
  `year`,
  `month`,
  `days`,
  `time`,
  `visibility`,
  `online`,
  `note`
FROM `Event_extra`
WHERE TRUE
AND `isInFuture` = '1'
AND `visibility` = 'PENDING'
AND `canceled` = '0'
```

## Event_extra

```sql
CREATE VIEW Event_extra AS
SELECT
*,
STR_TO_DATE(CONCAT(SUBSTRING_INDEX(`days`, '-', 1),',',`month`,',',`year`),'%d,%m,%Y') >= CURDATE() as isInFuture
FROM `Event`
```
