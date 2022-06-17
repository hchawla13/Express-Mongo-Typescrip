import mongoose, { Document, Schema } from 'mongoose';

export interface IRecruiter {
    full_name: string;
    email1: string;
    email2: string;
    email3: string;
    email4: string;
    current_position: string;
    company_name: string;
    person_city: string;
}

export interface IRecruiterModel extends IRecruiter, Document {}

const RecruiterSchema: Schema = new Schema(
    {
        full_name: { type: String, required: true },
        email1: { type: String, required: true },
        email2: { type: String, required: false },
        email3: { type: String, required: false },
        email4: { type: String, required: false },
        current_position: { type: String, required: false },
        company_name: { type: String, required: true },
        person_city: { type: String, required: true },
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IRecruiterModel>('Recruiter', RecruiterSchema);
