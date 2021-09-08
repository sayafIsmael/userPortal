import {
    Controller, Get,
    Post,
    Request,
    Body,
    Req,
    Param,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
    ) { }

    @Get()
    async getUsers(@Request() req) {
        let options = {

        };

        // if (req.query.s) {
        //     options = {
        //         $or: [
        //             {title: new RegExp(req.query.s.toString(), 'i')},
        //             {description: new RegExp(req.query.s.toString(), 'i')},
        //         ]
        //     }
        // }

        const query = this.userService.find(options);

        // if (req.query.sort) {
        //     query.sort({
        //         price: req.query.sort
        //     })
        // }

        const page: number = parseInt(req.query.page as any) || 1;
        const limit = 10;
        const total = await this.userService.count(options);

        const data = await query.skip((page - 1) * limit).limit(limit).exec();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / limit)
        };
    }

    @Post()
    async createUser(@Body() req) {
        return await this.userService.create(req)
    }

    @Get('subscription')
    async getUsersSubscription(@Request() req) {
        let { filterField, filterValue } = req.query;
        let search = {}
        if (filterField == "name") {
            search['name'] = new RegExp(filterValue.toString(), 'i')
        } else if (filterField == "dataPlan") {
            search["dataPlan"] = new RegExp(filterValue.toString(), 'i')
        } else if (filterField == "bandwith") {
            search["bandwith"] = new RegExp(filterValue, 'i')
        } else if (filterField == "latency") {
            search["latency"] = new RegExp(filterValue.toString(), 'i')
        }

        let options: any = [
            {
                "$project": {
                    "id": "$_id",
                    "name": 1,
                    "_id": 0,
                    "dataPlan": "$subscription.dataPlan",
                    "bandwith": {"$toString":"$subscription.bandwith"},
                    "latency": {"$toString":"$subscription.latency"},
                }
            },
            { $match: search }
        ];

        // options = {
        //     $or: [
        //         {title: new RegExp(req.query.s.toString(), 'i')},
        //         {description: new RegExp(req.query.s.toString(), 'i')},
        //     ]
        // }

        console.log("{ ...search }: ", search)
        // if (req.query.filterField) {
        //     console.log("{ ...search }: ", search)
        //     options.push({ $match: search })

        // }

        const query = this.userService.findSubscription(options);

        // if (req.query.sort) {
        //     query.sort({
        //         price: req.query.sort
        //     })
        // }

        const page: number = parseInt(req.query.page as any) || 1;
        const limit = 10;
        const total = await this.userService.count(options);

        const data = await query.skip((page - 1) * limit).limit(limit).exec();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / limit)
        };
    }
}
