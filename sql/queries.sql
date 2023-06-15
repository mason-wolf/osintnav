-- Get forces by type.
select f.force_title, ft.force_type, c.country_name
from forces f
inner join force_type ft on f.force_type_id = ft.force_type_id
inner join countries c on f.country_id = c.country_id;

-- How many losses in each unit are associated with a report?
select fr.force_id, f.force_title, fr.losses from reports r
inner join force_reports fr on r.report_id = fr.report_id
inner join forces f on fr.force_id = f.force_id

-- What weapons are associated with this report?
select fr.force_id, f.force_title, w.weapon_name from reports r
inner join force_reports fr on r.report_id = fr.report_id
inner join forces f on fr.force_id = f.force_id
inner join force_weapons fw on fw.force_id = fr.force_id
inner join weapons w on w.weapon_id = fw.weapon_id
where r.report_id = 1

-- What types of intel are associated with a report?
select r.title, ints.intel_source_type_id, intel_source_types.source_type from reports r
join intel_sources ints on r.report_id = ints.report_id
join intel_source_types on ints.intel_source_type_id = intel_source_types.intel_source_type_id

-- What types of intel are associated with a report?
select r.title, ints.intel_source_type_id, intel_source_types.source_type from reports r
join intel_sources ints on r.report_id = ints.report_id
join intel_source_types on ints.intel_source_type_id = intel_source_types.intel_source_type_id
where r.report_id = 1

-- What types of vehicles are associated with a report?
select r.title, f.force_title, fr.losses, v.vehicle_name from reports r
join force_reports fr on r.report_id = fr.report_id
join forces f on fr.force_id = f.force_id
join force_vehicles fv on f.force_id = fv.force_id
join vehicles v on fv.vehicle_id = v.vehicle_id
where r.report_id = 41
