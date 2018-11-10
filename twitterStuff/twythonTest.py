from twython import Twython
import json
import pandas as pd
import psycopg2

# # Save the credentials object to file
# with open("twitter_credentials.json", "r") as file:
#     creds = json.load(file)
#
# # print(creds)
#
# # Instantiate an object
# python_tweets = Twython(creds['consumer_key'], creds['consumer_secret'])
#
# # Create our query
# query = {'q': 'Tesla',
#         'result_type': 'popular',
#         'count': 10,
#         'lang': 'en',
#         }
#
# # Search tweets
# dict_ = {'user': [], 'date': [], 'text': [], 'favorite_count': []}
# for status in python_tweets.search(**query)['statuses']:
#     dict_['user'].append(status['user']['screen_name'])
#     dict_['date'].append(status['created_at'])
#     dict_['text'].append(status['text'])
#     dict_['favorite_count'].append(status['favorite_count'])
#
# # Structure data in a pandas DataFrame for easier manipulation
# df = pd.DataFrame(dict_)
# df.sort_values(by='favorite_count', inplace=True, ascending=False)
# df.head(5)
#
# print(df.to_string())

print('DATABASE PROGRAM STARTS')
def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(host="localhost",database="secret", user="power_user", password="$poweruserpassword")

        # create a cursor
        cur = conn.cursor()

 # execute a statement
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')

        # display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)

     # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')
connect()

print('++PROGRAM END++')
