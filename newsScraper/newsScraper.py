from newsapi import NewsApiClient
import json
import pandas as pd
import psycopg2
from datetime import datetime

#print('DATABASE PROGRAM STARTS')

conn = None
try:
    # connect to the PostgreSQL server
    #print('Connecting to the PostgreSQL database...')
    conn = psycopg2.connect(port = '5432', host='ec2-18-212-49-227.compute-1.amazonaws.com',database='secret', user='power_user', password='1234')

    # create a cursor
    cur = conn.cursor()

    # making things pretty
    # my_dict = {'url': "hello", 'title': "booyah", 'content': "honeybobob", 'publishedAt': str(datetime.now())}
    a = top_headlines['articles']
    for index, item in enumerate(a):
        a[index].pop('author' , None)
        a[index].pop('content' , None)
        a[index].pop('publishedAt' , None)
        a[index].pop('source' , None)
        a[index].pop('urlToImage' , None)

    
    # execute a statement
    cur.execute("SELECT")
    if top_headlines['status'] == 'ok':
        cur.executemany("INSERT INTO company_articles_news (url, headline) VALUES (%(url)s, %(title)s)", a)
        

        # display the PostgreSQL database server version
    db_version = cur.fetchone()
    print(db_version)

     # close the communication with the PostgreSQL
    cur.close()
except (Exception, psycopg2.DatabaseError) as error:
    print("hello")
    print(error)


#newsapi = NewsApiClient(api_key = '4ccc6c7975b84c9fbaecc6caf24b2f0b')

#top_headlines = newsapi.get_everything(q='apple', pageSize=50)

#if top_headlines['status'] == 'ok':
#    cur.execute("INSERT INTO company_articles_news(dob, url, headline, content) VALUES (%(publishedAt)s, %(url)s, %(title)s, %(content)s)", top_headlines['articles'])