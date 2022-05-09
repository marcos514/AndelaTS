import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Logger from '../config/logging';
import bcryptjs from 'bcryptjs';
import User from '../models/user';
import signJWT from '../functions/signJWT';

// const logging = new Logger('Users');

export default class UserControler {
    logging = new Logger('Users');
    constructor(_logger: Logger) {
        this.logging = _logger;
    }

    public validateToken = (req: Request, res: Response, next: NextFunction) => {
        this.logging.info('Token Validated, user authorized');
        return res.status(200).json({
            message: 'Authorized'
        });
    };

    public register = (req: Request, res: Response, next: NextFunction) => {
        let { username, password } = req.body;
        bcryptjs.hash(password, 10, (hashError, hash) => {
            if (hashError) {
                return res.status(500).json({
                    message: hashError.message,
                    error: hashError
                });
            }

            const _user = new User({
                _id: new mongoose.Types.ObjectId(),
                username,
                password: hash
            });
            return _user
                .save()
                .then((user) => {
                    return res.status(201).json({
                        user
                    });
                })
                .catch((error) => {
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        });
    };

    public login = (req: Request, res: Response, next: NextFunction) => {
        let { username, password } = req.body;
        User.find({ username })
            .exec()
            .then((user) => {
                if (user.length !== 1) {
                    return res.status(401).json({
                        message: 'Unauthorized'
                    });
                }
                bcryptjs.compare(password, user[0].password, (error, result) => {
                    if (error) {
                        this.logging.error(error.message, error);
                        return res.status(401).json({
                            message: 'Unauthorized'
                        });
                    } else if (result) {
                        signJWT(user[0], (_error, token) => {
                            if (_error) {
                                this.logging.error(_error.message, _error);
                                return res.status(401).json({
                                    message: 'Unauthorized',
                                    error: _error
                                });
                            } else if (token) {
                                res.status(200).json({
                                    message: 'Auth Succesful',
                                    token,
                                    user: user[0]
                                });
                            }
                        });
                    }
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    };

    public getAllUsers = (req: Request, res: Response, next: NextFunction) => {
        User.find()
            .select('-password')
            .exec()
            .then((users) => {
                return res.status(200).json({
                    users,
                    count: users.length
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    };
}

// export default { validateToken, register, login, getAllUsers };
