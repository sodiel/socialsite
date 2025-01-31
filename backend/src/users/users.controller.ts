import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { LoginUserDto } from './login-user.dto'; 
import { UsersService } from './users.service';
import { $Enums, Prisma, Role } from '@prisma/client';

import { IsNotEmpty, IsString, IsEmail, Length, IsStrongPassword, minLength, IsEnum } from 'class-validator';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class CreateUserValidation implements Prisma.UserCreateInput{
  @IsNotEmpty()
  @Length(8)
  password: string;
  @IsEnum(Role)
  role: $Enums.Role;
  posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

@Controller('/auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }


  @Post("/register")
async create(@Body() createUserValidation: CreateUserValidation) {
  try {
    return await this.usersService.register(createUserValidation);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists'); 
      }
    }
    throw new InternalServerErrorException('Internal server error');
  }
}

  @Get('/users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/users/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('/users/:id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('/users/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

