"""
Exports data into relational format.
"""
import json
import random
f = open("data/db.json", encoding="utf8")
data = json.load(f)

DATA_TYPE = "forces"
DATA_EXPORT = []
DATA = data["countries"][0][DATA_TYPE]
INTEL_TYPES = [
   "CYBINT/DNINT",
   "FININT",
   "GEOINT",
   "HUMINT",
   "IMINT",
   "MASINT",
   "OSINT",
   "SIGNIT",
   "TECHINT"
]
LOCATIONS = ["Kyiv", "Lviv", "Kharkiv", "Odesa", "Dnipro",
             "Donetsk", "Zaporizhia", "Kherson", "Poltava",
             "Chernivtsi", "Ivano-Frankivsk", "Ternopil",
              "Vinnytsia", "Sumy", "Lutsk", "Rivne",
              "Kropyvnytskyi", "Cherkasy", "Mykolaiv",
              "Uzhhorod", "Mariupol", "Simferopol", "Sevastopol",
              "Luhansk", "Kramatorsk", "Melitopol", "Berdiansk",
              "Nikopol", "Khmelnytskyi", "Kirovohrad", "Chernihiv",
              "Zhytomyr", "Bila Tserkva", "Mukachevo", "Drohobych",
              "Kovel", "Stryi", "Khust", "Kamianets-Podilskyi",
              "Zhovkva", "Zolochiv", "Boryspil", "Brovary", "Irpin",
              "Vyshneve", "Fastiv", "Berdychiv", "Korosten",
              "Pereiaslav-Khmelnytskyi", "Boryslav", "Sambir",
              "Novovolynsk", "Volodymyr-Volynskyi", "Kremenchuk",
              "Horlivka", "Mariupol", "Yalta", "Kerch", "Alushta",
              "Feodosiya", "Yevpatoria", "Sudak", "Alchevsk",
              "Lisichansk", "Antratsyt", "Sverdlovsk", "Pervomaisk",
              "Rubizhne", "Sloviansk", "Kostiantynivka", "Druzhkivka",
              "Severodonetsk", "Popasna", "Krasnyi Luch", "Slavutych",
              "Prypiat", "Chornobyl", "Nizhyn", "Pryluky", "Konotop",
              "Lebedyn", "Hlukhiv", "Okhtyrka", "Romny", "Shostka",
              "Balaklava", "Bilhorod-Dnistrovskyi", "Skadovsk", "Henichesk",
              "Kerch", "Kakhovka", "Novotroitske", "Enerhodar", "Tokmak",
              "Pervomaisk", "Dolyna", "Kalush", "Sambir", "Zhydachiv", "Dobromyl"]
count = 0
for data in DATA:
    if "id" in data:
      count = count + 1
      # Data model goes here.
      d = {
        "country_id" : 1,
        "force_title" : data["force_name"],
        "weapon_systems" : data["description"],
        "location" : random.choice(LOCATIONS),
        "intel_types" : random.choice(INTEL_TYPES)
      }
      print(d["location"])
      sql = """
      INSERT INTO FORCES (COUNTRY_ID, FORCE_TITLE, WEAPON_SYSTEMS, LOCATION, INTEL_TYPES)
      VALUES (%s, '%s', '%s', '%s', '%s');
      """ % (1, d["force_title"], d["weapon_systems"], d["location"], d["intel_types"])
     # print(sql)
      DATA_EXPORT.append(sql)
#print(json.dumps(DATA_EXPORT))
# print(str(count) + " rows exported.")
f = open("data/" + DATA_TYPE + "_export.sql", "w", encoding='utf-8')
for record in DATA_EXPORT:
  f.write(record)
f.close()
print("SQL Generated for " + str(count) + " records.")

