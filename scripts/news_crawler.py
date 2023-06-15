"""
Experimental news crawler for gathering OSINT.
"""
import uuid
from bs4 import BeautifulSoup
import requests
import json
import os

# c72cb8889dc0430086addb756d9bf04f

def get_news():
  url = ('https://newsapi.org/v2/top-headlines?'
        'q=russian&'
        'from=2023-04-19&'
        'sortBy=popularity&'
        'apiKey=c72cb8889dc0430086addb756d9bf04f')

  response = requests.get(url)

  news = json.loads(response.content)

  news_list = []

  for article in news["articles"]:
    title = article["title"]
    url = article["url"]
    date = article["publishedAt"]
    a = {
        "title" : title,
        "url" : url,
        "date" : date
    }
    news_list.append(a)
    file = open("scripts/news.json", "w")
    file.write(json.dumps(news_list))

def update_db():
  print("Updating database..")
  db = open("scripts/db_forces.json", encoding="utf8")
  db_json = json.load(db)

  news_file = open("scripts/news.json", encoding="utf8")
  news_json = json.load(news_file)
  del db_json["news"]
  db_json["countries"][0]["news"] = news_json
  db_update = open("scripts/db.json", "w")
  db_update.write(json.dumps(db_json))
  print("done")
  db_update.close()



get_news();
