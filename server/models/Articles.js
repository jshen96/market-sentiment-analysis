const db = require('../db/db.js');

exports.getCompanyArticlesWithNameAt = async (company, time) => {
    const query = `
        select * from company_articles_news where cid = (select id from company where name=$1) and dob >= $2;
    `
    const {rows} = await db.query(query, [company, time]);
    return rows;
}

exports.getCompanyArticlesWithCodeAt = async (company, time) => {
    const query = `
        select * from company_articles_news where cid = (select id from company where code=$1) and dob >= $2;
    `
    const {rows} = await db.query(query, [company, time]);
    return rows;
}

exports.getCompanyArticlesWithIdAt = async (company, time) => {
    const query = `
        select * from company_articles_news where cid = $1 and dob >= $2;
    `
    const {rows} = await db.query(query, [company, time]);
    return rows;
}