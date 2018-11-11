from newsapi import NewsApiClient
import psycopg2
from datetime import datetime

#print('DATABASE PROGRAM STARTS')

conn = None

# connect to the PostgreSQL server
conn = psycopg2.connect(port = '5432', host='ec2-18-212-49-227.compute-1.amazonaws.com',database='secret', user='power_user', password='1234')
newsapi = NewsApiClient(api_key = '4ccc6c7975b84c9fbaecc6caf24b2f0b')

# create a cursor
cur = conn.cursor()

# execute a statement
cur.execute("SELECT name,id FROM company");
row = cur.fetchall()

# making things pretty
for r in row: 
   s = r[0]
   cid = r[1]
   top_headlines = newsapi.get_everything(q=s)
   if top_headlines['status'] == 'ok':
       for art in top_headlines['articles']:
           cur.execute("INSERT INTO company_articles_news (url, headline, content, dob, cid) VALUES (%s, %s, %s, %s, %s)", (art['url'], art['title'], art['description'], art['publishedAt'], cid))

conn.commit()
cur.close()
