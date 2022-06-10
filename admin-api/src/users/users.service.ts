import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username });
  }

  async create(user: User): Promise<{ _id: string; username: string }> {
    const newUser = new this.userModel(user);

    const create = await newUser.save();
    const resUser = {
      _id: create._id,
      username: create.username,
    };

    return resUser;
  }
}
