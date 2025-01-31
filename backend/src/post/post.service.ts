import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import { CreatePostDto } from './create-post.dto';



@Injectable()
export class PostService {
  constructor(private readonly databaseService: DatabaseService) {}

  // async create(createPostDto: CreatePostDto, userId: number, userEmail: string) {
  //   return this.databaseService.post.create({
  //     data: {
  //       ...createPostDto,
  //       author: {
  //         connect: {
  //           id: userId,
  //           email: userEmail
  //         },
  //       },
  //     },
  //   });
  // }

  async create(createPostDto: CreatePostDto, userId: number, userEmail: string) {
    return this.databaseService.post.create({
      data: {
        title: createPostDto.title,
        idempotencyKey: createPostDto.idempotencyKey,
        content: createPostDto.content,
        status: createPostDto.status,
        author: {
          connect: { id: userId },
        },
      },
    });
  }
  
  

  findAll() {
    return this.databaseService.post.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        author: {
          select: { email: true } 
        },
        image: true,
      }

    });
  }

  findAllForCurrentUser(authorId: number) {
    return this.databaseService.post.findMany({
      where: {
        OR: [
          { status: 'PUBLISHED' }, 
          { status: 'DRAFT', authorId }, 
        ],
      },
      include: {
        author: {
          select: { email: true } 
        },
        image: true,
      },
    });
  }

  findAllDraftsForCurrentUser(authorId: number) {
    return this.databaseService.post.findMany({
      where: {
          status: 'DRAFT', authorId 
      },
      include: {
        author: {
          select: { email: true } 
        },
        image: true,
      },
    });
  }

  findAllForAuthor(authorId: number) {
    return this.databaseService.post.findMany({
      where: {
           authorId
      },
      include: {
        author: {
          select: { email: true } 
        },
        image: true,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.post.findUnique( {
      where: {
        id
      }
    });
  }

  async update(id: number, updateUserDto: Prisma.PostUpdateInput) {
    return this.databaseService.post.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.post.delete({
      where : { id }
    })
  }
  async attachImageToPost(postId: number, imageUrl: string) {
    const postExists = await this.databaseService.post.findUnique({
      where: { id: postId },
    });
  
    if (!postExists) {
      throw new BadRequestException('Пост не найден');
    }
  
    return this.databaseService.image.create({
      data: {
        postId: postId,
        imageUrl: imageUrl,
      },
    });
  }

  
  

  
}
