import mongoose, { Document, Schema } from 'mongoose';
export interface ICreditCard {
    name: string;
    amount: string;
    by: string;
    description: string;
    date: string;
}
export interface ICreditCardModel extends ICreditCard, Document {}
const CreditCardSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        amount: { type: String, required: true },
        by: { type: String, required: false },
        description: { type: String, required: true },
        date: { type: String, required: false },
    },
    {
        versionKey: false
    }
);
export default mongoose.model<ICreditCardModel>('CreditCard', CreditCardSchema);
