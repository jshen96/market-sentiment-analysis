const db = require('../db/db.js');

exports.getTweetWithCompanyNameAt = async (company, time) => {
    const query = `
    select * from company_tweets where cid = (select id from company where name=$1) and dob >= $2;
`
    const {rows} = await db.query(query, [company, time]);
    return rows;
}


exports.getTweetWithCompanyCodeAt = async (company, time) => {
    const query = `
    select * from company_tweets where cid = (select id from company where code=$1) and dob >= $2;
`
    const {rows} = await db.query(query, [company, time]);
    return rows;
}

exports.getTweetWithCompanyIdAt = async (company, time) => {
    const query = `
    select * from company_tweets where cid = $1 and dob >= $2;
`
    const {rows} = await db.query(query, [company, time]);
    return rows;
}
