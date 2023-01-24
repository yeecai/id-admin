import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import path, { join } from 'path';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const data = await this.usersService.create(createUserDto);
    return { status: HttpStatus.OK, data }
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const dir = join(__dirname, '../..', '/client/images')
    const baseUrl = 'http://localhost:3000'
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    const filePath = join(dir, file?.originalname || '')
    try {
      fs.writeFileSync(filePath, file.buffer)
    } catch (error) {
      console.log(error)
    }
    return { status: HttpStatus.OK, data: `${baseUrl}/images/${file?.originalname || ''} ` }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
