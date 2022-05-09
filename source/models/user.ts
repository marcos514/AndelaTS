import mongoose, { Schema } from 'mongoose';
import Logger from '../config/logging';
import IUser from '../interfaces/user';

const logging = new Logger('BookDB');

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

// UserSchema.post<IBook>('save', function () {
//     logging.info('Checkout the book we just saved: ', this);
// });

export default mongoose.model<IUser>('User', UserSchema);
