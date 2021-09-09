import * as mongoose from 'mongoose';

export const CallUsageSchema = new mongoose.Schema(
    {   
        userId: String,
        phone: String,
        duration: String,
        department: String,
        extensionNumber: String,
    },
    { versionKey: false },
);

