import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encrptyPassword, makeSalt } from 'src/utils/cryptogram';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>
  ) { }

  create(createAdminDto: CreateAdminDto) {
    return this.adminRepo.save(createAdminDto)
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepo.find()
  }

  findOne(id: string) {
    return this.adminRepo.findOneBy({ uuid: id });
  }

  findOneByName(name: string) {
    return this.adminRepo.findOneBy({ name });
  }

  async register(body: CreateAdminDto): Promise<any> {
    const { name, passwd } = body
    const user = await this.findOneByName(name)
    if (user) {
      return {
        code: 400,
        msg: 'user exsited',
      }
    }
    const salt = makeSalt()
    const hashPwd = encrptyPassword(passwd, salt)

    try {
      const user = await this.create({
        // null,
        name,
        passwd: hashPwd,
        salt
      } as CreateAdminDto)
      return {
        code: 0,
        msg: 'success',
        data: user
      }
    } catch {
      return {
        code: 503,
        msg: 'falied to create'
      }
    }
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
