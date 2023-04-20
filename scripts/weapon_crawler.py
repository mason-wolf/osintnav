import uuid
from bs4 import BeautifulSoup
import requests
import json
import os

url = "https://www.militaryfactory.com/"
request = requests.get("https://www.militaryfactory.com/modern-armor/russian-army.php")
soup = BeautifulSoup(request.text, "lxml")

weapons = []

class Weapon(json.JSONEncoder):
    id = 0
    year_model = 0
    weapon_name = ""
    weapon_type = ""
    def __init__(self) -> None:
        pass

def get_weapons():
  print("Fetching weapons...")
  table = soup.findAll("div", {'class': 'rsContainerPlate picTrans zoom'})
  for row in table:
      weapon = Weapon()
      weapon.id = str(uuid.uuid4())
      year = row.find('span', {'class' : 'textWhite'})
      name = row.find('span', {'class': 'textLarge textBold textDkGray'})
      type = row.find('span', {'class': 'textNormal textGray'})
      print("Getting data on " + name.text)
      weapon.year_model = year.text
      weapon.weapon_name = name.text
      weapon.weapon_type = type.text
      weapons.append(weapon.__dict__)

  f = open("scripts/weapons.json", "w")
  f.write(json.dumps(weapons))
  f.close()
  print("Weapons fetched.")


def get_weapon_descriptions():
  table = soup.findAll("div", {'class': 'box'})
  for row in table:
    weapon_name = row.find('span', {'class': 'textNormal textGray'})
    link = row.find("a")
    request = requests.get(url + link["href"])
    soup2 = BeautifulSoup(request.text, "lxml")
    print("Fetching weapon description for " + weapon_name.text + "....")
    desc_table = soup2.findAll("div", {'class': 'contentStripInner'})
    data = []
    data.append(weapon_name.text)
    for d1 in desc_table:
      d2 = d1.findAll('span', {'class': 'textLarge textDkGray'})
      for d3 in d2:
          data.append(d3.text)
    f = open("scripts/weapons/" + link["href"][-10:], "w")
    f.write(json.dumps(data))
    f.close()

  print("Weapon data fetched.")

def clean_weapon_data():
  print("Cleaning data...")
  path = "scripts/weapons"
  files = os.listdir(path)
  for file_name in files:
    data = open("scripts/weapons/" + file_name, "r")
    raw = json.load(data)

    try:
      print("Cleaning up " + raw[0] + " file...")
      weapon = {
        "weapon_name" : raw[0],
        "weapon_desc" : raw[1].replace("©MilitaryFactory.com", '')
      }
    except:
      print("Cleaning up " + raw["weapon_name"] + " file...")
      weapon = {
        "weapon_name" : raw["weapon_name"],
        "weapon_desc" : raw["weapon_desc"].replace("©MilitaryFactory.com", '')
      }
    f = open("scripts/weapons/" + file_name, "w")
    f.write(json.dumps(weapon))
    f.close()
  print("Data cleaned")

def map_weapon_data():
  print("Mapping weapon data descriptions...")
  weapons_file = open("scripts/weapons.json")
  weapons = json.load(weapons_file)

  path = "scripts/weapons"
  files = os.listdir(path)
  for file_name in files:
    data = open("scripts/weapons/" + file_name, "r")
    descs = json.load(data)
    for weapon in weapons:
       if (weapon["weapon_type"] == descs["weapon_name"]):
          weapon["description"] = descs["weapon_desc"]

  f = open("scripts/weapons.json", "w")
  f.write(json.dumps(weapons))
  f.close()


def update_db(key):
  weapons_file = open("scripts/weapons.json")
  weapons = json.load(weapons_file)
  db = open("scripts/db_new_forces.json")
  db_json = json.load(db)
  db_json["countries"][0][key] = weapons
  f = open("scripts/db_new_forces.json", "w")
  f.write(json.dumps(db_json))
  f.close()

def rename_keys(newName):
  weapons_file = open("scripts/weapons.json")
  weapons = json.load(weapons_file)
  for weapon in weapons:
     print("Converting " + weapon["weapon_name"] + " data type to " + newName)
     weapon[newName + "_name"] = weapon["weapon_name"]
     del weapon["weapon_name"]
     weapon[newName + "_type"] = weapon["weapon_type"]
     del weapon["weapon_type"]
  f = open("scripts/weapons.json", "w")
  f.write(json.dumps(weapons))
  f.close()




# get_weapons()
# get_weapon_descriptions()
# clean_weapon_data()
# map_weapon_data()
#rename_keys("vehicle")
update_db("vehicles")
