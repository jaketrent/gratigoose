select *
from trans t
where date_trunc('year', trans_date) = to_date($1, 'YYYY')
