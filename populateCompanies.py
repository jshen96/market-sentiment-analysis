import psycopg2
import re

regexType = r'[(]+[\d\w\W]*[)]+'

def updateToDatabase(conn,data):
    cur = conn.cursor()
    for d in data:
        cur.execute("INSERT INTO company (code, name) VALUES (%s, %s)", (d[0], d[1]))
    conn.commit()

def connectToDatabase():
    try:
        conn = psycopg2.connect(database="secret", user="power_user", password="1234", host="ec2-18-212-49-227.compute-1.amazonaws.com", port="5432")
        return conn
    except:
        print("I am unable to connect to the database")

companies = 'companies.txt'
lines = []
with open(companies) as f:
    lines = f.readlines()
parsed = []
for l in lines:
    d = []
    l.rstrip('\n')
    d = l.split(' ', 1)
    d[1] = re.sub(regexType, '' ,d[1].split('\n')[0]).rstrip()
    parsed.append(d)

conn = connectToDatabase()
updateToDatabase(conn,parsed)
#print(parsed)
