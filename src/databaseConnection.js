const mainConnection = require('knex')({
    client: 'pg',
    connection: {
      //host : 'db-jmu',
      host : 'localhost',
      port : 5432,
      user : 'dbjmu',
      password : 'Afgihn215zxdg',
      database : 'jmu'
    }
});

module.exports.mainConnection = mainConnection
