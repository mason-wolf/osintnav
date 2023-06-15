"""
Formats force data and outputs improved data structure.
"""
import json

countries_db = open("scripts\db.json")
countries = json.load(countries_db)

forces = countries["countries"][0]["forces"]

force_db = open("scripts\db_forces.json", encoding="utf8")
new_forces = json.load(force_db)

for force in new_forces:
    forces.append(force)

f = open("scripts/db_new_forces.json", "w")
f.write(json.dumps(countries))
f.close()
