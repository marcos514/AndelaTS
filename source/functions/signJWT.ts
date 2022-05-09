import jwt from 'jsonwebtoken';
import config from '../config/config';
import Logger from '../config/logging';
import IUser from '../interfaces/user';

const logging = new Logger('Auth');

const signJWT = (user: IUser, callback: (error: Error | null | undefined, token: string | null | undefined) => void) => {
    let timeSinchEpoch = new Date().getTime();
    let expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
    let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    logging.info(`Attemting sign token for ${user.username}`);
    try {
        jwt.sign(
            {
                username: user.username
            },
            config.server.token.secret,
            { issuer: config.server.token.issuer, algorithm: 'HS256', expiresIn: expirationTimeInSeconds },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        logging.error(error.message, error);
        callback(error, null);
    }
};

export default signJWT;
