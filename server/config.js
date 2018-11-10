const url = require('url');

if (process.env.DATABASE_URL) {
    const db_params = url.parse(process.env.DATABASE_URL);
    const db_auth = db_params.auth.split(':');
    exports.db = {
      user: db_auth[0],
      password: db_auth[1],
      host: db_params.hostname,
      port: db_params.port,
      database: db_params.pathname.split('/')[1],
      max: 20,
      idleTimeoutMillis: 30000
    };
  }
else {
    exports.db = {
        user: 'power_user',
        database: 'secret',
        password: '$poweruserpassword',
        host: 'localhost',
        port: 5432,
        max: 20,
        idleTimeoutMillis: 30000
      };
}
