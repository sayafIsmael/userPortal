import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

interface subscription {
    dataPlan: String;
    bandwith: Number;
    latency: Number;
}

interface callUsage {
    phone: Number;
    duration: Number;
    department: String;
    extensionNumber: String;
}

export interface User extends mongoose.Document {
    id: mongoose.ObjectId;
    name: String;
    category: String;
    subscription: subscription;
    username?: String;
    password?: String
}
