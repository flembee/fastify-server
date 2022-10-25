const artifactDetails = require('../ArtifactDetails.json');
const path = require('path');
const logPath = path.join(__dirname, '../logs/development.log');

module.exports = {
    web: {
        artifact: artifactDetails,
        name: artifactDetails.name,
        version: artifactDetails.version,
        port: process.env.PORT,
    },
    database: {
        url: process.env.MONGO_URL,
    },
    gcpcloud: {
        GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
        GCP_SERVICE_ACCOUNT: process.env.GCP_SERVICE_ACCOUNT,
        GCP_PRIVATE_KEY: process.env.GCP_PRIVATE_KEY,
        GCP_STORAGE_BUCKET: process.env.GCP_STORAGE_BUCKET,
        token_uri: 'https://oauth2.googleapis.com/token'
      },
    logger: {
        file: logPath,
        prettyPrint: {
            levelFirst: false,
            colorize: false,
            ignore: 'hostname',
            translateTime: 'yyyy-mm-dd HH:MM:ss',
        },
    },
    swagger: {
        routePrefix: '/docs',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'fastify-server',
                description: 'Simple Fastify Server',
                version: '1.0.0',
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here',
            },
            host: `localhost:${process.env.SERVER_PORT}`,
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
    },
    search: {
        pageOptions: {
            limit: 10,
            page: 1,
            sort: { createdAt: -1 },
        },
    },
    auth: {
        secretKey: process.env.SECRET_KEY,
        expiresIn: process.env.EXPIRES_IN,
    },
    password: {
        resetExpiresIn: process.env.RESET_EXPIRES_IN,
        resetSecretKey: process.env.RESET_SECRET_KEY,
        salt: process.env.salt,
    },
    hoursFormat: 'HH:mm',
};
