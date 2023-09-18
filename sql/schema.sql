create table weapons (WEAPON_ID NUMBER GENERATED ALWAYS AS IDENTITY, WEAPON_NAME VARCHAR2(100), COUNTRY_ID NUMBER NOT NULL, YEAR_MODEL NUMBER(4), WEAPON_TYPE VARCHAR2(100))
create table countries (COUNTRY_ID NUMBER GENERATED ALWAYS AS IDENTITY, COUNTRY_NAME VARCHAR(200))
create table forces (FORCE_ID NUMBER GENERATED ALWAYS AS IDENTITY, COUNTRY_ID NUMBER NOT NULL, FORCE_TITLE VARCHAR2(100), FORCE_TYPE VARCHAR2(100))
create table reports (report_id number generated always as identity, title varchar(255), report_date DATE)
create table force_reports (force_report_id number generated always as identity, report_id number not null, force_id number not null);
create table force_weapons(force_weapon_id number generated always as identity, force_id number not null, weapon_id number not null)
create table intel_sources(intel_source_id number generated always as identity, report_id number, intel_source_type_id number, source varchar(255));
create table intel_source_types(intel_source_type_id number generated always as identity, source_type varchar2(25));
create table vehicles (
    vehicle_id number generated always as identity,
    vehicle_name varchar2(100),
    vehicle_type varchar2(100),
    year_model number,
    country_id number)
create table force_vehicles(force_vehicle_id number generated always as identity, force_id number, vehicle_id number)
create table aircraft(aircraft_id number generated always as identity, aircraft_name varchar2(100), aircraft_type varchar2(100), year_model number, country_id number);
create table force_aircraft (force_aircraft_id number generated always as identity, force_id number, aircraft_id number)
