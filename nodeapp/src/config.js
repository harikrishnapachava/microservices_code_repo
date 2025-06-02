const config = {
  connectionString: `mongodb://${process.env.DB_USER && process.env.DB_PASSWORD ? process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' : ''}${process.env.DB_URL || ''}:${process.env.DB_PORT || ''}/${process.env.DB_NAME || ''}`
};

module.exports = config;
