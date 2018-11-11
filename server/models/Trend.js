const db = require('../db/db.js');

exports.getTrendWithCompanyId = async (company, time) => {
    const query = `
    select * from company_tweets where cid = $1 and dob >= $2;
`
    const {rows} = await db.query(query, [company, time]);
    return rows;
}
