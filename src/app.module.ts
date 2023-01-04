import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

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
      entities: [User],
      synchronize: false,
    }),
    UsersModule]
})

export class AppModule { }
