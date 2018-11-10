const db = require('./db.js');

exports.reset = function () {
    const query = `
        DROP TABLE IF EXISTS company_sentinent;
        DROP TABLE IF EXISTS company_tweets;
        DROP TABLE IF EXISTS company_articles_news;
        DROP TABLE IF EXISTS company;
        
        CREATE TABLE IF NOT EXISTS company (
            id serial unique primary key,
            name text,
            code varchar(255)
        );
        CREATE TABLE IF NOT EXISTS company_articles_news (
            id serial unique primary key,
            cid int references company(id),
            dob date,
            url text unique,
            headline text,
            content text
        );
        CREATE TABLE IF NOT EXISTS company_sentinent (
            cid int references company(id),
            sentinent numeric(8,2) default 0.00
        );
        CREATE TABLE IF NOT EXISTS company_tweets (
            id serial unique primary key,
            cid int references company(id),
            username varchar(255),
            dob date,
            content text,
            like_count bigint
        );
    `
    db.query(query, function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('DB Reset Successful!');
      });
}