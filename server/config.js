const url = require('url');

if (process.argv.length >= 3) {
    const db_params = url.parse(process.argv[2]);
    const db_auth = db_params.auth.split(':');
    console.log("Connect with Database_url")
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
