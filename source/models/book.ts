import mongoose, { Schema } from 'mongoose';
import IBook from '../interfaces/book';
import Logger from '../config/logging';

const logging = new Logger('BookDB');

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        extraInformation: { type: String }
    },
    {
        timestamps: true
    }
);

BookSchema.post<IBook>('save', function () {
    logging.info('Checkout the book we just saved: ', this);
});

export default mongoose.model<IBook>('Book', BookSchema);
