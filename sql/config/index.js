import pino from 'pino';
import artifactDetails from '../ArtifactDetails.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(__dirname, '../logs/development.log');

const config = {
    web: {
        artifact: artifactDetails,
        name: artifactDetails.name,
        version: artifactDetails.version,
        port: process.env.PORT,
    },
    database: {
        host: process.env.SQL_HOST,
        db: process.env.SQL_DB,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD
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
        pino: pino.transport({
            target: 'pino-pretty',
            options: { 
                levelFirst: false,
                colorize: false,
                ignore: 'hostname',
                translateTime: 'yyyy-mm-dd HH:MM:ss',
            }
        })
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

export default config;