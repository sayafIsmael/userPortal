import { Model } from 'mongoose';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { UserSchema } from './schemas/user.schema'
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }

    find(options) {
        return this.userModel.aggregate([
            { "$project": { "id": "$_id", "name": 1, "category": 1 } }
        ]).sort({ field: 'asc', _id: -1 });
    }

    findSubscription(options) {
        return this.userModel.aggregate(options).sort({ field: 'asc', _id: -1 });
    }

    count(options) {
        return this.userModel.count(options).exec();
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
}
