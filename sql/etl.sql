-- -- Delete duplicate forces.
delete
from forces
where force_title in (
  select force_title from forces group by force_title having count(*) > 1
)

-- -- Get tank divisions.
select * from forces where force_title LIKE '%Tank%'

-- Assign force type by title.
update forces set force_type_id = 21 WHERE force_title LIKE '%Tank%';
update forces set force_type_id = 4 WHERE force_title LIKE '%Mechanized Brigade%'
update forces set force_type_id = 4 WHERE force_title LIKE '%Rifle%';
update forces set force_type_id = 22 WHERE force_title LIKE '%Artillery%';
update forces set force_type_id = 2 WHERE force_title LIKE '%Special Forces%';
update forces set force_type_id = 23 WHERE force_title LIKE '%Military Base%';
update forces set force_type_id = 5 WHERE force_title LIKE '%Air Assault%';
update forces set force_type_id = 23 WHERE force_title LIKE '%HQ%';
update forces set force_type_id = 6 WHERE force_title LIKE '%Naval%';
update forces set force_type_id = 1 WHERE force_title LIKE '%Missile%';
update forces set force_type_id = 3 WHERE force_title LIKE '%Aviation%';
