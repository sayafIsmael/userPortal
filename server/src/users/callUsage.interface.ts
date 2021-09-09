import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface CallUsage extends mongoose.Document {
    userId: mongoose.ObjectId;
    phone: String;
    duration: Number;
    department: String;
    extensionNumber: String;
    
}