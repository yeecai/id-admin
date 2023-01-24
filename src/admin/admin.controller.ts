import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { catchError } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly authService: AuthService) { }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.register(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Post('login')
  async login(@Body() loginParams: any) {
    console.log('step1: user request')
    const authResult = await this.authService.validateUser(loginParams.name, loginParams.passwd)
    switch (authResult.code) {
      case 200:
        return this.authService.certificate(authResult.user)
      default:
        return authResult
    }
  }
}
