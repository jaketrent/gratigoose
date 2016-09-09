select *
from expected e
where (extract(year from e.date), extract(month from e.date)) = ($1, $2)
