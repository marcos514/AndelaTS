import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import Logger from '../config/logging';

const logging = new Logger('Auth');

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Validating Token');
    let token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'UnAuthorized'
        });
    }
};

export default extractJWT;
