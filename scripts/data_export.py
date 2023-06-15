"""
Exports data into relational format.
"""
import json

f = open("data/db.json", encoding="utf8")
data = json.load(f)

DATA_TYPE = "vehicles"
DATA_EXPORT = []
DATA = data["countries"][0][DATA_TYPE]

count = 0
for data in DATA:
   count = count + 1
   # Data model goes here.
   d = {
    "COUNTRY_ID" : 1,
    "VEHICLE_NAME" : data["vehicle_name"],
    "VEHICLE_TYPE" : data["vehicle_type"],
    "YEAR_MODEL" : data["year_model"]
   }
   DATA_EXPORT.append(d)
print(str(count) + " rows exported.")
f = open("data/" + DATA_TYPE + "_export.json", "w")
f.write(json.dumps(DATA_EXPORT))
f.close()

