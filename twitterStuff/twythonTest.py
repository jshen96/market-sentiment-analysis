from twython import Twython
import json
import pandas as pd

# Save the credentials object to file
with open("twitter_credentials.json", "r") as file:
    creds = json.load(file)

# print(creds)

# Instantiate an object
python_tweets = Twython(creds['consumer_key'], creds['consumer_secret'])

# Create our query
query = {'q': 'Tesla',
        'result_type': 'popular',
        'count': 10,
        'lang': 'en',
        }

# Search tweets
dict_ = {'user': [], 'date': [], 'text': [], 'favorite_count': []}
for status in python_tweets.search(**query)['statuses']:
    dict_['user'].append(status['user']['screen_name'])
    dict_['date'].append(status['created_at'])
    dict_['text'].append(status['text'])
    dict_['favorite_count'].append(status['favorite_count'])

# Structure data in a pandas DataFrame for easier manipulation
df = pd.DataFrame(dict_)
df.sort_values(by='favorite_count', inplace=True, ascending=False)
df.head(5)

print(df.to_string())
print('++PROGRAM END++')
