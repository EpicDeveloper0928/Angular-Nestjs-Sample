import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Add } from './add.interface';

@Injectable()
export class AdsService {
  constructor(@InjectModel('Add') private readonly addModel: Model<Add>) {}

  async findAll(): Promise<Add[]> {
    return await this.addModel.find();
  }

  async findOne(id: string): Promise<Add> {
    return await this.addModel.findOne({ _id: id });
  }

  async create(add: Add): Promise<Add> {
    const newAdd = new this.addModel(add);
    return await newAdd.save();
  }

  async delete(id: string): Promise<Add> {
    await this.addModel.findByIdAndRemove(id);
    return await this.addModel.find();
  }

  async update(id: string, add: Add): Promise<Add> {
    return await this.addModel.findByIdAndUpdate(id, add, { new: true });
  }
}
