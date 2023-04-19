
import json

f = open("scripts/forces-raw.json")
data = json.load(f)

class Force(json.JSONEncoder):
    id = 0
    force_name = ""
    location = ""
    notes = ""
    type = ""
    lat = ""
    lng = ""
    title = ""
    description = ""

    def __init__(self) -> None:
        pass

forceList = []

for obj in data["9"]:
    force = Force()
    force.id = obj["id"]
    force.lat = obj["lat"]
    force.lng = obj["lng"]
    force.force_name = obj["title"]
    force.description = obj["description"]
    forceList.append(force.__dict__)

f = open("scripts/db_forces.json", "w")
f.write(json.dumps(forceList))
f.close()
