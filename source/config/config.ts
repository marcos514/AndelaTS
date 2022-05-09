import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'MarmarTest';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '6QcwcTFaYUGmjNC';
const MONGO_HOST = process.env.MONGO_URL || `cluster0.id2pn.mongodb.net/myFirstDatabase`;

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

// mongodb+srv://MarmarTest:<password>@cluster0.id2pn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// mongosh "mongodb+srv://cluster0.id2pn.mongodb.net/myFirstDatabase" --apiVersion 1 --username MarmarTest

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER__TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER__TOKEN_ISSUER || 'ISSUE ';
const SERVER_TOKEN_SECRET = process.env.SERVER__TOKEN_SECRET || 'MySecretToken';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;
