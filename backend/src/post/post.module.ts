import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller'; 
import { DatabaseModule } from 'src/database/database.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [DatabaseModule, 
    MulterModule.register({
    dest: './uploads',
  }),],
  
  providers: [PostService],
  controllers: [PostController], 
})
export class PostModule {}
