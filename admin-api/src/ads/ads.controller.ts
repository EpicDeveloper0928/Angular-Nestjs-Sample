import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddDto } from './add.dto';
import { Add } from './add.interface';
import { AdsService } from './ads.service';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Add[]> {
    return this.adsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id): Promise<Add> {
    return this.adsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createdAddDto: AddDto,
    @UploadedFile() file,
    @Req() req,
  ): Promise<Add> {
    const url = req.protocol + '://' + req.get('host');

    const post: Add = {
      _id: createdAddDto._id,
      title: createdAddDto.title,
      imageUrl: url + '/' + file.filename,
      text: createdAddDto.text,
      url: createdAddDto.url,
      order: createdAddDto.order,
    };

    return this.adsService.create(post);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id): Promise<Add> {
    return this.adsService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Body() updateAddDto: AddDto,
    @Param('id') id,
    @UploadedFile() file,
    @Req() req,
  ): Promise<Add> {
    const url = req.protocol + '://' + req.get('host');

    const post = {
      _id: updateAddDto._id,
      title: updateAddDto.title,
      imageUrl: file ? url + '/' + file.filename : updateAddDto.imageUrl,
      text: updateAddDto.text,
      url: updateAddDto.url,
      order: updateAddDto.order,
    };

    return this.adsService.update(id, post);
  }
}
