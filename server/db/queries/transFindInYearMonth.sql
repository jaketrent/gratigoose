select *
from trans t
where (extract(year from trans_date), extract(month from trans_date)) = ($1, $2)
