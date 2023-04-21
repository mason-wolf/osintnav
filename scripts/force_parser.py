
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
    icon = ""
    def __init__(self) -> None:
        pass

def update_forces():
  forceList = []

  for obj in data["9"]:
      force = Force()
      force.id = obj["id"]
      force.lat = obj["lat"]
      force.lng = obj["lng"]
      force.force_name = obj["title"]
      force.description = obj["description"]
      force.icon = obj["icon"]
      forceList.append(force.__dict__)

  f = open("scripts/db_forces.json", "w")
  f.write(json.dumps(forceList))
  f.close()


def update_db():
    new_forces_file = open("scripts/db_forces.json")
    new_forces = json.load(new_forces_file)
    file = open("scripts/db_new_forces.json")
    forces = json.load(file)
    for force in forces["countries"][0]["forces"]:
        for new_force in new_forces:
            if (force["force_name"] == new_force["force_name"]):
                force["icon"] = new_force["icon"]
    f = open("scripts/db_new_forces.json", "w")
    f.write(json.dumps(forces))
    f.close()

update_db()
