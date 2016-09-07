select e.id as expected_id
,      e.date as expected_expected_date
,      e.amt as expected_amt
,      e.created as expected_created
,      e.updated as expected_updated

,      c.id as cat_id
,      c.name as cat_name
,      c.abbrev as cat_abbrev
,      c.description as cat_description
,      c.type as cat_type

from expected e
left join cat c on e.cat = c.id
where (extract(year from e.date), extract(month from e.date)) = ($1, $2)
