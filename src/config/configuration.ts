export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT ?? '3001', 10) || 3001,

  version: process.env.VERSION || '1.0.0',
  urls: {
    main_server: process.env.WWW_SERVER,
    api_server: process.env.API_SERVER,
  },
  data_base: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dbname: process.env.DATABASE_DBNAME,
  },
  config: {
    default_on_page: process.env.CONFIG_DEFAULT_ON_PAGE,
  },
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    access_lifetime: process.env.JWT_ACCESS_LIFETIME,
  },
});
