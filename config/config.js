module.exports = {
  development: {
    username: 'postgres',
    password: '123456',
    database: 'todo',
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    migrationStorageTableName: '_migrations',
  },
};
