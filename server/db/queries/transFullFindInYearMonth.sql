select t.id as trans_id
,      t.trans_date as trans_trans_date
,      t.description as trans_description
,      t.amt as trans_amt
,      t.location as trans_location
,      t.check_num as trans_check_num
,      t.cleared_date as trans_cleared_date
,      t.created as trans_created
,      t.updated as trans_updated

,      c.id as cat_id
,      c.name as cat_name
,      c.abbrev as cat_abbrev
,      c.description as cat_description
,      c.type as cat_type

,      a.id as acct_id
,      a.name as acct_name
,      a.abbrev as acct_abbrev
,      a.liquidable as acct_liquidable
from trans t
left join acct a on t.acct = a.id
left join cat c on t.cat = c.id
where (extract(year from trans_date), extract(month from trans_date)) = ($1, $2)
