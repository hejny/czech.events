# Pick events

In Adminer show and sort:

```sql
SELECT * FROM `Event` WHERE `year` >= '2022' AND `month` >= '12' AND `visibility` != 'HIDDEN' LIMIT 50
```
