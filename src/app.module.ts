import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { AuthModule } from './auth/auth.module';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/client/images'),
      serveRoot: '/images'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/client'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db', // docker services name, should be localhost without docker
      port: 3306,
      username: 'root',
      password: null,
      database: 'test',
      entities: [User, Admin],
      synchronize: false,
    }),
    UsersModule,
    AdminModule,
    AuthModule],
  controllers: [AdminController]
})

export class AppModule { }
