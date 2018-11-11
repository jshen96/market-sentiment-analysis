from newsapi import NewsApiClient
import psycopg2
from unidecode import unidecode

def xstr(s):
    if s is None:
        return ' '
    return str(s)

conn = None

# connect to the PostgreSQL server
conn = psycopg2.connect(port = '5432', host='ec2-34-230-43-107.compute-1.amazonaws.com',database='secret', user='power_user', password='1234')
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
           # Need checking methods to make sure that strings are perfect
           urls = xstr(art['url'])
           titles = unidecode(xstr(art['title']))
           description = unidecode(xstr(art['description']))
           dob = xstr(art['publishedAt'])
           cur.execute("INSERT INTO company_articles_news (url, headline, content, dob, cid) VALUES (%s, %s, %s, %s, %s) ON CONFLICT (url) DO NOTHING", (urls, titles, description, dob, cid))

cur.execute('SELECT version()')
print(cur.fetchall())
conn.commit()
cur.close()

