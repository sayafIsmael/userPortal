import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './schemas/user.schema'
import { CallUsageSchema } from './schemas/callUsage.schema'

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'CallUsage', schema: CallUsageSchema }
  ])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
