const db = require('../db/db.js');

exports.getCompanyList = async () => {
    const query = `
        select * from company;
    `
    const {rows} = await db.query(query);
    return rows;
}

exports.getSemanticScoresWithName = async (company, time) => {
    const query = `
        select * from company_trends where cid = (select id from company where name = $1) and dob >= $2;
    `
    const {rows} = await db.query(query, [company, time]);
    return rows;
}

exports.getCompanyName = async (id) => {
    const query = `
        select name from company where id = $1;
    `
    const {rows} = await db.query(query, [id]);
    return rows[0]["name"];
}