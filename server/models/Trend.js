const db = require('../db/db.js');

exports.getTrendWithCompanyId = async (company, time) => {
    const query = `
    select * from company_trends where cid = $1;
`
    const {rows} = await db.query(query, [company]);
    return rows;
}
