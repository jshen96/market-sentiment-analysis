var express = require("express");
var app = express();
var cors = require('cors')
var io = require('socket.io')();
const db = require('./server/db/db.js');
const company = require('./server/models/Company.js');
const articles = require('./server/models/Articles.js');
const trend = require('./server/models/Trend.js');
const tweets = require('./server/models/Tweet.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

db.connect();
//dbreset.reset()

var PORT = process.env.PORT || 3000

const alpha = require('alphavantage')({key: '60BR33CT7KNKZ0XS'});


alpha.data.quote('GOOGL', 'compact', 'json').then(data => {
  console.log(data);
})


/* GET home page. */
app.get('/getList', async (req, res, next) => {
  const d = await company.getCompanyList();
  var aMinuteAgo = new Date( Date.now() - 1000 * 600000 );
  let system = {}
  system["nodes"] = [
    {
      "name": "me",
      "level": 0,
      "group": 0
    }
  ]
  system["links"] = []
  let counter = 1
  console.log(d.length)
   for (var i = 0; i < d.length; i++) {
    const name = await company.getCompanyName(d[i]["id"]);
    let trend_t = await trend.getTrendWithCompanyId(d[i]["id"]);
    console.log("Current name: " + name)
     let s = {
       "name": name,
       "level": 1,
       "group": i + 1,
       "trend": trend_t
     }
     let tar = {
       "target": counter,
       "source": 0
     }
     counter += 1
    system["nodes"].push(s)
     system["links"].push(tar)
    let art = await articles.getCompanyArticlesWithIdAt(d[i]["id"], aMinuteAgo)
    for (var j = 0; j < art.length; j++) {
      let t = {
        "name": art[j].headline,
        "level": 2,
        "group": i + 1
      }
      let tarin = {
        "target": counter,
        "source": i + 1
      }
      counter += 1
      system["nodes"].push(t)
      system["links"].push(tarin)
    }
    let tweet = await tweets.getTweetWithCompanyIdAt(d[i]["id"], aMinuteAgo)
    for (var j = 0; j < tweet.length; j++) {
      let t = {
        "name": tweet[j].content,
        "level": 2,
        "group": i + 1
      }
      let tarin = {
        "target": counter,
        "source": i + 1
      }
      counter += 1
      system["nodes"].push(t)
      system["links"].push(tarin)
    }
   
    console.log(i + " has count " + (tweet.length + art.length))

   }
  
  console.log(system)
  
  res.json(system);
});

app.post('/company', async (req, res, next) => {
  let id = req.body.company_id
  var aMinuteAgo = new Date( Date.now() - 1000 * 600000 );
  const art = await articles.getCompanyArticlesWithIdAt(id, aMinuteAgo)
  const tweet = await tweets.getTweetWithCompanyIdAt(id, aMinuteAgo)
  const name = await company.getCompanyName(id);
  const trend = await trend.getTrendWithCompanyId(id);
  console.log(art)
  let dict = {
    id: id,
    name: name,
    articles: art,
    tweets: tweet,
    trends: trend
  }
  res.json(dict);
});

io.on('connection', (client) => {
  console.log("Client connected");
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

app.listen(PORT, process.env.IP, function() {
  console.log("Market Sentiment Analysis has started at port: " + PORT);
});
