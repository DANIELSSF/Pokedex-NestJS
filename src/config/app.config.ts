export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3001,
    mongoDB: process.env.MONGODB,
    defaultLimit: +process.env.DEFAULT_LIMIT || 10,
})