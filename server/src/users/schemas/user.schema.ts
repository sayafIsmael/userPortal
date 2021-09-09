import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "user subscription",
                "cloud phone",
                "cloud call center",
                "installation",
                "one time activation",
                "manday professional services",
                "one year",
                "two years",
            ],
        },
        subscription: {
            type: {
                dataPlan: String,
                bandwith: Number,
                latency: Number,
            },
            required: false,
        }
    },
    { versionKey: false },
);

