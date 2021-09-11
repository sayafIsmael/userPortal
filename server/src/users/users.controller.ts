import {
    Controller, Get,
    Post,
    Request,
    Body,
    Req,
    Param,
    UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers(@Request() req) {
        let options = {

        };

        const query = this.userService.find(options);

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

    @UseGuards(JwtAuthGuard)
    @Post()
    async createUser(@Body() req) {
        return await this.userService.create(req)
    }

    @UseGuards(JwtAuthGuard)
    @Get('subscription')
    async getUsersSubscription(@Request() req) {
        let { filterField, filterValue, field, sort } = req.query;
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


        let sortData = {
            name: 1,
            dataPlan: 1,
            bandwith: 1,
            latency: 1
        }

        sort = parseInt(sort)
        if (field == "name") {
            sortData['name'] = sort
        } else if (field == "dataPlan") {
            sortData["dataPlan"] = sort
        } else if (field == "bandwith") {
            sortData["bandwith"] = sort
        } else if (field == "latency") {
            sortData["latency"] = sort
        }

        let options: any = [
            {
                "$project": {
                    "id": "$_id",
                    "name": 1,
                    "_id": 0,
                    "dataPlan": "$subscription.dataPlan",
                    "bandwith": { "$toString": "$subscription.bandwith" },
                    "latency": { "$toString": "$subscription.latency" },
                }
            },
            { $match: search },
        ];



        console.log("subscription { ...search }: ", sortData)


        const query = this.userService.findSubscription(options, sortData);


        const page: number = parseInt(req.query.page as any) || 1;
        const limit = 10;
        const total = await this.userService.countSubscription(options);

        const data = await query.skip((page - 1) * limit).limit(limit).exec();

        return {
            data,
            total: total[0].count,
            page,
            last_page: Math.ceil(total / limit)
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('call-usage')
    async getUsersCallusage(@Request() req) {
        let { filterField, filterValue, field, sort } = req.query;
        let search = {} 
        if (filterField == "name") {
            search['name'] = new RegExp(filterValue.toString(), 'i')
        } else if (filterField == "phone") {
            search["phone"] = new RegExp(filterValue.toString(), 'i')
        } else if (filterField == "department") {
            search["department"] = new RegExp(filterValue, 'i')
        } else if (filterField == "extensionNumber") {
            search["extensionNumber"] = new RegExp(filterValue.toString(), 'i')
        }else if (filterField == "duration") {
            search["duration"] = new RegExp(filterValue.toString(), 'i')
        }


        let sortData = {
            name: 1,
            dataPlan: 1,
            bandwith: 1,
            latency: 1
        }

        sort = parseInt(sort)
        if (field == "name") {
            sortData['name'] = sort
        } else if (field == "phone") {
            sortData["phone"] = sort
        } else if (field == "department") {
            sortData["department"] = sort
        } else if (field == "extensionNumber") {
            sortData["extensionNumber"] = sort
        }else if (field == "duration") {
            sortData["duration"] = sort
        }

        let options: any = [
            {
                "$lookup": {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { "$unwind": "$user" },
            {
                "$project": {
                    "id": "$_id",
                    "_id": 0,
                    "name": "$user.name",
                    "phone": 1,
                    "duration": 1,
                    "department": 1,
                    "extensionNumber": 1
                    // "callUsage": 1,
                    // "bandwith": { "$toString": "$subscription.bandwith" },
                    // "latency": { "$toString": "$subscription.latency" },
                }
            },
            // {"$group": {phone: "$phone"}},
            { $match: search },
        ];



        console.log("call-usage { ...search }: ", sortData)


        const query = this.userService.findCallUsage(options, sortData);


        const page: number = parseInt(req.query.page as any) || 1;
        const limit = 10;
        const total = await this.userService.countCallUsage(options);

        const data = await query.skip((page - 1) * limit).limit(limit).exec();

        return {
            data,
            total: total[0].count,
            page,
        };
    }
}
