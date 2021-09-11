import { Model } from 'mongoose';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CallUsage } from './callUsage.interface';
import { UserSchema } from './schemas/user.schema'
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('CallUsage') private readonly callUsageModel: Model<CallUsage>,
    ) { }

    find(options) {
        return this.userModel.aggregate([
            { "$project": { "id": "$_id", "name": 1, "category": 1 } }
        ]).sort({ field: 'asc', _id: -1 });
    }

    count(options) {
        return this.userModel.count(options).exec();
    }

    findSubscription(options, sortData) {
        return this.userModel.aggregate(options).sort({ field: 'asc', _id: -1, ...sortData});
    }

    countSubscription(options) {
        return this.userModel.aggregate(options).count("count").exec();
    }

    findCallUsage(options, sortData) {
        return this.callUsageModel.aggregate(options).sort({ field: 'asc', _id: -1, ...sortData})
    }

    countCallUsage(options) {
        return this.callUsageModel.aggregate(options).count("count").exec();
    }

    async create(req): Promise<any> {
        try {
            const createdUser = new this.userModel(req);
            const err = createdUser.validateSync();
            if (err) {
                return err;
            }
            let saved = createdUser.save();
            if (saved) {
                return {
                    success: true
                }
            }
        } catch (error) {
            return error
        }
    }

    async findOne(username: string): Promise<User> {
        return this.userModel.findOne({ username });
      }
}
