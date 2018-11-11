import pprint
import requests
import psycopg2
from datetime import datetime

def preprocess(pre_data):
    data = []
    for d in pre_data:
        di = {}
        di["title"] = d["title"]
        di["url"] = d["link"]
        di["dob"] = str(datetime.now())
        di["content"] = d["snippet"].strip('\n')
        data.append(di)
    return data

def connectToDatabase():
    try:
        conn = psycopg2.connect(database="secret", user="power_user", password="1234", host="ec2-18-212-49-227.compute-1.amazonaws.com", port="5432")
        return conn
    except:
        print("I am unable to connect to the database")

def getCompanyList(conn):
    cur = conn.cursor()
    cur.execute("SELECT id,name,code from company")
    rows = cur.fetchall()
    print(rows)
    return rows

def updateToDatabase(conn,data, id):
    cur = conn.cursor()
    for d in data:
        try:
            cur.execute("INSERT INTO company_articles_news (url, dob, headline, content,cid) VALUES (%s, %s, %s, %s, %s)", (d["url"], d["dob"],d["title"], d["content"], id))
            conn.commit()
        except:
            # duplicated
            continue
    

def processKeyword(conn, keyword):
    url = 'https://www.googleapis.com/customsearch/v1'
    payload = {
        'key': 'AIzaSyCtsyEyJLrY7RPpbQkmXNTiiZO5cW5oOz8',
        'cx': '015157254041428292487:c2_wa2nlnky',
        'q':keyword,
        'dateRestrict': 'd1'
    }
    r = requests.get(url, params=payload)
    js = r.json()
    data = []
    if (int(js["searchInformation"]["totalResults"]) > 0) :
        data = preprocess(js["items"])
    else:
        print("nothing here")
    return data

def main():
    conn = connectToDatabase()
    rows = getCompanyList(conn)
    for r in rows:
        data = processKeyword(conn, r[1])
        if (len(data) > 0):
            updateToDatabase(conn, data, r[0])
            pprint.pprint(data)

if __name__ == '__main__':
  main()