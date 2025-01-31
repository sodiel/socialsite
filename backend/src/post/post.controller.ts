import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, ForbiddenException, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreatePostDto } from './create-post.dto';
import { decode } from 'jsonwebtoken';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { Multer } from 'multer';


export interface User {
  id: number;
  email: string;
}

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}



  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1]; 

    try {
      
      const decoded: any = decode(token);
      const user = {
        id: decoded.sub,   
        email: decoded.email, 
        role: decoded.role
      };
      if (user.role != "AUTHOR") {
        throw new ForbiddenException('Вы не автор');
      } 
      
      return this.postService.create(createPostDto, user.id, user.email);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',  
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async uploadFile(@UploadedFile() file: Multer.File, @Body('postId') postId: string) {
    if (!file) throw new BadRequestException('Файл не загружен');
    if (!postId) throw new BadRequestException('postId не указан');

    const parsedPostId = Number(postId);
    if (isNaN(parsedPostId)) throw new BadRequestException('postId должен быть числом');

    const imageUrl = `/uploads/${file.filename}`;

    await this.postService.attachImageToPost(parsedPostId, imageUrl);

    return { imageUrl };
}



  @Get()
  async findAll(@Req() req) {
    const user = req.user; 
    return this.postService.findAll();
  }

  @Get('author/:authorId')
  async findAllForAuthor(@Param('authorId') authorId: number) {
    return this.postService.findAllForAuthor(authorId);
  }

  @Get('my-posts')
  async findAllForCurrentUser(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1]; 

    try {
      const decoded: any = decode(token);
      const user = {
        id: decoded.sub,   
        email: decoded.email, 
        role: decoded.role
      };
      if (user.role != "AUTHOR") {
        throw new ForbiddenException('Вы не автор');
      } 
      
      return this.postService.findAllForAuthor(user.id);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }


  @Get('my-drafts')
  async findAllDraftsForCurrentUser(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1]; 

    try {
      const decoded: any = decode(token);
      const user = {
        id: decoded.sub,   
        email: decoded.email, 
        role: decoded.role
      };
      if (user.role != "AUTHOR") {
        throw new ForbiddenException('Вы не автор');
      } 
      
      return this.postService.findAllDraftsForCurrentUser(user.id);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: Prisma.PostUpdateInput) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
